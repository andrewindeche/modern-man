import React from 'react';
const Forgot = () => {
    return (
        <div className="forgotPasswordForm">
            <form>
            <p>Forgot Password? Generate New password</p>
                <span className="nameLabel">
                    <div className="input-group">
                        <label>Enter Your Name</label>
                        <input type="text" name="fullName" placeholder="Enter your Name" required />
                    </div>
                    <div className="input-group">
                        <label>Enter Your Password</label>
                        <input type="text" name="fullName" placeholder="Enter New Password" required />
                    </div>
                </span>
                    <button type="submit">Reset Password</button>
            </form>
        </div>
    )
}
export default Forgot;