import React, { Fragment } from 'react';
import styled from "styled-components";


const TabContainer = styled.li`
  display: inline-block;
  position: relative;
  margin-right: 23px;
  font-family: SFCompactText, sans-serif;
  font-size: 16px;
  font-weight: 600;
  
  &:last-child {
    margin-right: 0;
  }
`;

const StyledPane = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #B8B8B8;
  transition: color 100ms ease-in-out;
  
  &.active {
    color: #000000;
  }
  
  &:hover {
    color: #000000;
  }
  
  &.active:after {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    bottom: -15px;
    left: 0;
    border-bottom: 2px solid #000;
  }
`;

const Pane = ({ onClick, label, isActive }) => {
  return (
    <Fragment>
      <TabContainer>
        <StyledPane className={isActive && 'active'} onClick={onClick}>{label}</StyledPane>
      </TabContainer>
    </Fragment>
  );
};

export default Pane;
