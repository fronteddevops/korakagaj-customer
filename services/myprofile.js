import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  
    GET_MY_PROFILE: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
            nextConfig.BASE_URL + api.myprofile.GET_MY_PROFILE(id)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

  UPDATE_MY_PROFILE: (id,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
            nextConfig.BASE_URL + api.myprofile.UPDATE_MY_PROFILE(id),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

  CHANGE_PASSWORD: (id,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
            nextConfig.BASE_URL + api.myprofile.CHANGE_PASSWORD(id),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}