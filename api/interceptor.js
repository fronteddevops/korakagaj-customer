import Axios from 'axios';

const initialiseInterceptor = () => {
  console.log('Initial')
  if (typeof window !== 'undefined') {
    // Check if the code is running on the client side
    Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage?.getItem("access_token")}`;

    // Add a request interceptor
    Axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
      
        if (error.response && (error.response.status == 401 || error.response.status == 403)) {
          localStorage.clear();
          localStorage?.removeItem("access_token")
      
          if (window.location.pathname !== "/login") {
          
            // window.location.replace("/");
            // setTimeout(() => {
            
            // }, 500);
          }
          return Promise.reject(error);
        } else {
         
          return Promise.reject(error);
        }
      }
    );
  }
};

export default initialiseInterceptor;
