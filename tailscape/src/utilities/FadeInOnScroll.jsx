import React from 'react';
import useOnScreen from '../hooks/useOnScreen';

const FadeInOnScroll = ({ children }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div ref={ref}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`fade-in ${isVisible ? 'visible' : ''}`}
          style={{
            transitionDelay: `${index * 0.2}s`, // Incremental delay for each child
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default FadeInOnScroll;
