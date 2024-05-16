import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faUser,faHeart,faShoppingCart} from '@fortawesome/free-solid-svg-icons'; 
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuery } from '../store/searchSlice';
const SearchBar  = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(updateQuery(searchTerm));
  };

    return(
    <div className="searchbar">
        <h3>Modern Man</h3>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search for Men's Wear and Accessories"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
      <div className="user-icons">
      <FontAwesomeIcon icon={faUser} className="user" />
      <span className="tooltip-text">User Profile</span>
      <FontAwesomeIcon icon={faShoppingCart} className="shopping" />
      <span className="tooltip-text">Checkout</span>
      <FontAwesomeIcon icon={faHeart} className="heart" />
      <span className="tooltip-text">Favorite</span>
      </div>
    </div>
    )
}

export default SearchBar ;
