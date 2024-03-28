import React from "react";
import NotificationBar from '../src/components/NotificationBar';
import SearchBar from '../src/components/SearchBar';
import NavButtons from '../src/components/NavButtons';
import tuxedo1 from '../src/images/tuxedo1.jpg'
import tuxedo2 from '../src/images/white tux stripes.jpg'
import tuxedo3 from '../src/images/Blue Tux.jpg'
import tuxedo4 from '../src/images/white tux.jpg'
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
        <span className="image">
        <img src={tuxedo1} alt="My Shoes" />
        <p>Black Full Italian Men's Tuxedo</p>
        <div>{[...Array(4)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
    ))}
        <p id="price">$1000</p>
    </div>
    </span>
    <span className="image">
        <img src={tuxedo2} alt="My Shoes" />
        <p>Grey full Official Men's Suit</p>
        <div>{[...Array(4)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
    ))}
    <p id="price">$700</p>
    </div>
    </span>
    <span className="image">
        <img src={tuxedo3} alt="My Shoes" />
        <p>Blue Full Men's Tuxedo</p>
        <div>{[...Array(4)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
    ))}
    <p id="price">$1000</p>
    </div>
    </span>
    <span className="image">
        <img src={tuxedo4} alt="My Shoes" />
        <p>White full Official Men's Suit</p>
        <div>{[...Array(4)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="shopping" />
    ))}
    <p id="price">$700</p>
    </div>
    </span>
</div>
    </>
    )         
}

export default Searchpage;