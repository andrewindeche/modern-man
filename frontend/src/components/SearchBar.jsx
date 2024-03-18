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
      <FontAwesomeIcon icon={faShoppingCart} className="shopping" />
      <FontAwesomeIcon icon={faHeart} className="heart" />
      </div>
    </div>
    )
}

export default SearchBar ;