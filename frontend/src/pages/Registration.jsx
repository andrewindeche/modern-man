import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerUser, resetError } from '../store/userSlice';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match');
      return;
    }
    dispatch(registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }))
      .unwrap()
      .then(() => {
        if (!loading && !error) {
          alert('Registration successful.');
          navigate('/login');
        }
      })
      .catch((err) => {
        console.error('Registration failed:', err);
      });
  };

  return (
    <div className="registrationForm">
      <form method="post" action="/api/register/" onSubmit={handleSubmit}>
        <Link to="/checkout">
          <FontAwesomeIcon icon={faHome} className="home-icon" />
          <span className="tooltip-text">Go To Home</span>
        </Link>
        <p>Registration: Create User Account</p>
        {error && <p className="error">{error}</p>}
        <div id="registrationFormBody">
          <div className="input-group" id="registrationInputs">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter your Username" required onChange={handleChange} />
          </div>
          <div className="input-group" id="registrationInputs">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your Email" required onChange={handleChange} />
          </div>
          <div className="input-group" id="registrationInputs">
            <label>Password</label>
            <div className="password-container">
              <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Enter your Password" required onChange={handleChange} />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="password-toggle-icon"
              />
            </div>
          </div>
          <div className="input-group" id="registrationInputs">
            <label>Confirm Password</label>
            <div className="password-container">
              <input type={confirmPasswordVisible ? 'text' : 'password'} name="confirm_password" placeholder="Confirm your Password" required onChange={handleChange} />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="password-toggle-icon"
              />
            </div>
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
