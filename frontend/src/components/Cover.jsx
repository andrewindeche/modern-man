import React from 'react';
import posterImage from '../images/poster.jpg';

const cover = () => {
    return(
        <div className='carousel'>
            <img src={posterImage} id="posterImage" alt="carousel" />
        </div>
    )
}

export default cover;