import React, { Component, Fragment } from 'react';
import styled from "styled-components";


const Todo = styled.li`
  display: flex;
  width: 100%;
  height: 40px;
  margin-top: 10px;
  padding-left: 15px;
  border: 1px solid #DDD;
  box-shadow: 1px 1px 2px #DDD;
  font-size: 14px;
`;


const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  color: #444;
  cursor: pointer;
`;


const StyledCheckBox = styled.input`
  display: none;
  
  & + label:before {
    display: inline-block;
    content: '';
    border: 1px solid rgba(0, 0, 0, .15);
    width: 16px;
    height: 16px;
    margin-right: 15px;
  }
  &:hover + label:before {
    transition: opacity 0.5s ease-in-out;
    content: '\\2715';
    font-size: 12px;
    color: white;
    border: 1px solid rgba(219, 1, 81, .15);
    background-color: rgba(219, 47, 108, .15);
    text-align: center;
  }
  &:checked + label:before {
    content: '\\2715';
    font-size: 12px;
    color: white;
    border: 1px solid #DB0151;
    background-color: #DB2F6C;
    text-align: center;
  }
  &:checked + label > span {
    text-decoration: line-through;
  }
`;


class TodoItem extends Component {
  render() {
    const { id } = this.props;
    return (
      <Fragment>
        <Todo>
          <StyledCheckBox id={id} onChange={this.props.onChange} type="checkbox"/>
          <StyledLabel htmlFor={id}><span>{this.props.whatTodo}</span></StyledLabel>
        </Todo>
      </Fragment>
    );
  }
}

TodoItem.defaultProps = {
  whatTodo: 'TEST'
};

export default TodoItem;