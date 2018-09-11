import React, { Fragment } from 'react';
import styled, { keyframes } from "styled-components";
import Plus from '../static/images/plus.svg';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const Button = styled.button`
  position: fixed;
  text-align: center;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #222;
  border-radius: 100%;
  border: none;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .3);
  padding: 0;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
   
  &:hover {
    animation: ${bounce} .5s linear alternate;
  }
`;

const PlusIcon = styled.i`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #FFF;
  mask: url(${Plus}) no-repeat 50% 50%;
  mask-size: cover;
`;

const FloatPlusButton = () => {
  return (
    <Fragment>
      <Button>
        <PlusIcon/>
      </Button>
    </Fragment>
  );
};

export default FloatPlusButton;
