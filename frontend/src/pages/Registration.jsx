import React from 'react';
import { Link } from 'react-router-dom';
import {
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Registration = () => (
  <div className="registrationForm">
    <form>
      <Link to="/">
          <FontAwesomeIcon icon={faHome} className="home-icon" />
          <span className="tooltip-text">Go To Home</span>
    </Link>
      <p>Registration: Create User Account</p>
      <div id="registrationFormBody">
        <span className="nameLabel">
          <div className="input-group" id="registrationInputs">
          <label>Full Name</label>
            <input type="text" name="fullName" placeholder="Enter your Name" required />
          </div>
          <div className="input-group" id="registrationInputs">
          <label>User Name</label>
            <input type="text" name="userName" placeholder="Enter your User Name" required />
          </div>
        </span>
        <span className="contactLabel">
          <div className="input-group" id="registrationInputs">
          <label>Email</label>
            <input type="text" name="email" placeholder="Enter your Email" required />
          </div>
          <div className="input-group" id="registrationInputs">
          <label>Phone Number</label>
            <input type="text" name="phoneNumber" placeholder="Enter your Phone Number" required />
          </div>
        </span>
        <span className="passwordLabel">
          <div className="input-group" id="registrationInputs">
          <label>Password</label>
            <input type="text" name="password" placeholder="Enter your Password" required />
          </div>
          <div className="input-group" id="registrationInputs">
          <label>Confirm Password</label>
            <input type="text" name="confirmPassword" placeholder="Confirm your Password" required />
          </div>
        </span>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
);

export default Registration;
