import { URL_CATEGORY, handleResponse } from './service'
import { fetchInterceptor } from '../utils/fetchInterceptor';

export const getAll = async () => {
    const response = await fetchInterceptor(URL_CATEGORY, {
        method: 'GET',
    });
    const data = await handleResponse(response);
    return data.categories?.data || data;
};

export const create = async (categoryData) => {
    const response = await fetchInterceptor(URL_CATEGORY, {
        method: 'POST',
        body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
};

export const update = async (id, categoryData) => {
    const response = await fetchInterceptor(URL_CATEGORY + `/${id}`, {
        method: 'PUT',
        body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
};

export const deleteCategory = async (id) => {
    const response = await fetchInterceptor(URL_CATEGORY + `/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

export const getOne = async (id) => {
    const response = await fetchInterceptor(URL_CATEGORY + `/${id}`, {
        method: 'GET',
    });
    const data = await handleResponse(response);
    return data.category || data;
};
