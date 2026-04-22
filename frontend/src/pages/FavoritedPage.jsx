import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { fetchFavoritesThunk } from '../store/favoriteSlice';
import ModalContent from '../components/Modal';

const FavoritedPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    dispatch(fetchFavoritesThunk());
  }, [dispatch]);

  const { items = [], loading, error } = favorites;

  const handleItemClick = (item, event) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedItem(item);
  };

  const renderItems = (items) => (
    <div className="products-grid">
      {items.map((item) => (
        <div key={item.id} className="product-card" onClick={(event) => handleItemClick(item, event)}>
          <div className="product-img-wrap">
            <img src={item.image} alt={item.name} />
            {item.discount_percentage > 0 && (
              <span className="product-badge">-{item.discount_percentage}%</span>
            )}
          </div>
          <div className="product-info">
            <h3>{item.name}</h3>
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`star ${i < item.average_rating ? 'active' : ''}`}
                />
              ))}
            </div>
            <p className="product-price">
              KES {item.discounted_price || item.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="favorites-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Continue Shopping</span>
        </Link>
      </div>
      
      <h1 className="page-title">My Favorites</h1>
      
      <div className="favorites-content">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : items.length === 0 ? (
          <div className="empty-favorites">
            <FontAwesomeIcon icon={faHeart} className="empty-icon" />
            <h2>No favorites yet</h2>
            <p>Start adding items to your favorites!</p>
            <Link to="/" className="browse-btn">Browse Products</Link>
          </div>
        ) : (
          renderItems(items)
        )}
      </div>
      
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <ModalContent item={selectedItem} onClose={() => setSelectedItem(null)} position={modalPosition} />
        </div>
      )}
    </div>
  );
};

export default FavoritedPage;