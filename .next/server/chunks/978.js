"use strict";
exports.id = 978;
exports.ids = [978];
exports.modules = {

/***/ 6978:
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
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1408);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2702);
/* harmony import */ var _next_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_next_config__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3590);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7699);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7987);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_5__, react_i18next__WEBPACK_IMPORTED_MODULE_8__]);
([_components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__, react_toastify__WEBPACK_IMPORTED_MODULE_5__, react_i18next__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function loadScript(src) {
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        };
        script.onerror = ()=>{
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
const Cart = ({})=>{
    const { t: t1  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)("common");
    const imageUrl = (_next_config__WEBPACK_IMPORTED_MODULE_3___default().BASE_URL_UPLOADS);
    const { 0: updateCart , 1: setUpdateCart  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)([]);
    const { 0: addressList , 1: setAddressList  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)([]);
    const { 0: totalAmount , 1: setTotalAmount  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(0);
    const { 0: totalQuantity , 1: setTotalQuantity  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(1);
    const { 0: getadressUers , 1: setGetaddress  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)([]);
    const { 0: Address , 1: setAddress  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("");
    const { 0: Data , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)([]);
    const { 0: DiscountPer , 1: setDiscountPer  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("");
    const { 0: SubTotal , 1: setSubTotal  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("");
    const { 0: DiscountAmo , 1: setDiscountAmo  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("");
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    const calculateTotalAmount = (prodcutData)=>{
        let totalAmountArr = prodcutData?.map((item)=>{
            return item.finalAmount * item.selectedQuantity;
        });
        let totalQtyArr = prodcutData?.map((item)=>{
            return item.selectedQuantity;
        });
        const sum = totalAmountArr?.reduce((partialSum, a)=>partialSum + a
        , 0);
        const qty = totalQtyArr?.reduce((partialSum, a)=>partialSum + a
        , 0);
        setTotalAmount(sum);
        setSubTotal(sum);
        setTotalQuantity(qty);
    };
    const getadress = async ()=>{
        try {
            const response = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].myprofile.GET_MY_ADDRESS */ .Z.myprofile.GET_MY_ADDRESS();
            if (response) {
                setGetaddress(response?.data?.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{
        cardData();
        addressHandler();
        getadress();
    }, []);
    const cardData = async ()=>{
        if (localStorage.getItem("access_token")) {
            try {
                const response = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].cart.GET_CART */ .Z.cart.GET_CART();
                if (response) {
                    setUpdateCart(response?.data?.data?.cartDetail?.cartDetails);
                    calculateTotalAmount(response?.data?.data?.cartDetail?.cartDetails);
                }
                if (response.data.discountAmount) {
                    setDiscountPer(response.data.discountAmount?.discount);
                    const DisAmt = JSON.parse(response?.data?.data?.discountCode);
                    setDiscountAmo(DisAmt);
                    // setSubTotal(JSON.parse(response?.data?.data?.totalAmount));
                    const payableAmount = JSON.parse(response?.data?.data?.totalAmount) - response?.data?.data?.discountCode;
                // setTotalAmount(payableAmount);
                } else {
                // setSubTotal(response?.data?.data?.totalAmount);
                // setTotalAmount(response.data.data.totalAmount);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            if (localStorage.getItem("cartDetail")) {
                const cartLocal = localStorage.getItem("cartDetail") && JSON.parse(localStorage.getItem("cartDetail"));
                setUpdateCart(cartLocal.cartDetails);
                calculateTotalAmount(cartLocal.cartDetails);
            }
        }
    };
    const addressHandler = async ()=>{
        if (localStorage.getItem("access_token")) {
            try {
                const response = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].myprofile.GET_MY_ADDRESS */ .Z.myprofile.GET_MY_ADDRESS();
                setAddressList(response?.data?.data);
                if (response?.data?.data?.length > 0) {
                    response?.data?.data?.map((item)=>{});
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleCart = async (product)=>{
        if (localStorage.getItem("access_token")) {
            const cart = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].cart.GET_CART */ .Z.cart.GET_CART();
            const DicountID = cart?.data?.discountAmount?.id;
            let cartDetails = [];
            if (cart?.data?.data?.cartDetail?.cartDetails) {
                cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
            }
            cartDetails?.push(product);
            const key = "id";
            const unique = cartDetails.filter((value, index, self)=>index === self.findIndex((t)=>t.id === value.id && t.selectedSize === value.selectedSize && t.selectedColor === value.selectedColor && t.fabric === value.fabric
                )
            );
            // const unique = [
            //   ...new Map(cartDetails?.map((item) => [item[key], item])).values(),
            // ];
            let totalAmountArr = unique.map((item)=>{
                return item.finalAmount * item.selectedQuantity;
            });
            let totalQtyArr = unique.map((item)=>{
                return item.selectedQuantity;
            });
            const sum = totalAmountArr.reduce((partialSum, a)=>partialSum + a
            , 0);
            const qty = totalQtyArr.reduce((partialSum, a)=>partialSum + a
            , 0);
            let data = {
                cartDetail: {
                    cartDetails: unique,
                    discountId: DicountID
                },
                totalAmount: sum,
                totalItems: unique.length,
                totalQuantity: qty
            };
            localStorage.setItem("cartItemsCount", unique.length);
            const updateCart = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].cart.UPDATE_CART */ .Z.cart.UPDATE_CART(data);
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Cart updated!");
            localStorage.setItem("cartItemsCount", 0);
            cardData();
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
            //   ...new Map(
            //     cartDetails && cartDetails?.map((item) => [item[key], item])
            //   ).values(),
            // ];
            let data = {
                cartDetail: {
                    cartDetails: unique
                }
            };
            localStorage.setItem("cartDetail", JSON.stringify(data?.cartDetail));
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Cart updated!");
            cardData();
        }
    };
    const isLoggedIn = localStorage.getItem("access_token");
    async function checkoutHandler() {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        await handleCart(updateCart[0]);
        const updateCartData = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].cart.CHECKOUT */ .Z.cart.CHECKOUT();
        const userDetails = JSON.parse(localStorage.getItem("profile"));
        const options = {
            key: "rzp_test_ug6gBARp85Aq1j",
            currency: "INR",
            amount: updateCartData?.data?.totalAmount,
            order_id: updateCartData?.data?.razorpayPaymentDetails?.id,
            name: "KoraKagaj",
            description: "Thank you for ordering. Please initiate payment!",
            image: "http://korakagaj-dev.s3-website.ap-south-1.amazonaws.com/assets/imgs/theme/logo.svg",
            modal: {
                ondismiss: async ()=>{
                    const data = {
                        orderId: updateCartData?.data?.order?.id,
                        paymentResponse: {
                            id: updateCartData?.data?.razorpayPaymentDetails.id,
                            status: "failed",
                            amount: updateCartData?.data?.totalAmount
                        }
                    };
                    const response = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].cart.PAYMENT_LOG */ .Z.cart.PAYMENT_LOG(data);
                    router.push("/failed");
                }
            },
            handler: function(response) {
                (async ()=>{
                    const data = {
                        orderId: updateCartData?.data?.order?.id,
                        paymentResponse: {
                            id: updateCartData?.data?.razorpayPaymentDetails.id,
                            status: "paid",
                            amount: updateCartData?.data?.totalAmount
                        }
                    };
                    try {
                        const response = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].cart.PAYMENT_LOG */ .Z.cart.PAYMENT_LOG(data);
                        router.push("/thankyou");
                    } catch (err) {
                        console.log(err);
                    }
                })();
            },
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email,
                phone_number: userDetails.phoneNumber
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    const GET_MY_ADDRESS = async (IdAddress)=>{
        try {
            const response = await _services__WEBPACK_IMPORTED_MODULE_7__/* ["default"].myprofile.GET_MY_ADDRESS */ .Z.myprofile.GET_MY_ADDRESS();
            setData(response?.data?.data.find((item)=>item.id == IdAddress
            ));
        } catch (error) {
            console.log(error);
        }
    };
    let IdAddress1;
    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const IdAddress = urlParams.get("id");
        setAddress(IdAddress);
        GET_MY_ADDRESS(IdAddress);
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            parent: t1("Home"),
            sub: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                    href: "/products",
                    as: "/products",
                    children: t1("Product")
                })
            }),
            subChild: t1("Cart"),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                className: "mt-50 mb-50",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "container",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "row",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "col-12",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "cart-action text-Start",
                                    style: {
                                        marginBottom: "10px"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        children: t1("Preview Page")
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "table-responsive",
                                    children: [
                                        updateCart?.length > 0 ? "" : t1("No Products"),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                                            className: updateCart?.length > 0 ? "table shopping-summery text-center clean" : "d-none",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                        className: "main-heading",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                scope: "col",
                                                                children: t1("Image")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                scope: "col",
                                                                children: t1("Name")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                scope: "col",
                                                                children: t1("Fabric Name")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                scope: "col",
                                                                children: t1("Price")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                scope: "col",
                                                                children: t1("Quantity")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                scope: "col",
                                                                children: t1("Subtotal")
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                                    children: updateCart && updateCart.map((product, j)=>{
                                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "image product-thumbnail",
                                                                    "data-title": "Image",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: imageUrl + product.featuredImage,
                                                                        alt: "",
                                                                        crossOrigin: "anonymous"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                                    className: "product-name",
                                                                    "data-title": "Product Name",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                                                            className: "product-name",
                                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                                                // href="/products/[slug]"
                                                                                // as={`/products/${product?.id}`}
                                                                                href: `/products/${product?.id}_${product?.productName}`,
                                                                                as: `/products/${product?.id}_${product?.productName}`,
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                                    children: product.productName
                                                                                })
                                                                            })
                                                                        }),
                                                                        product?.selectedColor || product?.selectedSize ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                            className: "font-xs",
                                                                            children: [
                                                                                product?.selectedColor && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                                        className: "align-items-center row pe-0 ps-0 m-0",
                                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                                            className: "col pe-0 ps-0 m-0 p-0",
                                                                                            children: [
                                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                                                                                                    className: "mb-0 m-0",
                                                                                                    children: "Color :"
                                                                                                }),
                                                                                                " ",
                                                                                                "\xa0",
                                                                                                " ",
                                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                                                    className: "d-inline-block rounded-circle ps-1 pe-0 m-0 mt-2",
                                                                                                    style: {
                                                                                                        border: "1px solid black",
                                                                                                        width: "12px",
                                                                                                        height: "12px",
                                                                                                        backgroundColor: product?.selectedColor
                                                                                                    }
                                                                                                }),
                                                                                                " "
                                                                                            ]
                                                                                        })
                                                                                    })
                                                                                }),
                                                                                product?.selectedSize && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("small", {
                                                                                    className: "ml-md-2",
                                                                                    children: [
                                                                                        "Size: ",
                                                                                        product?.selectedSize
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        }) : null
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "Fabric name",
                                                                    "data-title": "Fabric name",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        children: product?.fabric
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "price",
                                                                    "data-title": "Price",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        children: [
                                                                            "Rs. ",
                                                                            product.finalAmount
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "text-center",
                                                                    "data-title": "Quantity",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                        className: "detail-qty border radius m-auto",
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: "qty-val",
                                                                            children: product.selectedQuantity
                                                                        })
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "text-right",
                                                                    "data-title": "Subtotal",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        children: [
                                                                            "Rs.",
                                                                            " ",
                                                                            (product.finalAmount * product.selectedQuantity).toFixed(2)
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        }, j);
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "divider center_icon mt-50 mb-50",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {})
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "row mb-50",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "col-lg-6 col-md-16",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-lg-6",
                                                children: updateCart?.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "card mb-3 mb-lg-0",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "card-header d-flex justify-content-between",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                                                className: "mb-0",
                                                                children: t1("Select Address")
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "card-body",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("address", {
                                                                children: [
                                                                    " ",
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        style: {
                                                                            whiteSpace: "pre-wrap",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                            maxWidth: "10ch"
                                                                        },
                                                                        children: Data?.address?.fullName
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        style: {
                                                                            whiteSpace: "pre-wrap",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                            maxWidth: "10ch"
                                                                        },
                                                                        children: Data?.address?.phoneNumber
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        style: {
                                                                            whiteSpace: "pre-wrap",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                            maxWidth: "10ch"
                                                                        },
                                                                        children: Data?.address?.houseNo
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        style: {
                                                                            whiteSpace: "pre-wrap",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                            maxWidth: "10ch"
                                                                        },
                                                                        children: Data?.address?.address
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        style: {
                                                                            whiteSpace: "pre-wrap",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                            maxWidth: "10ch"
                                                                        },
                                                                        children: Data?.address?.city
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        style: {
                                                                            whiteSpace: "pre-wrap",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                            maxWidth: "10ch"
                                                                        },
                                                                        children: Data?.address?.pinCode
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        style: {
                                                                            whiteSpace: "pre-wrap",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                            maxWidth: "10ch"
                                                                        },
                                                                        children: Data?.address?.state
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "col-lg-6 col-md-12",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "border p-md-4 p-30 border-radius cart-totals",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "heading_s1 mb-3",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                            children: t1("Cart Totals")
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "table-responsive",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("table", {
                                                            className: "table",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tbody", {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_label",
                                                                                children: t1("Cart Subtotal")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_amount",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                    className: "font-lg fw-900 text-brand",
                                                                                    children: [
                                                                                        "Rs. ",
                                                                                        SubTotal
                                                                                    ]
                                                                                })
                                                                            })
                                                                        ]
                                                                    }),
                                                                    DiscountPer && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_label",
                                                                                children: t1("Discount Percentage")
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                                                className: "cart_total_amount",
                                                                                children: [
                                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                                        className: "ti-gift mr-5"
                                                                                    }),
                                                                                    DiscountPer,
                                                                                    "%"
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }),
                                                                    DiscountPer && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_label",
                                                                                children: t1("Discount Amount")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_amount",
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                        className: "font-xl fw-900 text-brand",
                                                                                        children: [
                                                                                            "Rs.",
                                                                                            " ",
                                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("s", {
                                                                                                children: (totalAmount * DiscountPer / 100).toFixed(2)
                                                                                            })
                                                                                        ]
                                                                                    })
                                                                                })
                                                                            })
                                                                        ]
                                                                    }),
                                                                    DiscountPer ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_label",
                                                                                children: t1("Total")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_amount",
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                        className: "font-xl fw-900 text-brand",
                                                                                        children: [
                                                                                            "Rs.",
                                                                                            " ",
                                                                                            (totalAmount - totalAmount * DiscountPer / 100).toFixed(2)
                                                                                        ]
                                                                                    })
                                                                                })
                                                                            })
                                                                        ]
                                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_label",
                                                                                children: t1("Total")
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                                className: "cart_total_amount",
                                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                        className: "font-xl fw-900 text-brand",
                                                                                        children: [
                                                                                            "Rs. ",
                                                                                            totalAmount?.toFixed(2)
                                                                                        ]
                                                                                    })
                                                                                })
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-center",
                                                        children: isLoggedIn ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                            onClick: ()=>{
                                                                checkoutHandler();
                                                            },
                                                            className: "btn",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                    className: "fi-rs-box-alt mr-10"
                                                                }),
                                                                t1("Proceed To CheckOut")
                                                            ]
                                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                            className: "btn",
                                                            href: "/login",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                className: "btn ",
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                        className: "fi-rs-box-alt mr-10"
                                                                    }),
                                                                    t1("Proceed to Login")
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
                })
            })
        })
    });
};
const mapStateToProps = (state)=>({
        cartItems: state.cart,
        activeCart: state.counter
    })
;
const mapDispatchToProps = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, mapDispatchToProps)(Cart));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;