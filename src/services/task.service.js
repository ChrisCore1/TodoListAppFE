const API_URL = 'http://localhost:8000/api';

export const getAll = async () => {
  try{
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if(!response.ok){
      throw new Error(`Error con la peticion: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  }catch (e){
    console.error('Error al obtener las tareas: ', e);
    throw e;
  }
};
