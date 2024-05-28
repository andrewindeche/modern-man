import React from 'react';

const Forgot = () => (
  <div className="forgotPasswordForm">
    <form>
      <p>Forgot Password? Generate New password</p>
      <span className="nameLabel">
        <div className="input-group">
          <label htmlFor="fullName">Enter Your Name</label>
          <input type="text" id="fullName" name="fullName" placeholder="Enter your Name" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Enter Your Password</label>
          <input type="password" id="password" name="password" placeholder="Enter New Password" required />
        </div>
      </span>
      <button type="submit">Reset Password</button>
    </form>
  </div>
);
export default Forgot;
