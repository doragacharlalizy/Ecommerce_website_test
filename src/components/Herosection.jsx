import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import importedImages from './images';

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [showWebsiteName, setShowWebsiteName] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const contentData = [
    { title: 'Trendy Picks', description: 'Explore the latest trends in fashion.' },
    { title: 'Summer Essentials', description: 'Stay cool and stylish this summer.' },
    { title: 'Casual Comfort', description: 'Effortlessly chic everyday wear.' },
    { title: 'Formal Elegance', description: 'Elevate your formal attire.' },
  ];

  useEffect(() => {
    const websiteTimeout = setTimeout(() => {
      setShowWebsiteName(false);
    }, 5000);

    const contentTimeout = setTimeout(() => {
      setShowContent(true);
    }, 6000);

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % contentData.length);
    }, 6000);

    return () => {
      clearTimeout(websiteTimeout);
      clearTimeout(contentTimeout);
      clearInterval(interval);
    };
  }, [contentData.length]);

  return (
    <Container>
      <VideoContainer>
        <Video autoPlay loop muted>
          <source src="/hero2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
        <WebsiteName showWebsiteName={showWebsiteName}>
          <Logo src={importedImages.logo} alt="Logo" />
          <WebsiteTitle>Trendy Fashions</WebsiteTitle>
        </WebsiteName>
        {contentData.map((content, index) => (
          <ContentContainer key={index} isVisible={index === currentIndex && showContent}>
            <Content>
              <Title>{content.title}</Title> 
              <Description>{content.description}</Description> 
            </Content>
            <ImageContainer>
              <Image src={importedImages[`hero${index + 1}`]} alt={`Hero Image ${index + 1}`} />
            </ImageContainer>
          </ContentContainer>
        ))}
      </VideoContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 768px;
  overflow: hidden; /* Ensure content does not extend beyond container */
`;

const VideoContainer = styled.div`
  position: relative;
  height: 100%;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WebsiteName = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center; /* Center align */
  color: white;
  opacity: ${({ showWebsiteName }) => (showWebsiteName ? 1 : 0)};
  animation: ${({ showWebsiteName }) => (showWebsiteName ? fadeIn : fadeOut)} 1s ease-out forwards; 
`;

const Logo = styled.img`
  width: 50%; 
`;

const WebsiteTitle = styled.h1`
  font-size: 100px; 
  margin-top: 10px; 
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 70%;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  animation: ${fadeInLeft} 1s ease forwards;
  color: white;
`;

const Title = styled.p`
  font-size: 60px; /* Larger font size for description */
  font-weight:bold;
`;

const Description = styled.p`
  font-size: 24px;
`;

const swingLeft = keyframes`
  0% {
    transform: translateX(-100%) rotate(10deg);
  }
  50% {
    transform: translateX(5%) rotate(-5deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
`;

const swingRight = keyframes`
  0% {
    transform: translateX(100%) rotate(-20deg);
  }
  50% {
    transform: translateX(0%) rotate(0deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 500px;
  max-width: 100%; 
  border-radius: 100px 0px 100px 0px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  animation: ${swingRight} 1s ease forwards; 

  border: 10px solid #ccc; 
  @media (max-width: 1190px) {
display:none;

  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default HeroSection;
