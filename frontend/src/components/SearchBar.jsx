import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faHeart, faShoppingCart, faHome,
  faUser, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { updateQuery, searchProducts } from '../store/searchSlice';
import { fetchSuggestions, clearSuggestions } from '../store/suggestionsSlice';
import { fetchFavoriteCountThunk } from '../store/favoriteSlice';
import { logoutUser } from '../store/userSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suggestions = useSelector((state) => state.suggestions.suggestions) || [];
  const favoriteCount = useSelector((state) => state.favorites.count);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(fetchSuggestions(searchTerm));
      setShowDropdown(true);
    } else {
      dispatch(clearSuggestions());
      setShowDropdown(false);
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (isFavoriteClicked) {
      dispatch(fetchFavoriteCountThunk());
    }
  }, [isFavoriteClicked, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    if (searchTerm.trim() === '') {
      navigate(`/searchpage?query=${encodeURIComponent(searchTerm)}&error=empty`);
    } else {
      dispatch(updateQuery(searchTerm));
      dispatch(searchProducts(searchTerm))
        .unwrap()
        .then((result) => {
          if (result.length === 0) {
            navigate(`/searchpage?query=${encodeURIComponent(searchTerm)}&error=noresults`);
          } else {
            navigate(`/searchpage?query=${encodeURIComponent(searchTerm)}`);
          }
        })
        .catch(() => {
          navigate(`/searchpage?query=${encodeURIComponent(searchTerm)}&error=noresults`);
        });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowDropdown(false);
    navigate(`/searchpage?query=${encodeURIComponent(suggestion.name)}`);
  };

  const handleFavoriteClick = () => {
    setIsFavoriteClicked(true);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const sortedSuggestions = [...suggestions].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <header className="header">
      <div className="header-main">
        <div className="header-left">
          <Link to="/" className="logo">
            <span className="logo-text">Modern</span>
            <span className="logo-accent">Man</span>
          </Link>
        </div>

        <div className="header-center">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search suits, shirts, shoes..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)}
              />
            </div>
            {showDropdown && sortedSuggestions.length > 0 && (
              <ul className="suggestions">
                {sortedSuggestions.map((item) => (
                  <li key={item.id} className="suggestion-item" onClick={() => handleSuggestionClick(item)}>
                    <img src={item.image} alt={item.name} className="suggestion-image" />
                    <span className="suggestion-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        <div className="header-right">
          <Link to="/" className="nav-icon" title="Home">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          
          <Link to="/checkout" className="nav-icon cart-icon" title="Cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            {favoriteCount > 0 && <span className="cart-badge">{favoriteCount}</span>}
          </Link>
          
          <Link to="/favorite" className="nav-icon" title="Favorites" onClick={handleFavoriteClick}>
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          
          <div
            className="nav-icon user-icon"
            onMouseEnter={() => setShowUserDropdown(true)}
            onMouseLeave={() => setShowUserDropdown(false)}
          >
            <FontAwesomeIcon icon={faUser} />
            {showUserDropdown && (
              <div className="user-dropdown">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">My Profile</Link>
                    <button type="button" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <Link to="/login">Sign In</Link>
                )}
              </div>
            )}
          </div>

          <button 
            type="button" 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="mobile-nav">
          <Link to="/searchpage?category=suits" onClick={() => setMobileMenuOpen(false)}>Suits</Link>
          <Link to="/searchpage?category=shirts" onClick={() => setMobileMenuOpen(false)}>Shirts</Link>
          <Link to="/searchpage?category=neckwear" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
          <Link to="/searchpage?category=shoes" onClick={() => setMobileMenuOpen(false)}>Shoes</Link>
        </nav>
      )}
    </header>
  );
};

export default SearchBar;