import styled from "styled-components";
import React, { Fragment } from 'react';

const Title = styled.h1`
  padding: 30px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.color || 'black'};
  background: linear-gradient(0deg, rgba(0, 0, 0, .70), rgba(0, 0, 0, .70)), ${props => props.background && `url(${props.background})`};
  background-size: cover;
`;


const Header = ({ textColor, bgImage, children }) => {
  return (
    <Fragment>
      <Title background={bgImage} color={textColor}>
        {children}
      </Title>
    </Fragment>
  );
};

export default Header;
