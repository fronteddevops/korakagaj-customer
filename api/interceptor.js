import Axios from 'axios';

const initialiseInterceptor = () => {
  if (typeof window !== 'undefined') {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage?.getItem("access_token")}`;

    Axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
      
        if (error.response && (error.response.status == 401 || error.response.status == 403)) {
          localStorage.clear();
          localStorage?.removeItem("access_token")
          return Promise.reject(error);
        } else {
         
          return Promise.reject(error);
        }
      }
    );
  }
};

export default initialiseInterceptor;
