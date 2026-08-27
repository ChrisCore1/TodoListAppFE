import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { CategoryManagement } from './views/CategoryManagement';
import { TagManagement } from './views/TagManagement';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/tareas' element={
              <div className='text-center mt-5'>
                <h2>Lista de Tareas</h2>
              </div>
            } />

            <Route path='/categorias' element={<CategoryManagement />} />

            <Route path='/etiquetas' element={<TagManagement />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
