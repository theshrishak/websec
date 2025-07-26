import axios from "axios";

export const api =  axios.create({
    baseURL:"http://localhost:8080",
    withCredentials:true,
    headers :{
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type" : "application/json",
    },
    xsrfCookieName: '_csrf',
    xsrfHeaderName: 'XSRF-Token'
});

// Dynamically attach token before request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['XSRF-Token'] = document.cookie.split(';').filter(c => c.trim().startsWith('csrftoken='))[0].split('=')[1];
    }
    return config;
}, error => Promise.reject(error));


export const registerUserApi = (data) => api.post('/users/register', data);

export const loginUserApi =(data)=> api.post('/users/login',data);

export const saveContact=(data)=>api.post('/contact',data);
export const rooms=(data)=>api.post('/rooms',data);

export const getUserDetails = (data) => api.get('/users/', data);
export const updateUserDetails = (data) => api.patch('/users/', data);

export const createBooking = (data) => api.post('/booking/', data);
export const getAllUser = () => api.get('/users/all/');
export const getAllBooking = () => api.get('/booking/');
export const updateBookingStatus = (id, status) => api.patch(`/booking/${id}/${status}`);
export const updateUserRole = (id,status) => api.patch(`/users/role/${id}/${status}`);

export const addServiceApi = (data) => api.post('/services', data);

export const getAllMakeupApi = () => api.get('/makeup');
export const getAllNailApi = () => api.get('/nail');


export const getMakeupByIdApi = (id) => api.get(`/makeup/${id}`);
export const getAllNailByIdApi = (id) => api.get(`/nail/${id}`);
