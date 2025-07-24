const Nail = require("../models/Nail");
const Makeup = require("../models/Makeup");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { success,failure } = require("../utils/message");
const cloudinary = require("../utils/cloudinary");
const moment = require("moment");
const {sendEmail} = require("../utils/sendEmail.js");
const emailTemplate = require("../utils/emailTemplate.js");


//Object / Enum Service Type
const SERVICE_TYPE = {
  NAILS: "Nail",
  MAKEUP: "Makeup",
};

module.exports.create_new_booking= async (req, res) => {
  try {
    const { serviceId, serviceType, bookingDate, appointmentPlace, bookingTime } = req.body;
    
    
    let service = null;
    // Validate and format the date (YYYY-MM-DD)
    const formattedDate = moment(bookingDate, "YYYY-MM-DD", true).format("YYYY-MM-DD");
    if (!moment(formattedDate, "YYYY-MM-DD", true).isValid()) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD (e.g., 2025-02-26)" });
    }

    // Validate time format
    const formattedTime = moment(bookingTime, "hh:mm").format("hh:mma");
    if (!moment(formattedTime, "hh:mma", true).isValid()) {
      return res.status(400).json({ error: "Invalid time format. Use HH:MMa (e.g., 09:30AM)" });
    }

    // Check if user and service exist
    if (serviceType === SERVICE_TYPE.NAILS) {
        service = await Nail.findById(serviceId);
    } else if (serviceType === SERVICE_TYPE.MAKEUP) {
        service = await Makeup.findById(serviceId);
    } else {
        return res.json(failure("Invalid service type"));
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    if (!service) {
      return res.json(failure("service not found" ));
    }

    // Create a new booking
    const booking = new Booking({
      userId,
      serviceId,
      serviceType,
      bookingDate:formattedDate,
      bookingTime: formattedTime,
      appointmentPlace: appointmentPlace ? appointmentPlace : "Studio",
    });

    const subject = "Booking Confirmation - Beauty Aesthetics";
    const textContent = emailTemplate.createBookingEmailTemplate(user.fullname,service.title,serviceType,formattedDate,formattedTime,appointmentPlace)
    sendEmail(user.email, user.fullname, subject, textContent);
    
  // Schedule reminder email 30 minutes before the appointment
    scheduleReminderEmail(
      user,
      service,
      serviceType,
      formattedDate,
      formattedTime,
      appointmentPlace
    );

    await booking.save();
    res.json(success("Booking Created Successfully", booking ));
  } catch (error) {
    console.log(error);
    
    res.json(failure(error.message ));
  }
};


// Helper: Schedule Reminder Email
function scheduleReminderEmail(user, service, serviceType, bookingDate, bookingTime, appointmentPlace) {
  // Calculate appointment and reminder times
  const appointmentMoment = moment(`${bookingDate} ${bookingTime}`, 'YYYY-MM-DD hh:mma');
  const reminderMoment = appointmentMoment.clone().subtract(2, 'minutes');
  const now = moment();

  const msUntilReminder = reminderMoment.diff(now);

  if (msUntilReminder <= 0) {
    // Appointment is less than 30 minutes away or in the past; skip reminder
    return;
  }

  setTimeout(() => {
    const subject = "Upcoming Appointment Reminder - Beauty Aesthetics";
    const textContent = emailTemplate.bookingReminderEmailTemplate(
      user.fullname,
      service.title,
      serviceType,
      bookingDate,
      bookingTime,
      appointmentPlace
    );
    sendEmail(user.email, user.fullname, subject, textContent);
  }, msUntilReminder);
}


// Get All Bookings
module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "fullname email phone") // Get user details
      .populate("serviceId", "title price"); // Get service details

    res.json(success("Booking fetched",bookings));
  } catch (error) {
    res.json(failure(error.message ));
  }
};

// Get All Makeup Bookings
module.exports.getAllMakeupBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ serviceType: SERVICE_TYPE.MAKEUP })
      .populate("userId", "fullname email phone") // Get user details
      .populate("serviceId", "title price"); // Get service details

    res.json(success("All Makeup Booking fetched",bookings));
  } catch (error) {
    res.json(failure(error.message ));
  }
};


// Get All Nails Bookings
module.exports.getAllNailsBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ serviceType: SERVICE_TYPE.NAILS })
      .populate("userId", "fullname email phone") // Get user details
      .populate("serviceId", "title price"); // Get service details

    res.json(success("All Nails Booking fetched",bookings));
  } catch (error) {
    res.json(failure(error.message ));
  }
};

// update booking status
module.exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.json(failure("Booking not found"));
    }
    booking.status = status;
    await booking.save();
    res.json(success("Booking status updated successfully",booking));
  }
  catch (error) {
    res.json(failure(error.message ));
  }
}


// Get All Bookings by User
module.exports.getAllBookingsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId })
      .populate("serviceId", "title price image"); // Get service details

    res.json(success("All Booking fetched",bookings));
  } catch (error) {
    res.json(failure(error.message ));
  }
};

module.exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;

    // Find the booking by ID and user ID
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, userId },
      { status: "Cancelled" },
      { new: true } // Return the updated booking
    );

    
    if (!booking) {
      return res.json(failure("Booking not found or you are not authorized to cancel this booking"));
    }
    res.json(success("Booking cancelled successfully", booking));
  } catch (error) {
    res.json(failure(error.message));
  }
};
