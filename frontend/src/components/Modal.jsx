import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart, faStar, faWindowClose, faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

// eslint-disable-next-line react/prop-types
const ModalContent = ({ item, onClose }) => {
  const dispatch = useDispatch();

  if (!item) return null;

  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    name, image, price, description, average_rating,
  } = item;
  const handleAddToCart = () => {
    addToCart(item);
  };
  return (
    <div className="Modal">
      <div className="modalheader">
        <h2>{ name }</h2>
        <div className="modalicons">
          <FontAwesomeIcon icon={faShoppingCart} className="shoppingcarticon" size="1x" onClick={handleAddToCart} />
          <span className="tooltip-text-modal">Checkout</span>
          <FontAwesomeIcon icon={faHeart} className="favorite" size="1x" />
          <span className="tooltip-text-modal">Like</span>
          <FontAwesomeIcon icon={faWindowClose} className="windowclose" size="1x" onClick={onClose} />
          <span className="tooltip-text-modal">Close Window</span>
        </div>
      </div>
      <div className="modalbody">
        <img src={image} id="posterImage" alt={name} />
        <div>
          <div className="productdescription">
            <p className="title">
              Price:
              $
              {price}
            </p>
            <div className="topheaderstar">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  icon={faStar}
                  className={`star ${index < average_rating ? 'active' : ''}`}
                  size="2x"
                />
              ))}
            </div>
            <div id="descriptiontext">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

ModalContent.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};
export default ModalContent;
