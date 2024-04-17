import React from 'react';
const Login = () => {
    return(
        <div className="loginForm">
             <form>
            <p>Login: Log into your Account</p>
                <span className="nameLabel">
                    <div className="input-group">
                        <label>Email or Phone</label>
                        <input type="text" name="fullName" placeholder="Enter your Email or Phone" required />
                    </div>
                </span>
                <span className="contactLabel">
                    <div className="input-group">
                        <label>Password</label>
                        <input type="text" name="email" placeholder="Enter your Password" required />
                    </div>
                </span>
                <span className="contactLabel">
                    <div className="input-group">
                        <label>Forgot Password?<a className="signupnow">Reset Password</a></label>
                    </div>
                    <div className="input-group">
                        <label>Not a member?<a className="signupnow">Sign Up Now</a></label>
                    </div>
                </span>
                    <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;