import React from 'react';
import { Link } from 'react-router-dom';
import suitsImage from '../images/suits.webp';
import shirtsImage from '../images/shirts.webp';
import neckwearImage from '../images/neckwear.webp';
import shoes from '../images/shoes1.webp';

const NavButtons = () => (
  <nav className="category-nav">
    <div className="category-grid">
      <Link to="/searchpage?category=suits" className="category-card">
        <div className="category-image" style={{ backgroundImage: `url(${suitsImage})` }} />
        <div className="category-overlay">
          <span className="category-name">Suits</span>
        </div>
      </Link>
      <Link to="/searchpage?category=shirts" className="category-card">
        <div className="category-image" style={{ backgroundImage: `url(${shirtsImage})` }} />
        <div className="category-overlay">
          <span className="category-name">Shirts</span>
        </div>
      </Link>
      <Link to="/searchpage?category=neckwear" className="category-card">
        <div className="category-image" style={{ backgroundImage: `url(${neckwearImage})` }} />
        <div className="category-overlay">
          <span className="category-name">Accessories</span>
        </div>
      </Link>
      <Link to="/searchpage?category=shoes" className="category-card">
        <div className="category-image" style={{ backgroundImage: `url(${shoes})` }} />
        <div className="category-overlay">
          <span className="category-name">Shoes</span>
        </div>
      </Link>
    </div>
  </nav>
);

export default NavButtons;