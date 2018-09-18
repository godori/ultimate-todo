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
    status: 0,
    sortType: 'desc'
  };

  addTodoItem = whatTodo => {
    const ID = ++App.ID;
    const todoItem = { ...App.todoItem, id: ID, whatTodo, createdAt: new Date() };
    localStorage.setItem(ID.toString(), JSON.stringify(todoItem));
    this.setState({ todoItems: [ ...this.state.todoItems, todoItem ] });
  };

  removeTodoItem = id => {
    this.setState({ todoItems: [ ...this.state.todoItems.filter(todoItem => todoItem.id !== id) ] });
  };

  changeStatusTodoItem = id => {
    const updated = this.state.todoItems.map(todoItem => {
      if (todoItem.id === id) {
        todoItem.status *= -1;
      }
      return todoItem;
    });
    this.setState({ todoItems: [ ...updated ] });
  };

  filterTodoItem = tabName => {
    const tabNameStatus = {
      'ALL': 0,
      'TODO': -1,
      'DONE': 1
    };
    this.setState({ status: tabNameStatus[ tabName ] });
  };

  handleFormSubmit = e => {
    const { whatTodo } = e.target.elements;
    this.addTodoItem(whatTodo.value);
    whatTodo.value = '';
    e.preventDefault();
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

  sortByDate = () => {
    const { todoItems, sortType } = this.state;
    const newSortType = sortType === 'desc' ? 'asc' : 'desc';
    const sortingMethods = {
      desc(a, b) {
        return a.createdAt - b.createdAt
      },
      asc(a, b) {
        return b.createdAt - a.createdAt
      }
    };
    const sorted = [...todoItems].sort(sortingMethods[newSortType]);
    this.setState({ todoItems: [...sorted], sortType: newSortType });
  };

  render() {
    const mapToComponent = todoItems => {
      return todoItems
        .filter(todoItem => {
          return todoItem.whatTodo.includes(this.state.searchTerm) &&
            (this.state.status === 0 || todoItem.status === this.state.status);
        })
        .map((todoItem, key) => (
          <TodoItem
            key={key}
            handleCheck={this.changeStatusTodoItem.bind(null, todoItem.id)}
            handleRemove={this.removeTodoItem.bind(null, todoItem.id)}
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
            <Tabs initialValue={0} tabNames={this.state.tabs} onClick={this.filterTodoItem}/>
            <SortButton sortType={this.state.sortType} onClick={this.sortByDate}/>
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
