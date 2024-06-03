import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import importedImages from './images';
import menuData from './menuData';

const Sidebar = styled.div`
  width: 236px;
  padding-right: 20px;
  height: 100%;
  position: relative;
  transition: margin-left 0.3s;
  margin-left: ${(props) => (props.isSidebarOpen ? 0 : '-236px')};
  font-family: "Inter", sans-serif;

`;

const SidebarContainer = styled.div`
  position: sticky;
  top: 0;
`;

const LogoContainer = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 72px);
`;

const MenuItem = styled.div`
  position: relative;
`;

const DownArrow = styled.img`
  width: 16px;
  height: 16px;
  align-self: center;
  margin-right: 24px;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  cursor: pointer;
  position: relative;
  transition: border-left-width 0.3s, color 0.3s, font-weight 0.3s, background-color 0.3s;
  border-left: 5px solid transparent;
  border-radius: 0 4px 4px 0;
  font-weight: ${(props) => (props.isActive ? '600' : 'none')};
  border-left-color: ${(props) => (props.isActive ? '#EE5535' : 'transparent')};
  background-color: ${(props) => (props.isActive ? '#FEECE3' : 'transparent')};
  &:hover {
    color: #EE5535;
    font-weight: 600;
    border-left-color: #EE5535;
    background-color: #FEECE3;
    & ${DownArrow} {
      filter: brightness(1.5);
    }
    & > div {
      font-weight: 600;
    }
  }
`;

const MainHeading = styled.span`
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
  font-size: 13px;
  color: ${(props) => (props.isActive ? '#6F35FB' : 'inherit')};
`;

const Subheadings = styled.div`
  margin-top: 10px;
  font-weight: 500;
  font-size: 13px;
`;

const CustomLink = styled(NavLink)`
  color: #000;
  text-decoration: none;
  display: flex;
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.3px;
  margin-bottom: 5px;
  flex-direction: column;
  margin-left: 57px;
  height: 40px;
  cursor: pointer;
  transition: color 0.3s, font-weight 0.3s;
  &:hover {
    font-weight: 600;
  }
`;

const Top = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
`;

const Heading = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const TopHeading = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#AF8AFB' : 'transparent')};
  transition: background-color 0.3s;
  border-left: ${(props) => (props.isActive ? '5px solid #6F35FB' : 'none')};
  border-radius: 0 4px 4px 0;
`;

const Icon = styled.img`
  margin-right: 10px;
`;

const Leftpanel = ({ handleSubheadingClick, isSidebarOpen, toggleSidebar }) => {
  const [selectedSubheading, setSelectedSubheading] = useState(null);
  const [openSubheadings, setOpenSubheadings] = useState(() => {
    const initialSubheadingsState = {};
    Object.keys(menuData).forEach((heading) => {
      initialSubheadingsState[heading] = true;
    });
    return initialSubheadingsState;
  });
  const [isActive, setIsActive] = useState(false); 
  const [topHeadingActive, setTopHeadingActive] = useState(true);
  const [activeMainHeading, setActiveMainHeading] = useState(null);

  useEffect(() => {
    const savedIsActive = localStorage.getItem('isActive');
    if (savedIsActive !== null) {
      setIsActive(savedIsActive === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isActive', isActive);
  }, [isActive]);

  const toggleSubheadings = (subheading, mainHeading) => {
    setSelectedSubheading(subheading);
    setActiveMainHeading(mainHeading);
    setIsActive(true);
    handleSubheadingClick(subheading); 
  };
  
  

  const toggleVisibility = (heading) => {
    setOpenSubheadings((prevState) => ({
      ...prevState,
      [heading]: !prevState[heading],
    }));
  };

  return (
    <Sidebar isSidebarOpen={isSidebarOpen}>
      <SidebarContainer>
        <Top>
          <LogoContainer>
            <img style={{height:'50px',width:'200px'}}src={importedImages.mylogo} alt="Logo" />
          </LogoContainer>
        </Top>
        <TopHeading isActive={topHeadingActive} onClick={() => setTopHeadingActive(!topHeadingActive)}>
          <Icon src={importedImages.topIcon} alt="Top Icon" />
          <MainHeading isActive={topHeadingActive}>Top Heading</MainHeading>
        </TopHeading>
        <MenuItems>
          {Object.entries(menuData).map(([heading, data]) => (
            <MenuItem key={heading}>
              <HeadingContainer isActive={activeMainHeading === heading} onClick={() => toggleVisibility(heading)}>
                <Heading>
                  <Icon src={importedImages[data.icon]} alt="Icon" />
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <MainHeading isActive={activeMainHeading === heading}>{heading}</MainHeading>
                    <DownArrow src={importedImages.arrow} alt="Arrow" />
                  </div>
                </Heading>
              </HeadingContainer>
              <Subheadings>
                {data.subheadings.map((subheading) => (
             
<CustomLink
  key={subheading}
  onClick={() => handleSubheadingClick(subheading)} 
  isActive={selectedSubheading === subheading || (openSubheadings[heading] && selectedSubheading === null)}
  style={{ display: openSubheadings[heading] ? 'flex' : 'none' }}
>
  {subheading}
</CustomLink>
           
                ))}
                
              </Subheadings>
            </MenuItem>
          ))}
        </MenuItems>
      </SidebarContainer>
    </Sidebar>
  );
};

export default Leftpanel;
