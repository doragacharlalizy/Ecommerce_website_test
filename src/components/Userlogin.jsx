import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterForm from '../Registerform';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
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
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #7e7e7e; /* Grey */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0c14b; /* Yellow */
  }
`;

const RegisterLink = styled.span`
  color: #7e7e7e; /* Grey */
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #f0c14b; /* Yellow */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const Userlogin = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/logins/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json();
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        onClose();
        navigate('/user', { state: { userId: user.id } });
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleCloseModal = () => {
    setShowRegisterForm(false); // Set showRegisterModal to false when RegisterForm is closed
  };

  return (
    <ModalContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {showRegisterForm ? (
        <RegisterForm />
      ) : (
<>
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
      <div>
            Don't have an account?{' '}
            <RegisterLink onClick={handleRegisterClick}>register</RegisterLink>
          </div>

          </>
      )}
    </ModalContainer>
    
  );
};

export default Userlogin;
