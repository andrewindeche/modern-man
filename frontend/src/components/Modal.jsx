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
                <div className="topheadericon">{[...Array(4)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star" size="2x" /> ))}</div>
                <FontAwesomeIcon icon={faHeart} className="favorite" size="2x" />
            </div>
            <div className="modalbody">
            <img src={Suit} id="posterImage" alt="suitimage" />
                <div>
                    <p className="title">Black Full Italian Men's Tuxedo</p>
                    <p>Full Italian Men's suit consisting of:
                        <ol className="productdescription">
                        <li> A white XL sized long sleeved shirt.</li>
                        <li>Long black neck tie</li>
                        <li>black long sleeved coat with a pocket on the left side.</li>
                        <li>white pocket square</li>
                        <li>neck tie holder</li>
                        <li>size 34 black trouser</li>
                        <li>black flower ribbon</li>
                        <li>black xxl half coat</li>
                        </ol>
                        </p>
                        <div className="modalicons">
                        <FontAwesomeIcon icon={faShoppingCart} className="shoppingcarticon" size="2x" />
                        <FontAwesomeIcon icon={faWindowClose} className="windowclose"  size="2x"/>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Modal;