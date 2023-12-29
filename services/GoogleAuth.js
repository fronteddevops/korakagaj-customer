import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

export default {
  GoogleAuth: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          nextConfig.BASE_URL + api.Google.GoogleAuth(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
