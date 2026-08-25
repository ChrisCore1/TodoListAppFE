import { API_URL, HEADERS, handleResponse } from './service'

export const getAll = async () => {
    const response = await fetch(`${API_URL}/categories`, {
        method: 'GET',
        headers: HEADERS
    });
    const data = await handleResponse(response);
    return data.categories?.data || data;
};
