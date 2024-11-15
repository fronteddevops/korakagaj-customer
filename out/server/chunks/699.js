"use strict";
exports.id = 699;
exports.ids = [699];
exports.modules = {

/***/ 2702:
/***/ ((module) => {


/**
 * @type {import('next').NextConfig}
 */ const nextConfig = {
    BASE_URL: "https://app.applatus.com:5000/v1",
    BASE_URL_UPLOADS: "https://app.applatus.com:5000/uploads/",
    trailingSlash: true,
    distDir: "out"
};
module.exports = nextConfig;


/***/ }),

/***/ 7699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ services)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: ./next.config.js
var next_config = __webpack_require__(2702);
var next_config_default = /*#__PURE__*/__webpack_require__.n(next_config);
;// CONCATENATED MODULE: ./api/category.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const category = ({
    GET_CATEGORY: ()=>"/category?isFeatured=true"
    ,
    GET_CATEGORY_ALL: ()=>"/category/getAllCategory"
});

;// CONCATENATED MODULE: ./api/product.js
/* harmony default export */ const product = ({
    GET_PRODUCT: ()=>`/product`
    ,
    GET_PRODUCT_AUTH: (query)=>`/product/me?${query}`
    ,
    GET_PRODUCT_BY_ID: (id)=>`/product/${id}`
    ,
    GET_PRODUCT_SLUG_BY_ID: (id)=>`/product/getProductDetailsBySlug/${id}`
    ,
    UP_COMING_PRODUCT: ()=>`/product/isUpcoming`
    ,
    GET_FILTER_PRODUCT: (query)=>`/product?${query}`
});

;// CONCATENATED MODULE: ./api/auth.js
/* harmony default export */ const auth = ({
    LOGIN: ()=>"/auth/login"
    ,
    FORGOT_PASSWORD: ()=>`/auth/forgot-password`
    ,
    RESET_PASSWORD: (query)=>`/auth/reset-password?${query ? query : ""}`
    ,
    REGISTER: ()=>`/auth/register`
    ,
    UPDATE: ()=>`/update/`
});

;// CONCATENATED MODULE: ./api/subCategory.js
/* harmony default export */ const subCategory = ({
    GET_SUB_CATEGORY: ()=>"/subCategory"
    ,
    GET_ALL_SUB_CATEGORY: (id)=>`/subCategory?categoryId=${id}`
    ,
    GET_SUB_CATEGORY_BY_ID: (id)=>`/subCategory/${id}`
});

;// CONCATENATED MODULE: ./api/subSubCategory.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const subSubCategory = ({
    GET_SUB_SUB_CATEGORY: ()=>"/subSubCategory"
    ,
    GET_SUB_SUB_CATEGORYALL: (id)=>`/subSubCategory?subCategoryId=${id}`
});

;// CONCATENATED MODULE: ./api/fabric.js
/* harmony default export */ const fabric = ({
    GET_FABRIC: ()=>`/fabric`
    ,
    GET_FilTER_FABRIC: (query)=>`/fabric?${query}`
});

;// CONCATENATED MODULE: ./api/cart.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const cart = ({
    GET_CART: ()=>`/cart/me`
    ,
    UPDATE_CART: ()=>`/cart/me`
    ,
    CHECKOUT: ()=>`/cart/checkout`
    ,
    PAYMENT_LOG: ()=>`/paymentLog/me`
});

;// CONCATENATED MODULE: ./api/subscribeuser.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const subscribeuser = ({
    SUBSCRIBE_USER: ()=>`/subscribedUser `
});

;// CONCATENATED MODULE: ./api/searchProduct.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const searchProduct = ({
    SEARCH_PRODCUT: (Data)=>`/product/search?search=${Data}`
});

;// CONCATENATED MODULE: ./api/Wishlist.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const Wishlist = ({
    CREATE_WISHLIST_BY_ID: ()=>`/wishList/me`
    ,
    GET_WISHLIST_DATA: ()=>`/wishList/me`
    ,
    UPDATE_WISHLIST: (userID)=>`/wishList/${userID}`
    ,
    DELETE_WISHLIST_BY_ID: (id)=>`/wishList/me/${id}`
}); // /wishList/me/

;// CONCATENATED MODULE: ./api/myprofile.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const myprofile = ({
    GET_MY_PROFILE: ()=>`/user/me`
    ,
    UPDATE_MY_PROFILE: ()=>`/user/me`
    ,
    CHANGE_PASSWORD: ()=>`/auth/change-password`
    ,
    CREATE_MY_ADDRESS: ()=>`/address`
    ,
    GET_MY_ADDRESS: ()=>`/address/me`
    ,
    GET_MY_ADDRESS_BY_ID: (id)=>`/address/${id}`
    ,
    UPDATE_MY_ADDRESS_BY_ID: (id)=>`/address/${id}`
});

;// CONCATENATED MODULE: ./api/orderDetials.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const orderDetials = ({
    GET_ORDER_DETAILS: ()=>"/order/me"
    ,
    GET_ORDER_DETAILS_BY_ID: (id)=>`/orderDetails/getOrderDetailsByOrderId/${id}`
}); // /order/1

;// CONCATENATED MODULE: ./api/review.js
/*eslint-disable import/no-anonymous-default-export*/ /* harmony default export */ const review = ({
    POST_REVIEW: ()=>`/ratings/me`
});

;// CONCATENATED MODULE: ./api/CMS.js
/* harmony default export */ const CMS = ({
    GET_CMS: ()=>`/setting`
    ,
    Contact: (data)=>`/contact${data ? data : ""}`
});

;// CONCATENATED MODULE: ./api/Discount.js
/* harmony default export */ const Discount = ({
    GET_DISCOUNT: (query)=>`/discountCoupon/verify?${query ? query : ""}`
});

;// CONCATENATED MODULE: ./api/Google.js
/* harmony default export */ const Google = ({
    GoogleAuth: (data)=>`/auth/loginWithGoogle${data ? data : ""}`
});

;// CONCATENATED MODULE: ./api/index.js
















/* harmony default export */ const api = ({
    category: category,
    product: product,
    auth: auth,
    subCategory: subCategory,
    subSubCategory: subSubCategory,
    fabric: fabric,
    cart: cart,
    subscribeuser: subscribeuser,
    searchProduct: searchProduct,
    Wishlist: Wishlist,
    myprofile: myprofile,
    orderDetials: orderDetials,
    review: review,
    CMS: CMS,
    Discount: Discount,
    Google: Google
});

;// CONCATENATED MODULE: ./services/category.js



// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_category = ({
    GET_CATEGORY: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.category.GET_CATEGORY());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_CATEGORY_ALL: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.category.GET_CATEGORY_ALL());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/product.js



// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_product = ({
    GET_PRODUCT: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.product.GET_PRODUCT());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_PRODUCT_BY_ID: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.product.GET_PRODUCT_BY_ID(id));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_PRODUCT_SLUG_BY_ID: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.product.GET_PRODUCT_SLUG_BY_ID(id));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    UP_COMING_PRODUCT: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.product.UP_COMING_PRODUCT());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_FILTER_PRODUCT: (query)=>{
        let response;
        return new Promise(async (resolve, reject)=>{
            try {
                if (localStorage.getItem("access_token")) {
                    //auth product get
                    response = await external_axios_default().get((next_config_default()).BASE_URL + api.product.GET_PRODUCT_AUTH(query));
                } else {
                    response = await external_axios_default().get((next_config_default()).BASE_URL + api.product.GET_FILTER_PRODUCT(query));
                }
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/auth.js
/* eslint-disable import/no-anonymous-default-export */ 


/* harmony default export */ const services_auth = ({
    REGISTER_USER: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.auth.REGISTER(), data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response?.data?.tokens?.access?.token) {
                    localStorage.setItem("access_token", response.data.tokens.access.token);
                }
                (external_axios_default()).defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    UPDATE_USER: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post(constant.BASE_URL + api.Auth.UPDATE(), data);
                //
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    LOGIN_USER: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.auth.LOGIN(), data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response?.data?.tokens?.access?.token) {
                    localStorage.setItem("access_token", response.data.tokens.access.token);
                }
                (external_axios_default()).defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    VERIFY_OTP: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post(constant.BASE_URL + api.Login.OTP(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    RESEND_OTP: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post(constant.BASE_URL + api.ResendOTP.RESENDOTP(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    FORGOT_PASSWORD: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.auth.FORGOT_PASSWORD(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    RESET_PASSWORD: (query, data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.auth.RESET_PASSWORD(query), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/subCategory.js




// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_subCategory = ({
    GET_SUB_CATEGORY: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.subCategory.GET_SUB_CATEGORY());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_ALL_SUB_CATEGORY: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.subCategory.GET_ALL_SUB_CATEGORY(id));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/subSubCategory.js



// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_subSubCategory = ({
    GET_SUB_SUB_CATEGORY: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.subSubCategory.GET_SUB_SUB_CATEGORY());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_SUB_SUB_CATEGORYALL: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.subSubCategory.GET_SUB_SUB_CATEGORYALL(id));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/fabric.js



// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_fabric = ({
    GET_FABRIC: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.fabric.GET_FABRIC());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_FilTER_FABRIC: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.fabric.GET_FilTER_FABRIC(data));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/cart.js



// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_cart = ({
    GET_CART: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.cart.GET_CART());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    UPDATE_CART: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().put((next_config_default()).BASE_URL + api.cart.UPDATE_CART(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    PAYMENT_LOG: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.cart.PAYMENT_LOG(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    CHECKOUT: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.cart.CHECKOUT());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/Wishlist.js





// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_Wishlist = ({
    CREATE_WISHLIST_BY_ID: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.Wishlist.CREATE_WISHLIST_BY_ID(), data);
                services.Wishlist.GET_WISHLIST_DATA();
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_WISHLIST_DATA: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.Wishlist.GET_WISHLIST_DATA());
                localStorage.setItem("wishListItemsCount", response.data.data.length);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    UPDATE_WISHLIST: (data, userID)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().put((next_config_default()).BASE_URL + api.Wishlist.UPDATE_WISHLIST(userID), data);
                services.Wishlist.GET_WISHLIST_DATA();
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    DELETE_WISHLIST_BY_ID: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default()["delete"]((next_config_default()).BASE_URL + api.Wishlist.DELETE_WISHLIST_BY_ID(id));
                services.Wishlist.GET_WISHLIST_DATA();
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/subScribeUers.js




// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const subScribeUers = ({
    SUBSCRIBE_USER: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.subscribeuser.SUBSCRIBE_USER(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/searchProdcut.js
// eslint-disable-next-line import/no-anonymous-default-export



/* harmony default export */ const searchProdcut = ({
    SEARCH_PRODCUT: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.searchProduct.SEARCH_PRODCUT(data));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/myprofile.js




// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_myprofile = ({
    GET_MY_PROFILE: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.myprofile.GET_MY_PROFILE(id));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    UPDATE_MY_PROFILE: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().put((next_config_default()).BASE_URL + api.myprofile.UPDATE_MY_PROFILE(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    CHANGE_PASSWORD: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.myprofile.CHANGE_PASSWORD(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_MY_ADDRESS: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.myprofile.GET_MY_ADDRESS());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_MY_ADDRESS_BY_ID: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.myprofile.GET_MY_ADDRESS_BY_ID(id));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    CREATE_MY_ADDRESS: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.myprofile.CREATE_MY_ADDRESS(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    UPDATE_MY_ADDRESS_BY_ID: (id, data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().put((next_config_default()).BASE_URL + api.myprofile.UPDATE_MY_ADDRESS_BY_ID(id), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/orderDetails.js



// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const orderDetails = ({
    GET_ORDER_DETAILS: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.orderDetials.GET_ORDER_DETAILS());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    GET_ORDER_DETAILS_BY_ID: (id)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.orderDetials.GET_ORDER_DETAILS_BY_ID(id));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/review.js



// eslint-disable-next-line import/no-anonymous-default-export
/* harmony default export */ const services_review = ({
    POST_REVIEW_BY_USER: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.review.POST_REVIEW(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/CMS.js



/* harmony default export */ const services_CMS = ({
    GET_CMS: ()=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.CMS.GET_CMS());
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    },
    Contact: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.CMS.Contact(), data);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/Discount.js



/* harmony default export */ const services_Discount = ({
    GET_DISCOUNT: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().get((next_config_default()).BASE_URL + api.Discount.GET_DISCOUNT(data));
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/GoogleAuth.js



/* harmony default export */ const GoogleAuth = ({
    GoogleAuth: (data)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await external_axios_default().post((next_config_default()).BASE_URL + api.Google.GoogleAuth(), data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response?.data?.tokens?.access?.token) {
                    localStorage.setItem("access_token", response.data.tokens.access.token);
                }
                (external_axios_default()).defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
});

;// CONCATENATED MODULE: ./services/index.js
















/* harmony default export */ const services = ({
    category: services_category,
    product: services_product,
    auth: services_auth,
    subCategory: services_subCategory,
    subSubCategory: services_subSubCategory,
    fabric: services_fabric,
    cart: services_cart,
    subScribeUers: subScribeUers,
    searchProdcut: searchProdcut,
    Wishlist: services_Wishlist,
    myprofile: services_myprofile,
    orderDetails: orderDetails,
    review: services_review,
    CMS: services_CMS,
    Discount: services_Discount,
    GoogleAuth: GoogleAuth
});


/***/ })

};
;