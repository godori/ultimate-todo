const TodoDB = {
  DB_NAME: 'TODO_APP',
  STORE_NAME: 'TODO',
  VERSION: 1,

  IDB: null,
  Store: null,
  Index: null,
  request: null,

  async init() {
    this.request = await indexedDB.open(this.DB_NAME, this.VERSION);
    this.request.onupgradeneeded = event => {
      this.IDB = this.request.result;
      this.Store = this.IDB.createObjectStore(this.STORE_NAME, { autoIncrement: true });
      this.Index = this.Store.createIndex("ID", "ID", { unique: true });
    };
    this.request.onsuccess = event => this.request = event.target.result;
    this.request.onerror = error => console.error(error);
    return this.request;
  },

  async addTodo(request, todoItem) {
    const tx = request.result.transaction(this.STORE_NAME, 'readwrite');
    const store = tx.objectStore(this.STORE_NAME);
    const save = await store.put(todoItem);
    return new Promise((resolve, reject) => {
      save.onsuccess = event => resolve(event.target.result);
      save.onerror = error => reject(error);
    });
  }
};

export default TodoDB;

// export default class TodoDB {
//
//
//
//   async scanTodo() {
//     const database = await indexedDB.open(TodoDB.DB_NAME, TodoDB.VERSION);
//     const transaction = database.transaction(TodoDB.STORE_NAME, 'readonly');
//     const store = transaction.objectStore(TodoDB.STORE_NAME);
//     const allTodoItems = await store.getAll();
//     database.close();
//     return allTodoItems;
//   }
//
//   startTransaction(mode = 'readwrite') {
//     this.request.onsuccess;
//     const transaction = TodoDB.IDB.transaction(TodoDB.STORE_NAME, mode);
//     const store = transaction.objectStore(TodoDB.STORE_NAME);
//     return { transaction, store };
//   }
//
//   addTodo(cb, todoItem) {
//     const { transaction, store } = this.startTransaction();
//     const work = store.put(todoItem);
//     work.onsuccess = event => cb(event.target.result);
//     work.onerror = error => console.error(error);
//     transaction.oncomplete = () => TodoDB.IDB.close();
//   };
// }
