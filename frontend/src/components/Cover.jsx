import React, { useEffect, useState } from 'react';

const cover = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/images/')
      .then((response) => response.json())
      .then((data) => setImages(data))
      // eslint-disable-next-line no-console
      .catch((error) => console.error('Error fetching images:', error));
  }, []);
  return (
    <div className="carousel">
      {images.map((image) => (<img key={image.id} id="carouselImage" src={`${image.image}`} alt={image.title} />
      ))}
    </div>
  );
};

export default cover;
