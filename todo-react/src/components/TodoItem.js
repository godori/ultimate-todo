import React, { Fragment } from 'react';
import styled, { css } from "styled-components";
import CheckedIcon from '../static/images/check.svg';
import TrashIcon from '../static/images/remove-btn.svg';


const StyledTodoItem = styled.article`
  display: flex;
  align-items: center;
  height: 75px;
  padding: 19px 20px 17px;
  border-bottom: 1px solid #E8E8E8;
  font-family: SFCompactText, sans-serif;
`;

const Content = styled.div`
  flex-grow: 5;
  padding-right: 5px;
  overflow: hidden;
  color: #DDD;
`;

const WhatTodo = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #444;
  ${props => props.completed && css`
    color: #B8B8B8;
    text-decoration: line-through;
  `}
`;

const Date = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.15;
  color: #FD9A9A;
  letter-spacing: -1px;
  ${props => props.completed && css`
    color: #B8B8B8;
    text-decoration: line-through;
  `}
`;

const TrashButton = styled.i`
  display: inline-block;
  width: 18px;
  height: 100%;
  color:#000;
  background-color: #FFE3E3;
  mask: url(${TrashIcon}) no-repeat 50% 50%;
  mask-size: contain;
  ${props => props.completed && css`
    background-color: #BBB;
  `}
`;

const CheckBox = styled.button`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid #DDDDDD;
  text-align: center;
  background-color: transparent;
  margin-right: 15px;
  
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
  const isCompleted = status > 0;
  return (
    <Fragment>
      <StyledTodoItem>
        <CheckBox onClick={handleCheck} className={status === 1 && 'active'}/>
        <Content>
          <WhatTodo completed={isCompleted}>{whatTodo}</WhatTodo>
          <Date completed={isCompleted}>{startDate.toLocaleString()} ~ {endDate.toLocaleString()}</Date>
        </Content>
        <TrashButton completed={isCompleted} onClick={handleRemove}/>
      </StyledTodoItem>
    </Fragment>
  );
};

export default TodoItem;
