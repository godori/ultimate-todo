import React, { Component, Fragment } from 'react';
import Header from "./components/Header";
import TabMenu from "./components/TabMenu"
import Tab from "./components/Tab";
import SortButton from "./components/SortButton";

class App extends Component {

  static ID = 0;
  static todoItem = { id: null, whatTodo: null, status: 1, createdAt: null };

  state = {
    todoItems: []
  };

  addTodoItem = whatTodo => {
    const todoItem = { ...App.todoItem, id: ++App.ID, whatTodo, createdAt: new Date() };
    this.setState({ todoItems: [...this.state.todoItems, todoItem] });
  };

  handleFormSubmit = e => {
    const { whatTodo } = e.target.elements;
    this.addTodoItem(whatTodo.value);
    whatTodo.value = '';
    e.preventDefault();
  };

  handleRemove = id => {
    this.setState({ todoItems: [...this.state.todoItems.filter(todoItem => todoItem.id !== id)] })
  };

  render() {
    return (
      <Fragment>
        <Header/>
        <TabMenu>
          <Tab isActive={true} label="ALL" />
          <Tab isActive={false} label="TODO" />
          <Tab isActive={false} label="DONE" />
          <SortButton/>
        </TabMenu>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="whatTodo" placeholder="내일 오후 3시까지 우체국 가기" autoFocus={true}/>
          <input type="submit" value="submit"/>
        </form>
        {
          this.state.todoItems.map((todoItem, key) => (
            <li key={key}>
              <span>{todoItem.whatTodo}</span>
              <button onClick={this.handleRemove.bind(null, todoItem.id)}>x</button>
            </li>
          ))
        }
      </Fragment>
    );
  }
}

export default App;
