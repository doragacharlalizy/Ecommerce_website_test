import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import Userlogin from './Userlogin';
import { CgProfile } from 'react-icons/cg';
import importedImages from './images';
import { BsBagFill } from 'react-icons/bs'; 

const NavbarContainer = styled.nav`
  background-color: #ffffff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #e0e0e0;
  transition: border-bottom-color 0.3s;

  ${({ isScrolled }) =>
    isScrolled &&
    `
    border-bottom-color: #bdbdbd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `}

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;
const PurchaseIcon = styled(BsBagFill)`
  width: 20px;
  height: 20px;
  color: black;
  cursor: pointer;
`;
const LogoLink = styled(Link)`
  /* Optional: Add styles for the link if needed */
`;

const Logo = styled.img`
  width: 120px;
`;

const WelcomeMessage = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }
`;

const CartImage = styled.img`
  width: 30px;
  height: 30px;
`;

const SearchBar = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 10px;
`;

const SearchResultContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const SearchResultItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navbar = ({ userId, welcomeMessage }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isLoggedIn = !!welcomeMessage;
  const [isScrolled, setIsScrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/user');
    window.location.reload();
  };

  const handleCart = () => {
    if (isLoggedIn) {
      navigate('/cart', { state: { userId } });
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      fetchSearchResults(e.target.value);
    } else {
      setSearchResults([]);
    }
  };
  const handlePurchase = () => {
    if (isLoggedIn) {
      navigate('/purchases/user', { state: { userId } }); 
    } else {
      setShowLoginModal(true); 
    }
  };
  
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/search/?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearchItemClick = (classificationId) => {
    navigate(`/products/classification/${classificationId}`);
    
    setSearchQuery('');
    
    setSearchResults([]);
  };
  
  return (
    <>
      <NavbarContainer isScrolled={isScrolled}>
        <LogoLink to={{ pathname: "/user", state: { userId } }}>
          <Logo src={importedImages.logo} alt="Logo" />
        </LogoLink>
        <ButtonContainer>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchResults.length > 0 && (
            <SearchResultContainer>
              {searchResults.map((result) => (
                <SearchResultItem key={result.id} onClick={() => handleSearchItemClick(result.id)}>
                  {result.classification_name}
                </SearchResultItem>
              ))}
            </SearchResultContainer>
          )}
          {isLoggedIn ? (
            <>
            
              <WelcomeMessage>
                <CgProfile />
                {userData ? (
                  <>
                    {userData.username} 
                    <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
                    <Button onClick={handleCart}>
                <CartImage src={importedImages.cart} alt="Cart" />
              </Button>
              <Button onClick={handlePurchase}>
                <PurchaseIcon />
              </Button>
                  </>
                  
                ) : (
                  <span>Loading...</span>
                )}
              </WelcomeMessage>
            </>
          ) : (
            <>
              <SecondaryButton onClick={handleLogin}>Login</SecondaryButton>
              <Button onClick={handleCart}>
                <CartImage src={importedImages.cart} alt="Cart" />
              </Button>
            </>
          )}
        </ButtonContainer>
      </NavbarContainer>
      {showLoginModal && <Userlogin onClose={handleCloseModal} />}
    </>
  );
};

export default Navbar;
