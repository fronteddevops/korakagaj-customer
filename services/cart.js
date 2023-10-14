import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 
  GET_CATEGORY: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.category.GET_CATEGORY()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_CART : (id,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
            nextConfig.BASE_URL + api.cart.UPDATE_CART(id),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
 
  
 
 
 
}