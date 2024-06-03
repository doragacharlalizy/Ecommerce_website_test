import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import importedImages from './images';
import Navbar from './Navbar';
import Footer from './Footer';
import UpperFooter from './Upperfooter';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:50px;
  margin-bottom:50px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  max-width: 800px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #f56a6a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  margin-top: 16px; /* Add margin-top for spacing */
  align-self: flex-end;

  &:hover {
    background-color: #d84343;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const ProductName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const SizeLabel = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const SizeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SizeItem = styled.li`
  font-size: 14px;
  margin-bottom: 4px;
`;

const PaymentOption = styled.option`
  padding-left: 24px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 16px 16px;
`;

const PaymentOptionImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ModalImage = styled.img`
  max-width: 100%;
  height: 500px;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center; /* Center align content */
  position: relative; /* Add position relative */
`;

const ModalButton = styled(Button)`
  margin-top: 20px;
  position: absolute; /* Position the button */
  left: 50%; /* Move the button to the center horizontally */
  transform: translateX(-50%); /* Adjust the position */
  bottom: 20px; /* Position the button from the bottom */
`;


const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1; /* Ensure the close button is above the modal content */
`;

const CloseIcon = styled.span`
  font-size: 24px;
`;

const Price = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const StyledSelect = styled.select`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%; /* Make the dropdown wider */
`;

const PurchaseForm = ({ productId, userId, onClose }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [paymentOptions, setPaymentOptions] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); 
  const {  welcomeMessage } = location.state || {};

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${productId}/`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handlePaymentOptionChange = (e) => {
    setPaymentOptions(e.target.value);
    if (e.target.value === 'PhonePe' || e.target.value === 'GooglePay' || e.target.value === 'Paytm') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/purchases/', {
        user: userId,
        product: productId,
        quantity,
        address,
        payment_options: paymentOptions,
      });
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error purchasing product:', error);
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <Navbar userId={userId} welcomeMessage={welcomeMessage} />

    <Container>

      <Card>
        <ImageContainer>
          {productDetails && <Image src={productDetails.image} alt="Product" />}
        </ImageContainer>
        <ContentContainer>
          {productDetails ? (
            <>
              <ProductName>{productDetails.name}</ProductName>
              <Description>{productDetails.description}</Description>
              <Price>${productDetails.price}</Price>
              <SizeList>
                {productDetails.sizes_available.map((size, index) => (
                  <SizeItem key={index}>{size}</SizeItem>
                ))}
              </SizeList>
              <Form onSubmit={handleSubmit}>
                <Label>Quantity:</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Label>Address:</Label>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Label>Payment Options:</Label>
                <StyledSelect
                  value={paymentOptions}
                  onChange={handlePaymentOptionChange}
                >
                  <option value="">Select payment option</option>
                  <PaymentOption value="PhonePe">
                    <PaymentOptionImage src={importedImages.phonepe} alt="PhonePe" /> PhonePe
                  </PaymentOption>
                  <PaymentOption value="GooglePay">
                    <PaymentOptionImage src={importedImages.gpay} alt="GooglePay" /> Google Pay
                  </PaymentOption>
                  <PaymentOption value="Paytm">
                    <PaymentOptionImage src={importedImages.paytm} alt="Paytm" /> Paytm
                  </PaymentOption>
                  <PaymentOption value="CashOnDelivery">Cash on Delivery</PaymentOption>
                </StyledSelect>
                {showModal && (
                  <ModalBackground>
                    <ModalContent>
                      <CloseButton onClick={closeModal}>
                        <CloseIcon>&times;</CloseIcon>
                      </CloseButton>
                      <ModalImage src={importedImages.scanner} alt="Scanner" />
                      <ModalButton type="button" onClick={handleSubmit}>Pay</ModalButton>
                    </ModalContent>
                  </ModalBackground>
                )}
                {!showModal && <Button type="submit">Buy Now</Button>}
              </Form>
            </>
          ) : (
            <p>Loading product details...</p>
          )}
        </ContentContainer>
      </Card>
      {orderPlaced && (
      <ModalBackground>
        
        <ModalContent>

          <h2>Order Placed Successfully!</h2>
          <p>Your order has been successfully placed. Thank you for shopping with us!</p>
        </ModalContent>
      </ModalBackground>
    )}
    </Container>
    <UpperFooter/>
    <Footer />

    </>
  );
};

export default PurchaseForm;
