import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";
import axios from "axios";
import services from "./index";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  CREATE_WISHLIST_BY_ID: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          nextConfig.BASE_URL + api.Wishlist.CREATE_WISHLIST_BY_ID(),
          data
        );
        services.Wishlist.GET_WISHLIST_DATA();
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_WISHLIST_DATA: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          nextConfig.BASE_URL + api.Wishlist.GET_WISHLIST_DATA()
        );
        localStorage.setItem("wishListItemsCount", response.data.data.length);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_WISHLIST: (data, userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(
          nextConfig.BASE_URL + api.Wishlist.UPDATE_WISHLIST(userID),
          data
        );
        services.Wishlist.GET_WISHLIST_DATA();
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_WISHLIST_BY_ID: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(
          nextConfig.BASE_URL + api.Wishlist.DELETE_WISHLIST_BY_ID(id)
        );
        services.Wishlist.GET_WISHLIST_DATA();
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
