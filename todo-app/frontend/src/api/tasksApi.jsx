import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const getCsrfToken = async () => {
  const response = await api.get('/api/csrf/');
  api.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
  return response.data.csrfToken;
};

export const fetchTasks = async () => {
  const response = await api.get('/api/tasks/');
  return response.data;
};

export const createTask = async (title) => {
  const response = await api.post('/api/tasks/', { title });
  return response.data;
};

export const updateTask = async (taskId, updates) => {
  const response = await api.patch(`/api/tasks/${taskId}/`, updates);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await api.delete(`/api/tasks/${taskId}/`);
};
