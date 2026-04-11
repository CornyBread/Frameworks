import React, { useState } from 'react';

const ProjectCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="carousel-wrapper">
      <button className="carousel-btn btn-left" onClick={prevSlide}>&#10094;</button>
      
      <img 
        key={currentIndex} // Obliga a React a re-renderizar la animación
        src={images[currentIndex]} 
        alt={`Evidencia ${currentIndex + 1}`} 
        className="carousel-img" 
      />
      
      <button className="carousel-btn btn-right" onClick={nextSlide}>&#10095;</button>

      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;