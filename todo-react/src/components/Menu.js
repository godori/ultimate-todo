import React, { Fragment } from 'react';
import styled from "styled-components";


const MenuBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menus = styled.ul`
  display: flex;
  align-items: center;
  flex-basis: 60%;
`;


const Menu = ({ left, filter, active = '', clearCompleted }) => {
  return (
    <Fragment>
      <MenuBarContainer>
        <span>{left} {left === 1 ? 'item' : 'items'} left</span>
        <Menus>
          <Menu isActive={active === ''}>
            <button onClick={filter.bind(null, null)}>All</button>
          </Menu>
          <Menu isActive={active === ''}>
            <button onClick={filter.bind(null, false)}>Doing</button>
          </Menu>
          <Menu isActive={active === ''}>
            <button onClick={filter.bind(null, true)}>Completed</button>
          </Menu>
        </Menus>
      </MenuBarContainer>
    </Fragment>
  );
};

const Item = () => {}

export default Menu