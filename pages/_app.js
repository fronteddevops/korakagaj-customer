
import "react-perfect-scrollbar/dist/css/styles.css";
import { I18nextProvider } from 'react-i18next';

import { Provider } from "react-redux";
import "react-responsive-modal/styles.css";
import store from "../redux/store";
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import "../public/assets/css/main.css";
import React, { Suspense, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import initialiseInterceptor from "../api/interceptor";


// Swiper Slider
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Preloader from "./../components/elements/Preloader";
// import i18next from "i18next";
// Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//     "access_token"
//   )}`;

// import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_hi from "../i18n/messages/hi/coman.json";
import common_en from "../i18n/messages/en/coman.json";

i18next.init({
  interpolation: { escapeValue: false },  
  lng: 'en',                              // language to use
  resources: {
      en: {
          common: common_en               // 'common' is our custom namespace
      },
      hi: {
          common: common_hi
      },
  },
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    initialiseInterceptor(); // Initialize the interceptor when the app loads
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (typeof window !== "undefined") {
      window.WOW = require("wowjs");
    }
    new WOW.WOW().init();
  }, []);
  return (
    <>
    
      {!loading ? (
     
        <Suspense >
        <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <StorageWrapper>
            <ToastContainer />
            <Component {...pageProps} />
            </StorageWrapper>
            </Provider>
            </I18nextProvider>
            </Suspense>
      ) : (
        <Preloader />
       
      )}
  
    </>
  );
}

export default MyApp;