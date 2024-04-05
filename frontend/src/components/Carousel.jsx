import Poster from '../images/poster';

const Carousel = () => {
    return(
        <div className='carousel'>
            <img style={{ backgroundImage: `url(${Poster})` }} />
            <FontAwesomeIcon icon={faHeart} />
        </div>
    )
}

export default Carousel;