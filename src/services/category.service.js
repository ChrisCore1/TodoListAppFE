import { API_URL, HEADERS, handleResponse } from './service'

export const getAll = async () => {
    const response = await fetch(`${API_URL}/categories`, {
        method: 'GET',
        headers: HEADERS
    });
    const data = await handleResponse(response);
    return data.categories?.data || data;
};

export const create = async (categoryData) => {
    const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
};
