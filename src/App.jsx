import { getAll } from './services/task.service';
import { useEffect } from 'react';
import './App.css'
import { CategoryManagement } from './views/CategoryManagement';

function App() {

  return (
    <>
      <CategoryManagement />
    </>
  )
}

export default App
