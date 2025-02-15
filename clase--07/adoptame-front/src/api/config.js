import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://70240-production.up.railway.app',
  withCredentials: true,
});

export default axiosInstance;
