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

  GET_PRODUCT_SLUG_BY_ID: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          nextConfig.BASE_URL + api.product.GET_PRODUCT_SLUG_BY_ID(id)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },



  UP_COMING_PRODUCT: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          nextConfig.BASE_URL + api.product.UP_COMING_PRODUCT()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_FILTER_PRODUCT: (query) => {
    let response;
    return new Promise(async (resolve, reject) => {
      try {
        if (localStorage.getItem("access_token")) {
          //auth product get
          response = await Axios.get(
            nextConfig.BASE_URL + api.product.GET_PRODUCT_AUTH(query)
          );
        } else {
          response = await Axios.get(
            nextConfig.BASE_URL + api.product.GET_FILTER_PRODUCT(query)
          );
        }

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
