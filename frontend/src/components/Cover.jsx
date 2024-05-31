import React, { useEffect, useState } from 'react';

const cover = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/images/')
      .then((response) => response.json())
      .then((data) => setImages(data))
      // eslint-disable-next-line no-console
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    if (isResponsive) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length, isResponsive]);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`carousel ${isResponsive ? 'responsive' : ''}`}>
      {images.map((image, index) => (
        <img
          key={image.id}
          id="carouselImage"
          src={`${image.image}`}
          alt={image.title}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default cover;
