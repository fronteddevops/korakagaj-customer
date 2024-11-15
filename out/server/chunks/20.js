"use strict";
exports.id = 20;
exports.ids = [20];
exports.modules = {

/***/ 7020:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Addaddress)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7699);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3590);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7987);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_4__, react_i18next__WEBPACK_IMPORTED_MODULE_5__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_4__, react_i18next__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function Addaddress() {
    const { t  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)("common");
    const { 0: fullName , 1: setFullName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: phoneNumber , 1: setPhoneNumber  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const exceptThisSymbols1 = [
        "+",
        "-",
        "*",
        "/",
        " "
    ];
    const { 0: fullNameError , 1: setFullNameError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: isDisabled , 1: setIsDisabled  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { 0: phoneNumberError , 1: setPhoneNumberError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: pinCode , 1: setPinCode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: pinCodeError , 1: setPinCodeError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: state , 1: setState  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: stateError , 1: setStateError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: city , 1: setCity  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: cityError , 1: setCityError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: houseNo , 1: setHouseNo  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: houseNoError , 1: setHouseNoError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: address , 1: setAddress  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: addressError , 1: setAddressError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: isChecked , 1: setIsChecked  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // const [Index, SetIndex] = useState(false);
    const toastSuccesscreateaddress = ()=>react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Add Address Successfully")
    ;
    //save   use address
    const handleUersAddress = async (event)=>{
        event.preventDefault();
        let isValid = true;
        if (phoneNumber.length < 10) {
            setPhoneNumberError(" Number should be  10  digits.");
            isValid = false;
        }
        if (pinCode.length < 6) {
            setPinCodeError(" Pin Code should be  6  digits.");
            isValid = false;
        }
        if (isValid) {
            setPhoneNumberError("");
            setPinCodeError("");
            try {
                const data = {
                    address: {
                        fullName,
                        phoneNumber,
                        pinCode,
                        state,
                        city,
                        houseNo,
                        address
                    },
                    defaultAddress: isChecked
                };
                const response = await _services__WEBPACK_IMPORTED_MODULE_2__/* ["default"].myprofile.CREATE_MY_ADDRESS */ .Z.myprofile.CREATE_MY_ADDRESS(data);
                if (response) {
                    setIsDisabled(false);
                    toastSuccesscreateaddress();
                    setTimeout(()=>{
                        router.push(`/myprofile/?index=4`);
                    }, 1000);
                } else {
                    alert(response?.data?.guide);
                }
            } catch (error) {
                setIsDisabled(true);
                console.log(error);
            }
        }
    };
    const handleToggle = ()=>{
        setIsChecked(!isChecked);
    };
    const handleInputChange = (e)=>{
        const enteredNumber = e.target.value;
        // Ensure that the entered number is not negative
        if (enteredNumber >= 0 || enteredNumber === "") {
            setPhoneNumber(enteredNumber);
            if (enteredNumber.length >= 10) {
                setPhoneNumberError("");
            } else if (enteredNumber.length === 0) {
                setPhoneNumberError("Phone Number is Required ");
            } else {
                setPhoneNumberError("");
            }
        }
    };
    //pincode hanlde
    const handlePinCodeInputChange = (e)=>{
        const enteredNumber = e.target.value;
        // Ensure that the entered number is not negative
        if (enteredNumber >= 0 || enteredNumber === "") {
            setPinCode(enteredNumber);
            if (enteredNumber.length >= 6) {
                setPinCodeError("");
            } else if (enteredNumber.length === 0) {
                setPinCodeError("Pin Code is Required ");
            } else {
                setPinCodeError("");
            }
        }
    };
    //hnadle copy paste
    const handlePaste = (e)=>{
        let isValid = true;
        const pastedText = e.clipboardData.getData("Text");
        if (pastedText.length > 10) {
            const isValidNumber = /^\d{10}$/; // Validate 10-digit number
            if (!isValidNumber.test(pastedText)) {
                e.preventDefault(); // Prevent pasting invalid input
                setPhoneNumberError("Number should be 10 digits");
                isValid = false;
            }
        }
    };
    const handlePinCodePaste = (e)=>{
        let isValid = true;
        const pastedText = e.clipboardData.getData("Text");
        if (pastedText.length > 6) {
            const isValidPinCode = /^\d{6}$/; // Validate 6-digit pin code
            if (!isValidPinCode.test(pastedText)) {
                e.preventDefault(); // Prevent pasting invalid input
                setPinCodeError(" Pin Code should be 6 digits");
                isValid = false;
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: " ",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "tab-pane fade show active tab-pane fade",
            id: "account-detail",
            role: "tabpanel",
            "aria-labelledby": "account-detail-tab",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: " d-flex justify-content-between card-header",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                children: t("Add Address")
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    className: "form-check-input",
                                    type: "checkbox",
                                    role: "switch",
                                    id: "flexSwitchCheckDefault",
                                    checked: isChecked,
                                    onChange: handleToggle
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "card-body",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                            method: "post",
                            onSubmit: handleUersAddress,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "row",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group col-md-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                children: [
                                                    t("Full Name"),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "required",
                                                        children: "*"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                className: "form-control square",
                                                name: "full name",
                                                type: "text",
                                                value: fullName,
                                                placeholder: t("Enter Full Name"),
                                                onChange: (e)=>{
                                                    setFullName(e.target.value);
                                                    {
                                                        setFullNameError();
                                                    }
                                                    if (!e.target.value.trim()) {
                                                        setFullNameError("Full name is required");
                                                    } else {
                                                        setFullNameError("");
                                                    }
                                                },
                                                onKeyDown: (e)=>{
                                                    const exceptThisSymbols = [
                                                        "@",
                                                        "#",
                                                        "$"
                                                    ]; // Example: Add the symbols you want to restrict
                                                    const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                                                    if (e.key === " " && value.length === 0 // And there are no characters yet
                                                    ) {
                                                        e.preventDefault(); // Prevent entering space at the beginning
                                                    }
                                                    if (exceptThisSymbols.includes(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault(); // Prevent input of restricted characters
                                                    }
                                                // If the length is 0 and the key pressed is not Backspace or Delete
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: fullNameError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "red",
                                                        position: "absolute",
                                                        fontSize: "12px"
                                                    },
                                                    children: fullNameError
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group col-md-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                children: [
                                                    t("Phone Number"),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "required",
                                                        children: "*"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "number",
                                                required: "",
                                                name: "phoneNumber",
                                                // value={phoneNumber}
                                                placeholder: t("Enter Phone Number"),
                                                onPaste: handlePaste,
                                                onChange: handleInputChange,
                                                min: "0",
                                                onKeyDown: (e)=>{
                                                    exceptThisSymbols1.includes(e.key) && e.preventDefault();
                                                    if (e.target.value.length >= 10 && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault();
                                                        setPhoneNumberError("Number should be  10  digits.");
                                                    }
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: phoneNumberError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "red",
                                                        position: "absolute",
                                                        fontSize: "12px"
                                                    },
                                                    children: phoneNumberError
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group col-md-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                children: [
                                                    t("Pin Code"),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "required",
                                                        children: "*"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                required: "",
                                                className: "form-control square",
                                                name: "pincode",
                                                type: "number",
                                                value: pinCode,
                                                placeholder: t("Enter Pin Code"),
                                                onChange: handlePinCodeInputChange,
                                                onPaste: handlePinCodePaste,
                                                min: "0",
                                                onKeyDown: (e)=>{
                                                    exceptThisSymbols1.includes(e.key) && e.preventDefault();
                                                    if (e.target.value.length >= 6 && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault();
                                                        setPinCodeError("Pin Code should be  6  digits.");
                                                    }
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: pinCodeError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "red",
                                                        position: "absolute",
                                                        fontSize: "12px"
                                                    },
                                                    children: pinCodeError
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group col-md-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                children: [
                                                    t("State"),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "required",
                                                        children: "*"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                required: "",
                                                className: "form-control square",
                                                name: "state",
                                                type: "text",
                                                value: state,
                                                placeholder: t("Enter State"),
                                                onChange: (e)=>{
                                                    setState(e.target.value);
                                                    if (!e.target.value.trim()) {
                                                        setStateError("State is required");
                                                    } else {
                                                        setStateError("");
                                                    }
                                                },
                                                onKeyDown: (e)=>{
                                                    const exceptThisSymbols = [
                                                        "@",
                                                        "#",
                                                        "$"
                                                    ]; // Example: Add the symbols you want to restrict
                                                    const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                                                    if (e.key === " " && value.length === 0 // And there are no characters yet
                                                    ) {
                                                        e.preventDefault(); // Prevent entering space at the beginning
                                                    }
                                                    if (exceptThisSymbols.includes(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault(); // Prevent input of restricted characters
                                                    }
                                                // If the length is 0 and the key pressed is not Backspace or Delete
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: stateError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "red",
                                                        position: "absolute",
                                                        fontSize: "12px"
                                                    },
                                                    children: stateError
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group col-md-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                children: [
                                                    t("City"),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "required",
                                                        children: "*"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                required: "",
                                                className: "form-control square",
                                                name: "city",
                                                type: "text",
                                                value: city,
                                                placeholder: t("Enter City"),
                                                onChange: (e)=>{
                                                    setCity(e.target.value);
                                                    if (!e.target.value.trim()) {
                                                        setCityError("City is required");
                                                    } else {
                                                        setCityError("");
                                                    }
                                                },
                                                onKeyDown: (e)=>{
                                                    const exceptThisSymbols = [
                                                        "@",
                                                        "#",
                                                        "$"
                                                    ]; // Example: Add the symbols you want to restrict
                                                    const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                                                    if (e.key === " " && value.length === 0 // And there are no characters yet
                                                    ) {
                                                        e.preventDefault(); // Prevent entering space at the beginning
                                                    }
                                                    if (exceptThisSymbols.includes(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault(); // Prevent input of restricted characters
                                                    }
                                                // If the length is 0 and the key pressed is not Backspace or Delete
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: cityError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "red",
                                                        position: "absolute",
                                                        fontSize: "12px"
                                                    },
                                                    children: cityError
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group col-md-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                children: [
                                                    t("House No."),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "required",
                                                        children: "*"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                required: "",
                                                className: "form-control square",
                                                name: "houseno",
                                                type: "text",
                                                value: houseNo,
                                                placeholder: t("Enter House No."),
                                                onChange: (e)=>{
                                                    setHouseNo(e.target.value);
                                                    if (!e.target.value.trim()) {
                                                        setHouseNoError("House No is required");
                                                    } else {
                                                        setHouseNoError("");
                                                    }
                                                },
                                                onKeyDown: (e)=>{
                                                    const exceptThisSymbols = [
                                                        "@",
                                                        "#",
                                                        "$"
                                                    ]; // Example: Add the symbols you want to restrict
                                                    const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                                                    if (e.key === " " && value.length === 0 // And there are no characters yet
                                                    ) {
                                                        e.preventDefault(); // Prevent entering space at the beginning
                                                    }
                                                    if (exceptThisSymbols.includes(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault(); // Prevent input of restricted characters
                                                    }
                                                // If the length is 0 and the key pressed is not Backspace or Delete
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: houseNoError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "red",
                                                        position: "absolute",
                                                        fontSize: "12px"
                                                    },
                                                    children: houseNoError
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group col-md-12",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                children: [
                                                    t("AddressAdd"),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "required",
                                                        children: "*"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                required: "",
                                                className: "form-control square",
                                                name: "address",
                                                type: "address",
                                                value: address,
                                                placeholder: t("Enter Address"),
                                                onChange: (e)=>{
                                                    setAddress(e.target.value);
                                                    if (!e.target.value.trim()) {
                                                        setAddressError("Address is required");
                                                    } else {
                                                        setAddressError("");
                                                    }
                                                },
                                                onKeyDown: (e)=>{
                                                    const exceptThisSymbols = [
                                                        "@",
                                                        "#",
                                                        "$"
                                                    ]; // Example: Add the symbols you want to restrict
                                                    const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                                                    if (e.key === " " && value.length === 0 // And there are no characters yet
                                                    ) {
                                                        e.preventDefault(); // Prevent entering space at the beginning
                                                    }
                                                    if (exceptThisSymbols.includes(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault(); // Prevent input of restricted characters
                                                    }
                                                // If the length is 0 and the key pressed is not Backspace or Delete
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: addressError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "red",
                                                        position: "absolute",
                                                        fontSize: "12px"
                                                    },
                                                    children: addressError
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    className: "btn btn-fill-out mt-25",
                                                    disabled: !(fullName && phoneNumber && pinCode && state && city && houseNo && address && isDisabled),
                                                    children: t("Save")
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
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;