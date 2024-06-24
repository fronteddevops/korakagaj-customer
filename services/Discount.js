import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

export default {
  GET_DISCOUNT: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          nextConfig.BASE_URL + api.Discount.GET_DISCOUNT(data)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
