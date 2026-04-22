import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faTimes, faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { addFavorite, removeFavorite } from '../store/favoriteSlice';

const ModalContent = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.favorites.items);
  
  if (!item) return null;
  
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
  const isFavorite = favorites.some((fav) => fav.id === item.id);
  const quantity = cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0;
  
  const {
    id, name, image, price, discounted_price, description, average_rating, category, sizes, colors
  } = item;
  
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };
  
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ id }));
  };
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ id }));
    } else {
      dispatch(addFavorite(item));
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <div className="modal-content-grid">
          <div className="modal-image-section">
            <img src={image} alt={name} className="modal-product-image" />
          </div>
          
          <div className="modal-details-section">
            <h2 className="modal-product-name">{name}</h2>
            
            <div className="modal-rating">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={`star ${index < (average_rating || 0) ? 'active' : ''}`}
                />
              ))}
              <span className="rating-count">({average_rating || 0} ratings)</span>
            </div>
            
            <div className="modal-price">
              {discounted_price ? (
                <>
                  <span className="current-price">KES {discounted_price}</span>
                  <span className="original-price">KES {price}</span>
                  <span className="discount-badge">
                    {Math.round((1 - discounted_price / price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="current-price">KES {price}</span>
              )}
            </div>
            
            {category && (
              <p className="modal-category">Category: {category}</p>
            )}
            
            {description && (
              <div className="modal-description">
                <h4>Description</h4>
                <p>{description}</p>
              </div>
            )}
            
            {sizes && sizes.length > 0 && (
              <div className="modal-options">
                <h4>Size</h4>
                <div className="option-buttons">
                  {sizes.map((size) => (
                    <button key={size} type="button" className="option-btn">{size}</button>
                  ))}
                </div>
              </div>
            )}
            
            {colors && colors.length > 0 && (
              <div className="modal-options">
                <h4>Color</h4>
                <div className="option-buttons">
                  {colors.map((color) => (
                    <button key={color} type="button" className="option-btn">{color}</button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="modal-actions">
              <div className="quantity-selector">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleRemoveFromCart}
                  disabled={quantity === 0}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleAddToCart}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              
              <button
                type="button"
                className={`add-cart-btn ${isInCart ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              
              <button
                type="button"
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleToggleFavorite}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

ModalContent.defaultProps = {
  item: null,
};

export default ModalContent;