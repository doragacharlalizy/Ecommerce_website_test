import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'; 
import ParallaxSection from './ParallaxSection';
import Classification from './Classifications';

const Container = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  font-family: inter, sans-serif;
  margin: auto;
  display: flex;
  gap: 56px;
  padding-bottom: 80px;
  padding-top: 80px;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
    gap: 16px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-top: 40px;
  }
`;

const ContentContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 0px;
    gap: 12px;
  }
`;

const Heading = styled.div`
  font-size: 42px;
  font-weight: 800;
  line-height: 54px;
  letter-spacing: 0.3px;
  color: #08283D;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
  }
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -0.2px;
  color: #27323B;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  @media (max-width: 400px) {
    justify-content: flex-start;
  }
`;

const Card = styled.div`
  width: 280px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    width:100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px; /* Updated border radius to match card */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 20px; /* Updated border radius to match card */
  border-top-right-radius: 20px; /* Updated border radius to match card */
  transition: transform 0.3s ease-in-out;

  ${Card}:hover & {
    transform: scale(1.1); /* Scale the image when the parent card is hovered */
  }
`;

const ImageText = styled.div`
  color: #08283D;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  padding: 10px;
`;
const ViewAllContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust margin as needed */
`;

const ViewAllButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #f56a6a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #d84343;
  }

  svg {
    margin: 0 8px;
    transition: transform 0.3s;
  }

  &:hover svg:first-child {
    transform: translateX(-4px);
  }

  &:hover svg:last-child {
    transform: translateX(4px);
  }
`;

const Products = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/`);
        const limitedProducts = response.data.slice(0, 8);
        setProducts(limitedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchData();
  }, [userId]);

  const navigateToViewAll = () => {
    localStorage.setItem('userId', userId);
  };

  return (
    <Container>
      <ContentContainer>
        <ParallaxSection
          title="Discover Your Style: Shop Our Latest Fashion Collection!" 
          subtitle="Elevate your wardrobe with our stylish clothing wear collection, curated to keep you on-trend and effortlessly chic. Step up your shoe game with our diverse range of footwear options, from sneakers to formal shoes. Complete your outfit with the perfect accessory! Our collection of belts offers versatility and sophistication, allowing you to add a touch of personality to any ensemble."
        />
        <Classification userId={userId} userData={userData} />
      </ContentContainer>

      <ImageContainer>
        {products.map((product) => (
          <Card key={product.id}>
            <ImageWrapper>
              <Image src={product.image} alt={product.name} />
              <ImageText>{product.name}</ImageText>
              <ImageText>Price: {product.price}</ImageText>
            </ImageWrapper>
          </Card>
        ))}
      </ImageContainer>

      <ViewAllContainer>
        <ViewAllButton to="/viewall" onClick={navigateToViewAll}>
          <IoIosArrowBack />
          View All
          <IoIosArrowForward />
        </ViewAllButton>
      </ViewAllContainer>
      {/* {userId && (
        <div>
          <h2>User Details</h2>
          <p>user ID: {userId}</p>
        </div>
      )} */}
    </Container>
  );
};

export default Products;
