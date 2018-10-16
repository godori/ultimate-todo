import { store, increment, decrement } from './store';

const $display = document.querySelector('.display');
const $plusButton = document.querySelector('.plus');
const $minusButton = document.querySelector('.minus');

const render = () => {
  const state = store.getState();
  $display.innerText = state.counter;
};

render();
store.subscribe(render);

$plusButton.onclick = () => store.dispatch(increment());
$minusButton.onclick = () => store.dispatch(decrement());
