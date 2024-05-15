import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons'; 

const Searchpage = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts('')); 
    }, [dispatch]);

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
                ) :(
                    items.map((item, index) => (
                        <div key={index} className="image">
                            <div className="container">
                            {item.discount_percentage > 0 && (
                         <span className="ondiscount">{item.discount_percentage}%</span>)}
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                {
                                [...Array(5)].map((_, index) => (
                                    <FontAwesomeIcon
                                    key={index}
                                    icon={faStar}
                                    className={`shopping ${index < item.average_rating ? 'active' : ''}`}
                                    />
                                ))
                                }

                                <p id="price">{item.price}</p>
                            </div>
                        </div>
                    ))
                )}
                <span className="tooltip-text">View More</span>
            </div>
        </>
            )         
}

export default Searchpage;
