"use strict";
exports.id = 73;
exports.ids = [73];
exports.modules = {

/***/ 9853:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _redux_action_productFiltersAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7330);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5226);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__);





const CategoryProduct = ({ updateProductCategory: updateProductCategory1  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const removeSearchTerm = ()=>{
        router.push({
            pathname: "/products"
        });
    };
    const selectCategory = (e, category)=>{
        e.preventDefault();
        removeSearchTerm();
        updateProductCategory1(category);
    // router.push('/')
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3___default()), {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                className: "categories",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3___default().Check) // prettier-ignore
                    , {
                        type: "checkbox",
                        id: `default-all`,
                        label: `All`,
                        checked: true,
                        className: "text-brand fw-700"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3___default().Check) // prettier-ignore
                    , {
                        type: "checkbox",
                        id: `default-Jeans`,
                        label: `Round Neck`
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3___default().Check) // prettier-ignore
                    , {
                        type: "checkbox",
                        id: `default-Shoe`,
                        label: `Collar`
                    })
                ]
            })
        })
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(null, {
    updateProductCategory: _redux_action_productFiltersAction__WEBPACK_IMPORTED_MODULE_4__/* .updateProductCategory */ .pP
})(CategoryProduct));


/***/ }),

/***/ 774:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _redux_action_productFiltersAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7330);
/* harmony import */ var rc_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1817);
/* harmony import */ var rc_slider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rc_slider__WEBPACK_IMPORTED_MODULE_4__);







const PriceRangeSlider = ({ updateProductFilters: updateProductFilters1  })=>{
    const Router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const searchTerm = Router.query.search;
    const { 0: price , 1: setPrice  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
        value: {
            min: 0,
            max: 500
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const filters = {
            price: price.value
        };
        updateProductFilters1(filters);
    }, [
        price,
        searchTerm
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "korakagaj_price_slider_amount",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((rc_slider__WEBPACK_IMPORTED_MODULE_4___default()), {
                range: true,
                allowCross: false,
                defaultValue: [
                    0,
                    100
                ],
                min: 0,
                max: 500,
                onChange: (value)=>setPrice({
                        value: {
                            min: value[0],
                            max: value[1]
                        }
                    })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "d-flex justify-content-between",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: price.value.min
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: price.value.max
                    })
                ]
            })
        ]
    });
};
const mapStateToProps = (state)=>({
        products: state.products.items
    })
;
const mapDidpatchToProps = {
    updateProductFilters: _redux_action_productFiltersAction__WEBPACK_IMPORTED_MODULE_5__/* .updateProductFilters */ .lG
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDidpatchToProps)(PriceRangeSlider));


/***/ })

};
;