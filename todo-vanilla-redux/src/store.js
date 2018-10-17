import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';

const addTodo = (text, status = 0) => ({
  type: ADD_TODO,
  text,
  status,
});

const initialState = {
  ID: 0,
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const { text, status } = action;
      state.ID++;
      return {
        ...state,
        todos: [...state.todos, { ID: state.ID, text, status }],
      };
    default:
      return state;
  }
};

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export { store, addTodo };
