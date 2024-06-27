import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginUser, verifyCode, resetError } from '../store/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', code: '' });
  const [isVerifying, setIsVerifying] = useState(false);
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
    if (isVerifying) {
      dispatch(verifyCode({ email: formData.email, code: formData.code }));
    } else {
      dispatch(loginUser({ email: formData.email, password: formData.password }))
        .unwrap()
        .then(() => {
          setIsVerifying(true);
        })
        .catch((err) => {
          console.error('Login failed:', err);
        });
    }
  };

  return (
    <div className="loginForm">
      <Link to="/checkout">
        <FontAwesomeIcon icon={faHome} className="home-icon" />
        <span className="tooltip-text">Go To Home</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <p>{isVerifying ? 'Verification: Enter Code' : 'Login: Log into your Account'}</p>
        {error && <p className="error">{error}</p>}
        <div className="formBody">
          {!isVerifying ? (
            <div className="input-group">
              <label>Email</label>
              <input type="text" name="fullName" placeholder="Enter your Email" required onChange={handleChange} />
            </div>
          ) : (
            <div className="input-group">
              <label>Verification Code</label>
              <input
                type="text"
                name="code"
                placeholder="Enter your Verification Code"
                required
                onChange={handleChange}
              />
            </div>
          )}
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
            {!isVerifying && (
              <label>
                Not a member?
                <Link to="/registration">
                  <div className="signupnow">Sign Up Now</div>
                </Link>
              </label>
            )}
            <label>
              Not a member?
              <Link to="/registration">
                <div className="signupnow">Sign Up Now</div>
              </Link>
            </label>
          </div>
          <button type="submit" disabled={loading}>{isVerifying ? 'Verify' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
