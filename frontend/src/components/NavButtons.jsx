import { Link } from 'react-router-dom';
import suitsImage from '../images/suits.webp';
import shirtsImage from '../images/shirts.webp';
import neckwearImage from '../images/neckwear.webp';
import shoes from '../images/shoes1.webp';

const NavButtons = () => {
  return (
    <div className="categories">
      <Link to="/searchpage?category=suits">
        <button className="suits-image" style={{ backgroundImage: `url(${suitsImage})` }}>Suits</button>
      </Link>
      <Link to="/searchpage?category=shirts">
        <button className="shirts-image" style={{ backgroundImage: `url(${shirtsImage})` }}>Shirts</button>
      </Link>
      <Link to="/searchpage?category=neckwear">
        <button className="neck-wear" style={{ backgroundImage: `url(${neckwearImage})` }}>Neck wear & Accessories</button>
      </Link>
      <Link to="/searchpage?category=shoes">
        <button className="shoes-image" style={{ backgroundImage: `url(${shoes})` }}>Shoes</button>
      </Link>
    </div>
  );
};

export default NavButtons;
