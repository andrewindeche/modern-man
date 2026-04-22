import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../store/productsSlice';

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const newProducts = products.slice(0, 4);

  if (loading) return null;

  return (
    <section className="new-arrivals-section">
      <h2 className="section-title">New Arrivals</h2>
      <p className="section-subtitle">Check out our latest collection</p>
      <div className="products-grid new-arrivals-grid">
        {newProducts.map((product) => (
          <Link to={`/searchpage?query=${product.name}`} key={product.id} className="product-card new-arrival-card">
            <div className="product-img-wrap">
              <img src={product.image} alt={product.name} />
              <span className="new-badge">NEW</span>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">KES {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;