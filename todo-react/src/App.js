import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import TodoItem from "./components/TodoItem";

const InputContainer = styled.div`
  padding: 10px;
`;

const InputForm = styled.form`
  position: relative;
`;

const InputTodo = styled.input`
  display: inline-block;
  width: 100%;
  height: 40px;
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
  right: -3px;
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
    this.setState({ todoItems: [ ...this.state.todoItems, { whatTodo: todo.value, completed: false } ] });
    e.preventDefault();
    todo.value = '';
  }

  handleComplete(fromChild) {
    console.log(fromChild);
  }

  render() {
    return (
      <Fragment>
        <InputContainer>
          <InputForm onSubmit={e => this.handleSubmit(e)}>
            <InputTodo type="text" name="todo" placeholder="What should I do..."/>
            <StyledAddButton type="submit">
              ADD
            </StyledAddButton>
          </InputForm>
        </InputContainer>
        <TodoItems>
          {this.state.todoItems.map((todoItem, index) => <TodoItem key={index} onChange={this.handleComplete} {...todoItem} />)}
        </TodoItems>
      </Fragment>
    );
  }
}

export default App;
