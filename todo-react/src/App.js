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

  static todoItem = { ID: null, whatTodo: null, status: -1, startDate: null, endDate: null };
  static dateFormat = 'YYYY-MM-DD';
  state = {
    TODO_DB: Object.create(TodoDB),
    IDB: null,
    todoItems: [],
    tabs: [ 'ALL', 'TODO', 'DONE' ],
    searchTerm: '',
    overLayVisible: false,
    currentFilteredStatus: 0,
    sortType: 'asc',
  };

  addTodoItem = (whatTodo, endDate) => {
    let todoItem = { ...App.todoItem, whatTodo, startDate: moment().format(App.dateFormat), endDate };
    this.state.TODO_DB.addTodo(this.state.IDB, todoItem)
      .then(res => {
        todoItem = { ...todoItem, ID: res };
        this.state.TODO_DB.updateTodo(this.state.IDB, todoItem, res);
        this.setState({ todoItems: [ ...this.state.todoItems, todoItem ] });
      })
      .catch(err => console.error(err));
  };

  changeTodoText = (ID, event) => {
    if (event.type === 'blur') {
      const text = event.target.value;
      const todoItems = this.state.todoItems.map(todoItem => {
        if (todoItem.ID === ID) {
          todoItem.whatTodo = text;
        }
        this.state.TODO_DB.updateTodo(this.state.IDB, todoItem, ID);
        return todoItem;
      });
      this.setState({ todoItems });
    }
  };

  removeTodoItem = ID => {
    this.state.TODO_DB.removeTodo(this.state.IDB, ID)
      .then(res => this.setState({ todoItems: [ ...this.state.todoItems.filter(todoItem => todoItem.ID !== ID) ] }))
      .catch(err => console.error(err));
  };

  changeStatusTodoItem = ID => {
    const todoItems = this.state.todoItems.map(todoItem => {
      if (todoItem.ID === ID) {
        todoItem.status *= -1;
      }
      this.state.TODO_DB.updateTodo(this.state.IDB, todoItem, ID);
      return todoItem;
    });
    this.setState({ todoItems });

  };

  changeTodoDate = (ID, dateType, date) => {
    const todoItems = this.state.todoItems.map(todoItem => {
      if (todoItem.ID === ID) {
        const isFutureOfEndDate = dateType === 'startDate' && date.isAfter(moment(todoItem.endDate), 'date');
        if (isFutureOfEndDate) {
          alert('휴먼...미래에서 왔습니까? 🐶');
          return todoItem;
        }
        todoItem[ dateType ] = moment(date).format(App.dateFormat);
        this.state.TODO_DB.updateTodo(this.state.IDB, todoItem, ID);
      }
      return todoItem;
    });
    this.setState({ todoItems });
    this.sortByDate(null, this.state.sortType);
  };

  filterTodoItem = tabName => {
    const tabNameStatus = {
      'ALL': 0,
      'TODO': -1,
      'DONE': 1
    };
    this.setState({ currentFilteredStatus: tabNameStatus[ tabName ] });
  };

  handleFormSubmit = event => {
    const whatTodo = Array.from(event.target.elements).find(element => element.id === 'whatTodo');
    const date = Array.from(event.target.elements).find(element => element.id === 'date').value;
    whatTodo.value && this.addTodoItem(whatTodo.value, date);
    whatTodo.value = '';
    event.preventDefault();
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

  sortByDate = (event, defaultSortType = null) => {
    const { todoItems, sortType } = this.state;
    const newSortType = defaultSortType || (sortType === 'desc' ? 'asc' : 'desc');
    const sortingMethods = {
      desc: (a, b) => moment(a.endDate) - moment(b.endDate),
      asc: (a, b) => moment(b.endDate) - moment(a.endDate)
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
            (this.state.currentFilteredStatus === 0 || todoItem.status === this.state.currentFilteredStatus);
        })
        .map(todoItem => (
          <TodoItem
            key={todoItem.ID}
            handleCheck={this.changeStatusTodoItem.bind(null, todoItem.ID)}
            handleTextEdit={this.changeTodoText.bind(null, todoItem.ID)}
            handleDateEdit={this.changeTodoDate.bind(null, todoItem.ID)}
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
