const API_URL = import.meta.env.VITE_API_URL;

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
            console.error('Error en API: ', errorData);
            throw new Error(`Error en la peticion: ${response.statusText}`);
        }
        return await response.json();
    }catch(e){
        console.error('Error', e);
        throw e;
    }
};

export { API_URL, HEADERS, handleResponse };