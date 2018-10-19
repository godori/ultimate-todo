import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = (text, status = 0) => ({
  type: ADD_TODO,
  text,
  status,
});

const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

const initialState = {
  ID: 0,
  todos: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          ...{
            /* eslint-disable no-param-reassign */
            ID: ++state.ID,
            /* eslint-enable no-param-reassign */
            text: action.text,
            status: action.status,
          },
        },
      };
    case TOGGLE_TODO:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const { __REDUX_DEVTOOLS_EXTENSION__ } = window;
const store = createStore(reducer, __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__());

export { store, addTodo, toggleTodo };
