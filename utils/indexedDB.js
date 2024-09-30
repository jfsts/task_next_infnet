import { openDB } from "idb";

const dbName = 'tasks-db';

export async function initDB() {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      }
    }
  });
}

export async function addTask(task) {
  const db = await initDB();
  const tx = db.transaction('tasks', 'readwrite'); 
  const store = tx.objectStore('tasks');
  await store.add(task); 
  await tx.done; 
}

export async function getTasks() {
  const db = await initDB();
  const tx = db.transaction('tasks', 'readonly'); 
  const store = tx.objectStore('tasks');
  const allTasks = await store.getAll(); 
  await tx.done; 
  return allTasks;
}

export async function deleteTask(id) {
  const db = await initDB();
  const tx = db.transaction('tasks', 'readwrite');
  const store = tx.objectStore('tasks');
  await store.delete(id);
  await tx.done;
}

export async function updateTask(id, updatedFields) {
  const db = await initDB();
  const tx = db.transaction('tasks', 'readwrite');
  const store = tx.objectStore('tasks');
  const task = await store.get(id);

  if (!task) {
    throw new Error('Tarefa não encontrada');
  }

  const updatedTask = { ...task, ...updatedFields };
  await store.put(updatedTask);
  await tx.done;
}