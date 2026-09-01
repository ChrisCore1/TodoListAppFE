import { HEADERS } from "../services/service";

export const fetchInterceptor = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const requestHeaders = {
        ...HEADERS,
        ...options.headers,
    };

    if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers: requestHeaders,
    });

    if (response.status === 401) {
        console.warn("Sesion expirada o token invalido.");
        
        localStorage.removeItem('token');
        
        window.location.href = '/login';
    }

    return response;
};