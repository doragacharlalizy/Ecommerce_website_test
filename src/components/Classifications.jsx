import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-elastic-carousel'; 

const Classification = ({ userId, userData }) => {
  const [classifications, setClassifications] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fetchClassifications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/classifications/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const classificationsData = await response.json();
        setClassifications(classificationsData);
        console.log("Fetched Classifications:", classificationsData); 

        const images = {};
        for (const classification of classificationsData) {
          const imageResponse = await axios.get(`http://127.0.0.1:8000/products/classification/${classification.id}/`);
          const firstImage = imageResponse.data[0]?.image;
          images[classification.id] = firstImage;
        }
        setCategoryImages(images);
      } catch (error) {
        console.error('Error fetching classifications:', error);
      }
    };

    fetchClassifications();
  }, []);

  const checkMobileView = () => {
    setIsMobileView(window.innerWidth < 768); 
  };

  useEffect(() => {
    window.addEventListener('resize', checkMobileView);
    checkMobileView(); 
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleClick = (userId) => {
    console.log("User ID:", userId);
  };

  const renderClassificationsWithQueryParams = () => {
    return classifications.map(classification => (
      <Link
        key={classification.id}
        to={{
          pathname: `/products/classification/${classification.id}`,
          search: `?userId=${userId}`, 
        }}
        onClick={() => handleClick(userId)} 
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundImage: `url(${categoryImages[classification.id]})`, // Background image from the fetched images
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Add shadow for better visibility
        }}
      >
        {classification.classification_name}
      </Link>
    ));
  };

  const renderClassificationsWithCustomAttributes = () => {
    return classifications.map(classification => (
      <Link
        key={classification.id}
        to={`/products/classification/${classification.id}`}
        data-userId={userId} 
        onClick={() => handleClick(userId)} 
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundImage: `url(${categoryImages[classification.id]})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', 
        }}
      >
        {classification.classification_name}
      </Link>
    ));
  };

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
      {isMobileView ? (
        <Carousel itemsToShow={1} breakPoints={[{ width: 768, itemsToShow: 3 }]}>
          {renderClassificationsWithQueryParams()}
          
        </Carousel>
      ) : (
        renderClassificationsWithCustomAttributes()
      )}
    </div>
  );
};

export default Classification;
