const API_URL = 'http://localhost:8000/api';

const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const handleResponse = async (response) => {
    if(!response.ok){
        const errorData = await response.json().catch(() => ({}));
        console.error(errorData);
        throw new Error(`Error en la peticion: ${response.statusText}`);
    }
    return response.json();
};

export const getAll = async () => {
    const response = await fetch(`${API_URL}/categories`, {
        method: 'GET',
        headers: HEADERS
    });
    const data = await handleResponse(response);
    return data.categories?.data || data;
};
