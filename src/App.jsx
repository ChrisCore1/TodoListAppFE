import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { CategoryManagement } from './views/CategoryManagement';
import { TagManagement } from './views/TagManagement';
import { TaskManagement } from './views/TaskManagement';
import { Login } from './views/Login';

function App() {

  const ProtectedLayout = () => {
    return(
      <>
        <Navbar />
        <div className='container mt-4'>
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Navigate to='login' replace /> } />

            <Route element={<ProtectedLayout />}>
              <Route path='/tareas' element={<TaskManagement />} />

              <Route path='/categorias' element={<CategoryManagement />} />

              <Route path='/etiquetas' element={<TagManagement />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
