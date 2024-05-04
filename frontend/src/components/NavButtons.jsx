import suitsImage from '../images/suits.webp'; 
import shirtsImage from '../images/shirts.webp';
import neckwearImage from '../images/neckwear.webp';
import shoes from '../images/shoes1.webp';

const NavButtons = () => (
  <div className="categories">
    <button className="suits-image" style={{ backgroundImage: `url(${suitsImage})` }}>Suits</button>
    <button className="shirts-image" style={{ backgroundImage: `url(${shirtsImage})` }}>Shirts</button>
    <button className="neck-wear" style={{ backgroundImage: `url(${neckwearImage})` }}>Neck wear & Accessories</button>
    <button className="shoes-image" style={{ backgroundImage: `url(${shoes})` }}>Shoes</button>
  </div>
);

export default NavButtons;
