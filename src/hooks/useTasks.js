import { useCallback, useEffect, useState } from "react";
import { getAll, create, update, getOne, deleteTask } from "../services/task.service";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchTasks = useCallback(async (page = 1) => {
    setLoading(true);
    try{
      const data = await getAll(page);
      if (data && data.data) {
        setTasks(data.data);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
      }else{
        setTasks(data || []);
      }
    }catch(e){
      setTasks([]);
    }finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks(currentPage);
  }, [fetchTasks, currentPage]);

  const changePage = (page) => {
    if (page >= 1 && page <= lastPage) {
        setCurrentPage(page);
    }
  };

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

  return { tasks, loading, addTask, editTask, getTaskDetails, removeTask, currentPage, lastPage, changePage };
};
