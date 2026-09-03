import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await login(credentials);
            
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                navigate('/tareas');
            } else {
                setError('No se recibió un token de acceso válido.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4 fw-bold">Inicio de Sesion</h3>
                
                {error && <div className="alert alert-danger py-2">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo Electronico</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                            autoFocus
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <div className="position-relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                className="form-control pe-5" 
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ textDecoration: 'none', padding: '0.375rem 0.75rem' }}
                            >
                                {showPassword ? (
                                    <i className="bi bi-eye" />
                                ) : (
                                    <i className="bi bi-eye-slash" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
};