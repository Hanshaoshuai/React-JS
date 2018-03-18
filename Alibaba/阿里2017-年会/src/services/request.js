import axios from 'axios'

const request = axios.create({
    baseURL: '/mock',
});

request.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error),
);

export default request;
