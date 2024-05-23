import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faWindowClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import Preview3 from '../images/white shirt.webp';
import Preview5 from '../images/tuxedo trouser.webp';


const ModalContent = () => {
    return (
        <>
        <div className="Modal">
            <div className="modalheader">
                <h2>Black Full Italian Men's Tuxedo</h2>
                <div className="topheaderstar">{[...Array(4)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star" size="2x" /> ))}</div>
            </div>
            <div className="modalbody">
            <img src={Preview3} id="posterImage" alt="suitimage" />
                    <div>
                        <ol className="productdescription">
                        <p className="title">Price: $1000</p>
                        <li> White XL sized long sleeved shirt.</li>
                        <li>Long black neck tie</li>
                        <li>Black long sleeved coat.</li>
                        <li>White pocket square</li>
                        <li>Neck tie holder</li>
                        <li>Size 34 black trouser</li>
                        <li>Black flower ribbon</li>
                        <li>Black xxl half coat</li>
                        </ol>
                        <div className="modalicons">
                        <FontAwesomeIcon icon={faShoppingCart} className="shoppingcarticon" size="1x" />
                        <span className="tooltip-text-modal">Checkout</span>
                        <FontAwesomeIcon icon={faHeart} className="favorite" size="1x" />
                        <span className="tooltip-text-modal">Like</span>
                        <FontAwesomeIcon icon={faWindowClose} className="windowclose" size="1x"/>
                        <span className="tooltip-text-modal">Close Window</span>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ModalContent;
