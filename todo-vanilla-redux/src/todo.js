const Todo = {
  init(id, text) {
    this.id = id;
    this.text = text;
    return this;
  },
  id: null,
  text: null,
  status: 0,
  get $view() {
    return document.createRange().createContextualFragment(`<li data-key="${this.id}">${this.text}</li>`);
  },
};

export default Todo;
