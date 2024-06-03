import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Loginform = ({ onLoginSuccess }) => { // Pass onLoginSuccess callback as prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Admin@123') {
      setLoginStatus('Login Successful');
      localStorage.setItem('isLoggedIn', 'true');
      onLoginSuccess();
      console.log('Navigating to homepage...');
      navigate('/homepage');
    } else {
      setLoginStatus('Login Failed. Please check your credentials.');
    }
    setUsername('');
    setPassword('');
  };
  

  return (
    <FormContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
      {loginStatus && <ErrorMessage>{loginStatus}</ErrorMessage>}
    </FormContainer>
  );
};

export default Loginform;
