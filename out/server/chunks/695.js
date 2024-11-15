"use strict";
exports.id = 695;
exports.ids = [695];
exports.modules = {

/***/ 4640:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3590);
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9906);
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_rating_stars_component__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _elements_ProductTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2251);
/* harmony import */ var _sliders_Related__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5393);
/* harmony import */ var _sliders_Thumb__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9465);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7699);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7987);
/* harmony import */ var _elements_SizeChart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4102);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3599);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_12__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_4__, _elements_ProductTab__WEBPACK_IMPORTED_MODULE_6__, _sliders_Related__WEBPACK_IMPORTED_MODULE_7__, _sliders_Thumb__WEBPACK_IMPORTED_MODULE_8__, react_i18next__WEBPACK_IMPORTED_MODULE_10__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_4__, _elements_ProductTab__WEBPACK_IMPORTED_MODULE_6__, _sliders_Related__WEBPACK_IMPORTED_MODULE_7__, _sliders_Thumb__WEBPACK_IMPORTED_MODULE_8__, react_i18next__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const ProductDetails = ({ product: product1 , cartItems , addToCompare , addToCart , addToWishlist , increaseQuantity , decreaseQuantity , quickView , fabricPrice , fabricName , fabricId , totalPrice , source , GetWishlistdata ,  })=>{
    const { t: t1  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation)("common");
    const { 0: quantity , 1: setQuantity  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
    const { 0: fabricType , 1: setfabricType  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: selectedColor , 1: setSelectedColor  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: selectedSize , 1: setSelectedSize  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: selectedQuantity , 1: setSelectedQuantity  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
    const { 0: showSizeChart , 1: setShowSizeChart  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const str = product1?.tags;
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (totalPrice) {
            let fabriccost = +fabricPrice * product1?.length;
            let finalprice = fabriccost + product1?.marginAmount;
            //let discount = (finalprice * product?.discountPercentage) / 100
            //   product.finalAmount =finalprice;
            //  product.finalAmount=totalPrice
            product1.finalAmount = finalprice;
        }
        if (fabricName) {
            setfabricType(fabricName);
        }
        if (fabricName) {
            product1.fabric = fabricName;
        }
        setSelectedColor(color[0]);
        setSelectedSize(size1[0]);
    }, [
        product1
    ]);
    const UpperCase = product1?.Category?.categoryName.split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    const handleWishlist = async (product)=>{
        if (localStorage.getItem("access_token")) {
            try {
                // const userID = localStorage.getItem("userId");
                const data = {
                    productId: product.id
                };
                if (!product.isWishlisted) {
                    const WishlistResponse = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].Wishlist.CREATE_WISHLIST_BY_ID */ .Z.Wishlist.CREATE_WISHLIST_BY_ID(data);
                    //  productDataShow()
                    if (WishlistResponse) {
                        react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Added to Wishlist!");
                    }
                    if (source == "wishlist") {
                        GetWishlistdata();
                    }
                } else {
                    const WishlistResponse = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].Wishlist.DELETE_WISHLIST_BY_ID */ .Z.Wishlist.DELETE_WISHLIST_BY_ID(product.id);
                    //  productDataShow()
                    react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Removed from Wishlist");
                    if (source == "wishlist") {
                        GetWishlistdata();
                    }
                }
            } catch (error) {
                react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(error?.response?.data?.message);
            }
        } else {
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Please Login!");
        }
    };
    const color = JSON?.parse(product1?.colour);
    const size1 = JSON?.parse(product1.size);
    const handleCart = async (product)=>{
        const fabricPriceString = fabricPrice && JSON.parse(fabricPrice);
        product.basePrice = fabricPriceString || product.basePrice;
        product.selectedColor = selectedColor;
        product.selectedSize = selectedSize;
        product.selectedQuantity = selectedQuantity;
        if (localStorage.getItem("access_token")) {
            const cart = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].cart.GET_CART */ .Z.cart.GET_CART();
            let cartDetails = [];
            if (cart?.data?.data?.cartDetail?.cartDetails) {
                cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
            }
            cartDetails?.push(product);
            const unique = cartDetails.filter((value, index, self)=>index === self.findIndex((t)=>t.id === value.id && t.selectedSize === value.selectedSize && t.selectedColor === value.selectedColor && t.fabric === value.fabric
                )
            );
            // const unique = [
            //   ...new Map(
            //     cartDetails &&
            //       cartDetails?.length > 0 &&
            //       cartDetails?.map((item) => [item[key], item])
            //   ).values(),
            // ];
            let data = {
                cartDetail: {
                    cartDetails: unique
                }
            };
            localStorage.setItem("cartItemsCount", unique.length);
            const updateCart = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].cart.UPDATE_CART */ .Z.cart.UPDATE_CART(data);
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Add to Cart!");
        } else {
            const cart = localStorage.getItem("cartDetail") && JSON.parse(localStorage.getItem("cartDetail"));
            let cartDetails = [];
            if (cart) {
                cartDetails = cart.cartDetails;
            }
            cartDetails.push(product);
            const key = "id";
            const unique = cartDetails.filter((value, index, self)=>index === self.findIndex((t)=>t.id === value.id && t.selectedSize === value.selectedSize && t.selectedColor === value.selectedColor && t.fabric === value.fabric
                )
            );
            // const unique = [
            //   ...new Map(cartDetails.map((item) => [item[key], item])).values(),
            // ];
            let data = {
                cartDetail: {
                    cartDetails: unique
                }
            };
            localStorage.setItem("cartItemsCount", unique.length);
            localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Add to Cart!");
        }
    };
    const isLoggedIn = localStorage.getItem("access_token");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "container",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "row flex-row-reverse",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-12",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "product-detail accordion-detail",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "row",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "col-md-6 col-sm-12 col-xs-12",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "detail-gallery",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "product-image-slider",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_sliders_Thumb__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                                            product: product1
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "social-icons single-share",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                        className: "text-grey-5 d-inline-block",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                    className: "mr-10",
                                                                    children: t1("Share this:")
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "social-facebook",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    target: "_blank",
                                                                    href: `https://www.facebook.com/?url=:${window.location.href}`,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: "/assets/imgs/theme/icons/icon-facebook.svg",
                                                                        alt: ""
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "social-twitter",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    target: "_blank",
                                                                    href: `https://www.twitter.com/?url=:${window.location.href}`,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: "/assets/imgs/theme/icons/icon-twitter.svg",
                                                                        alt: ""
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "social-instagram",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    target: "_blank",
                                                                    href: `https://www.instagram.com/?url=:${window.location.href}`,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: "/assets/imgs/theme/icons/icon-instagram.svg",
                                                                        alt: ""
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "social-linkedin",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    target: "_blank",
                                                                    href: `https://www.pinterest.com/?url=:${window.location.href}`,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: "/assets/imgs/theme/icons/icon-pinterest.svg",
                                                                        alt: ""
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "col-md-6 col-sm-12 col-xs-12",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "detail-info",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                        className: "title-detail text-capitalize",
                                                        style: {
                                                            fontWeight: "normal",
                                                            fontSize: "20px"
                                                        },
                                                        children: product1.productName
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "product-detail-rating",
                                                        style: {
                                                            padding: "0px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "pro-details-brand",
                                                                style: {
                                                                    marginTop: "15px"
                                                                },
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                        className: "text-capitalize ",
                                                                        children: [
                                                                            t1("Category"),
                                                                            " \xa0\xa0:\xa0\xa0",
                                                                            UpperCase
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "product-rate-cover text-end",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "font-small ml-5 text-muted",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                            style: {
                                                                                marginTop: "-10px"
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_rating_stars_component__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                                                    value: product1.averageRating,
                                                                                    count: 5,
                                                                                    size: 20,
                                                                                    activeColor: "#ffd700",
                                                                                    isHalf: true,
                                                                                    edit: false
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                    children: product1?.ratingScore
                                                                                })
                                                                            ]
                                                                        }),
                                                                        react_device_detect__WEBPACK_IMPORTED_MODULE_12__.isMobile ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                            children: t1("Reviews")
                                                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                            style: {
                                                                                marginTop: "-25px",
                                                                                marginLeft: "90px"
                                                                            },
                                                                            children: t1("Reviews")
                                                                        })
                                                                    ]
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    totalPrice && totalPrice ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "clearfix product-price-cover",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "product-price primary-color float-left",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ins", {
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "text-brand",
                                                                        style: {
                                                                            fontSize: "20px"
                                                                        },
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                            children: [
                                                                                "Rs.",
                                                                                product1?.finalAmount
                                                                            ]
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "clearfix product-price-cover",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "product-price primary-color float-left",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ins", {
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: "text-brand",
                                                                            style: {
                                                                                fontSize: "20px"
                                                                            },
                                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                                children: [
                                                                                    "Rs.",
                                                                                    product1?.finalAmount
                                                                                ]
                                                                            })
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ins", {
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "old-price font-md ml-15",
                                                                            children: [
                                                                                "Rs.",
                                                                                product1.totalPrice
                                                                            ]
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "save-price font-md color3 ml-15",
                                                                        children: [
                                                                            product1.discountPercentage,
                                                                            "% Off"
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "short-desc mb-20",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                            className: "text-capitalize",
                                                            children: product1.description
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "product_sort_info font-xs mb-10",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                    className: "mb-10",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                        className: "text-capitalize ",
                                                                        children: [
                                                                            t1("SKU"),
                                                                            "\xa0:",
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                                children: [
                                                                                    "\xa0",
                                                                                    product1.sku
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                }),
                                                                react_device_detect__WEBPACK_IMPORTED_MODULE_12__.isMobile ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                    className: "mb-10",
                                                                    style: {
                                                                        maxWidth: "500px",
                                                                        // whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis"
                                                                    },
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                        className: "text-capitalize ",
                                                                        children: [
                                                                            t1("Tags"),
                                                                            "\xa0:",
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                                rel: "tag",
                                                                                className: "me-1",
                                                                                children: [
                                                                                    "\xa0",
                                                                                    str.charAt(0).toUpperCase() + str.slice(1)
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                    className: "mb-10",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                        className: "text-capitalize ",
                                                                        children: [
                                                                            t1("Tags"),
                                                                            "\xa0:",
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                                rel: "tag",
                                                                                className: "me-1",
                                                                                children: [
                                                                                    "\xa0",
                                                                                    str.charAt(0).toUpperCase() + str.slice(1)
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                        className: "text-capitalize ",
                                                                        children: [
                                                                            t1("Availability"),
                                                                            "\xa0:",
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                className: "in-stock text-success ml-5",
                                                                                children: [
                                                                                    product1.currentStock,
                                                                                    " Items In Stock"
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "attr-detail attr-color mb-15",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                className: "mr-10",
                                                                children: t1("Color")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                                className: "list-filter color-filter",
                                                                children: color && color?.map((clr, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                        onClick: ()=>setSelectedColor(clr)
                                                                        ,
                                                                        className: clr == selectedColor && "active",
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                style: {
                                                                                    border: "1px solid black",
                                                                                    backgroundColor: clr
                                                                                }
                                                                            })
                                                                        })
                                                                    }, i)
                                                                )
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "attr-detail attr-size",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                className: "mr-10",
                                                                children: t1("size")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                                className: "list-filter size-filter font-small",
                                                                children: size1.map((size, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                        className: size == selectedSize ? "active" : "",
                                                                        onClick: ()=>setSelectedSize(size)
                                                                        ,
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                            style: {
                                                                                marginTop: "8px"
                                                                            },
                                                                            children: size
                                                                        })
                                                                    }, i)
                                                                )
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                className: "mr-10",
                                                                children: [
                                                                    "\xa0\xa0",
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "text-brand",
                                                                        style: {
                                                                            cursor: " pointer"
                                                                        },
                                                                        onClick: ()=>setShowSizeChart(!showSizeChart)
                                                                        ,
                                                                        variant: "primary",
                                                                        children: [
                                                                            t1("Size Chart"),
                                                                            " ",
                                                                            ">"
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            showSizeChart && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_elements_SizeChart__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                                                showSizeChart: showSizeChart,
                                                                setShowSizeChart: setShowSizeChart
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: `attr-detail attr-size mt-20 ${!isLoggedIn && "d-none"}`,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                className: "mr-10",
                                                                children: t1("Quantity")
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "detail-qty border radius",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        onClick: (e)=>{
                                                                            if (selectedQuantity === 1) {
                                                                                return;
                                                                            } else {
                                                                                setSelectedQuantity(selectedQuantity - 1);
                                                                            }
                                                                        },
                                                                        className: "qty-down",
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fi-rs-angle-small-down"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "qty-val",
                                                                        children: selectedQuantity
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        onClick: ()=>setSelectedQuantity(selectedQuantity + 1)
                                                                        ,
                                                                        className: "qty-up",
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fi-rs-angle-small-up"
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "attr-detail attr-size mt-20",
                                                        style: {
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                                className: "text-capitalize ",
                                                                children: [
                                                                    t1("Fabric"),
                                                                    "\xa0:\xa0",
                                                                    " ",
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "text-brand",
                                                                        children: product1?.fabric
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                                href: `/fabric?id=${product1?.id}_${product1?.slug}`,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                    className: "text-capitalize ",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                        className: "btn btn-outline btn-sm btn-brand-outline font-weight-bold text-brand bg-white text-hover-white ml-5 border-radius-5 btn-shadow-brand hover-up",
                                                                        children: t1("Choose Fabric")
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "bt-1 border-color-1 mt-30 mb-30"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "detail-extralink",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "product-extra-link2",
                                                            style: {
                                                                whiteSpace: "nowrap"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                    onClick: (e)=>handleCart(product1)
                                                                    ,
                                                                    className: "button button-add-to-cart me-2",
                                                                    children: t1("Design My Way")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                    onClick: (e)=>handleCart(product1)
                                                                    ,
                                                                    className: "button button-add-to-cart me-2",
                                                                    children: t1("Add to cart")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    "aria-label": "Add To Wishlist",
                                                                    className: "action-btn hover-up",
                                                                    onClick: (e)=>handleWishlist(product1)
                                                                    ,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                        className: "fi-rs-heart"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                quickView ? null : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_elements_ProductTab__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                                prodcut: product1
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "row mt-40",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "col-12",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                        className: "section-title style-1 mb-30",
                                                        children: t1("Recent products")
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "col-12",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "row related-products position-relative",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_sliders_Related__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {})
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                })
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductDetails);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5303:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3069);
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_responsive_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _redux_action_quickViewAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3181);
/* harmony import */ var _ProductDetails__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4640);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ProductDetails__WEBPACK_IMPORTED_MODULE_4__]);
_ProductDetails__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const images = [
    {
        src: "/images/offer/offer-1.jpg"
    },
    {
        src: "/images/offer/offer-2.jpg"
    },
    {
        src: "/images/offer/offer-3.jpg"
    }, 
];
const QuickView = ({ quickView , closeQuickView: closeQuickView1 , source , GetWishlistdata  })=>{
    const settings = {
        customPaging: function(i) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    src: images[i].src,
                    width: "75"
                })
            });
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_responsive_modal__WEBPACK_IMPORTED_MODULE_3__.Modal, {
            open: quickView ? true : false,
            onClose: closeQuickView1,
            children: quickView ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "quick-view",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ProductDetails__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    product: quickView,
                    quickView: quickView,
                    source: source,
                    GetWishlistdata: GetWishlistdata
                })
            }) : null
        })
    });
};
const mapStateToProps = (state)=>({
        quickView: state.quickView
    })
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(mapStateToProps, {
    closeQuickView: _redux_action_quickViewAction__WEBPACK_IMPORTED_MODULE_5__/* .closeQuickView */ .z
})(QuickView));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8175:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7699);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2702);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_next_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7987);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3590);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3599);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_i18next__WEBPACK_IMPORTED_MODULE_5__, react_toastify__WEBPACK_IMPORTED_MODULE_6__]);
([react_i18next__WEBPACK_IMPORTED_MODULE_5__, react_toastify__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const Search = ({ iconRemove  })=>{
    const { t: t1  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)("common");
    const { 0: searchTerm , 1: setSearchTerm  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: prodcut , 1: setProdcut  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const imageUrl = (_next_config__WEBPACK_IMPORTED_MODULE_4___default().BASE_URL_UPLOADS);
    const Router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        {
            searchTerm.length > 2 && searchProduct();
        }
    }, [
        searchTerm
    ]);
    const navigate = async (productId)=>{
        await router.push("/products/details/?${productId}", `/products/details/?${productId}`);
    };
    const searchProduct = async ()=>{
        try {
            const response = await _services__WEBPACK_IMPORTED_MODULE_3__/* ["default"].searchProdcut.SEARCH_PRODCUT */ .Z.searchProdcut.SEARCH_PRODCUT(searchTerm);
            if (response) {
                setProdcut(response?.data?.data?.rows);
                iconRemove(response?.data?.data?.rows);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearch = (e)=>{
        if (e.target.value !== "") {
            setSearchTerm(e.target.value);
        } else if (e.target.value === "") {
            setSearchTerm("");
            setProdcut([]);
            iconRemove([]);
        }
    };
    const handleCart = async (product)=>{
        // const fabricPriceString = fabricPrice && JSON.parse(fabricPrice);
        // product.basePrice = fabricPriceString || product.basePrice;
        const color = JSON?.parse(product?.colour);
        const size = JSON?.parse(product.size);
        product.selectedColor = color[0];
        product.selectedSize = size[0];
        product.selectedQuantity = 1;
        if (localStorage.getItem("access_token")) {
            const cart = await _services__WEBPACK_IMPORTED_MODULE_3__/* ["default"].cart.GET_CART */ .Z.cart.GET_CART();
            let cartDetails = [];
            if (cart?.data?.data?.cartDetail?.cartDetails) {
                cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
            }
            cartDetails?.push(product);
            const unique = cartDetails.filter((value, index, self)=>index === self.findIndex((t)=>t.id === value.id && t.selectedSize === value.selectedSize && t.selectedColor === value.selectedColor && t.fabric === value.fabric
                )
            );
            let data = {
                cartDetail: {
                    cartDetails: unique
                }
            };
            localStorage.setItem("cartItemsCount", unique.length);
            const updateCart = await _services__WEBPACK_IMPORTED_MODULE_3__/* ["default"].cart.UPDATE_CART */ .Z.cart.UPDATE_CART(data);
            react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.success("Add to Cart!");
        } else {
            const cart = localStorage.getItem("cartDetail") && JSON.parse(localStorage.getItem("cartDetail"));
            let cartDetails = [];
            if (cart) {
                cartDetails = cart.cartDetails;
            }
            cartDetails.push(product);
            const key = "id";
            const unique = cartDetails.filter((value, index, self)=>index === self.findIndex((t)=>t.id === value.id && t.selectedSize === value.selectedSize && t.selectedColor === value.selectedColor && t.fabric === value.fabric
                )
            );
            let data = {
                cartDetail: {
                    cartDetails: unique
                }
            };
            localStorage.setItem("cartItemsCount", unique.length);
            localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));
            react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.success("Add to Cart!");
        }
    };
    // iconRemove(prodcut.length);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    value: searchTerm,
                    onChange: handleSearch,
                    onKeyDown: (e)=>{
                        if (e.key === "Enter") {
                            router.push(`/products?searchProdcut=${e.target.value}`);
                            setSearchTerm("");
                            setProdcut([]);
                        // iconRemove([]);
                        }
                    },
                    type: "text",
                    placeholder: t1("Search")
                })
            }),
            react_device_detect__WEBPACK_IMPORTED_MODULE_7__.isMobile ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: prodcut?.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        position: "absolute",
                        width: "685px",
                        zIndex: "5"
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "card bg-white",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                            className: "list-group list-group-flush",
                            children: prodcut?.map((product, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: "list-group-item bg-white",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            display: "flex"
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            style: {
                                                display: "flex"
                                            },
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    className: "default-img",
                                                    src: imageUrl + product?.featuredImage,
                                                    crossOrigin: "anonymous",
                                                    alt: "",
                                                    height: 50,
                                                    width: 50
                                                }),
                                                "\xa0\xa0\xa0",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        onClick: ()=>navigate(product?.slug)
                                                        ,
                                                        style: {
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            marginTop: "12px"
                                                        },
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                            style: {
                                                                maxWidth: "200px",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden"
                                                            },
                                                            children: product.productName
                                                        })
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                }, index)
                            )
                        })
                    })
                })
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: prodcut?.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        position: "absolute",
                        width: "685px",
                        zIndex: "5"
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "card bg-white",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                            className: "list-group list-group-flush",
                            children: prodcut?.map((product, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: "list-group-item bg-white",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    display: "flex"
                                                },
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        className: "default-img",
                                                        src: imageUrl + product?.featuredImage,
                                                        crossOrigin: "anonymous",
                                                        alt: "",
                                                        height: 50,
                                                        width: 50
                                                    }),
                                                    "\xa0 \xa0",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                            onClick: ()=>navigate(product?.slug)
                                                            ,
                                                            style: {
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                marginTop: "12px"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                                    style: {
                                                                        maxWidth: "200px",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis"
                                                                    },
                                                                    children: product.productName
                                                                }),
                                                                "\xa0\xa0\xa0",
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                                                    style: {
                                                                        maxWidth: "200px",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis"
                                                                    },
                                                                    children: [
                                                                        "\u20B9 ",
                                                                        product.finalAmount
                                                                    ]
                                                                }),
                                                                "\xa0\xa0",
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                                                    style: {
                                                                        maxWidth: "200px",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis"
                                                                    },
                                                                    children: [
                                                                        "\u20B9 ",
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("s", {
                                                                            children: product.totalPrice
                                                                        })
                                                                    ]
                                                                }),
                                                                "\xa0\xa0\xa0",
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                                                    style: {
                                                                        maxWidth: "200px",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        color: "#E74C26"
                                                                    },
                                                                    children: [
                                                                        product.discountPercentage,
                                                                        "% Off"
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "product-action-1 show",
                                                style: {
                                                    marginTop: "12px"
                                                },
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    "aria-label": "Add To Cart",
                                                    className: "action-btn hover-up ",
                                                    onClick: (e)=>handleCart(product)
                                                    ,
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "fi-rs-shopping-bag-add",
                                                        style: {
                                                            fontSize: "20px"
                                                        }
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                }, index)
                            )
                        })
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1601:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9906);
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3590);
/* harmony import */ var _redux_action_cart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8866);
/* harmony import */ var _redux_action_compareAction__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9216);
/* harmony import */ var _redux_action_quickViewAction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3181);
/* harmony import */ var _redux_action_wishlistAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5644);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3599);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _elements_Loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8690);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2702);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_next_config__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7699);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7987);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_11__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_5__, react_i18next__WEBPACK_IMPORTED_MODULE_10__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_5__, react_i18next__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















const SingleProduct = ({ data1 , product: product1 , openQuickView: openQuickView1 , source , GetWishlistdata ,  })=>{
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: productId , 1: setProductId  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(data1?.productId);
    const { 0: UserId , 1: setUserId  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(data1?.User?.id);
    const { 0: isProductIsWishListed , 1: setIsProductIsWishListed  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    const route = (0,next_router__WEBPACK_IMPORTED_MODULE_11__.useRouter)();
    const productDataShow = ()=>{
        setProductId(data1?.productId);
        setUserId(data1?.User?.id);
    };
    const { t: t1 , i18n  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation)("common");
    const imageUrl = (_next_config__WEBPACK_IMPORTED_MODULE_8___default().BASE_URL_UPLOADS);
    const basePrice = product1?.totalPrice || 0;
    const discountPercentage = product1?.discountPercentage || 0;
    const UpperCase = product1?.SubSubCategory?.subSubCategoryName.split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    let image = [];
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        productDataShow();
        setIsProductIsWishListed(product1.isWishlisted);
    }, []);
    const handleCart = async (product)=>{
        const color = JSON?.parse(product?.colour);
        const size = JSON?.parse(product.size);
        product.selectedColor = color[0];
        product.selectedSize = size[0];
        product.selectedQuantity = 1;
        if (localStorage.getItem("access_token")) {
            const cart = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].cart.GET_CART */ .Z.cart.GET_CART();
            let cartDetails = [];
            if (cart?.data?.data?.cartDetail?.cartDetails) {
                cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
            }
            cartDetails?.push(product);
            const key = "id";
            const unique = cartDetails.filter((value, index, self)=>index === self.findIndex((t)=>t.id === value.id && t.selectedSize === value.selectedSize && t.selectedColor === value.selectedColor && t.fabric === value.fabric
                )
            );
            let data = {
                cartDetail: {
                    cartDetails: unique
                }
            };
            localStorage.setItem("cartItemsCount", unique.length);
            const updateCart = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].cart.UPDATE_CART */ .Z.cart.UPDATE_CART(data);
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Add to Cart !");
        } else {
            const cart = localStorage.getItem("cartDetail") && JSON.parse(localStorage.getItem("cartDetail"));
            let cartDetails = [];
            if (cart) {
                cartDetails = cart.cartDetails;
            }
            cartDetails.push(product);
            const key = "id";
            const unique = cartDetails.filter((value, index, self)=>index === self.findIndex((t)=>t.id === value.id && t.selectedSize === value.selectedSize && t.selectedColor === value.selectedColor && t.fabric === value.fabric
                )
            );
            let data = {
                cartDetail: {
                    cartDetails: unique
                }
            };
            localStorage.setItem("cartItemsCount", unique.length);
            localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Add to Cart !");
        }
    };
    const handleWishlist = async (product)=>{
        if (localStorage.getItem("access_token")) {
            try {
                const data = {
                    productId: product.id
                };
                if (!isProductIsWishListed) {
                    const WishlistResponse = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].Wishlist.CREATE_WISHLIST_BY_ID */ .Z.Wishlist.CREATE_WISHLIST_BY_ID(data);
                    if (route.pathname != "/shop-wishlist" && route.pathname != "/products") {
                        setIsProductIsWishListed(!isProductIsWishListed);
                    }
                    productDataShow();
                    react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Added to Wishlist!");
                } else {
                    const WishlistResponse = await _services__WEBPACK_IMPORTED_MODULE_9__/* ["default"].Wishlist.DELETE_WISHLIST_BY_ID */ .Z.Wishlist.DELETE_WISHLIST_BY_ID(product.id);
                    if (route.pathname != "/shop-wishlist" && route.pathname != "/products") {
                        setIsProductIsWishListed(!isProductIsWishListed);
                    }
                    productDataShow();
                    react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Removed from Wishlist");
                }
                if (source == "wishlist") {
                    GetWishlistdata();
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        } else {
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("Please Login!");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: !loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "product-cart-wrap mb-30",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "product-img-action-wrap",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "product-img product-img-zoom",
                                style: {
                                    height: "250 px"
                                },
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    // href={`/products/${product.slug}`}
                                    // as={`/products/${product.slug}`}
                                    href: `/products/details?${product1.slug}`,
                                    as: `/products/details?${product1.slug}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            className: "default-img",
                                            src: imageUrl + product1?.featuredImage,
                                            crossOrigin: "anonymous",
                                            alt: ""
                                        })
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "product-action-1",
                                style: react_device_detect__WEBPACK_IMPORTED_MODULE_6__.isMobile ? {
                                    marginTop: "-120px"
                                } : {},
                                children: [
                                    react_device_detect__WEBPACK_IMPORTED_MODULE_6__.isMobile ? null : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        "aria-label": "Quick view",
                                        className: "action-btn hover-up",
                                        "data-bs-toggle": "modal",
                                        onClick: ()=>{
                                            openQuickView1(product1);
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fi-rs-eye"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        "aria-label": "Add To Wishlist",
                                        className: "action-btn hover-up",
                                        onClick: (e)=>handleWishlist(product1)
                                        ,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fi-rs-heart"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "product-badges product-badges-position product-badges-mrg",
                                children: [
                                    product1?.productType == 1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "hot",
                                        children: [
                                            t1("Hot Deals"),
                                            " "
                                        ]
                                    }) : null,
                                    product1?.productType == 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "hot",
                                        children: [
                                            t1("New Product"),
                                            " "
                                        ]
                                    }) : null,
                                    product1?.productType == 2 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "hot",
                                        children: [
                                            t1("Best Seller"),
                                            " "
                                        ]
                                    }) : null,
                                    product1?.productType == 3 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "hot",
                                        children: [
                                            t1("UP  Coming"),
                                            " "
                                        ]
                                    }) : null
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "product-content-wrap",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "product-category",
                                children: UpperCase
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: `/products/details?${product1.slug}`,
                                    as: `/products/details?${product1.slug}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        className: "text-capitalize",
                                        children: product1?.productName
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3___default()), {
                                            value: product1.averageRating,
                                            count: 5,
                                            size: 20,
                                            activeColor: "#ffd700",
                                            isHalf: true,
                                            edit: false
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                product1?.ratingScore,
                                                " "
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "product-price",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            "Rs. ",
                                            product1.finalAmount
                                        ]
                                    }),
                                    discountPercentage > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "old-price",
                                        children: [
                                            " Rs. ",
                                            basePrice
                                        ]
                                    }),
                                    " ",
                                    "\xa0",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: product1?.discountPercentage > 0 ? `${product1?.discountPercentage}%` : ""
                                    })
                                ]
                            }),
                            react_device_detect__WEBPACK_IMPORTED_MODULE_6__.isMobile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "product-price text-capitalize product-action-1 show",
                                children: [
                                    "Design : \xa0",
                                    product1?.designerName
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "product-price text-capitalize ",
                                        children: [
                                            "Designer : \xa0",
                                            product1?.designerName
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "product-action-1 show",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                "aria-label": "Add To Cart",
                                                className: "action-btn hover-up",
                                                onClick: (e)=>handleCart(product1)
                                                ,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "fi-rs-shopping-bag-add"
                                                })
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_elements_Loader__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {})
    });
};
const mapDispatchToProps = {
    addToCart: _redux_action_cart__WEBPACK_IMPORTED_MODULE_12__/* .addToCart */ .Xq,
    addToCompare: _redux_action_compareAction__WEBPACK_IMPORTED_MODULE_13__/* .addToCompare */ .a$,
    addToWishlist: _redux_action_wishlistAction__WEBPACK_IMPORTED_MODULE_14__/* .addToWishlist */ .Mp,
    openQuickView: _redux_action_quickViewAction__WEBPACK_IMPORTED_MODULE_15__/* .openQuickView */ .$
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_4__.connect)(null, mapDispatchToProps)(SingleProduct));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8690:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8782);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_content_loader__WEBPACK_IMPORTED_MODULE_2__);



const Loader = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_content_loader__WEBPACK_IMPORTED_MODULE_2___default()), {
            viewBox: "0 0 500 420",
            height: 420,
            width: 400,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                    x: "16",
                    y: "17",
                    rx: "0",
                    ry: "0",
                    width: "360",
                    height: "200"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "35",
                    cy: "248",
                    r: "20"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                    x: "69",
                    y: "229",
                    rx: "2",
                    ry: "2",
                    width: "275",
                    height: "15"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                    x: "69",
                    y: "253",
                    rx: "2",
                    ry: "2",
                    width: "140",
                    height: "15"
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);


/***/ }),

/***/ 2251:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7987);
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9906);
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5303);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_i18next__WEBPACK_IMPORTED_MODULE_2__, _components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_4__]);
([react_i18next__WEBPACK_IMPORTED_MODULE_2__, _components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const ProductTab = ({ prodcut  })=>{
    const { t  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)("common");
    const { 0: activeIndex , 1: setActiveIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const { 0: visibleItems , 1: setVisibleItems  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(2);
    const handleOnClick = (index)=>{
        setActiveIndex(index);
    };
    //prodcut addional information
    const htmlData = prodcut?.additionalInformation;
    // Create a temporary element to parse the HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlData;
    // Extract the text content from the element
    const textContent = tempElement.textContent;
    // Now 'textContent' contains the filtered text data
    //color function
    function parseAndFormatColors(colorsJSON) {
        try {
            const colorArray = JSON.parse(colorsJSON);
            if (Array.isArray(colorArray)) {
                return colorArray.join(", ");
            }
        } catch (error) {
        // Handle the JSON parsing error here, or you can ignore it
        }
        return "";
    }
    const handleToggle = ()=>{
        setVisibleItems((prevVisibleItems)=>prevVisibleItems === prodcut?.Ratings?.length ? 3 : prodcut?.Ratings?.length
        );
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "tab-style3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                        className: "nav nav-tabs text-uppercase",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                className: "nav-item",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    className: activeIndex === 1 ? "nav-link active" : "nav-link",
                                    id: "Description-tab",
                                    "data-bs-toggle": "tab",
                                    onClick: ()=>handleOnClick(1)
                                    ,
                                    children: t("Description")
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                className: "nav-item",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    className: activeIndex === 2 ? "nav-link active" : "nav-link",
                                    id: "Additional-info-tab",
                                    "data-bs-toggle": "tab",
                                    onClick: ()=>handleOnClick(2)
                                    ,
                                    children: t("Additional info")
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                className: "nav-item",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    className: activeIndex === 3 ? "nav-link active" : "nav-link",
                                    id: "Reviews-tab",
                                    "data-bs-toggle": "tab",
                                    onClick: ()=>handleOnClick(3)
                                    ,
                                    children: t("Reviews")
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "tab-content shop_info_tab entry-main-content",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade",
                                id: "Description",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: prodcut?.description
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade",
                                id: "Additional-info",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                dangerouslySetInnerHTML: {
                                                    __html: textContent
                                                }
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade",
                                id: "Reviews",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "comments-area",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "col-lg-8 ",
                                            style: {
                                                marginBottom: "-50px"
                                            },
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                    className: "mb-15",
                                                    children: t("Customer questions & answers")
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        prodcut?.Ratings?.slice(0, visibleItems).map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                            className: "single-comment justify-content-between d-flex",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                className: "user justify-content-between d-flex",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                                    className: "desc",
                                                                                    children: [
                                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_rating_stars_component__WEBPACK_IMPORTED_MODULE_3___default()), {
                                                                                                value: item?.ratings,
                                                                                                count: 5,
                                                                                                size: 20,
                                                                                                activeColor: "#ffd700",
                                                                                                isHalf: true,
                                                                                                edit: false
                                                                                            })
                                                                                        }),
                                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                                            children: item?.review
                                                                                        }),
                                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                            className: "d-flex justify-content-between",
                                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                                className: "d-flex align-items-center"
                                                                                            })
                                                                                        }),
                                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                                                children: [
                                                                                                    item?.User?.firstName,
                                                                                                    " \xa0\xa0",
                                                                                                    item?.User?.lastName
                                                                                                ]
                                                                                            })
                                                                                        })
                                                                                    ]
                                                                                })
                                                                            })
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                                                    ]
                                                                })
                                                            }, index)
                                                        ),
                                                        prodcut?.Ratings?.length > visibleItems && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            onClick: handleToggle,
                                                            className: "button button-add-to-cart me-3",
                                                            children: visibleItems === 2 ? "Show all Reviews" : "Review"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductTab);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);



const SizeChart = ({ showSizeChart , setShowSizeChart  })=>{
    const sizeChartData = [
        {
            size: "Small",
            frontLength: "27.5",
            acrossShoulder: "16.3"
        },
        {
            size: "Medium",
            frontLength: "28.0",
            acrossShoulder: "17.0"
        },
        {
            size: "Large",
            frontLength: "28.5",
            acrossShoulder: "17.8"
        },
        {
            size: "Extra Large",
            frontLength: "29.0",
            acrossShoulder: "18.6"
        }, 
    ];
    const handleClose = ()=>{
        setShowSizeChart(!showSizeChart);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        show: showSizeChart,
        onHide: handleClose,
        centered: true,
        dialogClassName: "size-chart-modal-custom",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.Header, {
                closeButton: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.Title, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                        children: "Size Chart"
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.Body, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "size-chart",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Table, {
                            bordered: true,
                            className: "table",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                children: "Size"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                children: "Front Length"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                children: "Across Shoulder"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                    children: sizeChartData.map((data, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                    children: data.size
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                    children: data.frontLength
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                    children: data.acrossShoulder
                                                })
                                            ]
                                        }, index)
                                    )
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                            style: {
                                fontSize: "10px"
                            },
                            children: "Please note: Size chart is for reference only. Sizes may vary between brands."
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SizeChart);


/***/ }),

/***/ 3305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);



const Breadcrumb = ({ parent , sub , subSub , subChild , noBreadcrumb  })=>{
    const Route = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: Route.route == "/thankyou" || Route.route == "/failed" ? null : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: `page-header breadcrumb-wrap ${noBreadcrumb}`,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "container",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "breadcrumb",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: "/",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                children: parent
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                        " ",
                        sub,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                        " ",
                        subSub,
                        Route.pathname != "/fabric" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: subSub && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
                        }),
                        subChild
                    ]
                })
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Breadcrumb);


/***/ }),

/***/ 240:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7699);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3590);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8819);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7987);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_4__, react_i18next__WEBPACK_IMPORTED_MODULE_7__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_4__, react_i18next__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const Footer = ()=>{
    const { t  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)("common");
    const { 0: email1 , 1: setemail  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: emailError , 1: setEmailError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const { 0: isValid1 , 1: setIsValid  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const validateEmail = (email)=>{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    //email send function
    const toastErrorLogin = (error)=>{
        react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(error.response?.data?.message || "An error occurred");
    };
    const toastSuccessLogin = ()=>react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Subscribe  User successfully")
    ;
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        let isValid = true;
        setEmailError("");
        if (email1 === "") {
            setEmailError("Enter a valid email address");
            isValid = false;
        } else if (!validateEmail(email1)) {
            setEmailError("Enter a valid email address");
            isValid = false;
        }
        if (isValid) {
            try {
                let payLoad = {
                    email: email1,
                    status: true
                };
                const response = await _services__WEBPACK_IMPORTED_MODULE_3__/* ["default"].subScribeUers.SUBSCRIBE_USER */ .Z.subScribeUers.SUBSCRIBE_USER(payLoad);
                if (response) {
                    setIsValid(false);
                    toastSuccessLogin();
                    setemail("");
                }
            } catch (error) {
                setIsValid(true);
                toastErrorLogin(error);
            }
        }
    };
    const handleWishlist = ()=>{
        if (localStorage.getItem("access_token")) {
            router.push("/shop-wishlist/");
        } else {
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Please Login!");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("footer", {
            className: "main",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                    className: "newsletter p-30 text-white wow fadeIn animated",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "row align-items-center",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-lg-12 mb-md-3 mb-lg-0",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row align-items-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "col flex-horizontal-center",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    className: "icon-email",
                                                    src: "/assets/imgs/theme/icons/icon-email.svg",
                                                    alt: ""
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                    className: "font-size-20 mb-0 ml-3",
                                                    children: t("Sit back and Relax & get your Apparel Delivered as per your wished Design Inputs")
                                                })
                                            ]
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-lg-6 my-4 my-md-0 des",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                        className: "font-size-15 ml-4 mb-0",
                                        children: t("Cheers! You\u2019re happiness will be delivered shortly with applatus")
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-lg-5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                            className: "form-subscriber d-flex wow fadeIn animated",
                                            onSubmit: handleFormSubmit,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "email",
                                                    className: "form-control bg-white font-small",
                                                    placeholder: t("Enter your email"),
                                                    name: "email",
                                                    style: {
                                                        fontSize: "12px"
                                                    },
                                                    value: email1,
                                                    onChange: (e)=>{
                                                        setemail(e.target.value.trim());
                                                        setIsValid(true);
                                                    }
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    className: "btn bg-dark text-white ",
                                                    type: "submit",
                                                    disabled: !(email1 && isValid1),
                                                    children: t("Subscribe")
                                                })
                                            ]
                                        }),
                                        emailError ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                                            style: {
                                                color: "red"
                                            },
                                            className: "",
                                            children: emailError
                                        }) : null
                                    ]
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                    className: "section-padding footer-mid",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "container pt-15 pb-20",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "row",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-lg-4 col-md-6",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "widget-about font-md mb-md-5 mb-lg-0",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "logo logo-width-1 wow fadeIn animated",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: "/",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            src: "/assets/imgs/applatus1.jpg",
                                                            alt: "logo"
                                                        })
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                                className: "mt-20 mb-10 fw-600 text-grey-4 wow fadeIn animated",
                                                children: t("Contact")
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "wow fadeIn animated",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                        children: [
                                                            t("Address:"),
                                                            " "
                                                        ]
                                                    }),
                                                    t("Basti, UP, India, 272001")
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "wow fadeIn animated",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    href: "tel:+919111107373",
                                                    style: {
                                                        color: "#442452"
                                                    },
                                                    children: "+91-9111107373"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "wow fadeIn animated",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                        children: [
                                                            t("Hours:"),
                                                            " "
                                                        ]
                                                    }),
                                                    "10:00 - 18:00,",
                                                    " ",
                                                    t("Mon - Sat")
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                                className: "mb-10 mt-30 fw-600 text-grey-4 wow fadeIn animated",
                                                children: t("Follow Us")
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mobile-social-icon wow fadeIn animated mb-sm-5 mb-md-0",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        target: "_blank",
                                                        // href={`https://www.facebook.com/officialkorakagaj/?url=:${window.location.href}`}
                                                        href: `https://www.facebook.com/Applatus/?url=:${window.location.href}`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            src: "/assets/imgs/theme/icons/icon-facebook.svg",
                                                            alt: ""
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        target: "_blank",
                                                        // href={`https://twitter.com/Asli_KoraKagaj?url=:${window.location.href}`}
                                                        href: `https://x.com/i/flow/login?redirect_after_login=%2FApplatusT?url=:${window.location.href}`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            src: "/assets/imgs/theme/icons/icon-twitter.svg",
                                                            alt: ""
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        target: "_blank",
                                                        href: `https://www.instagram.com/applatustechnologies/?igshid=ZGUzMzM3NWJiOQ%3D%3D/?url=:${window.location.href}`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            src: "/assets/imgs/theme/icons/icon-instagram.svg",
                                                            alt: ""
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        target: "_blank",
                                                        // href={`https://in.linkedin.com/in/korakagaj-4u-5a8482216/?url=:${window.location.href}`}
                                                        href: `https://www.linkedin.com/company/applatus-technologies/?url=:${window.location.href}`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            src: "/assets/imgs/theme/icons/Linkedin.svg",
                                                            alt: ""
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-lg-4 col-md-6",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "widget-title wow fadeIn animated",
                                            children: t("About")
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                            className: "footer-list wow fadeIn animated mb-sm-5 mb-md-0",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/page-about/",
                                                        as: `/page-about/`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            children: t("About Us")
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/page-privacy-policy",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            children: t("Privacy Policy")
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/page-return-policy",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            children: t("Returns")
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/page-terms",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                            children: [
                                                                t("Terms"),
                                                                "\xa0 & \xa0",
                                                                t("Conditions")
                                                            ]
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/page-contact/",
                                                        as: "/page-contact/",
                                                        children: t("Contact Us")
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-lg-4 col-md-6",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            className: "widget-title wow fadeIn animated",
                                            children: t("My Account")
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                            className: "footer-list wow fadeIn animated",
                                            children: [
                                                localStorage.getItem("access_token") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        children: t("Sign In")
                                                    })
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/login",
                                                        as: "/login",
                                                        children: t("Sign In")
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/shop-cart",
                                                        as: `/shop-cart`,
                                                        children: t("View Cart")
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        onClick: handleWishlist,
                                                        children: t("My Wishlist")
                                                    })
                                                }),
                                                localStorage.getItem("access_token") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                            href: "/myprofile/?index=2",
                                                            as: `/myprofile/?index=2`,
                                                            children: t("Order")
                                                        })
                                                    })
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        onClick: handleWishlist,
                                                        children: t("Order")
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "container pb-20 wow fadeIn animated",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-12 mb-20",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "footer-bottom"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-lg-6",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "float-md-left font-sm text-muted mb-0",
                                    children: [
                                        "\xa9 ",
                                        new Date().getFullYear(),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                            className: "text-brand",
                                            children: [
                                                " ",
                                                t("Applatus")
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8448:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1377);
/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ecommerce_Search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8175);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7699);
/* harmony import */ var react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9070);
/* harmony import */ var react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _pages_shop_wishlist__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(270);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7987);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2702);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_next_config__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2021);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3590);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_13__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ecommerce_Search__WEBPACK_IMPORTED_MODULE_5__, _pages_shop_wishlist__WEBPACK_IMPORTED_MODULE_8__, react_i18next__WEBPACK_IMPORTED_MODULE_9__, i18next__WEBPACK_IMPORTED_MODULE_11__, react_toastify__WEBPACK_IMPORTED_MODULE_12__]);
([_ecommerce_Search__WEBPACK_IMPORTED_MODULE_5__, _pages_shop_wishlist__WEBPACK_IMPORTED_MODULE_8__, react_i18next__WEBPACK_IMPORTED_MODULE_9__, i18next__WEBPACK_IMPORTED_MODULE_11__, react_toastify__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















const Header = ({ toggleClick , headerStyle  })=>{
    const { 0: firstName , 1: setFirstName  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const { 0: lastName , 1: setLastName  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const imageUrl = (_next_config__WEBPACK_IMPORTED_MODULE_10___default().BASE_URL_UPLOADS);
    const { t , i18n: i18n1  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation)("common");
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_13__.useRouter)();
    const { 0: lang , 1: setLang  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const { 0: isToggled , 1: setToggled  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: scroll , 1: setScroll  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
    const { 0: categoryList , 1: setCategoryList  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { 0: hoveredCategoryId , 1: setHoveredCategoryId  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const { 0: HoveredSabCategoryId , 1: setHoveredSabCategoryId  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const { 0: subCategory , 1: setSubCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { 0: subSubCategory1 , 1: setSubSubCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { 0: url , 1: seturl  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: totalCartItems , 1: setTotalCartItems  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const { 0: totalWishlistItems , 1: setTotalWishlistItems  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const { 0: SubCate , 1: setSubCate  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const GetWishlistdata = async ()=>{
        if (localStorage.getItem("access_token")) {
            try {
                const WishlistResponse = await _services__WEBPACK_IMPORTED_MODULE_6__/* ["default"].Wishlist.GET_WISHLIST_DATA */ .Z.Wishlist.GET_WISHLIST_DATA();
                setTotalWishlistItems(WishlistResponse?.data?.data?.length);
            } catch (error) {
                console.error("An error occurred:", error);
            }
            return;
        }
    };
    const hindi = "";
    //language change function
    const handleLang = ()=>{
        if (sessionStorage.getItem("lang") === "Hindi") {
            i18n1.changeLanguage("hi");
            const lng = sessionStorage.getItem("lang");
            setLang(lng);
        } else if (sessionStorage.getItem("lang") === "English") {
            i18n1.changeLanguage("en");
            const lng = sessionStorage.getItem("lang");
            setLang(lng);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const langdata = sessionStorage.getItem("lang");
        setLang(langdata);
        handleLang();
        cheklogin();
        document.addEventListener("scroll", ()=>{
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });
        getProfile();
        handleCart();
        GetWishlistdata();
        const interval = setInterval(()=>{
            const cartItemsCount = localStorage.getItem("cartItemsCount") ? localStorage.getItem("cartItemsCount") : 0;
            const wishListItemsCount = localStorage.getItem("wishListItemsCount") ? localStorage.getItem("wishListItemsCount") : 0;
            setTotalWishlistItems(wishListItemsCount);
            setTotalCartItems(cartItemsCount);
        }, 500);
    // return () => clearInterval(interval)
    }, [
        lang
    ]);
    const getProfile = async ()=>{
        if (localStorage.getItem("access_token")) {
            try {
                const response = await _services__WEBPACK_IMPORTED_MODULE_6__/* ["default"].myprofile.GET_MY_PROFILE */ .Z.myprofile.GET_MY_PROFILE();
                localStorage.setItem("profile", JSON.stringify(response?.data?.data));
                if (response) {
                    setFirstName(response?.data?.data?.firstName);
                    setLastName(response?.data?.data?.lastName);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleToggle = ()=>{
        CategoryList();
        setToggled(!isToggled);
    };
    const CategoryList = async ()=>{
        const respo = await _services__WEBPACK_IMPORTED_MODULE_6__/* ["default"].category.GET_CATEGORY_ALL */ .Z.category.GET_CATEGORY_ALL();
        setCategoryList(respo.data.data);
    };
    const subCategoryList = async (id)=>{
        setSubCate(false);
        const response = await _services__WEBPACK_IMPORTED_MODULE_6__/* ["default"].subCategory.GET_ALL_SUB_CATEGORY */ .Z.subCategory.GET_ALL_SUB_CATEGORY(id);
        setSubCategory(response.data.data.rows);
        const subSubCategoriesArray = [];
        for (const subCategoryItem of response.data.data.rows){
            const subSubCategoryResponse = await _services__WEBPACK_IMPORTED_MODULE_6__/* ["default"].subSubCategory.GET_SUB_SUB_CATEGORYALL */ .Z.subSubCategory.GET_SUB_SUB_CATEGORYALL(subCategoryItem.id);
            subSubCategoriesArray.push(...subSubCategoryResponse.data.data.rows);
        }
    };
    //user name
    const handleCart = async ()=>{
        if (localStorage.getItem("access_token")) {
            try {
                const cart = await _services__WEBPACK_IMPORTED_MODULE_6__/* ["default"].cart.GET_CART */ .Z.cart.GET_CART();
                setTotalCartItems(cart?.data?.data?.cartDetail?.cartDetails?.length);
            } catch (error) {
                console.log(error);
            }
        } else {
            const cart = localStorage.getItem("cartDetail") && JSON.parse(localStorage.getItem("cartDetail"));
            setTotalCartItems(cart?.cartDetails?.length);
        }
    };
    const cheklogin = ()=>{
        if (localStorage.getItem("access_token")) {
            seturl(true);
        }
    };
    const navigateOrders = async (productId)=>{
        await router.push("/myprofile?index=5");
    };
    const navigateAddress = async (productId)=>{
        await router.push("/myprofile?index=4");
    };
    const navigateProfile = async (productId)=>{
        await router.push("/myprofile?index=2");
    };
    const subSubCategoryList = async (id)=>{
        const subSubCategory = await _services__WEBPACK_IMPORTED_MODULE_6__/* ["default"].subSubCategory.GET_SUB_SUB_CATEGORYALL */ .Z.subSubCategory.GET_SUB_SUB_CATEGORYALL(id);
        setSubSubCategory(subSubCategory?.data?.data?.rows);
        setSubCate(true);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
            className: `header-area ${headerStyle} header-height-2`,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "header-top header-top-ptb-1 d-none d-lg-block",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "row align-items-center",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-xl-3 col-lg-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "header-info d-inline-block",
                                        style: {
                                            whiteSpace: "nowrap"
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "fi-rs-smartphone"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            href: "tel:+919111107373",
                                                            children: "+91-9111107373"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "fi-rs-marker"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                            href: "/page-contact",
                                                            children: t("Basti, UP, India")
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-xl-6 col-lg-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-center",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            id: "news-flash",
                                            className: "d-inline-block",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                    children: [
                                                        t("Get great offer up to 50% off"),
                                                        "\xa0\xa0",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                            href: "/products",
                                                            children: t("View detail")
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-xl-3 col-lg-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "header-info header-info-right",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                            className: "language-dropdown-active",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                    className: "fi-rs-world"
                                                                }),
                                                                lang && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    children: lang
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                    className: "fi-rs-angle-small-down"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                            className: "language-dropdown",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                        onClick: ()=>{
                                                                            i18n1.changeLanguage("hi");
                                                                            setLang("Hindi");
                                                                            sessionStorage.setItem("lang", "Hindi");
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                                src: "/assets/imgs/theme/India-flag.png",
                                                                                alt: ""
                                                                            }),
                                                                            "Hindi"
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                        onClick: ()=>{
                                                                            i18n1.changeLanguage("en");
                                                                            setLang("English");
                                                                            sessionStorage.setItem("lang", "English");
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                                src: "/assets/imgs/theme/English-flag.png",
                                                                                height: "10px",
                                                                                width: "20px"
                                                                            }),
                                                                            "English"
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "fi-rs-user"
                                                        }),
                                                        lastName && firstName ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7___default()), {
                                                            id: "nav-dropdown-light-example",
                                                            title: `${firstName?.length > 15 ? firstName?.substring(0, 15) + ".." : firstName} ${lastName?.length > 15 ? lastName?.substring(0, 15) + ".." : lastName}`,
                                                            menuVariant: "light",
                                                            className: "profile-dropdown",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7___default().Item), {
                                                                    onClick: navigateProfile,
                                                                    children: t("My Orders")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7___default().Item), {
                                                                    onClick: navigateAddress,
                                                                    children: t("My Address")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7___default().Item), {
                                                                    onClick: navigateOrders,
                                                                    children: t("My Profile")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_NavDropdown__WEBPACK_IMPORTED_MODULE_7___default().Divider), {}),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    style: {
                                                                        marginLeft: "10px"
                                                                    },
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                            href: "/login/",
                                                                            as: `/login/`,
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                onClick: ()=>{
                                                                                    localStorage.removeItem("access_token");
                                                                                    localStorage.removeItem("userId");
                                                                                    localStorage.setItem("wishListItemsCount", 0);
                                                                                    localStorage.setItem("cartItemsCount", 0);
                                                                                },
                                                                                children: t("SingOut")
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            ]
                                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                href: "/login",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    children: [
                                                                        t("Sign In"),
                                                                        "/",
                                                                        t("Sign Up")
                                                                    ]
                                                                })
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "header-middle header-middle-ptb-1 d-none d-lg-block",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "header-wrap",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "logo logo-width-1",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                        href: "/",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                className: "w-100",
                                                src: "/assets/imgs/applatus1.jpg",
                                                alt: "logo"
                                            })
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "header-right",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "search-style-2",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ecommerce_Search__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "header-action-right",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "header-action-2",
                                                children: [
                                                    url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "header-action-icon-2",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                            href: "/shop-wishlist",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        className: "svgInject",
                                                                        alt: "Applatus",
                                                                        src: "/assets/imgs/theme/icons/icon-heart.svg"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "pro-count blue",
                                                                        children: totalWishlistItems > 0 ? totalWishlistItems : 0
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "header-action-icon-2",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                            href: "/shop-cart",
                                                            as: `/shop-cart`,
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                className: "mini-cart-icon",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        alt: "Applatus",
                                                                        src: "/assets/imgs/theme/icons/icon-cart.svg"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "pro-count blue",
                                                                        children: totalCartItems > 0 ? totalCartItems : 0
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: scroll ? "header-bottom header-bottom-bg-color sticky-bar stick" : "header-bottom header-bottom-bg-color sticky-bar",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "header-wrap header-space-between position-relative",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "logo logo-width-1 d-block d-lg-none",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                        href: "/",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                src: "/assets/imgs/applatus1.jpg",
                                                alt: "logo"
                                            })
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "header-nav d-none d-lg-flex",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "main-categori-wrap d-none d-lg-block",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                    className: "categori-button-active text-dark",
                                                    onClick: handleToggle,
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "fi-rs-apps"
                                                        }),
                                                        t("Browse Categories")
                                                    ]
                                                }),
                                                categoryList.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: isToggled ? "categori-dropdown-wrap categori-dropdown-active-large open" : "categori-dropdown-wrap categori-dropdown-active-large",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                        children: categoryList && categoryList.map((item)=>{
                                                            const word1 = item.categoryName;
                                                            const UpperCase3 = word1.split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)
                                                            ).join(" ");
                                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                                className: "has-children",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                        href: `/products?categoryId=${item?.id}&categoryName=${item?.categoryName}`,
                                                                        as: `/products?categoryId=${item?.id}&categoryName=${item?.categoryName}`,
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                            onMouseEnter: ()=>subCategoryList(item.id)
                                                                            ,
                                                                            onMouseLeave: ()=>setHoveredCategoryId(null)
                                                                            ,
                                                                            children: [
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                                    src: imageUrl + item?.icon,
                                                                                    crossOrigin: "anonymous",
                                                                                    style: {
                                                                                        width: "20px",
                                                                                        height: "20px",
                                                                                        marginRight: "15px"
                                                                                    },
                                                                                    className: "align-self-center mr-2",
                                                                                    alt: "not found"
                                                                                }),
                                                                                UpperCase3
                                                                            ]
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "dropdown-menu",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                                                className: "mega-menu d-lg-flex",
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                                    className: "mega-menu-col col-lg-7",
                                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                                                        className: "d-lg-flex",
                                                                                        children: subCategory && subCategory.length > 0 && subCategory.map((subItem)=>{
                                                                                            const word2 = subItem.subCategoryName;
                                                                                            const UpperCase2 = word2.split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)
                                                                                            ).join(" ");
                                                                                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                                                className: "mega-menu-col col-lg-10",
                                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                                            onMouseEnter: ()=>subSubCategoryList(subItem.id)
                                                                                                            ,
                                                                                                            onMouseLeave: ()=>setHoveredSabCategoryId(null)
                                                                                                            ,
                                                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                                                                href: `/products/?subcategoryId=${subItem?.id}&subcategoryName=${subItem?.subCategoryName}`,
                                                                                                                as: `/products/?subcategoryId=${subItem?.id}&subcategoryName=${subItem?.subCategoryName}`,
                                                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                                                    className: "submenu-title",
                                                                                                                    children: UpperCase2
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                })
                                                                                            }, subItem.id);
                                                                                        })
                                                                                    })
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                    style: {
                                                                                        marginLeft: "35px"
                                                                                    },
                                                                                    children: SubCate && subSubCategory1 && subSubCategory1.length > 0 && subSubCategory1.map((subSubItem)=>{
                                                                                        const word3 = subSubItem.subSubCategoryName;
                                                                                        const UpperCase = word3.split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)
                                                                                        ).join(" ");
                                                                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                                                href: `/products/?subsubcategoryId=${subSubItem?.id}&subsubcategoryName=${subSubItem?.subSubCategoryName}`,
                                                                                                as: `/products/?subsubcategoryId=${subSubItem?.id}&subsubcategoryName=${subSubItem?.subSubCategoryName}`,
                                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                                    className: "dropdown-item nav-link nav_item",
                                                                                                    children: UpperCase
                                                                                                })
                                                                                            })
                                                                                        }, subSubItem.id);
                                                                                    })
                                                                                })
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            }, item.id);
                                                        })
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                href: "/",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    className: router.pathname === "/" ? "active" : "",
                                                                    children: t("Home")
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                href: "/page-about",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    className: router.pathname === "/page-about" ? "active" : "",
                                                                    children: t("About")
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                href: "/products",
                                                                as: `/products`,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    className: router.pathname === "/products" ? "active" : "",
                                                                    children: t("Shop")
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                href: "/page-contact",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    className: router.pathname === "/page-contact" ? "active" : "",
                                                                    children: t("Contact")
                                                                })
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "hotline d-none d-lg-block",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-dark",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fi-rs-headset"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                href: "tel:+919111107373",
                                                children: "+91-9111107373"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "header-action-right d-block d-lg-none",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "header-action-2",
                                        children: [
                                            url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "header-action-icon-2",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: "/shop-wishlist",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                className: "svgInject",
                                                                alt: "Applatus",
                                                                src: "/assets/imgs/theme/icons/icon-heart.svg"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "pro-count blue",
                                                                children: totalWishlistItems > 0 ? totalWishlistItems : 0
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "header-action-icon-2",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: "/shop-cart",
                                                    as: `/shop-cart`,
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                        className: "mini-cart-icon",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                alt: "Applatus",
                                                                src: "/assets/imgs/theme/icons/icon-cart.svg"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "pro-count white",
                                                                children: totalCartItems > 0 ? totalCartItems : 0
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "header-action-icon-2 d-block d-lg-none",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "burger-icon burger-icon-white",
                                                    onClick: toggleClick,
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "burger-icon-top"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "burger-icon-mid"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "burger-icon-bottom"
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1408:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Breadcrumb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3305);
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(240);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8448);
/* harmony import */ var _MobileMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7854);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Footer__WEBPACK_IMPORTED_MODULE_4__, _Header__WEBPACK_IMPORTED_MODULE_5__, _MobileMenu__WEBPACK_IMPORTED_MODULE_6__]);
([_Footer__WEBPACK_IMPORTED_MODULE_4__, _Header__WEBPACK_IMPORTED_MODULE_5__, _MobileMenu__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const Layout = ({ children , parent , subSub , sub , subChild , noBreadcrumb , headerStyle  })=>{
    const { 0: isToggled , 1: setToggled  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const toggleClick = ()=>{
        setToggled(!isToggled);
        isToggled ? document.querySelector("body").classList.remove("mobile-menu-active") : document.querySelector("body").classList.add("mobile-menu-active");
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "Applatus Technology"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "description",
                        content: "Generated by create next app"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "icon",
                        href: "/assets/imgs/applatus1.jpg"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("style", {
                        children: "@import url('/imgs/applatus1.jpg');"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("style", {
                        children: "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Spartan:wght@300;400;500;600;700&display=swap');"
                    })
                ]
            }),
            isToggled && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "body-overlay-1",
                onClick: toggleClick
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Header__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                headerStyle: headerStyle,
                isToggled: isToggled,
                toggleClick: toggleClick
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_MobileMenu__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                isToggled: isToggled,
                toggleClick: toggleClick
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                className: "main",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Breadcrumb__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        parent: parent,
                        sub: sub,
                        subSub: subSub,
                        subChild: subChild,
                        noBreadcrumb: noBreadcrumb
                    }),
                    children
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Footer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7854:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_outsideClick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4655);
/* harmony import */ var _ecommerce_Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8175);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7699);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7987);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ecommerce_Search__WEBPACK_IMPORTED_MODULE_4__, react_i18next__WEBPACK_IMPORTED_MODULE_6__]);
([_ecommerce_Search__WEBPACK_IMPORTED_MODULE_4__, react_i18next__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const MobileMenu = ({ isToggled , toggleClick  })=>{
    const { t , i18n  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)("common");
    const { 0: lang , 1: setLang  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: categoryList , 1: setCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: IconsRemove , 1: setIconsRemove  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: isActive , 1: setIsActive  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        status: false,
        key: ""
    });
    const { 0: firstName , 1: setFirstName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: lastName , 1: setLastName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    //language change function
    const handleLang = ()=>{
        if (sessionStorage.getItem("lang") === "Hindi") {
            i18n.changeLanguage("hi");
            const lng = sessionStorage.getItem("lang");
            setLang(lng);
        } else if (sessionStorage.getItem("lang") === "English") {
            i18n.changeLanguage("en");
            const lng = sessionStorage.getItem("lang");
            setLang(lng);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const langdata = sessionStorage.getItem("lang");
        setLang(langdata);
        handleLang();
        getProfile();
    }, [
        lang
    ]);
    const getProfile = async ()=>{
        if (localStorage.getItem("access_token")) {
            try {
                const response = await _services__WEBPACK_IMPORTED_MODULE_5__/* ["default"].myprofile.GET_MY_PROFILE */ .Z.myprofile.GET_MY_PROFILE();
                if (response) {
                    setFirstName(response?.data?.data?.firstName);
                    setLastName(response?.data?.data?.lastName);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getCategroy();
    }, []);
    const handleToggle = (key)=>{
        if (isActive.key === key) {
            getCategroy();
            setIsActive({
                status: false
            });
        } else {
            setIsActive({
                status: true,
                key
            });
        }
    };
    let domNode = (0,_util_outsideClick__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(()=>{
        setIsActive({
            status: false
        });
    });
    const getCategroy = async ()=>{
        try {
            const response = await _services__WEBPACK_IMPORTED_MODULE_5__/* ["default"].category.GET_CATEGORY_ALL */ .Z.category.GET_CATEGORY_ALL();
            if (response) {
                setCategory(response?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const iconRemove = (data)=>{
        setIconsRemove(data.length);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: isToggled ? "mobile-header-active mobile-header-wrapper-style sidebar-visible" : "mobile-header-active mobile-header-wrapper-style",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mobile-header-wrapper-inner",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mobile-header-top",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mobile-header-logo",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                    href: "/index",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "/assets/imgs/applatus1.jpg",
                                        alt: "logo"
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mobile-menu-close close-style-wrap close-style-position-inherit",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    className: "close-style search-close",
                                    onClick: toggleClick,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "icon-top"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "icon-bottom"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mobile-header-content-area",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mobile-search search-style-3 mobile-header-border",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                    action: "#",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ecommerce_Search__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                            iconRemove: iconRemove
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            type: "submit",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fi-rs-search"
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mobile-menu-wrap mobile-header-border",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                        className: "mobile-menu",
                                        ref: domNode,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                className: isActive.key == 1 ? "menu-item-has-children active" : "menu-item-has-children",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "menu-expand",
                                                        onClick: ()=>handleToggle(1)
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "/",
                                                        children: t("Home")
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                className: isActive.key == 2 ? "menu-item-has-children active" : "menu-item-has-children",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "menu-expand",
                                                        onClick: ()=>handleToggle(2)
                                                        ,
                                                        children: IconsRemove == 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "fi-rs-angle-small-down"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        children: t("Shop")
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                        className: isActive.key == 2 ? "dropdown" : "d-none",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                    href: "/products",
                                                                    children: t("Shop List")
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                    href: "/shop-wishlist",
                                                                    children: t("Shop \u2013 Wishlist")
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                    href: "/shop-cart",
                                                                    as: `/shop-cart`,
                                                                    children: t("Shop \u2013 Cart")
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                className: isActive.key == 3 ? "menu-item-has-children active" : "menu-item-has-children",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "menu-expand",
                                                        onClick: ()=>handleToggle(3)
                                                        ,
                                                        children: IconsRemove == 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "fi-rs-angle-small-down"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        children: t("category")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                        className: isActive.key == 3 ? "dropdown" : "d-none",
                                                        children: categoryList && categoryList?.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                                className: "menu-item-has-children",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: "menu-expand"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                        href: "/products",
                                                                        children: item?.categoryName
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                                        className: "dropdown",
                                                                        children: item?.SubCategories?.map((subCategory, subIndex)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                                                className: "menu-item-has-children",
                                                                                children: [
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                                        href: "/products",
                                                                                        children: subCategory?.subCategoryName
                                                                                    }),
                                                                                    subCategory?.SubSubCategories.map((subSubCategory, subSubIndex)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                                                            className: "dropdown",
                                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                                                className: "menu-item-has-children",
                                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                                                    href: "/products",
                                                                                                    children: subSubCategory?.subSubCategoryName
                                                                                                })
                                                                                            }, subSubCategory?.id)
                                                                                        }, subSubCategory?.id)
                                                                                    )
                                                                                ]
                                                                            }, subCategory?.id)
                                                                        )
                                                                    })
                                                                ]
                                                            }, item.id)
                                                        )
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                className: isActive.key == 6 ? "menu-item-has-children active" : "menu-item-has-children",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "menu-expand",
                                                        onClick: ()=>handleToggle(6)
                                                        ,
                                                        children: IconsRemove == 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "fi-rs-angle-small-down"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        children: t("Language")
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                        className: isActive.key == 6 ? "dropdown" : "d-none",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    onClick: ()=>{
                                                                        i18n.changeLanguage("en");
                                                                        setLang("English");
                                                                        sessionStorage.setItem("lang", "English");
                                                                    },
                                                                    children: "English"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    onClick: ()=>{
                                                                        i18n.changeLanguage("hi");
                                                                        setLang("Hindi");
                                                                        sessionStorage.setItem("lang", "Hindi");
                                                                    },
                                                                    children: "Hindi"
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            firstName && lastName && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                className: isActive.key == 7 ? "menu-item-has-children active" : "menu-item-has-children",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "menu-expand",
                                                        onClick: ()=>handleToggle(7)
                                                        ,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "fi-rs-angle-small-down"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                        children: t("My Profile")
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                        className: isActive.key == 7 ? "dropdown" : "d-none",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                    href: "/myprofile?index=5",
                                                                    children: t("My Profile")
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                    href: "/myprofile?index=4",
                                                                    children: t("My Address")
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                                    href: "/myprofile?index=2",
                                                                    children: t("My Orders")
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mobile-header-info-wrap mobile-header-border",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "single-mobile-header-info",
                                    children: [
                                        lastName && firstName ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                                children: [
                                                    " ",
                                                    firstName,
                                                    " ",
                                                    lastName
                                                ]
                                            })
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: "/login",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                children: [
                                                    " ",
                                                    t("Sign In"),
                                                    "/",
                                                    t("Sign Up")
                                                ]
                                            })
                                        }),
                                        lastName && firstName && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                href: "/login/",
                                                as: `/login/`,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    onClick: ()=>{
                                                        localStorage.removeItem("access_token");
                                                        localStorage.removeItem("userId");
                                                        localStorage.setItem("wishListItemsCount", 0);
                                                        localStorage.setItem("cartItemsCount", 0);
                                                    },
                                                    children: t("SingOut")
                                                })
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mobile-social-icon",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                        className: "mb-15 text-grey-4",
                                        children: t("Follow Us")
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/assets/imgs/theme/icons/icon-facebook.svg",
                                            alt: ""
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/assets/imgs/theme/icons/icon-twitter.svg",
                                            alt: ""
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/assets/imgs/theme/icons/icon-instagram.svg",
                                            alt: ""
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/assets/imgs/theme/icons/icon-pinterest.svg",
                                            alt: ""
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/assets/imgs/theme/icons/icon-youtube.svg",
                                            alt: ""
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MobileMenu);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5393:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3877);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3015);
/* harmony import */ var _ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1601);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7699);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper__WEBPACK_IMPORTED_MODULE_2__, swiper_react__WEBPACK_IMPORTED_MODULE_3__, _ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_4__]);
([swiper__WEBPACK_IMPORTED_MODULE_2__, swiper_react__WEBPACK_IMPORTED_MODULE_3__, _ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







swiper__WEBPACK_IMPORTED_MODULE_2__["default"].use([
    swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation
]);
const RelatedSlider = ()=>{
    const { 0: related , 1: setRelated  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchProducts();
    }, []);
    const fetchProducts = async ()=>{
        try {
            const allProducts = await _services__WEBPACK_IMPORTED_MODULE_5__/* ["default"].product.GET_PRODUCT */ .Z.product.GET_PRODUCT();
            if (allProducts) {
                setRelated(allProducts?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__.Swiper, {
                breakpoints: {
                    200: {
                        slidesPerView: 1.5,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                },
                navigation: {
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n"
                },
                className: "carausel-6-columns carausel-arrow-center",
                children: related?.map((product, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__.SwiperSlide, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "product-card",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                product: product
                            })
                        })
                    }, i)
                )
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "slider-arrow slider-arrow-2 carausel-6-columns-arrow",
                id: "carausel-6-columns-2-arrows",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "slider-btn slider-prev slick-arrow custom_prev_n",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                            className: "fi-rs-angle-left"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "slider-btn slider-next slick-arrow custom_next_n",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                            className: "fi-rs-angle-right"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RelatedSlider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9465:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3877);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3015);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2702);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_next_config__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper__WEBPACK_IMPORTED_MODULE_2__, swiper_react__WEBPACK_IMPORTED_MODULE_3__]);
([swiper__WEBPACK_IMPORTED_MODULE_2__, swiper_react__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







swiper__WEBPACK_IMPORTED_MODULE_2__["default"].use([
    swiper__WEBPACK_IMPORTED_MODULE_2__.Navigation,
    swiper__WEBPACK_IMPORTED_MODULE_2__.Thumbs
]);
const ThumbSlider = ({ product  })=>{
    const imageUrl = (_next_config__WEBPACK_IMPORTED_MODULE_4___default().BASE_URL_UPLOADS);
    const { 0: thumbsSwiper , 1: setThumbsSwiper  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: image , 1: setImage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (product) {
            const images = [];
            if (product?.featuredImage) {
                images.push(product.featuredImage);
            }
            if (product.image && Array.isArray(product?.image)) {
                // Assuming product.image is an array
                images.push(...product?.image);
            }
            setImage(images);
        }
    }, [
        product
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__.Swiper, {
                style: {
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff"
                },
                //loop={false}
                spaceBetween: 10,
                navigation: true,
                thumbs: {
                    swiper: thumbsSwiper
                },
                className: "mySwiper2",
                children: image?.map((item, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__.SwiperSlide, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: imageUrl + item,
                            alt: "Applatus",
                            crossOrigin: "anonymous"
                        })
                    }, i)
                )
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__.Swiper, {
                onSwiper: setThumbsSwiper,
                //loop={false}
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
                className: "mySwiper",
                children: image?.map((item, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__.SwiperSlide, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: imageUrl + item,
                            alt: "Applatus",
                            crossOrigin: "anonymous"
                        })
                    }, i)
                )
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThumbSlider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 270:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3590);
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1408);
/* harmony import */ var _redux_action_cart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8866);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2702);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_next_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1601);
/* harmony import */ var _components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5303);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _redux_action_wishlistAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5644);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7699);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_layout_Header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8448);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7987);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3599);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_13__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_2__, _components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__, _components_ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_5__, _components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_6__, _components_layout_Header__WEBPACK_IMPORTED_MODULE_10__, react_i18next__WEBPACK_IMPORTED_MODULE_11__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_2__, _components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__, _components_ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_5__, _components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_6__, _components_layout_Header__WEBPACK_IMPORTED_MODULE_10__, react_i18next__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const Wishlist = ({ handleWishlistLength , wishlist , clearWishlist , closeWishlistModal , deleteFromWishlist , addToCart ,  })=>{
    const { t  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)("common");
    const imageUrl = (_next_config__WEBPACK_IMPORTED_MODULE_4___default().BASE_URL_UPLOADS);
    const { 0: WishlistData , 1: setWishlistdata  } = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)();
    const { 0: WishlistLength , 1: setWishlistLength  } = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)();
    const { 0: activeIndex , 1: setActiveIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(3);
    const { 0: breadCrumb , 1: setBreadCrumb  } = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(t(""));
    const route = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const GetWishlistdata = async ()=>{
        if (localStorage.getItem("access_token")) {
            try {
                const WishlistResponse = await _services__WEBPACK_IMPORTED_MODULE_8__/* ["default"].Wishlist.GET_WISHLIST_DATA */ .Z.Wishlist.GET_WISHLIST_DATA();
                if (WishlistResponse?.data?.data && WishlistResponse?.data?.data.length > 0) {
                    let data = WishlistResponse?.data?.data.map((item)=>{
                        item.Product.isWishlisted = true;
                        return item;
                    });
                    setWishlistdata(data);
                    setWishlistLength(WishlistResponse?.data?.data?.length);
                } else {
                    setWishlistdata([]);
                    setWishlistLength(0);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
            return;
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(()=>{
        GetWishlistdata();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                parent: t("Home"),
                sub: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_12___default()), {
                        href: "/products",
                        as: `/products`,
                        children: t("Product")
                    })
                }),
                subChild: t("Wishlist"),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                    className: "pt-20 pb-50",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "row",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade",
                                    id: "address",
                                    role: "tabpanel",
                                    "aria-labelledby": "address-tab"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-lg-12 m-auto",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-md-2",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "dashboard-menu",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                        className: "nav flex-column",
                                                        role: "tablist",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "nav-item",
                                                                onClick: ()=>{
                                                                    route.push("/myprofile/?index=1");
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: activeIndex === 1 ? "nav-link active" : "nav-link",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fi-rs-settings-sliders mr-10"
                                                                        }),
                                                                        t("Dashboard")
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "nav-item",
                                                                onClick: ()=>{
                                                                    route.push("/myprofile/?index=2");
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: activeIndex === 2 ? "nav-link active" : "nav-link",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fi-rs-shopping-bag mr-10"
                                                                        }),
                                                                        t("Orders")
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "nav-item",
                                                                onClick: ()=>route.push("/shop-wishlist")
                                                                ,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: activeIndex === 3 ? "nav-link active" : "nav-link",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fi-rs-heart"
                                                                        }),
                                                                        "\xa0 Wishlist"
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "nav-item",
                                                                onClick: ()=>{
                                                                    route.push("/myprofile/?index=4");
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: activeIndex === 4 ? "nav-link active" : "nav-link",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fi-rs-marker mr-10"
                                                                        }),
                                                                        t("My Address")
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "nav-item",
                                                                onClick: ()=>{
                                                                    route.push("myprofile/?Address=1");
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: activeIndex === 8 ? "nav-link active" : "nav-link",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            class: "fa fa-plus fs-6 me-2"
                                                                        }),
                                                                        " \xa0",
                                                                        t("Add Address")
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "nav-item",
                                                                onClick: ()=>{
                                                                    route.push("/myprofile/?index=5");
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: activeIndex === 5 ? "nav-link active" : "nav-link",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fi-rs-user mr-10"
                                                                        }),
                                                                        t("Account details")
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                style: {
                                                                    whiteSpace: "nowrap"
                                                                },
                                                                className: "nav-item",
                                                                onClick: ()=>{
                                                                    route.push("/myprofile/?index=6");
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                    className: activeIndex === 6 ? "nav-link active" : "nav-link",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            class: "fa fa-key mr-10"
                                                                        }),
                                                                        t("Change password")
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_12___default()), {
                                                                    href: "/login",
                                                                    onClick: ()=>{
                                                                        localStorage.removeItem("access_token");
                                                                        localStorage.removeItem("userId");
                                                                        localStorage.setItem("wishListItemsCount", 0);
                                                                        localStorage.setItem("cartItemsCount", 0);
                                                                    },
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                                className: "fi-rs-sign-out mr-10"
                                                                            }),
                                                                            t("SingOut")
                                                                        ]
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-md-10",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                                                    className: react_device_detect__WEBPACK_IMPORTED_MODULE_13__.isMobile ? "mt-50 mb-50" : " mb-50",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "container",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "row product-grid-3",
                                                            children: WishlistData?.map((item, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                    className: "col-lg-4 col-md-3 col-6 col-sm-6",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ecommerce_SingleProduct__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                                        data1: item,
                                                                        product: item?.Product,
                                                                        isWishlisted: item.isWishlisted,
                                                                        source: "wishlist",
                                                                        GetWishlistdata: GetWishlistdata
                                                                    })
                                                                }, i)
                                                            )
                                                        })
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ecommerce_QuickView__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                source: "wishlist",
                GetWishlistdata: GetWishlistdata
            })
        ]
    });
};
const mapStateToProps = (state)=>({
        wishlist: state.wishlist
    })
;
const mapDispatchToProps = {
    closeWishlistModal: _redux_action_wishlistAction__WEBPACK_IMPORTED_MODULE_14__/* .closeWishlistModal */ .j2,
    deleteFromWishlist: _redux_action_wishlistAction__WEBPACK_IMPORTED_MODULE_14__/* .deleteFromWishlist */ .ib,
    clearWishlist: _redux_action_wishlistAction__WEBPACK_IMPORTED_MODULE_14__/* .clearWishlist */ .y6,
    addToCart: _redux_action_cart__WEBPACK_IMPORTED_MODULE_15__/* .addToCart */ .Xq
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, mapDispatchToProps)(Wishlist));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EI": () => (/* binding */ deleteFromCart),
/* harmony export */   "Ee": () => (/* binding */ closeCart),
/* harmony export */   "LA": () => (/* binding */ openCart),
/* harmony export */   "LL": () => (/* binding */ clearCart),
/* harmony export */   "Qd": () => (/* binding */ increaseQuantity),
/* harmony export */   "Xq": () => (/* binding */ addToCart),
/* harmony export */   "a3": () => (/* binding */ decreaseQuantity)
/* harmony export */ });
const addToCart = (product)=>(dispatch)=>{
        dispatch({
            type: Types.ADD_TO_CART,
            payload: {
                product
            }
        });
    }
;
const deleteFromCart = (productId)=>(dispatch)=>{
        dispatch({
            type: Types.DELETE_FROM_CART,
            payload: {
                productId
            }
        });
    }
;
const increaseQuantity = (productId)=>(dispatch)=>{
        dispatch({
            type: Types.INCREASE_QUANTITY,
            payload: {
                productId
            }
        });
    }
;
const decreaseQuantity = (productId)=>(dispatch)=>{
        dispatch({
            type: Types.DECREASE_QUANTITY,
            payload: {
                productId
            }
        });
    }
;
const openCart = ()=>(dispatch)=>{
        dispatch({
            type: Types.OPEN_CART
        });
    }
;
const clearCart = ()=>(dispatch)=>{
        dispatch({
            type: Types.CLEAR_CART
        });
    }
;
const closeCart = ()=>(dispatch)=>{
        dispatch({
            type: Types.CLOSE_CART
        });
    }
;


/***/ }),

/***/ 9216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ht": () => (/* binding */ deleteFromCompare),
/* harmony export */   "_Z": () => (/* binding */ clearCompare),
/* harmony export */   "a$": () => (/* binding */ addToCompare),
/* harmony export */   "iH": () => (/* binding */ closeCompareModal)
/* harmony export */ });
/* unused harmony export openCompareModal */
/* harmony import */ var _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6330);

const openCompareModal = (e)=>(dispatch)=>{
        dispatch({
            type: Types.OPEN_COMPARE
        });
    }
;
const closeCompareModal = (e)=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .CLOSE_COMPARE */ .zg
        });
    }
;
const addToCompare = (product)=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .ADD_TO_COMPARE */ .Zd,
            payload: {
                product
            }
        });
    }
;
const deleteFromCompare = (productId)=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .DELETE_FROM_COMPARE */ .Oh,
            payload: {
                productId
            }
        });
    }
;
const clearCompare = ()=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .CLEAR_COMPARE */ .Jx
        });
    }
;


/***/ }),

/***/ 3181:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ openQuickView),
/* harmony export */   "z": () => (/* binding */ closeQuickView)
/* harmony export */ });
/* harmony import */ var _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6330);

const openQuickView = (product)=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .OPEN_QUICK_VIEW */ .GS,
            payload: {
                product
            }
        });
    }
;
const closeQuickView = ()=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .CLOSE_QUICK_VIEW */ .fJ
        });
    }
;


/***/ }),

/***/ 5644:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mp": () => (/* binding */ addToWishlist),
/* harmony export */   "ib": () => (/* binding */ deleteFromWishlist),
/* harmony export */   "j2": () => (/* binding */ closeWishlistModal),
/* harmony export */   "y6": () => (/* binding */ clearWishlist)
/* harmony export */ });
/* unused harmony export openWishlistModal */
/* harmony import */ var _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6330);

const openWishlistModal = (e)=>(dispatch)=>{
        dispatch({
            type: Types.OPEN_WISHLIST
        });
    }
;
const closeWishlistModal = (e)=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .CLOSE_WISHLIST */ .DZ
        });
    }
;
const addToWishlist = (product)=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .ADD_TO_WISHLIST */ .Cm,
            payload: {
                product
            }
        });
    }
;
const deleteFromWishlist = (productId)=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .DELETE_FROM_WISHLIST */ .ww,
            payload: {
                productId
            }
        });
    }
;
const clearWishlist = ()=>(dispatch)=>{
        dispatch({
            type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_0__/* .CLEAR_WISHLIST */ .lS
        });
    }
;


/***/ }),

/***/ 4655:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useClickOutside = (handler)=>{
    let domNode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        let maybeHandler = (event)=>{
            if (!domNode.current.contains(event.target)) {
                handler();
            }
        };
        document.addEventListener("mousedown", maybeHandler);
        return ()=>{
            document.removeEventListener("mousedown", maybeHandler);
        };
    });
    return domNode;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useClickOutside);


/***/ })

};
;