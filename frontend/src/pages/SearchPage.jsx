import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../store/productsSlice';
import { fetchDiscountedProducts } from '../store/discountsSlice';
import { searchProducts, updateQuery } from '../store/searchSlice';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import ModalContent from '../components/Modal';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const discount = useSelector((state) => state.discount);
  const search = useSelector((state) => state.search);
  const query = useQuery();
  const discounted = query.get('discounted') === 'true';
  const category = query.get('category') || '';
  const searchQuery = query.get('query') || '';
  const error = query.get('error');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (searchQuery) {
      dispatch(updateQuery(searchQuery));
      dispatch(searchProducts(searchQuery));
    } else if (discounted) {
      dispatch(fetchDiscountedProducts());
    } else {
      dispatch(fetchProducts({ category, discounted }));
    }
  }, [dispatch, searchQuery, category, discounted]);

  useEffect(() => {
    if (searchQuery === '' && error === 'empty') {
      navigate('/searchpage?error=empty');
    }
  }, [searchQuery, error, navigate]);

  const { results: searchItems, loading: searchLoading, error: searchError } = search;
  const { items = [], loading, error: fetchError } = discounted ? discount : products;

  const handleItemClick = (item, event) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedItem(item);
  };

  const getPageTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (discounted) return 'Discounted Products';
    if (category) return category.charAt(0).toUpperCase() + category.slice(1);
    return 'All Products';
  };

  const renderItems = (items) => (
    <div className="products-grid">
      {items.map((item) => (
        <div key={item.id} className="product-card" onClick={(event) => handleItemClick(item, event)}>
          <div className="product-img-wrap">
            <img src={item.image} alt={item.name} />
            {item.discount_percentage > 0 && (
              <span className="product-badge">-{item.discount_percentage}%</span>
            )}
          </div>
          <div className="product-info">
            <h3>{item.name}</h3>
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`star ${i < item.average_rating ? 'active' : ''}`}
                />
              ))}
              <span>({item.reviews_count || 0})</span>
            </div>
            <p className="product-price">
              KES {item.discounted_price || item.price}
              {item.discounted_price && (
                <span className="original-price">KES {item.price}</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (searchQuery === '' && error === 'empty') {
      return <p className="empty-message">Please enter a search term.</p>;
    }
    if (searchQuery) {
      if (searchLoading) return <p className="loading-message">Loading...</p>;
      if (searchError) return <p className="error-message">Error: {searchError}</p>;
      if (!searchItems || searchItems.length === 0) return <p className="empty-message">No results found for "{searchQuery}"</p>;
      return renderItems(searchItems);
    }
    if (loading) return <p className="loading-message">Loading...</p>;
    if (fetchError) return <p className="error-message">Error: {fetchError}</p>;
    if (!items || items.length === 0) return <p className="empty-message">No products available</p>;
    return renderItems(items);
  };

  return (
    <>
      <NotificationBar />
      <SearchBar />
      <section className="search-results">
        <h1 className="page-title">{getPageTitle()}</h1>
        {renderContent()}
      </section>
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <ModalContent item={selectedItem} onClose={() => setSelectedItem(null)} position={modalPosition} />
        </div>
      )}
    </>
  );
};

export default SearchPage;