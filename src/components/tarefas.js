'use client';

import { useState, useEffect } from 'react';
import { useTaskContext } from '../../contexts/contextTasks';
import { updateTask, getTasks } from '../../utils/indexedDB';
import { AnalyticsInit } from '../../utils/firebaseAuth'; 
import { logEvent } from "firebase/analytics";

export default function Tarefas() {
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [dados, setDados] = useState([]);

  const { tasks, addNewTask, deleteTasks } = useTaskContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `Data ${day}/${month}/${year} Horário: ${hours}:${minutes}`;
  };

  useEffect(() => {
    
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.data) - new Date(b.data));
    setDados(sortedTasks);
  }, [tasks]);

  const handleDeleteTask = async (e, taskId) => {
    e.preventDefault();
    await deleteTasks(taskId);
    const updatedTasks = await getTasks();
    setDados(updatedTasks);
    const analytics = await AnalyticsInit();
    if (analytics) {
      logEvent(analytics, 'task_deleted', {
        task_id: taskId,
      });
      console.log("Evento delete task criado no analytics")
    }else {
        console.log("Analytics não disponível")
      }
      
    }
 

  const handleConcluir = async (e, id) => {
    e.preventDefault();
    console.log("entrou");
    await updateTask(id, { concluida: true });

    const updatedTasks = await getTasks();
    setDados(updatedTasks);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!descricao.trim()) {
      alert('Por favor, preencha a descrição da tarefa.');
      return;
    }
    if (!data.trim()) {
      alert('Por favor, preencha a data da tarefa.');
      return;
    }
    await addNewTask({ descricao, data, concluida: false });
    setDescricao('');
    setData('');
    const updatedTasks = await getTasks();
    setDados(updatedTasks);
    const analytics = await AnalyticsInit()
    if (analytics) {
      logEvent(analytics, 'task_added', {
        descricao: descricao,
        data_limite: data,
      })
      console.log("Evento addTask criado no analytics");
    }else {
      console.log("Analytcis não disponível");
    }
  };

  return (
    <div className="flex-col text-center justify-center">
      <h1 className="font-extrabold mt-6">Gerenciador de Tarefas</h1>
      <div className="flex-row">
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-80 bg-gray-200 rounded-md p-3 mt-4"
            placeholder="Tarefa..."
          />
          <input
            type="datetime-local"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-50 bg-gray-200 rounded-md p-3 mt-4 ml-6"
          />
          <button
            type="submit"
            className="bg-blue-500 font-semibold hover:bg-blue-600 text-white rounded-md ml-5 p-3 mt-4"
          >
            Adicionar
          </button>
        </form>
      </div>
      <div className="flex justify-center text-center">
        <div className="flex-col justify-center text-center">
          <ul className="list-inside p-4 flex-col justify-start text-left">
            <h1 className="font-extrabold mt-6">Tarefas a Concluir</h1>
            <hr />
            {dados &&
              dados
                .filter((task) => !task.concluida)
                .map((task) => (
                  <li className="p-1" key={task.id}>
                    <span className="font-medium px-2">
                      Tarefa: <span className="font-extrabold">{task.descricao}</span>
                    </span>
                    <span className="font-medium px-2">
                      <span className="font-extrabold">{formatDate(task.data)}</span>
                    </span>
                    <button
                      className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-extrabold"
                      onClick={(e) => handleDeleteTask(e, task.id)}
                    >
                      Excluir
                    </button>
                    <button
                      className="p-2 rounded-md ml-4 bg-green-500 hover:bg-green-600 text-white font-extrabold"
                      onClick={(e) => handleConcluir(e, task.id)}
                    >
                      Concluir
                    </button>
                  </li>
                ))}
          </ul>

          <ul className="list-inside p-4 flex-col justify-start text-left">
            <h1 className="font-extrabold mt-6">Tarefas Concluídas</h1>
            <hr />
            {dados &&
              dados
                .filter((task) => task.concluida)
                .map((task) => (
                  <li className="p-1" key={task.id}>
                    <span className="font-medium px-2">
                      Tarefa: <span className="font-extrabold">{task.descricao}</span>
                    </span>
                    <span className="font-medium px-2">
                      <span className="font-extrabold">{formatDate(task.data)}</span>
                    </span>
                    <button
                      className="p-2 rounded-md ml-4 bg-red-500 hover:bg-red-600 text-white font-extrabold"
                      onClick={(e) => handleDeleteTask(e, task.id)}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
