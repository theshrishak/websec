import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBooking, getAllNailByIdApi, getMakeupByIdApi } from '../../api/Api';
import './Book.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/Api';

const Book = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [serviceType, setServiceType] = useState("");
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    bookingDate: '',
    bookingTime: '',
    serviceType: serviceType,
    serviceId: id,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Update formData with user details
      setFormData((prevFormData) => ({
        ...prevFormData,
        fullName: parsedUser.fullname || '',
        email: parsedUser.email || '',
        contactNumber: parsedUser.phone || '',
      }));
    }

    fetchServiceById(id);
  }, [id]);

  const fetchServiceById = async (serviceId) => {
    try {
      const responseMakeup = await getMakeupByIdApi(serviceId);
      const responseNail = await getAllNailByIdApi(serviceId);

      if (responseMakeup.data.success) {
        setService(responseMakeup.data.data);
        setServiceType("Makeup");
      } else if (responseNail.data.success) {
        setService(responseNail.data.data);
        setServiceType("Nail");
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent past dates for bookingDate
    if (name === "bookingDate") {
      const today = new Date().toISOString().split("T")[0];
      if (value < today) {
        toast.error("Booking date cannot be in the past.");
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        serviceId: service._id,
        serviceType: serviceType,
        bookingDate: formData.bookingDate,
        bookingTime: formData.bookingTime,
      }
      const response = await createBooking(data);
      if (response.data.success) {
        toast.success('Booking confirmed! See you soon!');
        navigate("/makeup")
      } else {
        toast.error('Something went wrong, please try again.');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEsewaPayment = () => {

    api.get('/api/khalti') // Sets the cookie
      .then((res) => {
        window.location.href = res.data.payment_url;
      })
      .catch(err => alert('Khatli init failed'));
  };

  return (
    <div className="book-container">
      <div className="form-wrapper">
        <div className="service-details">
          <h2>Service Details</h2>
          <p>Service Name: <strong><i>{service.title}</i></strong></p>
          <p>Service Price: Nrs.{service.price}</p>
        </div>
        <div className="form-container">
          <h2>Book Your Appointment</h2>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                disabled // Disable field
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled // Disable field
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                disabled // Disable field
                placeholder="Enter your contact number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookingDate">Booking Date</label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookingTime">Booking Time</label>
              <input
                type="time"
                id="bookingTime"
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Book Now</button>
          </form>
        </div>
        <div className="payment-container">
          <h3>Payment Options</h3>
          <button className="esewa-button" onClick={handleEsewaPayment}>
            Pay with Khalti
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
