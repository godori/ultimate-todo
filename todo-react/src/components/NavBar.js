import styled from "styled-components";
import React, { Fragment } from 'react';

const Nav = styled.nav`
  height: 50px;
  padding: 15px 20px 15px 25px;
  background-color: #FAFAFA;
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

const Navigation = ({ children }) => {
  return (
    <Fragment>
      <Nav>
        {children}
      </Nav>
    </Fragment>
  );
};

export default Navigation;
