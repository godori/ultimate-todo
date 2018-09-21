export default class TodoDB {
  static DB_NAME = 'TODO_APP';
  static STORE_NAME = 'TODO';
  static VERSION = 1;

  static IDB;
  static Index;
  static Store;

  constructor() {
    this.request = indexedDB.open(TodoDB.DB_NAME, TodoDB.VERSION);
    this.request.onupgradeneeded = event => {
      TodoDB.IDB = this.request.result;
      TodoDB.Store = TodoDB.IDB.createObjectStore(TodoDB.STORE_NAME, { autoIncrement: true });
      TodoDB.Index = TodoDB.Store.createIndex("ID", "ID", { unique: true });
    };
    this.request.onsuccess = event => {
      TodoDB.IDB = this.request.result;
    };
    this.request.onerror = error => {
      console.error(error);
    };
  }

  startTransaction(mode = 'readwrite') {
    TodoDB.IDB = this.request.result;
    const transaction = TodoDB.IDB.transaction(TodoDB.STORE_NAME, mode);
    const store = transaction.objectStore(TodoDB.STORE_NAME);
    return { transaction, store };
  }

  addTodo(cb, todoItem) {
    const { transaction, store } = this.startTransaction();
    const work = store.put(todoItem);
    work.onsuccess = event => cb(event.target.result);
    work.onerror = error => console.error(error);
    transaction.oncomplete = () => TodoDB.IDB.close();
  };
}
