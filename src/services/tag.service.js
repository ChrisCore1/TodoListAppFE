import { HEADERS, handleResponse, URL_TAG } from './service';

export const getAll = async () => {
    const response = await fetch(URL_TAG, {
        method: 'GET',
        headers: HEADERS
    });
    const data = await handleResponse(response);
    return data.tags?.data || data;
};

export const create = async (tagData) => {
    const response = await fetch(URL_TAG, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(tagData),
    });
    return handleResponse(response);
};

export const getOne = async (id) => {
    const response = await fetch(URL_TAG + `/${id}`, {
        method: 'GET',
        headers: HEADERS
    });
    const data = await handleResponse(response);
    return data.tag || data;
};

export const update = async (id, tagData) => {
    const response = await fetch(URL_TAG + `/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(tagData),
    });
    return handleResponse(response);
};

export const deleteTag = async (id) => {
    const response = await fetch(URL_TAG + `/${id}`, {
        method: 'DELETE',
        headers: HEADERS,
    });
    const data = await handleResponse(response);
    return data.tag || data;
};
