import React, { Fragment } from 'react';
import styled from "styled-components";
import CheckedIcon from '../static/images/check.svg';
import TrashIcon from '../static/images/remove-btn.svg';


const StyledTodoItem = styled.article`
  display: flex;
  align-items: center;
  height: 75px;
  padding: 19px 20px 17px;
  border-bottom: 1px solid #E8E8E8;
`;

const Content = styled.p`
  flex-grow: 5;
`;

const WhatTodo = styled.span`
  
`;

const Date = styled.span`
  
`;

const TrashButton = styled.i`
  display: inline-block;
  width: 18px;
  height: 20px;
  color:#000;
  background-color: #BBB;
  mask: url(${TrashIcon}) no-repeat 50% 50%;
  mask-size: cover;
`;

const CheckBox = styled.button`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid #DDDDDD;
  text-align: center;
  
  &:focus {
    outline: none;
  }

  &.active {
    border: none;
    background: #00FFE2 url(${CheckedIcon}) no-repeat center;
    background-size: 16px 11px;
  }
`;

const TodoItem = ({ whatTodo, status, startDate, endDate, handleCheck, handleRemove }) => {
  return (
    <Fragment>
      <StyledTodoItem>
        <CheckBox onClick={handleCheck} className={status === 1 && 'active'}/>
        <Content>
          {whatTodo}
        </Content>
        <TrashButton onClick={handleRemove} />
      </StyledTodoItem>
    </Fragment>
  );
};

export default TodoItem;
