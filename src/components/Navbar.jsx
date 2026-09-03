import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if(window.confirm('Confirma si deseas cerrar sesion')){
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/tareas">
                    ToDoListApp
                </Link>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink 
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                                to="/tareas"
                            >
                                Tareas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                                to="/categorias"
                            >
                                Categorias
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} 
                                to="/etiquetas"
                            >
                                Etiquetas
                            </NavLink>
                        </li>
                    </ul>
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-outline-danger btn-sm"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};