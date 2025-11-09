import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactAPI = {
  getAll: (search = '') => api.get(/contacts/?search=${search}),
  getById: (id) => api.get(/contacts/${id}/),
  create: (data) => api.post('/contacts/', data),
  update: (id, data) => api.put(/contacts/${id}/, data),
  delete: (id) => api.delete(/contacts/${id}/),
  search: (query) => api.get(/contacts/search/?search=${query}),
};