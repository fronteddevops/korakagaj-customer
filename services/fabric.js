import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {


  
  GET_FABRIC: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.fabric.GET_FABRIC()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
 
 
 

};
