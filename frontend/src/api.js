import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create Axios instance
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for dynamic token fetching
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// User endpoints
export const signUp = (data) => api.post('user/signup', data);
export const signIn = (data) => api.post('user/signin', data);

// Product endpoints
export const getProducts = () => api.get('/products/details');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products/create', data);
export const updateProduct = (id, data) => api.put(`/products/edit/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/delete/${id}`);
