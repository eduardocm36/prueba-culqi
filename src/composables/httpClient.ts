import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://fepruebatecnicaculqi-backend-production.up.railway.app/',
  timeout: 5000,
});



