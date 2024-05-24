import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faWindowClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import Preview3 from '../images/white shirt.webp';
import Preview5 from '../images/tuxedo trouser.webp';

const ModalContent = ({ item, onClose, position = { top: 0, left: 0 } }) => {
      if (!item) return null;

      const { name, image, price, description, rating } = item;
      const modalStyle = {
        top: position.top,
        left: position.left,
      };
  return (
    <>
      <div className="Modal">
        <div className="modalheader">
          <h2>{ name }</h2>
          <div className="topheaderstar">
            {[...Array(rating)].map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} className="star" size="2x" />
            ))}
          </div>
        </div>
        <div className="modalbody">
          <img src={image}id="posterImage" alt={name} />
          <div>
            <div className="productdescription">
              <p className="title">Price: {price}</p>
              {description}
            </div>
            <div className="modalicons">
              <FontAwesomeIcon icon={faShoppingCart} className="shoppingcarticon" size="1x" />
              <span className="tooltip-text-modal">Checkout</span>
              <FontAwesomeIcon icon={faHeart} className="favorite" size="1x" />
              <span className="tooltip-text-modal">Like</span>
              <FontAwesomeIcon icon={faWindowClose} className="windowclose" size="1x" onClick={onClose} />
              <span className="tooltip-text-modal">Close Window</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalContent;
