import React from 'react';
import styled from 'styled-components';
import importedImages from './images';

const FooterContainer = styled.div`
  height: 100%;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  font-family: inter, sans-serif;
  border-top: 1px solid white;
  justify-content: space-between;
  padding: 32px 100px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    gap: 16px;
  }
`;

const Image20 = styled.img`
  width: 156px;
  height: 40px;
  margin-right: 160px;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

const NamesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Name = styled.p`
  display: flex;
  align-items: center;
  gap: 32px;

  font-weight: 400px;
  line-height: 20px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const GradientHeading = styled.h1`
  background: -webkit-linear-gradient(#F0C14B, #7E7E7E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <GradientHeading>Trendy Fashoins</GradientHeading>
      <NamesContainer>
        <Name>Copyright © E-Commerce site</Name>
        <Name>All Rights Reserved</Name>
      </NamesContainer>
    </FooterContainer>
  );
};

export default Footer;
