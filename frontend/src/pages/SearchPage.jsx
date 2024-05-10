import React from "react";
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons'; 

const Searchpage = () => {
    return (
        <>
        <NotificationBar />
        <NavButtons />
        <SearchBar />
        <h4 className="searchresultstitle">Suits and Tuxedos</h4>
        <div className="searchresultsimages">
        <div className="image">
        <div className="container">
            <span className="ondiscount">-18%</span>
            <img alt="Italian Suits" />
            <p>Black Italian Tuxedo</p>
            {[...Array(4)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
        ))}
            <p id="price">$1000</p>
        </div>
        </div>
        <span className="tooltip-text">View More</span>
        <div className="image">
        <div className="container">
        <span className="onsale">New</span>
            <img alt="Grey Suit" />
            <p>Grey Official Suit</p>
            {[...Array(4)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
        ))}
            <p id="price">$700</p>
            </div>
            </div>
            <span className="tooltip-text">View More</span>
        <div className="image">
            <div className="container">
            <span className="ondiscount">-18%</span>
                <img  alt="Blue Tuxedo" />
            <p>Blue Official Tuxedo</p>
            {[...Array(4)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
        ))}
        <p id="price">$1000</p>
        </div>
        </div>
        <span className="tooltip-text">View More</span>
        <div className="image">
        <div className="container">
        <span className="onsale">New</span>
            
            <p>White Official Suit</p>
            {[...Array(4)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
        ))}
        <p id="price">$700</p>
        </div>
        </div>
        <span className="tooltip-text">View More</span>
    </div>
        </>
        )         
    }

export default Searchpage;
