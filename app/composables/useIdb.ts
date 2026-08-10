import type { Task } from '@/entity/tasks';

export default () => {
  const { $indexedDB } = useNuxtApp();

  const getAll = async (): Promise<Task[]> => {
    const db = await $indexedDB.getDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readonly');
      const store = tx.objectStore('todos');

      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as Task[]);
      request.onerror = () => reject(request.error);
    });
  };

  const add = async (task: Task): Promise<boolean> => {
    const db = await $indexedDB.getDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readwrite');
      const store = tx.objectStore('todos');

      const request = store.add(task);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  };

  const update = async (todo: Task): Promise<boolean> => {
    const db = await $indexedDB.getDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction('todos', 'readwrite');
      const store = tx.objectStore('todos');

      const request = store.put(todo);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  };

  const remove = async (id: IDBValidKey): Promise<boolean> => {
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
  };
};

