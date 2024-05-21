import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscountedProduct } from '../store/discountsSlice';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';


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
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : discountedProducts.length > 0 ?  (
                <div
                css={css`
                    animation: ${fadeInOut} 5s linear infinite;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                `}>  
                <img src={highestDiscountProduct.image} alt={highestDiscountProduct.name} className='shoes' />
                    <p>Get {discountedProducts[currentIndex].discount_percentage}% off on {discountedProducts[currentIndex].name}</p>
                    <button id="notificationbutton" onClick={handleLearnMoreClick}>Learn More</button>
                </div>
            ) : (
                <p>No discount available</p>
            )}
        </div>
    );
}


export default NotificationBar;
