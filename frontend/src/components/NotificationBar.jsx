import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscountedProducts } from '../store/discountsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faTimes } from '@fortawesome/free-solid-svg-icons';

const NotificationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: discountedProducts, loading, error } = useSelector((state) => state.discount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

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

  if (dismissed || (!loading && !error && discountedProducts.length === 0)) {
    return null;
  }

  return (
    <div className="promo-banner">
      {!loading && !error && discountedProducts.length > 0 && (
        <>
          <span className="promo-icon">
            <FontAwesomeIcon icon={faTag} />
          </span>
          <span className="promo-text">
            Get <strong>{discountedProducts[currentIndex].discount_percentage}% off</strong> on {discountedProducts[currentIndex].name}
          </span>
          <button type="button" className="promo-btn" onClick={handleLearnMoreClick}>
            Shop Now
          </button>
          <button type="button" className="promo-close" onClick={() => setDismissed(true)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      )}
    </div>
  );
};

export default NotificationBar;