
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import UpperFooter from './Upperfooter';
import Footer from './Footer';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ClassificationTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-transform: uppercase; /* Add this line */
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  grid-auto-rows: minmax(300px, auto); /* Adjust the row height as needed */
`;


const ProductCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  height: 300px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

const ProductDetails = styled.div`
  padding: 20px;
`;

const ProductDescription = styled.h3`
  font-size: 12px;
  margin: 10px 0;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  margin: 10px 0;
  color: #666;
`;

const ProductDetailsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:1000;
`;

const ProductDetailsCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  max-width: 80%;
  overflow: auto;
`;


const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #999;

  &:hover {
    color: #333;
  }
`;

const SizeBox = styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#f56a6a' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#d84343' : '#f5f5f5')};
    color: ${({ selected }) => (selected ? '#fff' : '#333')};
  }
`;

const ActionButton = styled.button`
  background-color: #f56a6a;
  color: #fff;
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d84343;
  }
`;

const ErrorText = styled.p`
  color: red;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const QuantityButton = styled.button`
  background-color: #f56a6a;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d84343;
  }
`;

const Quantity = styled.span`
  font-size: 20px;
`;

const getSizeLetter = (size) => {
  if (size === 'Small') return 'S';
  if (size === 'Medium') return 'M';
  if (size === 'Large') return 'L';
  return size;
};
const Maincontainer=styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;
const Viewall = () => {
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState(null);
  const [classifications, setClassifications] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Access navigate function

  useEffect(() => {
    const fetchClassifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/classifications/');
        setClassifications(response.data);
      } catch (error) {
        console.error('Error fetching classifications:', error);
      }
    };

    fetchClassifications();
  }, []);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/logins/${userId}/`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const addToCart = async () => {
    if (!userId) {
      toast.error('Please login to add to cart');
      return;
    }
  
    if (!selectedProduct || !selectedSize) {
      setErrorMessage('Please select a product and size');
      return;
    }
  
    try {
      const productId = selectedProduct.id;
  
      await axios.post('http://127.0.0.1:8000/cart/add/', {
        user: userId,
        product_id: productId,
        quantity: quantity,
      });
  
      toast.success('Product added to cart successfully');
  
      console.log(`Added product ID ${productId} to cart with quantity ${quantity} for user ID ${userId}`);
    } catch (error) {
      toast.error('Please login to add the product to cart');
    }
  };
  

  const closeProductDetails = () => {
    setSelectedProduct(null);
    setErrorMessage('');
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const redirectToPurchasePage = () => {
    console.log(userId);
    if (userId && userId !== "null") { 
        if (selectedProduct) {
            navigate('/purchases', { state: { productId: selectedProduct.id } });
        } else {
            console.log("No selected product to purchase");
        }
    } else {
        // Display an error message if the user is not logged in
        console.log("User is not logged in");
        toast.error("Please login to buy.");
    }
};

  
  
  return (
    <>
    <Maincontainer>
      <Navbar welcomeMessage={userData && `Welcome ${userData.username}, ${userData.id}`} userId={userId} />
      <Container>
        {/* {userId ? (
          <h2>User ID: {userId}</h2>
        ) : (
          <h2>Guest User</h2>
        )} */}

        {classifications.map((classification) => (
          <div key={classification.id}>
            <ClassificationTitle>{classification.classification_name}</ClassificationTitle>
            <ProductList
              classificationId={classification.id}
              openProductDetails={setSelectedProduct}
              setSelectedSize={setSelectedSize}
            />
          </div>
        ))}

        {selectedProduct && (
           <ProductDetailsContainer>
           <ProductDetailsCard style={{maxWidth:"600px"}}>
             <CloseButton onClick={closeProductDetails}>×</CloseButton>
             <div style={{display:"flex",flexDirection:"row"}}>
             <ProductImage src={selectedProduct.image} alt={selectedProduct.description} />
             <ProductDetails>
             <ProductDescription style={{fontSize:"20px"}}>{selectedProduct.name}</ProductDescription>
 
               <ProductDescription style={{color:"grey",fontSize:"14px"}}>{selectedProduct.description}</ProductDescription>
               <ProductPrice>Price: {selectedProduct.price}</ProductPrice>
               <div>
                 {selectedProduct.sizes_available.map((size) => (
                   <SizeBox
                     key={size}
                     selected={selectedSize === size}
                     onClick={() => setSelectedSize(size)}
                   >
                     {getSizeLetter(size)}
                   </SizeBox>
                 ))}
               </div>
               <QuantityContainer>
                 <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
                 <Quantity>{quantity}</Quantity>
                 <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
               </QuantityContainer>
               <div style={{display:"flex",gap:"10px"}}>
               <ActionButton onClick={addToCart}>Add to Cart</ActionButton>
               <ActionButton onClick={redirectToPurchasePage}>Buy now</ActionButton>
               </div>
             </ProductDetails>
             </div>
             {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
           </ProductDetailsCard>
         </ProductDetailsContainer>
        )}
        <ToastContainer />
      </Container>
      <UpperFooter/>
      <Footer/>
      </Maincontainer>
    </>
  );
};

const ProductList = ({
  classificationId,
  openProductDetails,
  setSelectedSize,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsForClassification = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/?classification=${classificationId}`);
        setProducts(response.data.filter((product) => product.classification === classificationId));
      } catch (error) {
        console.error(`Error fetching products for classification ${classificationId}:`, error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsForClassification();
  }, [classificationId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (products.length === 0) {
    return <p>No products available for this classification.</p>;
  }

  return (
    <ProductContainer>
      {products.map((product) => (
        <ProductCard key={product.id} onClick={() => openProductDetails(product)}>
          <ProductImage style={{width:"100%"}}src={product.image} alt={product.name} />
          <ProductDetails>
          <ProductDescription style={{fontSize:'24px'}}>{product.name}</ProductDescription>
          <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>Price: {product.price}</ProductPrice>
          </ProductDetails>
        </ProductCard>
      ))}
    </ProductContainer>
  );
};

export default Viewall;