const API_URL = import.meta.env.VITE_API_URL;
const URL_TAG = `${API_URL}/tags`;
const URL_TASK = `${API_URL}/tasks`;

const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const handleResponse = async (response) => {
    try{
        if(!response.ok){
            const errorData = await response.json().catch(() => ({
                message: 'No se logro parsear la respuesta de Error'
            }));
            throw new Error(`Error en la peticion: ${response.statusText}`);
        }
        return await response.json();
    }catch(e){
        throw e;
    }
};

export { API_URL, HEADERS, handleResponse, URL_TAG, URL_TASK };