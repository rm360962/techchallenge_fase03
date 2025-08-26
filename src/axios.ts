import axios from 'axios';

export const conexaoApi = axios.create({
    baseURL: 'http://localhost:3030/api',
    validateStatus: (status) => [200, 400, 401, 422].includes(status),
});