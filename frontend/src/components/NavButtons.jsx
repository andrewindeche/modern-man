import React from 'react';
import { Link } from 'react-router-dom';
import suitsImage from '../images/suits.webp';
import shirtsImage from '../images/shirts.webp';
import neckwearImage from '../images/neckwear.webp';
import shoes from '../images/shoes1.webp';

const NavButtons = () => (
  <nav className="category-nav">
    <div className="category-grid">
      <Link to="/searchpage?category=suits" className="category-card" style={{ backgroundImage: `url(${suitsImage})` }}>
        <span className="category-name">Suits</span>
      </Link>
      <Link to="/searchpage?category=shirts" className="category-card" style={{ backgroundImage: `url(${shirtsImage})` }}>
        <span className="category-name">Shirts</span>
      </Link>
      <Link to="/searchpage?category=neckwear" className="category-card" style={{ backgroundImage: `url(${neckwearImage})` }}>
        <span className="category-name">Accessories</span>
      </Link>
      <Link to="/searchpage?category=shoes" className="category-card" style={{ backgroundImage: `url(${shoes})` }}>
        <span className="category-name">Shoes</span>
      </Link>
    </div>
  </nav>
);

export default NavButtons;