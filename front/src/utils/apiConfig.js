import axios from 'axios';

const api = axios.create({
    baseURL: 'https://lexart-back.vercel.app',
});


export default api;