import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../store/productsSlice';
import { fetchDiscountedProducts } from '../store/discountsSlice';
import { searchProducts, updateQuery } from '../store/searchSlice';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import ModalContent from '../components/Modal';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const discount = useSelector((state) => state.discount);
  const search = useSelector((state) => state.search);
  const query = useQuery();
  const discounted = query.get('discounted') === 'true';
  const category = query.get('category') || '';
  const searchQuery = query.get('query') || '';
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

  const { results: searchItems, loading: searchLoading, error: searchError } = search;
  const { items = [], loading, error } = discounted ? discount : products;
  const handleItemClick = (item, event) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedItem(item);
  };
  const renderItems = (items) => (
    items.map((item, index) => (
      <div key={index} className="image" onClick={(event) => handleItemClick(item, event)}>
        <div className="container">
          {item.discount_percentage > 0 && (
          <span className="ondiscount">
            {item.discount_percentage}
            %
          </span>
          )}
          <img src={item.image} alt={item.name} />
          <p className="itemname">{item.name}</p>
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              icon={faStar}
              className={`star ${i < item.average_rating ? 'active' : ''}`}
              size="2x"
            />
          ))}
          <p id="price">
            $
            {item.discounted_price}
          </p>
        </div>
      </div>
    ))
  );

  return (
    <>
      <NotificationBar />
      <NavButtons />
      <SearchBar />
      <div className="searchresultsimages">
        {searchQuery ? (
          searchLoading ? (
            <p>Loading...</p>
          ) : searchError ? (
            <p>
              Error:
              {searchError}
            </p>
          ) : (
            renderItems(searchItems)
          )
        ) : (
          loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>
              Error:
              {error}
            </p>
          ) : (
            renderItems(items)
          )
        )}
        <span className="tooltip-text">View More</span>
      </div>
      {selectedItem && (
        <div className="modal-background" onClick={() => setSelectedItem(null)}>
          <ModalContent item={selectedItem} onClose={() => setSelectedItem(null)} position={modalPosition} />
        </div>
      )}
    </>
  );
};

export default SearchPage;
