import posterImage from '../images/poster.jpg';

const cover = () => {
    return(
        <div className='carousel'>
            <img src={posterImage} id="carouselImage" alt="carousel" />
        </div>
    )
}

export default cover;