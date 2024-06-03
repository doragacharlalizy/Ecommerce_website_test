import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
  color: #333;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around; /* Center products horizontally */
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  width: calc(33.33% - 20px);
  margin-bottom: 40px;
  box-sizing: border-box;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 768px) {
    width: calc(50% - 20px); /* 2 products per row on smaller screens */
  }

  @media screen and (max-width: 480px) {
    width: 100%; /* 1 product per row on extra small screens */
  }
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ProductDetailContainer = styled.div`
  margin-bottom: 10px; /* Adjust margin as needed */
`;

const DescriptionLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 5px; /* Adjust margin as needed */
`;

const ProductDetail = styled.p`
  margin: 5px 0;
  font-size: 18px;
  color: #666;
`;

const ClassificationProducts = ({ userId, userData }) => {
  const { classification_id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/classification/${classification_id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };

    fetchProducts();
  }, [classification_id]);

  useEffect(() => {
    console.log("User ID in ClassificationProducts:", userId);
  }, [userId]);

  return (
    <>
      <Navbar welcomeMessage={userData && `Welcome ${userData.username}, ${userData.id}`} userId={userId} />
      <Container>
        <Heading>Explore Our Products</Heading>
        <ProductList>
          {products.map(product => (
            <ProductCard key={product.id}>
              <ProductName>{product.name}</ProductName>
              <ProductImage src={product.image} alt={product.name} />
              <ProductDetailContainer>
                <ProductDetail>{product.description}</ProductDetail>
                <DescriptionLine />
              </ProductDetailContainer>
              <ProductDetail style={{color:"black"}}>Size: {product.sizes_available.join(', ')}</ProductDetail>
              <ProductDetail style={{color:"black"}}>Price: {product.price}</ProductDetail>
            </ProductCard>
          ))}
        </ProductList>
      </Container>
    </>
  );
};

export default ClassificationProducts;
