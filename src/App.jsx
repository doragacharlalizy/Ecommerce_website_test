import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/admin';
import Loginform from './Loginform';
import ClassificationForm from './ClassificationForm';
import ProductForm from './components/ProductForm';
import Jean from './components/Jean';
import RegisterForm from './Registerform';
import Userlogin from './components/Userlogin';
import Navbar from './components/Navbar';
import User from './pages/user';
import Viewall from './components/Viewall';
import CartPage from './components/Cart';
import ClassificationProducts from './components/Classificationproducts';
import PurchaseForm from './components/PurchaseForm';
import PurchasePage from './pages/Purchasepage';
import './App.css';
import UserPurchasePage from './components/UserPurchasePage';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleToggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <Router>
      <Routes>
      <Route path="/classification" element={<ClassificationForm />} />
      <Route path="/products" element={<ProductForm />} />
      <Route path="/jean" element={<Jean />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/userlogin" element={<Userlogin />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/:userId" element={<User />} />
      <Route path="/viewall" element={<Viewall />} />
      <Route path="/cart/user/:userId" element={<CartPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/purchases/user/:userId" element={<UserPurchasePage />} />
      <Route path="/purchases/user" element={<UserPurchasePage />} />
              <Route path="/products/classification/:classification_id" element={<ClassificationProducts />}/>
              <Route path="/" element={<User />} />

      <Route
          path="/"
          element={<Navbar onLoginClick={handleToggleLoginForm} />}
        />
        <Route path="/adminlogin" element={<Loginform onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/homepage"
          element={isLoggedIn ? <Admin /> : <Navigate to="/adminlogin" />} 
        />
        <Route path="/purchases" element={<PurchasePage/>} />

      </Routes>
      {showLoginForm && <LoginFormModal onClose={handleToggleLoginForm} />}

    </Router>
  );
};

export default App;
