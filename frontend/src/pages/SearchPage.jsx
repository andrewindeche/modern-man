import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../store/productsSlice';
import { fetchDiscountedProducts } from '../store/discountsSlice';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const discount = useSelector(state => state.discount);
    const query = useQuery();
    const discounted = query.get('is_discounted') === true;
    const category = query.get('category') || '';

    useEffect(() => {
        if (discounted) {
            dispatch(fetchDiscountedProducts());
        } else {
            dispatch(fetchProducts({ category, discounted }));
        }
    }, [dispatch, category, discounted]);

    const { items, loading, error } = discounted ? discount : products;

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
                ) : (
                    items.map((item, index) => (
                        <div key={index} className="image">
                            <div className="container">
                                {item.discount_percentage > 0 && (
                                    <span className="ondiscount">{item.discount_percentage}%</span>
                                )}
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        className={`shopping ${i < item.average_rating ? 'active' : ''}`}
                                    />
                                ))}
                                <p id="price">${item.discounted_price}</p>
                            </div>
                        </div>
                    ))
                )}
                <span className="tooltip-text">View More</span>
            </div>
        </>
    );
}

export default SearchPage;
