// eslint-disable-next-line import/no-anonymous-default-export
import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";
export default {
 
    SEARCH_PRODCUT: (data) => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await Axios.get(
              nextConfig.BASE_URL + api.searchProduct.SEARCH_PRODCUT(data)
          );
          resolve(response);
        } catch (err) {
          reject(err);
        }
      });
    },
   
   
    
   
   
   
  }