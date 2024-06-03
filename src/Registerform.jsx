import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
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
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #7E7E7E;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/logins/', {
        username,
        email,
        phone_number: phoneNumber,
        password,
        confirm_password: confirmPassword
      });
      console.log('User registered successfully:', response.data);
      // Reset form fields and error message upon successful registration
      setUsername('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Error registering user:', error);
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number:</Label>
          <Input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default RegisterForm;
