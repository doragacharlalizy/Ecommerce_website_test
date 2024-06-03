import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loginform from '../Loginform';
import Homepage from '../components/Homepage';
// import AdminHome from './AdminHome'; 

const Admin = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);


//   const handleLogin = (loginSuccessful) => {
//     setIsLoggedIn(loginSuccessful);
//   };

//   if (isLoggedIn) {
//     return <AdminHome />;
//   }

  return (
    <>
      {/* <div id="google_translate_element"></div> */}
      <Homepage />
    </>
  );
};

export default Admin;
