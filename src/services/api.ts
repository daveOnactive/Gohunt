import axios, { AxiosError, AxiosResponse } from 'axios';

const Api = axios.create({
  timeout: 60000,
  baseURL: '/api'
});

// Api.interceptors.request.use(
//   async (config) => {
//     const authToken = '<TOKEN_HERE>';
//     if (authToken) {
//       config.headers.Authorization = `Bearer ${authToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

Api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.request.status == 401) {
      // TODO: Navigate to home page if use not authenticated
    }
    return Promise.reject(error);
  }
);

export default Api;