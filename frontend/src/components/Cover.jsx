import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Cover = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/api/images/')
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="hero-carousel">
      <div className="hero-slide">
        <img src={images[currentIndex].image} alt={images[currentIndex].title} />
        <div className="hero-content">
          <h2>{images[currentIndex].title}</h2>
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button type="button" className="hero-nav hero-prev" onClick={goToPrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button type="button" className="hero-nav hero-next" onClick={goToNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className="hero-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Cover;