import React, { Fragment } from 'react';
import styled from "styled-components";
import Button from "../Button";

const StyledMenuItem = styled.li`
  margin: 0 30px;
  color: #BBB;
`;

const StyledButton = styled(Button)`
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


const MenuItem = ({ onClick, }) => {
  return (
    <Fragment>
      <StyledMenuItem>
        <StyledButton {onClick}></StyledButton>
      </StyledMenuItem>
    </Fragment>
  );
};

export default MenuItem;