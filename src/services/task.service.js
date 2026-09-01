import { HEADERS, handleResponse, URL_TASK } from "./service";
import { fetchInterceptor } from "../utils/fetchInterceptor";

export const getAll = async () => {
  const response = await fetchInterceptor(URL_TASK, {
    method: 'GET',
  });
  const data = await handleResponse(response);
  return data.tasks?.data || data;
};

export const create = async (taskData) => {
  const response = await fetchInterceptor(URL_TASK, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const update = async (id, taskData) => {
  const response = await fetchInterceptor(URL_TASK + `/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData)
  });
  return handleResponse(response);
};

export const getOne = async (id) => {
  const response = await fetchInterceptor(URL_TASK + `/${id}`, {
    method: 'GET',
  });
  const data = await handleResponse(response);
  return data.task || data;
};

export const deleteTask = async (id) => {
  const response = await fetchInterceptor(URL_TASK + `/${id}`, {
    method: 'DELETE',
  });
  const data = await handleResponse(response);
  return data.task || data;
};
