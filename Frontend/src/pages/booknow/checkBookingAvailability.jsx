// checkBookingAvailability.post('/api/check-availability', async (req, res) => {
//   const { bookingDate, bookingTime, serviceId } = req.body;

//   try {
//     const existingBooking = await Booking.findOne({
//       serviceId,
//       bookingDate,
//       bookingTime,
//     });

//     if (existingBooking) {
//       return res.json({ isAvailable: false });
//     }

//     res.json({ isAvailable: true });
//   } catch (error) {
//     res.status(500).json({ message: 'Error checking availability', error });
//   }
// });
// module.exports = checkBookingAvailability;