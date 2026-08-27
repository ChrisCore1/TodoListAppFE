import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
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
                </div>
            </div>
        </nav>
    );
};