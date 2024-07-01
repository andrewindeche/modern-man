import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchFavoritesThunk } from '../store/favoriteSlice';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import ModalContent from '../components/Modal';

const FavoritedPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    dispatch(fetchFavoritesThunk());
  }, [dispatch]);

  const { items = [], loading, error } = favorites;

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
              key={i}
              icon={faStar}
              className={`star ${i < item.average_rating ? 'active' : ''}`}
              size="2x"
            />
          ))}
          <p id="price">
            $
            {item.discounted_price || item.price}
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : items.length === 0 ? (
          <p>No favorited items.</p>
        ) : (
          renderItems(items)
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

export default FavoritedPage;
