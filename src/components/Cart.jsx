import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Upperfooter from './Upperfooter';
import styled, { keyframes } from 'styled-components'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
  align-items:start;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Card = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease; // Add smooth transition for card hover

  @media (max-width: 768px) {
    pointer-events: none; // Disable click events on small screens
  }

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

const Quantity = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 5px;
`;

const QuantityValue = styled.span`
  margin-right: 10px;
`;

const QuantityButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 5px; // Decrease padding for smaller buttons
`;

const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  color: red;
  cursor: pointer;
  padding: 5px; // Decrease padding for smaller buttons
`;

const SelectedProductCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease; // Add transition for height change
  height: ${({ selected }) => (selected ? 'auto' : '50%')}; // Adjust height based on selection
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
  padding: 10px 20px; // Decrease padding for smaller buttons
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e6004c;
  }
`;

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ccc;
  color: #333;
  padding: 8px 12px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #999;
  }
`;
const FormContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const FormTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const FormButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  background-color: #ff3f6c;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6004c;
  }
`;
const Selectedone=styled.div`
flex=1;
margin-left:20px;
`;
const CartPage = () => {
  const location = useLocation();
  const { userId, welcomeMessage } = location.state || {};
  const [cartData, setCartData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false); 
  const totalSum = cartData ? cartData.reduce((sum, item) => sum + item.product.price * item.quantity, 0) : 0;
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/cart/user/${userId}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cartData = await response.json();
        setCartData(cartData);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  const handleProductClick = (product) => {
    // Check screen width before opening the modal
    if (window.innerWidth > 768) {
      setSelectedProduct(product); 
    }
  };

  const handleBuyNow = () => {
    if (userId) {
      setShowPurchaseForm(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
    setShowPurchaseForm(false); 
  };

  const redirectToPurchasePage = () => {
    if (selectedProduct) {
      navigate('/purchases', { state: { productId: selectedProduct.id } });
    }
  };

  const handleRemove = async (cart_item_id) => {
    const updatedCartData = cartData.filter(item => item.cart_item_id !== cart_item_id);
    setCartData(updatedCartData);

    try {
      const response = await fetch(`http://127.0.0.1:8000/carts/${cart_item_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }

      console.log('Item removed successfully');
    } catch (error) {
      console.error('Error removing item from cart:', error);

      setCartData(prevCartData => [...prevCartData, cartData.find(item => item.cart_item_id === cart_item_id)]);
    }
  };

  const updateQuantity = async (cart_item_id, quantity) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/carts/${cart_item_id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDecrement = async (cart_item_id) => {
    const updatedCartData = [...cartData];
    const index = updatedCartData.findIndex(item => item.cart_item_id === cart_item_id);
    if (updatedCartData[index].quantity > 1) {
      updatedCartData[index].quantity -= 1;
      setCartData(updatedCartData);
      try {
        await updateQuantity(cart_item_id, updatedCartData[index].quantity);
      } catch (error) {
        updatedCartData[index].quantity += 1; 
        setCartData(updatedCartData);
      }
    }
  };

  const handleIncrement = async (cart_item_id) => {
    const updatedCartData = [...cartData];
    const index = updatedCartData.findIndex(item => item.cart_item_id === cart_item_id);
    updatedCartData[index].quantity += 1;
    setCartData(updatedCartData);
    try {
      await updateQuantity(cart_item_id, updatedCartData[index].quantity);
    } catch (error) {
      updatedCartData[index].quantity -= 1; 
      setCartData(updatedCartData);
    }
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!cartData || cartData.length === 0) {
      console.error('Cart is empty');
      return;
    }
  
    const formData = new FormData(event.target);
  
    try {
      for (const item of cartData) {
        const purchaseDetails = {
          quantity: item.quantity,
          address: formData.get('address'),
          payment_options: formData.get('payment_options'),
          product: item.product.id,
          user: userId,
        };
  
        const response = await fetch('http://127.0.0.1:8000/purchases/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token in the headers
          },
          body: JSON.stringify(purchaseDetails),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to make purchase for product ${item.product.id}`);
        }
      }
  
      setCartData(null);
      setShowPurchaseForm(false); 
      alert('Purchase successful!');
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('Failed to make purchase. Please try again.');
    }
  };
  
  // Function to get CSRF token from cookies
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <>
      <Navbar userId={userId} welcomeMessage={welcomeMessage} />
      <Container>
        <Title>Cart Page</Title>
        <div style={{ display: 'flex' }}>
          <CardContainer>
            {cartData ? (
              cartData.map((item) => (
                <Card key={item.cart_item_id} onClick={() => handleProductClick(item.product)}>
                  <CardImage src={item.product.image} alt={item.product.name} />
                  <CardContent>
                    <TitleText>{item.product.name}</TitleText>
                    <Price>Price: ${item.product.price}</Price>
                    <Description>{item.product.description}</Description>
                    <Quantity>
                      <QuantityButton onClick={() => handleDecrement(item.cart_item_id)}>-</QuantityButton>
                      <QuantityValue>{item.quantity}</QuantityValue>
                      <QuantityButton onClick={() => handleIncrement(item.cart_item_id)}>+</QuantityButton>
                      <RemoveButton onClick={() => handleRemove(item.cart_item_id)}>Remove</RemoveButton>
                    </Quantity>
                    {/* <p>Cart Item ID: {item.cart_item_id}</p> */}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>Loading cart data...</p>
            )}
            <p>Total: ${totalSum.toFixed(2)}</p>
            <ActionButton onClick={handleBuyNow}>Buy Now</ActionButton>
          </CardContainer>
          {showPurchaseForm && (
            <ModalOverlay>
              <ModalContent>
                <CloseButton onClick={closeModal}>X</CloseButton> 
                <FormContainer>
                  <FormTitle>Enter Purchase Details</FormTitle>
                  <form onSubmit={handlePaymentSubmit}>
                    <FormField>
                      <FormLabel>Total Price:</FormLabel>
                      <FormInput type="text" name="total_price" value={`$${totalSum.toFixed(2)}`} readOnly />
                    </FormField>
                    <FormField>
                      <FormLabel>Address:</FormLabel>
                      <FormInput type="text" name="address" placeholder="Enter your address" required />
                    </FormField>
                    <FormField>
                      <FormLabel>Payment Options:</FormLabel>
                      <FormSelect name="payment_options" required>
                        <option value="">Select Payment Option</option>
                        <option value="phonepe">PhonePe</option>
                        <option value="gpay">GPay</option>
                        <option value="paytm">Paytm</option>
                        <option value="cash_on_delivery">Cash on Delivery</option>
                      </FormSelect>
                    </FormField>
                    <FormButton type="submit">Proceed to Payment</FormButton>
                  </form>
                </FormContainer>
              </ModalContent>
            </ModalOverlay>
          )}
          {selectedProduct && (
            <Selectedone>
              <Title>Selected Product Details</Title>
              <SelectedProductCard>
                <CardImage style={{ width: "100%", height: "60%",objectFit:'cover' }} src={selectedProduct.image} alt={selectedProduct.name} />
                <SelectedProductCardContent>
                  <TitleText>{selectedProduct.name}</TitleText>
                  <Price>Price: ${selectedProduct.price}</Price>
                  <Description>{selectedProduct.description}</Description>
                  <ActionButton onClick={redirectToPurchasePage}>Buy now</ActionButton>
                </SelectedProductCardContent>
              </SelectedProductCard>
            </Selectedone>
          )}
        </div>
      </Container>
      {showLoginModal && (
        <div>
          <p>Please login to proceed with the purchase.</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
};

export default CartPage;
