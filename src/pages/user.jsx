// User.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Herosection from '../components/Herosection';
import Knowmore from '../components/Knowmore';
import Products from '../components/Products';
import Footer from '../components/Footer';
import Upperfooter from '../components/Upperfooter';
import ParallaxSection from '../components/ParallaxSection';
import Classification from '../components/Classifications';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state ? location.state.userId : null;

  const [userData, setUserData] = useState(null);

  console.log("User ID:", userId);

  useEffect(() => {
    if (!userId) return;
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/logins/${userId}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        setUserData(userData);
        console.log("Fetched User Data:", userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/user');
    window.location.reload();
  };

  const handleCart = () => {
    navigate(`/cart/user/${userId}`);
  };

  const handleLogin = () => {
    navigate(`/login/${userId}`);
  };

  return (
    <>
          <Container>

      <Navbar welcomeMessage={userData && `Welcome ${userData.username}, ${userData.id}`} userId={userId} />
        <Herosection />
        <Knowmore />
        <Products userId={userId} userData={userData} />
        <Upperfooter />
        <Footer />
      </Container>
    </>
  );
};

export default User;
