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

import TodoDB from './scripts/todoDatabase';
import moment from "moment";

class App extends Component {

  static todoItem = { whatTodo: null, status: -1, startDate: null, endDate: null };
  static dateFormat = 'YYYY-MM-DD HH:mm:ss';
  state = {
    TODO_DB: Object.create(TodoDB),
    IDB: null,
    todoItems: [],
    tabs: [ 'ALL', 'TODO', 'DONE' ],
    searchTerm: '',
    overLayVisible: false,
    status: 0,
    sortType: 'desc',
  };

  addTodoItem = whatTodo => {
    const now = moment().format(App.dateFormat);
    let todoItem = { ...App.todoItem, whatTodo, startDate: now, endDate: now };
    this.state.TODO_DB.addTodo(this.state.IDB, todoItem)
      .then(res => {
        todoItem = { ...todoItem, ID: res };
        this.setState({ todoItems: [ ...this.state.todoItems, todoItem ] });
      })
      .catch(err => console.error(err));
  };

  removeTodoItem = id => {
    this.state.TODO_DB.removeTodo(this.state.IDB, id)
      .then(res => this.setState({ todoItems: [ ...this.state.todoItems.filter(todoItem => todoItem.ID !== id) ] }))
      .catch(err => console.error(err));
  };

  changeStatusTodoItem = id => {
    const updated = this.state.todoItems.map(todoItem => {
      if (todoItem.ID === id) {
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
      desc: (a, b) => a.startDate - b.startDate,
      asc: (a, b) => b.startDate - a.startDate
    };
    const sorted = [ ...todoItems ].sort(sortingMethods[ newSortType ]);
    this.setState({ todoItems: [ ...sorted ], sortType: newSortType });
  };

  componentDidMount() {
    this.state.TODO_DB.init().then(DB => {
      this.setState({ IDB: DB });
      const { STORE_NAME } = this.state.TODO_DB;
      const tx = DB.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const scanKeys = store.getAllKeys();
      scanKeys.onsuccess = scanKeysEvent => {
        const { result } = scanKeysEvent.target;
        if (!result.length) {
          return;
        }
        const start = [ ...result ].shift();
        const end = [ ...result ].pop();
        const scan = store.getAll(IDBKeyRange.bound(start, end));
        scan.onsuccess = scanEvent => {
          const todoItems = scanEvent.target.result.map((value, key) => {
            const ID = scanKeysEvent.target.result[ key ];
            return { ...value, ID };
          });
          this.setState({ todoItems });
        };
      };
      scanKeys.onerror = error => console.error(error);
    });
  }

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
            handleCheck={this.changeStatusTodoItem.bind(null, todoItem.ID)}
            handleRemove={this.removeTodoItem.bind(null, todoItem.ID)}
            whatTodo={todoItem.whatTodo}
            status={todoItem.status}
            startDate={todoItem.startDate}
            endDate={todoItem.endDate}/>
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
          {this.state.todoItems && mapToComponent(this.state.todoItems)}
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
