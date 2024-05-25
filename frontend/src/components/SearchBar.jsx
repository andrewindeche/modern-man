import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faUser, faHeart, faShoppingCart,faHome
} from '@fortawesome/free-solid-svg-icons';
import { updateQuery, searchProducts } from '../store/searchSlice';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(updateQuery(searchTerm));
    dispatch(searchProducts(searchTerm));
    navigate(`/searchpage?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="searchbar">
      <h3>Modern Man</h3>
      <Link to="/">
      <FontAwesomeIcon icon={faHome} className="home-icon" />
      <span className="tooltip-text">Go To Home</span>
      </Link>
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
  );
};

export default SearchBar;
