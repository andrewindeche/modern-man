// Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginUser, resetError } from '../store/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/checkout');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => () => {
    dispatch(resetError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: formData.username, password: formData.password }))
      .unwrap()
      .catch((err) => {
        console.error('Login failed:', err);
      });
  };

  return (
    <div className="loginForm">
      <Link to="/">
        <FontAwesomeIcon icon={faHome} className="home-icon" />
        <span className="tooltip-text">Go To Home</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <p>Login: Log into your Account</p>
        {error && <p className="error">{error}</p>}
        <div className="formBody">
          <div className="input-group">
            <label>Username</label>
            <input
              type="username"
              name="username"
              placeholder="Enter your Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
