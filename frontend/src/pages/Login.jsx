import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
  <div className="loginForm">
    <form>
      <p>Login: Log into your Account</p>
      <div className="formBody">
        <div className="input-group">
          <label>Email or Phone</label>
          <input type="text" name="fullName" placeholder="Enter your Email or Phone" required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input className="password" type="text" name="email" placeholder="Enter your Password" required />
        </div>

        <div id="sign-link">
          <label>
            Forgot Password?
            <Link to="/forgot">
              <div className="signupnow">Reset Password</div>
            </Link>
          </label>
          <label>
            Not a member?
            <Link to="/registration">
              <div className="signupnow">Sign Up Now</div>
            </Link>
          </label>
        </div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
);
export default Login;
