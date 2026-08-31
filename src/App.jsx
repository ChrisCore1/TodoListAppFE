import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { CategoryManagement } from './views/CategoryManagement';
import { TagManagement } from './views/TagManagement';
import { TaskManagement } from './views/TaskManagement';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/tareas' element={<TaskManagement />} />

            <Route path='/categorias' element={<CategoryManagement />} />

            <Route path='/etiquetas' element={<TagManagement />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
