import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import TodoItem from "./components/TodoItem";
import { List, Record } from "immutable";
import BG_IMAGE from "./static/images/todo-background.jpg";
import MenuBar from "./components/MenuBar";


const Container = styled.div`
  padding: 10px;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.h1`
  padding: 30px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #FFF;
  background: linear-gradient(0deg, rgba(0, 0, 0, .70), rgba(0, 0, 0, .70)), url(${BG_IMAGE});
  background-size: cover;
`;

const InputForm = styled.form`
  position: relative;
`;

const InputTodo = styled.input`
  display: inline-block;
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #BBB;
  border-radius: 3px;
  font-size: 14px;
  box-shadow: 2px 2px 2px #DDD;
  &::selection {
    background: #54da64;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(219, 1, 81, .25);
  }
`;

const StyledAddButton = styled.button`
  position: absolute;
  height: 50px;
  line-height: 0;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border-radius: 3px;
  border: none;
  padding: 0 20px;
  background-color: #000;
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
`;

const TodoItems = styled.ul`
  width: 100%;
`;


class App extends Component {

  static Todo = Record({ id: null, whatTodo: null, checked: false });

  state = {
    id: 0,
    filtered: null,
    todoItems: List([ new App.Todo({ id: 999, whatTodo: "디디 귀여워하기", checked: false }) ])
  };

  toggleCheckbox = (index) => {
    const { todoItems } = this.state;
    const currentStatus = todoItems.get(index).get('checked');
    this.setState({ todoItems: todoItems.update(index, todo => todo.set('checked', !currentStatus)) });
  };

  handleRemove = (index) => {
    const { todoItems } = this.state;
    this.setState({ todoItems: todoItems.delete(index) });
  };

  handleFilter = (status) => {
    this.setState({ filtered: status });
  };

  handleSubmit(e) {
    const { todo } = e.target.elements;
    const todoItem = new App.Todo({ id: this.state.id, whatTodo: todo.value, checked: false });
    this.setState({ id: this.state.id + 1 });
    this.setState({ todoItems: this.state.todoItems.push(todoItem) });
    todo.value = '';
    e.preventDefault();
  }

  render() {
    const { filtered, todoItems } = this.state;
    const todosToShow = filtered === null ? todoItems : todoItems.filter(item => item.checked === filtered);
    return (
      <Fragment>
        <Title>
          AWESOME TODO <span role="img" aria-label="dog">🐶</span>
        </Title>
        <Container>
          <InputContainer>
            <InputForm onSubmit={e => this.handleSubmit(e)}>
              <InputTodo type="text" name="todo" placeholder="What should I do..."/>
              <StyledAddButton type="submit">
                ADD
              </StyledAddButton>
            </InputForm>
          </InputContainer>
          <MenuBar
            left={this.state.todoItems.size}
            filter={this.handleFilter}
          />
          <TodoItems>
            {todosToShow.map((todo, index) => (
              <TodoItem
                key={index}
                onChange={this.toggleCheckbox.bind(this, index)}
                delete={this.handleRemove.bind(this, index)}
                {...todo.toJS()} />
            ))}
          </TodoItems>
        </Container>
      </Fragment>
    );
  }
}

export default App;
