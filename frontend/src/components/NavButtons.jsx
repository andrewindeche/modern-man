import React from 'react';
import suitsImage from '../images/suits.jpg'; 
import shirtsImage from '../images/shirts.jpg';
import neckwearImage from '../images/neckwear.jpg';
import shoes from '../images/shoes1.jpg'

const NavButtons = () => (
  <div className="categories">
    <button className="suits-image" style={{ backgroundImage: `url(${suitsImage})` }}>Suits</button>
    <button className="shirts-image" style={{ backgroundImage: `url(${shirtsImage})` }}>Shirts</button>
    <button className="neck-wear" style={{ backgroundImage: `url(${neckwearImage})` }}>Neck wear & Accessories</button>
    <button className="shoes-image" style={{ backgroundImage: `url(${shoes})` }}>Shoes</button>
  </div>
);

export default NavButtons;
