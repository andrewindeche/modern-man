import React from 'react';
import { Link } from 'react-router-dom';
import {
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Forgot = () => (
  <div className="forgotPasswordForm">
    <Link to="/">
      <FontAwesomeIcon icon={faHome} className="home-icon" />
      <span className="tooltip-text">Go To Home</span>
    </Link>
    <form>
      <p>Forgot Password? Generate New password</p>
      <span className="nameLabel">
        <div className="input-group" id="forgot-input">
          <label htmlFor="fullName">Enter Your Name</label>
          <input type="text" id="fullName" name="fullName" placeholder="Enter your Name" required />
          <label htmlFor="password">Enter Your Password</label>
          <input type="password" id="password" name="password" placeholder="Enter New Password" required />
        </div>
      </span>
      <button id="forgotButton" type="submit">Reset Password</button>
    </form>
  </div>
);
export default Forgot;
