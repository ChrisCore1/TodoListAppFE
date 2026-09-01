import { HEADERS, handleResponse, URL_TASK } from "./service";

export const getAll = async () => {
  const response = await fetch(URL_TASK, {
    method: 'GET',
    headers: HEADERS
  });
  const data = await handleResponse(response);
  return data.tasks?.data || data;
};

export const create = async (taskData) => {
  const response = await fetch(URL_TASK, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const update = async (id, taskData) => {
  const response = await fetch(URL_TASK + `/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(taskData)
  });
  return handleResponse(response);
};
