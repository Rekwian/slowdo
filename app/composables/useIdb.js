export default () => {
  const { $indexedDB } = useNuxtApp();

  const getAll = async () => {
    const db = await $indexedDB.getDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readonly');
      const store = tx.objectStore('todos');

      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const getTask = async () => {
    const db = await $indexedDB.getDB();

    const result = new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readonly');
      const store = tx.objectStore('todos');

      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const add = async (task) => {
    const db = await $indexedDB.getDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readwrite');
      const store = tx.objectStore('todos');

      const request = store.add(task);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const update = async (todo) => {
    const db = await $indexedDB.getDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readwrite');
      const store = tx.objectStore('todos');

      const request = store.put(todo);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  };

  const remove = async (id) => {
    const db = await $indexedDB.getDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readwrite');
      const store = tx.objectStore('todos');

      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  };

  return {
    getAll,
    add,
    update,
    remove,
    getTask,
  };
};
