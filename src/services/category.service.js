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

export const update = async (id, categoryData) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
};

export const deleteCategory = async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: HEADERS,
    });
    return handleResponse(response);
};

export const getOne = async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'GET',
        headers: HEADERS,
    });
    const data = await handleResponse(response);
    return data.category || data;
};
