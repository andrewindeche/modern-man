import suitsImage from '../images/suits.webp'; 
import shirtsImage from '../images/shirts.webp';
import neckwearImage from '../images/neckwear.webp';
import shoes from '../images/shoes1.webp';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/productsSlice';

const NavButtons = () => {
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    dispatch(fetchProducts(category));
  };
  
  return (
      <div className="categories">
        <Link to= "/searchpage">
          <button onClick={() => handleCategoryClick('suits')} className="suits-image" style={{ backgroundImage: `url(${suitsImage})` }}>Suits</button>
          </Link>
        <Link to="/searchpage">
          <button onClick={() => handleCategoryClick('shirts')} className="shirts-image" style={{ backgroundImage: `url(${shirtsImage})` }}>Shirts</button>
          </Link>
        <Link to="/searchpage">
          <button onClick={() => handleCategoryClick('neckwear')} className="neck-wear" style={{ backgroundImage: `url(${neckwearImage})` }}>Neck wear & Accessories</button>
          </Link>
        <Link to="/searchpage">
          <button onClick={() => handleCategoryClick('shoes')} className="shoes-image" style={{ backgroundImage: `url(${shoes})` }}>Shoes</button>
          </Link>
      </div>
  );
};
export default NavButtons;
