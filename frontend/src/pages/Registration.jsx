import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerUser, resetError } from '../store/userSlice';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => () => {
    dispatch(resetError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(registerUser(formData)).then(() => {
      if (!loading && !error) {
        alert('Registration successful. A verification code has been sent to your email.');
        navigate('/login');
      }
    });
  };
  return (
    <div className="registrationForm">
      <form onSubmit={handleSubmit}>
        <Link to="/checkout">
          <FontAwesomeIcon icon={faHome} className="home-icon" />
          <span className="tooltip-text">Go To Home</span>
        </Link>
        <p>Registration: Create User Account</p>
        {error && <p className="error">{error}</p>}
        <div id="registrationFormBody">
          <span className="nameLabel">
            <div className="input-group" id="registrationInputs">
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder="Enter your Name" required onChange={handleChange} />
            </div>
            <div className="input-group" id="registrationInputs">
              <label>User Name</label>
              <input type="text" name="userName" placeholder="Enter your User Name" required onChange={handleChange} />
            </div>
          </span>
          <span className="contactLabel">
            <div className="input-group" id="registrationInputs">
              <label>Email</label>
              <input type="text" name="email" placeholder="Enter your Email" required onChange={handleChange} />
            </div>
            <div className="input-group" id="registrationInputs">
              <label>Phone Number</label>
              <input type="text" name="phoneNumber" placeholder="Enter your Phone Number" required onChange={handleChange} />
            </div>
          </span>
          <span className="passwordLabel">
            <div className="input-group" id="registrationInputs">
              <label>Password</label>
              <input type="text" name="password" placeholder="Enter your Password" required onChange={handleChange} />
            </div>
            <div className="input-group" id="registrationInputs">
              <label>Confirm Password</label>
              <input type="text" name="confirmPassword" placeholder="Confirm your Password" required onChange={handleChange} />
            </div>
          </span>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
);
}
export default Registration;
