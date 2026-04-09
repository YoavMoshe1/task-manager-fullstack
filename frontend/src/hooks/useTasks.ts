import { useState, useEffect } from "react";
import { getTasks, addTaskApi, deleteTaskApi, updateTaskApi } from "../api/tasks";
import type { Task } from "../types/Task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getTasks();
      setTasks(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedCompleted = !task.completed;

    await updateTaskApi(id, { completed: updatedCompleted });

    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: updatedCompleted } : t
      )
    );
  };

  const addTask = async (title: string, description: string) => {
    const data = await addTaskApi({ title, description });
    setTasks(prev => [...prev, data]);
  };

  const deleteTask = async (id: number) => {
    await deleteTaskApi(id);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTask = async (id: number, title: string, description: string) => {
    await updateTaskApi(id, { title, description });

    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, title, description } : t
      )
    );
  };

  return {
    tasks,
    isLoading,
    toggleTask,
    addTask,
    deleteTask,
    updateTask,
  };
}