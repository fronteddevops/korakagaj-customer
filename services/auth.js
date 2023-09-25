/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import api from "../api";
import nextConfig from "../next.config";
export default {
  REGISTER_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
            nextConfig.BASE_URL + api.auth.REGISTER(),
          data
        );

        //
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Auth.UPDATE(),
          data
        );

        //
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  LOGIN_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
            nextConfig.BASE_URL + api.auth.LOGIN(),
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.tokens?.access?.token) {
          localStorage.setItem('access_token', response.data.tokens.access.token)
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
  VERIFY_OTP: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Login.OTP(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  RESEND_OTP: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.ResendOTP.RESENDOTP(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FORGOT_PASSWORD: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Login.FORGOTPASSWORD(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  RESET_PASSWORD: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.ResetPassword.RESETPASSWORD(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
 
};
