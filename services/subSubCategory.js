import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 
  GET_SUB_SUB_CATEGORY: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.subSubCategory.GET_SUB_SUB_CATEGORY()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_SUB_SUB_CATEGORYALL: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.subSubCategory.GET_SUB_SUB_CATEGORYALL(id)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

 
}