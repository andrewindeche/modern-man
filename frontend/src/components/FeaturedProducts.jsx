import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../store/productsSlice';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const featuredProducts = products.slice(0, 8);

  if (loading) return null;

  return (
    <section className="featured-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="products-grid">
        {featuredProducts.map((product) => (
          <Link to={`/searchpage?query=${product.name}`} key={product.id} className="product-card">
            <div className="product-img-wrap">
              <img src={product.image} alt={product.name} />
              {product.discount_percentage > 0 && (
                <span className="product-badge">-{product.discount_percentage}%</span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`star ${i < product.average_rating ? 'active' : ''}`}
                  />
                ))}
                <span>({product.reviews_count || 0})</span>
              </div>
              <p className="product-price">
                KES {product.discounted_price || product.price}
                {product.discounted_price && (
                  <span className="original-price">KES {product.price}</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="section-cta">
        <Link to="/searchpage" className="view-all-btn">View All Products</Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;