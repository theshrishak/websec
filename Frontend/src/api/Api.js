// import axios from "axios"

// const api =  axios.create({
//     baseURL:"http://localhost:5000",
//     withCredentials:true,
//     headers :{
//         "Content-Type" : "multipart/form-data"
//     }
// });

// //creating test api
// export const testApi= () => api.get('/test')


// export const registerUserApi = (data) => api.post('/user/register', data);

// // creating login api
// export const loginUserApi =(data)=> api.post('user/login',data);

// export const saveContact=(data)=>api.post('/contact',data);
// export const rooms=(data)=>api.post('/rooms',data);

// export const createBooking = (data) => api.post('/bookings/booking', data);
// export const getBookings = () => api.get('/bookings/');



// //creating admin api

// export const addServiceApi = (data) => api.post('/services', data);

// export const addRoom=(data)=>api.post('room/createroom',data);
// export const uploadImage=(data)=>api.post('images/upload',data);


import axios from "axios";

const api =  axios.create({
    baseURL:"http://localhost:7000",
    withCredentials:true,
    headers :{
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type" : "application/json"
    }
});

// Dynamically attach token before request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

//creating test api

export const registerUserApi = (data) => api.post('/users/register', data);

// creating login api
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
//creating admin api

export const addServiceApi = (data) => api.post('/services', data);

export const getAllMakeupApi = () => api.get('/makeup');
export const getAllNailApi = () => api.get('/nail');


export const getMakeupByIdApi = (id) => api.get(`/makeup/${id}`);
export const getAllNailByIdApi = (id) => api.get(`/nail/${id}`);