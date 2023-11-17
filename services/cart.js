import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 
  GET_CART: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.cart.GET_CART()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_CART : (data,) => {
   
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
            nextConfig.BASE_URL + api.cart.UPDATE_CART(),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  CHECKOUT : () => {
   
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
            nextConfig.BASE_URL + api.cart.CHECKOUT()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
 
  
 
 
 
}