// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3034/api'; 

export const api = axios.create({
  baseURL: API_URL,
});

export const setAuthHeader = (token) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const login = async (credentials) => {
  return await api.post('/login', credentials);
};

export const signup = async (data) => {
  return await api.post('/signup', data);
};

export const getProducts = async () => {
  return await api.get('/products');
};

export const createProduct = async (product) => {
  return await api.post('/products', product);
};

export const updateProduct = async (id, product) => {
  return await api.put(`/products/${id}`, product);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`);
};
