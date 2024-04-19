import React from 'react';
const Registration = () => {
    return(
        <div className="registrationForm">
            <form>
            <p>Registration: Create User Account</p>
                <span className="nameLabel">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" name="fullName" placeholder="Enter your Name" required />
                    </div>
                    <div className="input-group">
                        <label>User Name</label>
                        <input type="text" name="userName" placeholder="Enter your User Name" required />
                    </div>
                </span>
                <span className="contactLabel">
                    <div className="input-group">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Enter your Email" required />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="text" name="phoneNumber" placeholder="Enter your Phone Number" required />
                    </div>
                </span>
                <span className="passwordLabel">
                    <div className="input-group">
                        <label>Password</label>
                        <input type="text" name="password" placeholder="Enter your Password" required />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input type="text" name="confirmPassword" placeholder="Confirm your Password" required />
                    </div>
                </span>
                    <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Registration;
