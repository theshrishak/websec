import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllBooking, getUserDetails, updateUserDetails } from '../../api/Api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [role,setRole]  = useState(null);
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      contactNumber: '',
      address: '',
      gender: '',
    });

  useEffect(() => {
      // Retrieve user data from local storage
      
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role);
        setUser(parsedUser);


  
        // Update formData with user details
        setFormData((prevFormData) => ({
          ...prevFormData,
          fullName: parsedUser.fullname || '',
          email: parsedUser.email || '',
          contactNumber: parsedUser.phone || '',
          address: parsedUser.address || '',
          gender: parsedUser.gender || '',
        }));
      }
  
      fetchedAllUserBooking();
    }, []);

  const fetchedAllUserBooking = async () => {
    try {
      const response = await getAllBooking();
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails();
      
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setRole(response.data.data.role);
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };


  const handleEditDetails = (e) => {
    const { name, value } = e.target;
    setUser((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));


    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookingUpdate = (id, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = {
          fullname: userDetails.fullname,
          email: userDetails.email,
          phone: formData.contactNumber,
          gender: formData.gender,
          address: formData.address
        }  
        const response = await updateUserDetails(data);
        if (response.data.success === true) {
          const updatedUserData = fetchUserDetails();
          toast.success('Profiled Updated Successfully!');
          navigate("/profile")
        } else {
          toast.error('Something went wrong, please try again.');
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {/* User Details Section */}
      <div className="profile-section">
        <h2>User Details</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.fullName}
              disabled
              onChange={handleEditDetails}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              onChange={handleEditDetails}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.contactNumber}
              onChange={handleEditDetails}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleEditDetails}
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleEditDetails}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
      
      {/* User Bookings Section */}

      {role === 'user' && (
      <div className="bookings-section">
        <h2>Your Bookings</h2>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.serviceType}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.bookingTime}</td>
                <td>{booking.status}</td>
                {/* <td>
                  {booking.status === 'Pending' && (
                    <button
                      onClick={() => handleBookingUpdate(booking.id, 'Confirmed')}
                      className="confirm-btn"
                    >
                      Confirm
                    </button>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button
                      onClick={() => handleBookingUpdate(booking.id, 'Cancelled')}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default Profile;
