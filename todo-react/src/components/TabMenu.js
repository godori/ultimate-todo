import React, { Fragment } from 'react';
import styled from "styled-components";

const Nav = styled.nav`
  height: 50px;
  padding: 15px 20px 15px 25px;
  background-color: #FAFAFA;
`;

const Menu = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;  
`;

const TabMenu = ({ children }) => {
  return (
    <Fragment>
      <Nav>
        <Menu>
          {children}
        </Menu>
      </Nav>
    </Fragment>
  );
};

export default TabMenu;
