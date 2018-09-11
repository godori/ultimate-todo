import React, { Component, Fragment } from 'react';
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import SortButton from "./components/SortButton";
import Navigation from "./components/NavBar";
import SearchForm from "./components/SearchForm";
import FloatPlusButton from "./components/FloatPlusButton";

class App extends Component {

  static ID = 0;
  static todoItem = { id: null, whatTodo: null, status: 1, createdAt: null };

  state = {
    todoItems: [],
    tabs: [ 'ALL', 'TODO', 'DONE' ],
    searchTerm: '',
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

  handleSearch = input => {
    this.setState({ searchTerm: input })
  };

  render() {
    const mapToComponent = todoItems => {
      return todoItems.map((todoItem, key) => {
        if (todoItem.whatTodo.includes(this.state.searchTerm)) {
          return (
            <li key={key}>
              <span>{todoItem.whatTodo}</span>
              <button onClick={this.handleRemove.bind(null, todoItem.id)}>x</button>
            </li>
          )
        }
      })
    };
    return (
      <Fragment>
        <Header/>
        <Navigation>
          <Tabs initialValue={0} tabNames={this.state.tabs}/>
          <SortButton/>
        </Navigation>
        <SearchForm searchHandler={this.handleSearch}/>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="whatTodo" placeholder="내일 오후 3시까지 우체국 가기" autoFocus={true}/>
          <button type="submit">submit</button>
        </form>
        {mapToComponent(this.state.todoItems)}
        <FloatPlusButton/>
      </Fragment>
    );
  }
}

export default App;
