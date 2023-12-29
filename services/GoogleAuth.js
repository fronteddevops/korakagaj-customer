import Axios from "axios";
import nextConfig from "../next.config";
import api from "../api";

export default {
  GoogleAuth: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          nextConfig.BASE_URL + api.Google.GoogleAuth(),
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.tokens?.access?.token) {
          localStorage.setItem(
            "access_token",
            response.data.tokens.access.token
          );
        }

        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
