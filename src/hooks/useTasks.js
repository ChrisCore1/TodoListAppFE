import { useCallback, useEffect, useState } from "react";
import { getAll, create, update, getOne, deleteTask } from "../services/task.service";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try{
      const data = await getAll();
      setTasks(data || []);
    }catch(e){
      setTasks([]);
    }finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    await create(taskData);
    await fetchTasks();
  };

  const editTask = async (id, taskData) => {
    await update(id, taskData);
    await fetchTasks();
  };

  const getTaskDetails = async (id) => {
    return await getOne(id);
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    await fetchTasks();
  };

  return { tasks, loading, addTask, editTask, getTaskDetails, removeTask };
};
