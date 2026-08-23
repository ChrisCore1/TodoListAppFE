import { getAll } from './services/task.service';
import { useEffect } from 'react';
import './App.css'

function App() {
  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const tasks = await getAll();
        console.log(tasks);
      }catch(e){
        console.error(e);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <h1>Hola Mundo</h1>
    </>
  )
}

export default App
