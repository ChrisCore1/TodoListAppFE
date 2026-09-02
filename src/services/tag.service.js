import { handleResponse, URL_TAG } from './service';
import { fetchInterceptor } from '../utils/fetchInterceptor';

export const getAll = async () => {
    const response = await fetchInterceptor(URL_TAG, {
        method: 'GET',
    });
    const data = await handleResponse(response);
    return data.tags?.data || data;
};

export const create = async (tagData) => {
    const response = await fetchInterceptor(URL_TAG, {
        method: 'POST',
        body: JSON.stringify(tagData),
    });
    return handleResponse(response);
};

export const getOne = async (id) => {
    const response = await fetchInterceptor(URL_TAG + `/${id}`, {
        method: 'GET',
    });
    const data = await handleResponse(response);
    return data.tag || data;
};

export const update = async (id, tagData) => {
    const response = await fetchInterceptor(URL_TAG + `/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tagData),
    });
    return handleResponse(response);
};

export const deleteTag = async (id) => {
    const response = await fetchInterceptor(URL_TAG + `/${id}`, {
        method: 'DELETE',
    });
    const data = await handleResponse(response);
    return data.tag || data;
};
