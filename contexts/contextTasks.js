'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { addTask, getTasks, deleteTask} from "../utils/indexedDB.js";  


const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
}


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const loadTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };
    loadTasks();
  }, []);

  const addNewTask = async (task) => {
   
    await addTask(task);
     const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
  };

  const deleteTasks = async (task) => {
   
    await deleteTask(task);
     const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
  };

  const AuthContext = createContext();



  return (
    <TaskContext.Provider value={{ tasks, addNewTask, deleteTasks }}>
          {children}
    </TaskContext.Provider>
  );
}