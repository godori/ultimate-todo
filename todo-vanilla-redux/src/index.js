import { addTodo, store } from './store';
import Todo from './todo';

const $todoInput = document.querySelector('#todo');
const $submitButton = document.querySelector('.submit-button');
const $todoContainer = document.querySelector('.todos');

const renderTodoItem = () => {
  const state = store.getState();
  const { id, todos } = state;
  if (todos.length) {
    const { text } = todos[todos.length - 1];
    const todo = Object.create(Todo).init(id, text);
    const $todoFragment = todo.$view;
    $todoContainer.appendChild($todoFragment);
  }
};

renderTodoItem();
store.subscribe(renderTodoItem);

$submitButton.onclick = () => {
  const { value } = $todoInput;
  store.dispatch(addTodo(value));
};
