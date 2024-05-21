import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscountedProducts } from '../store/discountsSlice';
import { css, keyframes } from '@emotion/react';
import shoes from '../images/shoes.webp';

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const NotificationBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: discountedProducts, loading, error } = useSelector(state => state.discount);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchDiscountedProducts());
    }, [dispatch]);

    useEffect(() => {
        if (discountedProducts.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % discountedProducts.length);
            }, 5000); 
            return () => clearInterval(interval);
        }
    }, [discountedProducts]);

    const handleLearnMoreClick = () => {
        navigate('/searchpage?discounted=true');
    };

    return (
        <div className="notificationbar">
            <img src={shoes} alt="My Shoes" className='shoes' />
            <p>Get 50% off Selected Shoes</p>
            <button id="notificationbutton" onClick={handleLearnMoreClick}>Learn More</button>
        </div>
    );
}

export default NotificationBar;