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

const Menu = styled.li`
  margin: 0 30px;
  color: #BBB;
  button {
    position: relative;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      bottom: -5px;
      left: 0;
      border-bottom: 2px solid rgba(219,112,147,0.5);
      transform: scaleX(0);
      transition: transform 200ms ease-in-out;
    }
    &:hover:after {
      transform: scaleX(1);
    }
    &:focus {
      outline: none;
    }
  }
`;

const ClearAll = Menu.extend`
  margin: 0 0 0 auto;
  button {
    color: #BBB;
  }
`;

const MenuBar = ({ left, filter, active = '', clearCompleted }) => {
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
          <ClearAll>
            <button>Clear Completed</button>
          </ClearAll>
        </Menus>
      </MenuBarContainer>
    </Fragment>
  );
};

export default MenuBar;
