import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 
  GET_CART: (userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.cart.GET_CART(userID)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_CART : (data,userID) => {
   
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
            nextConfig.BASE_URL + api.cart.UPDATE_CART(userID),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
 
  
 
 
 
}