import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faWindowClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import Suit from '../images/tuxedo1.jpg';

const Modal = () => {
    return (
        <>
        <div className="Modal">
            <div className="modalheader">
                <h2>Price: $1000</h2>
                <div className="topheadericon"><p></p>{[...Array(4)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star" size="1x" /> ))}</div>
            </div>
            <div className="modalbody">
            <img src={Suit} id="posterImage" alt="suitimage" />
                    <div>
                    <p className="title">Black Full Italian Men's Tuxedo</p>
                    <p>Full Italian Men's suit:
                        <ol className="productdescription">
                        <li> White XL sized long sleeved shirt.</li>
                        <li>Long black neck tie</li>
                        <li>Black long sleeved coat with a pocket on the left side.</li>
                        <li>White pocket square</li>
                        <li>Neck tie holder</li>
                        <li>Size 34 black trouser</li>
                        <li>Black flower ribbon</li>
                        <li>Black xxl half coat</li>
                        </ol>
                        </p>
                        <div className="modalicons">
                        <FontAwesomeIcon icon={faShoppingCart} className="shoppingcarticon" size="1x" />
                        <FontAwesomeIcon icon={faWindowClose} className="windowclose"  size="1x"/>
                        <FontAwesomeIcon icon={faHeart} className="favorite" size="1x" />
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Modal;