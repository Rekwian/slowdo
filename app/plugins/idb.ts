export default defineNuxtPlugin(() => {
  let db: IDBDatabase | null = null;

  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open('todochill', 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const database = (event.target as IDBOpenDBRequest).result;

        if (!database.objectStoreNames.contains('todos')) {
          database.createObjectStore('todos', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      };

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = (event: Event) => {
        const target = event.target as IDBOpenDBRequest;

        db = target.result;
        resolve(db);
      };
    });
  };

  const getDB = async (): Promise<IDBDatabase> => {
    if (db) return db;
    return await openDB();
  };

  return {
    provide: {
      indexedDB: {
        getDB,
      },
    },
  };
});
