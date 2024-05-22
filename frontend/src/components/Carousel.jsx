import Poster from '../images/poster.webp';

const Carousel = () => {
    return(
        <div className='carousel'>
            <img style={{ backgroundImage: `url(${Poster})` }} />
        </div>
  )
}

export default Carousel;
