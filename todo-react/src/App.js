import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import TodoItem from "./components/TodoItem";

const InputForm = styled.form`
  display: inline-block;
  position: relative;
  width: 100%;
  padding: 10px;
`;

const InputTodo = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 40px 0 0;
  border: 1px solid #BBB;
  border-radius: 3px;
  &::selection {
    background: #54da64;
  }
`;

const StyledAddButton = styled.button`
  position: absolute;
  height: 40px;
  line-height: 0;
  top: 50%;
  right: 1px;
  transform: translateY(-50%);
  border-radius: 3px;
  border: none;
  padding: 0 20px;
  background-color: #000;
  color: #FFF;
`;

const TodoItems = styled.ul`
  
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: []
    };
  }

  handleSubmit(e) {
    const { todo } = e.target.elements;
    this.setState({ todoItems: [ ...this.state.todoItems, todo.value ] });
    e.preventDefault();
    todo.value = '';
  }

  render() {
    return (
      <Fragment>
        <InputForm onSubmit={e => this.handleSubmit(e)}>
          <InputTodo type="text" name="todo" placeholder="What should I do..."/>
          <StyledAddButton type="submit">
            ADD
          </StyledAddButton>
        </InputForm>
        <TodoItems>
          {this.state.todoItems.map((todoItem, index) => <TodoItem key={index} whatTodo={todoItem}/>)}
        </TodoItems>
      </Fragment>
    );
  }
}

export default App;
