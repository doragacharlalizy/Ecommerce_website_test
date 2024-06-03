import React, { useState } from 'react';
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
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

function ClassificationForm() {
  const [classificationName, setClassificationName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/classifications/', {
        classification_name: classificationName
      });

      // Handle success response
      console.log('Data inserted successfully:', response.data);

      // Reset the form fields after successful submission
      setClassificationName('');
    } catch (error) {
      // Handle error
      console.error('Error inserting data:', error);
    }
  };

  return (
    <FormContainer>
      <Title>Add New Classification</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="classificationName">Classification Name:</Label>
          <Input
            type="text"
            id="classificationName"
            value={classificationName}
            onChange={(e) => setClassificationName(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
}

export default ClassificationForm;
