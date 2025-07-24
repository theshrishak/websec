import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllBooking, getAllUser, updateBookingStatus, updateUserRole } from '../../api/Api';
import './AdminPage.css';

const statusColors = {
  Pending: 'badge badge-warning',
  Confirmed: 'badge badge-success',
  Cancelled: 'badge badge-danger',
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      if (response.data.success) setUsers(response.data.data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await getAllBooking();
      console.log(response.data.data);
      if (response.data.success) setBookings(response.data.data);
    } catch (error) {
      toast.error('Error fetching bookings');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm('Are you sure you want to change this user\'s role?')) return;
    try {
      const response = await updateUserRole(userId, newRole);
      if (response.data.success) {
        toast.success('User role updated!');
        fetchUsers();
      } else {
        toast.error('Failed to update user role.');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleBookingStatusChange = async (bookingId, newStatus) => {
    if (!window.confirm('Are you sure you want to update this booking status?')) return;
    try {
      const response = await updateBookingStatus(bookingId, newStatus);
      if (response.data.success) {
        toast.success('Booking status updated!');
        fetchBookings();
      } else {
        toast.error('Failed to update booking status.');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* User Management */}
      <section className="admin-section">
        <h2><i className="fas fa-users"></i> User Management</h2>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <span className="avatar">{user.fullname.charAt(0)}</span>
                      {user.fullname}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>{user.role}</span>
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleRoleChange(user._id, user.role === 'user' ? 'admin' : 'user')}
                    >
                      {user.role === 'user' ? 'Promote to Admin' : 'Demote to User'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Booking Management */}
      <section className="admin-section">
        <h2><i className="fas fa-calendar-alt"></i> Booking Management</h2>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.serviceId.title}</td>
                  <td>{booking.userId.fullname}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.bookingTime}</td>
                  <td>
                    <span className={statusColors[booking.status] || 'badge'}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      {booking.status === 'Cancelled' && (
                        <button
                          className="action-btn"
                          onClick={() => handleBookingStatusChange(booking._id, 'Pending')}
                        >
                          Mark as Pending
                        </button>
                      )}
                      {booking.status === 'Pending' && (
                        <>
                          <button
                            className="action-btn danger"
                            onClick={() => handleBookingStatusChange(booking._id, 'Cancelled')}
                          >
                            Cancel
                          </button>
                          <button
                            className="action-btn success"
                            onClick={() => handleBookingStatusChange(booking._id, 'Confirmed')}
                          >
                            Confirm
                          </button>
                        </>
                      )}
                      {booking.status === 'Confirmed' && (
                        <button
                          className="action-btn danger"
                          onClick={() => handleBookingStatusChange(booking._id, 'Cancelled')}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
