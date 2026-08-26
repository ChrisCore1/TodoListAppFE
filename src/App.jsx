import { getAll } from './services/task.service';
import { useEffect } from 'react';
import './App.css'
import { CategoryManagement } from './views/CategoryManagement';
import { TagManagement } from './views/TagManagement';

function App() {

  return (
    <>
      <TagManagement />
    </>
  )
}

export default App
