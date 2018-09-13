import React, { Component, Fragment } from 'react';
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import SortButton from "./components/SortButton";
import Navigation from "./components/NavBar";
import SearchForm from "./components/SearchForm";
import FloatPlusButton from "./components/FloatPlusButton";
import AddTodoOverlay from "./components/AddTodoOverlay";
import Container from "./components/Container";
import TodoItem from "./components/TodoItem";


class App extends Component {

  static ID = 0;
  static todoItem = { id: null, whatTodo: null, status: -1, createdAt: null };

  state = {
    todoItems: [ { id: 999, whatTodo: '디디 산책시키기', status: -1, createdAt: new Date() } ],
    tabs: [ 'ALL', 'TODO', 'DONE' ],
    searchTerm: '',
    overLayVisible: false,
  };

  addTodoItem = whatTodo => {
    const todoItem = { ...App.todoItem, id: ++App.ID, whatTodo, createdAt: new Date() };
    this.setState({ todoItems: [ ...this.state.todoItems, todoItem ] });
  };

  handleFormSubmit = e => {
    const { whatTodo } = e.target.elements;
    this.addTodoItem(whatTodo.value);
    whatTodo.value = '';
    e.preventDefault();
  };

  handleRemove = id => {
    this.setState({ todoItems: [ ...this.state.todoItems.filter(todoItem => todoItem.id !== id) ] });
  };

  toggleCheckBox = id => {
    const updated = this.state.todoItems.map(todoItem => {
      if (todoItem.id === id) {
        todoItem.status *= -1
      }
      return todoItem
    });
    this.setState({ todoItems: [ ...updated ] });
  };

  handleSearch = input => {
    this.setState({ searchTerm: input });
  };

  hideOverLay = () => {
    this.setState({ overLayVisible: false });
  };

  showOverLay = () => {
    this.setState({ overLayVisible: true });
  };

  render() {
    const mapToComponent = todoItems => {
      return todoItems
        .filter(todoItem => todoItem.whatTodo.includes(this.state.searchTerm))
        .map((todoItem, key) => (
          <TodoItem
            key={key}
            handleCheck={this.toggleCheckBox.bind(null, todoItem.id)}
            handleRemove={this.handleRemove.bind(null, todoItem.id)}
            whatTodo={todoItem.whatTodo}
            status={todoItem.status}
            startDate={todoItem.createdAt}
            endDate={todoItem.createdAt}/>
        ));
    };
    return (
      <Fragment>
        <Container>
          <Header/>
          <Navigation>
            <Tabs initialValue={0} tabNames={this.state.tabs}/>
            <SortButton/>
          </Navigation>
          <SearchForm handleSearch={this.handleSearch}/>
          {mapToComponent(this.state.todoItems)}
          <FloatPlusButton onClick={this.showOverLay}/>
          <AddTodoOverlay
            visible={this.state.overLayVisible}
            onClose={this.hideOverLay}
            onSubmit={this.handleFormSubmit}/>
        </Container>
      </Fragment>
    );
  }
}

export default App;
