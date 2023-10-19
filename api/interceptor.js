/* eslint-disable react-hooks/rules-of-hooks */
import Axios from 'axios'
const initialiseInterceptor = () => {
  Axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage?.getItem("access_token")}`;

  // Add a request interceptor
  Axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // Add a response interceptor
  Axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log('error in interceptor ==>', error)
      if  (error.response && (error.response.status == 401 || error.response.status == 403)) {
       
          sessionStorage.clear();
          if (window.location.pathname !== "/") {
            setTimeout(() => {
              window.location.replace("/");
            }, 500);
             
        
          }
      
      
     
      } else {
        return Promise.reject(error)
      }
    }
  )
}

export default initialiseInterceptor
