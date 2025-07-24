import React, { useState } from 'react';
import { loginUserApi } from '../../api/Api'; // Ensure you have this function in your API file
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Use the same CSS file for simplicity

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginImage = `${process.env.PUBLIC_URL}/assets/images/mylogo.png`;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const data = {
        email,
        password
      };
      loginUserApi(data).then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Clear form fields after successful login
          setEmail('');
          setPassword('');
          localStorage.setItem("user_id", res.data.data._id);
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate("/"); // Redirect to home page
        } else {
          toast.error(res.data.message);
        }
      });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="container">
      <div className="login-form-container">
        <img src={loginImage} alt="Login" className="login-image" />
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email Address"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
