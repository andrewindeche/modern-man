import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faUser,faHeart,faShoppingCart} from '@fortawesome/free-solid-svg-icons'; 
const SearchBar  = () => {
    return(
    <div className="searchbar">
        <h3>Modern Man</h3>
      <form className="search-form">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for Men's Wear and Accessories"
          className="search-input"
        />
      </form>
      <div className="user-icons">
      <FontAwesomeIcon icon={faUser} className="user" />
      <span className="tooltip-text">User Profile</span>
      <FontAwesomeIcon icon={faShoppingCart} className="shoppingcarticon" />
      <span className="tooltip-text">Checkout</span>
      <FontAwesomeIcon icon={faHeart} className="favorite" />
      <span className="tooltip-text">Favorite</span>
      </div>
    </div>
    )
}

export default SearchBar ;