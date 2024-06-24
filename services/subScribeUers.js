import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  
  SUBSCRIBE_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
            nextConfig.BASE_URL + api.subscribeuser.SUBSCRIBE_USER(),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
 


 
}