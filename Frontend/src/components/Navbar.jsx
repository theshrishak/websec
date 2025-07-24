import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const usr = JSON.parse(userData);
      setUser(usr);
    }
  }, [navigate]);

  return (
    <nav className="navbar navbar-expand-lg" style={{ padding: "20px" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/assets/images/mylogo.png"
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          The Beauty Aesthetics
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/makeup">
                Makeup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nails">
                Nails
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {user != null ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i> Welcome, {user.fullname.split(" ")[0].toUpperCase()}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user"></i> Profile
                    </Link>
                  </li>
                  {user.role === "admin" && (
                    <li>
                    <Link className="dropdown-item" to="/admin/dashboard">
                      <i className="fas fa-cog"></i> Admin Settings
                    </Link>
                  </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn btn-outline-danger me-2"
                  type="button"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-success"
                  type="button"
                >
                  Login
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
