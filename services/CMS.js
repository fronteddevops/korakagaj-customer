import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

export default {
  GET_CMS: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          nextConfig.BASE_URL + api.CMS.GET_CMS()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  Contact: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          nextConfig.BASE_URL + api.CMS.Contact(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
