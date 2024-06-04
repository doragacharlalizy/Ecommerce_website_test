import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Upperfooter from './Upperfooter';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin: 20px;
  display: flex;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
  align-items: start;
  @media (max-width: 768px) {
    width:100%;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease;
  height: 50%;
  
`;

const Card = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  &:hover {
    transform: scale(1.02);
  }
`;

const CardContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const TitleText = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
`;

const Price = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 5px;
`;

const QuantityValue = styled.span`
  margin-right: 10px;
`;

const SelectedProductCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease;
  height: ${({ selected }) => (selected ? 'auto' : '50%')};
`;

const SelectedProductCardContent = styled.div`
  padding: 20px;
`;

const CardImage = styled.img`
  width: 200px;
  height: auto;
`;

const ActionButton = styled.button`
  background-color: #ff3f6c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e6004c;
  }
`;
const Maincontainer=styled.div`
  max-width: 1600px;
  margin: 0 auto;

`;
const PurchasePage = () => {
  const location = useLocation();
  const { userId, welcomeMessage } = location.state || {};
  const [purchaseData, setPurchaseData] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/purchases/user/${userId}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPurchaseData(data);
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productDetailsMap = data.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
        setProductDetails(productDetailsMap);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (userId) {
      fetchPurchaseData();
      fetchProductDetails();
    }
  }, [userId]);

  const handleProductClick = (productId) => {
    const product = productDetails[productId];
    setSelectedProduct(product);
  };

  // Check if the screen width is less than 768px
  const isSmallScreen = window.innerWidth < 768;

  return (
    <>
      <Navbar userId={userId} welcomeMessage={welcomeMessage} />
      <Maincontainer>
      <Container>
        <CardContainer>
          <Title>User Purchases</Title>
          {purchaseData.map((purchase) => (
            <Card key={purchase.id} onClick={() => handleProductClick(purchase.product)}>
              <ProductImage src={productDetails[purchase.product]?.image} alt={productDetails[purchase.product]?.name} />
              <CardContent>
                <TitleText>{productDetails[purchase.product]?.name}</TitleText>
                <Price>Price: ${productDetails[purchase.product]?.price}</Price>
                <Description>{productDetails[purchase.product]?.description}</Description>
                <Quantity>
                  <QuantityValue>Quantity: {purchase.quantity}</QuantityValue>
                </Quantity>
              </CardContent>
            </Card>
          ))}
        </CardContainer>
        {/* Render ProductContainer only if the screen width is not small */}
        {!isSmallScreen && (
          <ProductContainer style={{ marginLeft: '20px',flex:'1' }}>
            {selectedProduct && (
              <div>
                <Title>Selected Product Details</Title>
                <SelectedProductCard>
                  <CardImage style={{ width: "100%", height: "500px", objectFit: 'cover' }} src={selectedProduct.image} alt={selectedProduct.name} />
                  <SelectedProductCardContent>
                    <TitleText>{selectedProduct.name}</TitleText>
                    <Price>Price: ${selectedProduct.price}</Price>
                    <Description>{selectedProduct.description}</Description>
                  </SelectedProductCardContent>
                </SelectedProductCard>
              </div>
            )}
          </ProductContainer>
        )}
      </Container>

      <Upperfooter />
      <Footer />
      </Maincontainer>
    </>
  );
};

export default PurchasePage;
