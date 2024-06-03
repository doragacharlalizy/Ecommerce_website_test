import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Imported images
import importedImages from './images'; // Assuming your imported images are in './images'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center; /* Center the content horizontally */
  width: 80%;
`;

const Image = styled.img`
  width: ${props => props.active ? '120px' : '100px'}; /* Increase size of active image */
  height: ${props => props.active ? '120px' : '100px'};
  object-fit: cover;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: blue;
  }
`;

const ImageCarousel = () => {
  const images = [
    importedImages.hero1,
    importedImages.hero2,
    importedImages.hero3,
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Container>
      <ImageContainer>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            active={index === activeIndex} // Set active prop based on index
          />
        ))}
      </ImageContainer>
    </Container>
  );
};

export default ImageCarousel;
