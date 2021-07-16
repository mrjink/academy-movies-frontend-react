import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        if (!!localStorage.getItem('token')) {
            config.headers["authorization"] = "Bearer " + localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
