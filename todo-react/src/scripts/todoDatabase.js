const TodoDB = {
  DB_NAME: 'TODO_APP',
  STORE_NAME: 'TODO',
  VERSION: 1,

  async init() {
    this.request = await indexedDB.open(this.DB_NAME, this.VERSION);
    return new Promise(((resolve, reject) => {
      this.request.onupgradeneeded = event => {
        const IDB = this.request.result;
        const store = IDB.createObjectStore(this.STORE_NAME, { autoIncrement: true });
        store.createIndex("ID", "ID", { unique: true });
      };
      this.request.onsuccess = event => resolve(event.target.result);
      this.request.onerror = error => reject(error);
    }));
  },

  prepare(IDB) {
    const tx = IDB.transaction(this.STORE_NAME, 'readwrite');
    return tx.objectStore(this.STORE_NAME);
  },

  async addTodo(IDB, todoItem) {
    const store = this.prepare(IDB);
    const save = await store.add(todoItem);
    return new Promise((resolve, reject) => {
      save.onsuccess = event => resolve(event.target.result);
      save.onerror = error => reject(error);
    });
  },

  async removeTodo(IDB, ID) {
    const store = this.prepare(IDB);
    const remove = await store.delete(ID);
    return new Promise((resolve, reject) => {
      remove.onsuccess = event => resolve(event.target.result);
      remove.onerror = error => reject(error);
    });
  },

  async updateTodo(IDB, updatedTodoItem, ID) {
    const store = this.prepare(IDB);
    const update = await store.put(updatedTodoItem, ID);
    return new Promise(((resolve, reject) => {
      update.onsuccess = event => resolve(event.target.result);
      update.onerror = error => reject(error);
    }));
  }
};

export default TodoDB;
