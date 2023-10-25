import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {


 
  GET_PRODUCT: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.product.GET_PRODUCT()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  
  GET_PRODUCT_BY_ID: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          nextConfig.BASE_URL + api.product.GET_PRODUCT_BY_ID(id)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UP_COMING_PRODUCT: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          nextConfig.BASE_URL + api.product.UP_COMING_PRODUCT(id)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_FILTER_PRODUCT: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
      
        const response = await Axios.get(
          nextConfig.BASE_URL + api.product.GET_FILTER_PRODUCT(data)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  PRODCUT_GET_LowToHigh: () => {
    return new Promise(async (resolve, reject) => {
      try {
      
        const response = await Axios.get(
          nextConfig.BASE_URL + api.product.PRODCUT_GET_LowToHigh()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  PRODCUT_GET_HighToLow: () => {
    return new Promise(async (resolve, reject) => {
      try {
      
        const response = await Axios.get(
          nextConfig.BASE_URL + api.product.PRODCUT_GET_HighToLow()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },


};
