import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(children ? children.length : 0);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 2) {
      setCurrentIndex((prevState) => prevState + 2);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 2);
    }
  };

  if (!children || length === 0) return null;

  return (
    <div className="carousel-container relative overflow-visible">
      <div className="carousel-wrapper">
        <div
          className="carousel-content-wrapper flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="carousel-item flex-shrink-0 w-1/2 px-2">
              {child}
            </div>
          ))}
        </div>
      </div>

      {length > 2 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 focus:outline-none z-10"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-indigo-600" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 focus:outline-none z-10"
            disabled={currentIndex >= length - 2}
          >
            <ChevronRight className="w-6 h-6 text-indigo-600" />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
