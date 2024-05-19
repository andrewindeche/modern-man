import { Link } from 'react-router-dom';
import shoes from '../images/shoes.webp';

const NotificationBar = () => {
    return (
        <div className="notificationbar">
            <img src={shoes} alt="My Shoes" className='shoes' />
            <p>Get 50% off Selected Shoes</p>
            <Link to="/searchpage?discounted=true">
                <button id="notificationbutton">Learn More</button>
            </Link>
        </div>
    );
}

export default NotificationBar;
