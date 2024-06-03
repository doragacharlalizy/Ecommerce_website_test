
import React, { useState } from 'react';

import styled from 'styled-components';

import Leftpanel from './leftpanel';

import menuData from './menuData';
import importedImages from './images';
import ClassificationForm from '../ClassificationForm';
import ProductForm from './ProductForm';
import Jean from './Jean';


const OrangeCircle = styled.div`
  position: static;
  top: 50%;
  right: -20px;
  transform: translateY(-10%) translateX(-50%);
  background-color: #EE5535;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: ${(props) => (props.isHovered ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & img {
    transform: ${(props) => (props.isSidebarOpen ? 'rotate(180deg)' : 'none')};
  }
`;


const Container = styled.div`
  display: flex;
  height: 100vh;
`;


const LeftSide = styled.div`
  overflow-y: auto;
  position: relative;
`;

const RightSide = styled.div`
  flex: 1;
  position: relative;
`;

const NavBar = styled.div`
  height: 72px;
  background-color: #333;
  width: 100%;
  position: sticky;
  top: 0;
`;

const Outlet = styled.div`
  padding: 20px;
`;


const Homepage = () => {

  const [selectedSubheading, setSelectedSubheading] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isLeftPanelHovered, setIsLeftPanelHovered] = useState(false);

  const [isCircleHovered, setIsCircleHovered] = useState(false);

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleSubheadingClick = (subheading) => {
    setSelectedSubheading(subheading); 
  };

console.log(selectedSubheading)
const renderContent = () => {
  if (!selectedSubheading) {
    return (
      <>
        <h2>Welcome</h2>
        <p>Select a subheading from the left panel to view content.</p>
      </>
    );
  }
  switch (selectedSubheading) {
    case 'Add classifications':
      return <ClassificationForm/>;
    case 'Add product':
      return <ProductForm/>;
    case 'Jean':
      return <Jean/>;

    default:
      return (
        <>
          <h2>Content Not Found</h2>
          <p>No content available for this subheading.</p>
        </>
      );
  }
};

  return (
    <Container>
      <LeftSide onMouseEnter={() => setIsLeftPanelHovered(true)} onMouseLeave={() => setIsLeftPanelHovered(false)}>
        <Leftpanel handleSubheadingClick={handleSubheadingClick} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </LeftSide>
      <RightSide>
        <NavBar>
          Navbar
          <OrangeCircle onMouseEnter={() => setIsCircleHovered(true)} onMouseLeave={() => setIsCircleHovered(false)} isHovered={isLeftPanelHovered || isCircleHovered} isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
            <img src={importedImages.arrow2} alt="Arrow" />
          </OrangeCircle>
        </NavBar>
        <Outlet>
          {renderContent()}
        </Outlet>
      </RightSide>
    </Container>
  );
};


export default Homepage;
