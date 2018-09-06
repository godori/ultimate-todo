import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import TodoItem from "./components/TodoItem";
import { Map, List, Record } from "immutable";


const Container = styled.div`
  padding: 10px;
`;

const InputContainer = styled.div`
`;

const InputForm = styled.form`
  position: relative;
`;

const InputTodo = styled.input`
  display: inline-block;
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #BBB;
  border-radius: 3px;
  font-size: 14px;
  &::selection {
    background: #54da64;
  }
`;

const StyledAddButton = styled.button`
  position: absolute;
  height: 40px;
  line-height: 0;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border-radius: 3px;
  border: none;
  padding: 0 20px;
  background-color: #000;
  color: #FFF;
`;

const TodoItems = styled.ul`
  width: 100%;
`;


class App extends Component {

  static Todo = Record({ id: null, whatTodo: null, checked: false });

  state = {
    id: 0,
    todoItems: List([ new App.Todo({ id: 999, whatTodo: "디디 귀여워하기", checked: false }) ])
  };

  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    const { todo } = e.target.elements;
    const todoItem = new App.Todo({ id: this.state.id, whatTodo: todo.value, checked: false });
    this.setState({ id: this.state.id + 1 });
    this.setState({ todoItems: this.state.todoItems.push(todoItem) });
    todo.value = '';
    e.preventDefault();
  }

  toggleCheckbox = (index) => {
    const { todoItems } = this.state;
    const currentStatus = todoItems.get(index).get('checked');
    this.setState({ todoItems: todoItems.update(index, todo => todo.set('checked', !currentStatus)) });
  };

  render() {
    return (
      <Fragment>
        <Container>
          <InputContainer>
            <InputForm onSubmit={e => this.handleSubmit(e)}>
              <InputTodo type="text" name="todo" placeholder="What should I do..."/>
              <StyledAddButton type="submit">
                ADD
              </StyledAddButton>
            </InputForm>
          </InputContainer>
          <TodoItems>
            {this.state.todoItems.map((todo, index) => (
              <TodoItem key={index} onChange={this.toggleCheckbox.bind(this, index)} {...todo.toJS()} />
            ))}
          </TodoItems>
        </Container>
      </Fragment>
    );
  }
}

export default App;
