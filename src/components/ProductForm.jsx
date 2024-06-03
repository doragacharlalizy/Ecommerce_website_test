import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function ProductForm() {
  const [formData, setFormData] = useState({
    classification: '',
    image: null,
    name: '',
    size: '', // This will store the selected size
    price: '',
    description: '',
    quantity: ''
  });

  const [classifications, setClassifications] = useState([]);

  useEffect(() => {
    // Fetch classifications from backend API
    axios.get('http://127.0.0.1:8000/classifications/')
      .then(response => {
        setClassifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching classifications:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert formData.sizes_available to an array
    const sizesArray = formData.size.split(',');
    const formPayload = new FormData();
    formPayload.append('classification', formData.classification);
    formPayload.append('image', formData.image);
    formPayload.append('name', formData.name); // Add name to form data
    sizesArray.forEach(size => {
      formPayload.append('sizes_available', size);
    });
    formPayload.append('price', formData.price);
    formPayload.append('description', formData.description);
    formPayload.append('quantity', formData.quantity);

    // Send form data to backend API
    axios.post('http://127.0.0.1:8000/products/', formPayload)
      .then(response => {
        console.log('Product added successfully:', response.data);
        // Reset form fields after successful submission
        setFormData({
          classification: '',
          image: null,
          name: '', // Reset name field
          size: '', // Reset the selected size
          price: '',
          description: '',
          quantity: ''
        });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <FormContainer>
      <Title>Add New Product</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="classification">Classification:</Label>
          <Select
            id="classification"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
            required
          >
            <option value="">Select Classification</option>
            {classifications.map(classification => (
              <option key={classification.id} value={classification.id}>{classification.classification_name}</option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image:</Label>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="size">Size:</Label>
          <Select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            {/* Add more options as needed */}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price:</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="quantity">Quantity:</Label>
          <Input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default ProductForm;
