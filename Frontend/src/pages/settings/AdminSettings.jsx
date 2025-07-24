import React, { useState } from 'react';
import './AdminSettings.css';

const AdminSettings = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Makeup', status: 'Active' },
    { id: 2, name: 'Nails', status: 'Inactive' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active' },
    { id: 2, name: 'John Smith', email: 'john.smith@example.com', status: 'Blocked' },
  ]);

  const [blockedTimes, setBlockedTimes] = useState([]);

  const handleServiceUpdate = (id, newStatus) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, status: newStatus } : service
      )
    );
  };

  const handleUserUpdate = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleUserDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleBlockTime = (date, time) => {
    setBlockedTimes((prevBlockedTimes) => [
      ...prevBlockedTimes,
      { date, time },
    ]);
  };

  const handleUnblockTime = (date, time) => {
    setBlockedTimes((prevBlockedTimes) =>
      prevBlockedTimes.filter(
        (blockedTime) => blockedTime.date !== date || blockedTime.time !== time
      )
    );
  };

  return (
    <div className="admin-settings-container">
      <h1>Admin Settings</h1>

      {/* User Management Section */}
      <div className="section">
        <h2>User Management</h2>
        <table className="settings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  {user.status !== 'Blocked' && (
                    <button
                      onClick={() => handleUserUpdate(user.id, 'Blocked')}
                      className="block-btn"
                    >
                      Block User
                    </button>
                  )}
                  {user.status === 'Blocked' && (
                    <button
                      onClick={() => handleUserUpdate(user.id, 'Active')}
                      className="unblock-btn"
                    >
                      Unblock User
                    </button>
                  )}
                  <button
                    onClick={() => handleUserDelete(user.id)}
                    className="delete-btn"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service Management Section */}
      <div className="section">
        <h2>Service Management</h2>
        <table className="settings-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.status}</td>
                <td>
                  {service.status === 'Active' && (
                    <button
                      onClick={() => handleServiceUpdate(service.id, 'Inactive')}
                      className="deactivate-btn"
                    >
                      Deactivate
                    </button>
                  )}
                  {service.status === 'Inactive' && (
                    <button
                      onClick={() => handleServiceUpdate(service.id, 'Active')}
                      className="activate-btn"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Block Timings Section */}
      <div className="section">
        <h2>Block Timings</h2>
        <div className="block-time-form">
          <label>Date:</label>
          <input type="date" id="date-input" />
          <label>Time:</label>
          <input type="time" id="time-input" />
          <button
            onClick={() => {
              const date = document.getElementById('date-input').value;
              const time = document.getElementById('time-input').value;
              if (date && time) handleBlockTime(date, time);
            }}
            className="block-btn"
          >
            Block Time
          </button>
        </div>
        <h3>Blocked Timings</h3>
        <ul className="blocked-times-list">
          {blockedTimes.map((blockedTime, index) => (
            <li key={index}>
              {blockedTime.date} - {blockedTime.time}
              <button
                onClick={() =>
                  handleUnblockTime(blockedTime.date, blockedTime.time)
                }
                className="unblock-btn"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSettings;
