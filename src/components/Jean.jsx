import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  width: 300px; /* Set a fixed width for each product card */
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto; /* Automatically adjust height to maintain aspect ratio */
  max-width: 250px; /* Set a maximum width for the image */
  max-height: 250px; /* Set a maximum height for the image */
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const SizesAvailable = styled.p`
  margin-bottom: 10px;
`;

const Quantity = styled.p`
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#007bff' : '#dc3545')};
  color: #fff;
  border-radius: 3px;
`;

const Jean = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/products/classification/1/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdate = (id) => {
    console.log('Updating product with id:', id); 
  };

  const handleDelete = async (id) => {
    console.log('Deleting product with id:', id); 
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}/delete/`);
      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container>
      <Heading>Products - Jean</Heading>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <h2>{product.name}</h2>
            {product.image && (
              <ProductImage src={product.image} alt={product.name} />
            )}
            <Price>Price: {product.price}</Price>
            <Description>Description: {product.description}</Description>
            <SizesAvailable>Sizes Available: {product.sizes_available.join(', ')}</SizesAvailable>
            <Quantity>Quantity: {product.quantity}</Quantity>
            <Button primary onClick={() => handleUpdate(product.id)}>Update</Button>
            <Button onClick={() => handleDelete(product.id)}>Delete</Button>
          </ProductCard>
        ))}
      </ProductsContainer>
    </Container>
  );
};

export default Jean;
