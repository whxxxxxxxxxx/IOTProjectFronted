import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8001',
    timeout: 5000
})


request.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 
request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    if (error.response.status === 401) {
        window.location.reload()
    }
    return Promise.reject(error)
})

export {request}