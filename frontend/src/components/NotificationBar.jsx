import React from 'react';
import shoes from '../images/shoes.jpg';
const NotificationBar  = () => {
    return(
        <div className="notificationbar">
            <img src={shoes} alt="My Shoes" className='shoes' />
            <p>Get 50% off Selected Shoes</p>
            <button>Learn More</button>
        </div>
    )
}

export default NotificationBar;