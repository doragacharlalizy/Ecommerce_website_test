import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1e1e1e;
  color: white;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
  margin-top: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  max-width: 1200px;
  margin: 0 auto;

  /* For small screens, adjust grid columns */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-content: center;
    text-align: center;
  }
`;

const Grid = styled.div`
  /* No changes in styles */
`;

const Heading = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
  cursor: pointer; /* Add cursor pointer for indicating interaction */
`;

const SubHeading = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: white;
  ;
  font-size: 24px;

  &:hover {
    color: #4267b2; /* Facebook color */
  }
`;

const AccordionContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  @media (min-width: 768px) {
    display: block;
  }
`;

const UpperFooter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FooterContainer>
      <GridContainer>
        <Grid>
          <Heading onClick={toggleAccordion}>Top Categories</Heading>
          <AccordionContent isOpen={isOpen}>
            <SubHeading>Jean</SubHeading>
            <SubHeading>Tops</SubHeading>
            <SubHeading>Belts</SubHeading>
            <SubHeading>Hoodies</SubHeading>
          </AccordionContent>
        </Grid>
        <Grid>
          <Heading onClick={toggleAccordion}>Explore</Heading>
          <AccordionContent isOpen={isOpen}>
            <SubHeading>New Arrivals</SubHeading>
            <SubHeading>Top Brands</SubHeading>
            <SubHeading>Trending</SubHeading>
          </AccordionContent>
        </Grid>
        <Grid>
          <Heading onClick={toggleAccordion}>Help</Heading>
          <AccordionContent isOpen={isOpen}>
            <SubHeading>FAQs</SubHeading>
            <SubHeading>Returns</SubHeading>
            <SubHeading>Shipping</SubHeading>
          </AccordionContent>
        </Grid>
        <Grid>
          <Heading onClick={toggleAccordion}>Company</Heading>
          <AccordionContent isOpen={isOpen}>
            <SubHeading>About Us</SubHeading>
            <SubHeading>Careers</SubHeading>
            <SubHeading>Contact Us</SubHeading>
          </AccordionContent>
        </Grid>
        <Grid>
          <Heading>Email Us</Heading>
          <SubHeading>info@example.com</SubHeading>
        </Grid>
        <Grid>
          <Heading>Social</Heading>
          <SocialContainer>
            <SocialIcon href="https://www.facebook.com/" target="_blank">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/" target="_blank">
              <FaInstagram />
            </SocialIcon>
          </SocialContainer>
        </Grid>
      </GridContainer>
    </FooterContainer>
  );
};

export default UpperFooter;
