export default defineNuxtPlugin(() => {
  let db = null;

  const openDB = () => new Promise((resolve) => {
    const request = indexedDB.open('todochill', 1);
    
    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      if (!database.objectStoreNames.contains('todos')) {
        database.createObjectStore('todos', {
          keyPath: 'id',
          autoIncrement: true
        })
      }
    }

    request.onerror = () => reject(request.error);

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
  })

  const getDB = async () => {
    if (db) return db;
    return await openDB();
  };

  return {
    provide: {
      indexedDB: {
        getDB
      },
    }
  }
});
