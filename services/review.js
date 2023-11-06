import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  
    POST_REVIEW_BY_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
            nextConfig.BASE_URL + api.review.POST_REVIEW(),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

}