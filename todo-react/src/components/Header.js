import React, { Fragment } from 'react';
import styled from "styled-components";
import backgroundImage from '../static/images/bg_image_@2x.jpg';

const StyledHeader = styled.header`
  max-width: 1024px;
  height: 140px;
  padding: 19px 25px;
  background: linear-gradient(0deg, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(${backgroundImage});
  background-size: cover;
`;

const Title = styled.h1`
  width: 158px;
  line-height: 1.21;
  font-family: "SF Compact Display", sans-serif;
  font-size: 28px;
  font-weight: 600;
  text-align: left;
  color: #FFF;
`;

const TitleHighlighted = styled.span`
  color: #00FFE2;  
`;

const Header = () => {
  return (
    <Fragment>
      <StyledHeader>
        <Title>
          YESTERDAY YOU SAID <TitleHighlighted>TOMORROW</TitleHighlighted>!
        </Title>
      </StyledHeader>
    </Fragment>
  );
};

export default Header;
