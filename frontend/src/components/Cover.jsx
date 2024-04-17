import posterImage2 from '../images/poster2.webp';
import posterImage from '../images/poster.webp';

const cover = () => {
    return(
        <div className='carousel'>
            <img src={posterImage2} id="carouselImage" alt="carousel2" />
            <img src={posterImage} id="carouselImage2" alt="carousel" />
        </div>
    )
}

export default cover;