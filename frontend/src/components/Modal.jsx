import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faWindowClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import Suit from '../images/tuxedo1.jpg';

const Modal = () => {
    return (
        <>
        <div className="Modal">
            <div className="modalheader">
                <h2>Black Full Italian Men's Tuxedo</h2>
                <div className="topheaderstar">{[...Array(4)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star" size="2x" /> ))}</div>
            </div>
            <div className="modalbody">
            <img src={Suit} id="posterImage" alt="suitimage" />
                    <div>
                    <p className="title">Price: $1000</p>
                    <p>
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