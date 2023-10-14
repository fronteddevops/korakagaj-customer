import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  
  GET_SUB_CATEGORY: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.subCategory.GET_SUB_CATEGORY()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
 GET_ALL_SUB_CATEGORY: (id) => {
    return new Promise(async (resolve, reject) => {
        try {
          const response = await Axios.get(
            nextConfig.BASE_URL + api.subCategory.GET_ALL_SUB_CATEGORY(id)
          );
          resolve(response);
        } catch (err) {
          reject(err);
        }
      });
    }


 
}