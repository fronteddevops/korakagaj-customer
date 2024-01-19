import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Addaddress from "./addaddress";
import Editaddress from "./editaddress";
import services from "../services";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import nextConfig from "../next.config";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

function Account() {
  const { t } = useTranslation("common");
  const [selectedid, setSelectedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [password, setPassword] = useState("");

  const [newpassword, setNewPassword] = useState("");

  const [newpasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledAcount, setIsDisabledAcount] = useState(true);
  const [isDisabledChangeP, setIsDisabledChangep] = useState(true);
  const [alladdress, setAllAddress] = useState([]);
  const [orderDetailsData, setOrderDetailsData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showAddAddressComponent, setShowAddAddressComponent] = useState(false);
  const [showEditAddressComponent, setShowEditAddressComponent] =
    useState(false);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dobError, setDobError] = useState("");

  const [breadCrumb, setBreadCrumb] = useState(t("Dashboard"));
  const exceptThisSymbols = ["+", "-", "*", "/", " "];
  //image url
  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const toastSuccesschangepassword = () =>
    toast.success("Change password successfully");
  const toastSuccessprofileupdate = () =>
    toast.success("Updated User successfully");
  const toastError = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };

  let route = useRouter();
  const { index } = route.query;
  useEffect(() => {
    if (index) {
      handleOnClick(+index);
    }
  }, [index]);

  useEffect(() => {
    if (route.query.Address) {
      setActiveIndex(8);
      handleaddaddress();
    }
  }, [route.query.Address]);

  const handleOnClick = async (index) => {
    setActiveIndex(index);
    setShowAddAddressComponent(false);
    setShowEditAddressComponent(false);
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setDobError("");
    if (index === 5) {
      try {
        //get my profile data
        const response = await services.myprofile.GET_MY_PROFILE();

        const DataOfResponse = response?.data?.data;
        setFirstName(DataOfResponse?.firstName);
        setLastName(DataOfResponse.lastName);
        setEmail(DataOfResponse.email);
        setPhoneNumber(DataOfResponse.phoneNumber);
        const date = DataOfResponse?.dob;

        //  setDateOfBirth(update)
        const formattedDate = moment(date).format("YYYY-MM-DD");
        setDateOfBirth(formattedDate);
        localStorage.setItem("user", JSON.stringify());
        if (firstName && lastName && email && phoneNumber && dateOfBirth) {
          setIsDisabledAcount(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (index == 2) {
      try {
        const response = await services.orderDetails.GET_ORDER_DETAILS();
        setOrderDetailsData(response?.data?.data.rows);
      } catch (error) {
        console.log(error);
        toastError(error);
      }
    }
    if (index === 4) {
      try {
        //get my address
        const response = await services.myprofile.GET_MY_ADDRESS();

        setAllAddress(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  //

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (dateOfBirth == "Invalid date") {
      setDobError("Please enter a Date of birth");
    }
    let isValid = true;
    if (phoneNumber.length < 10) {
      setPhoneNumberError(" Number should be  10  digits.");
      isValid = false;
    }
    if (dateOfBirth != "Invalid date") {
      if (isValid) {
        setPhoneNumberError("");
        try {
          const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            dob: dateOfBirth,
          };
          const response = await services.myprofile.UPDATE_MY_PROFILE(data);

          if (response) {
            setIsDisabledAcount(false);
            toastSuccessprofileupdate();
            setTimeout(() => {
              // window.location.reload();
            }, 1000);
          } else {
          }
        } catch (e) {
          setIsDisabledAcount(true);
        }
      }
    }
  };

  const handlePaste = (e) => {
    let isValid = true;
    const pastedText = e.clipboardData.getData("Text");
    if (pastedText.length >= 10) {
      const isValidNumber = /^\d{10}$/; // Validate 10-digit number

      if (!isValidNumber.test(pastedText)) {
        e.preventDefault(); // Prevent pasting invalid input
        setPhoneNumberError("Number should be  10  digits.");
        isValid = false;
      }
    }
  };

  const changepassword = async (event) => {
    event.preventDefault();
    setNewPasswordError("");
    setConfirmPasswordError("");
    let isValid = true;

    if (newpassword !== confirmPassword) {
      // Update the passwordConfirm variable with an error message
      setConfirmPasswordError("Password does not match");
      isValid = false; // Set isValid to false
    }

    if (newpassword === "") {
      setNewPasswordError("Please enter password");
      isValid = false;
    } else if (newpassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (isValid) {
      try {
        const data = {
          newPassword: newpassword,
          oldPassword: password,
        };
        const response = await services.myprofile.CHANGE_PASSWORD(data);
        if (response) {
          setIsDisabledChangep(false);
          toastSuccesschangepassword();
          // localStorage.removeItem("access_token");
          // localStorage.removeItem("userId");
          // localStorage.setItem("wishListItemsCount", 0);
          // localStorage.setItem("cartItemsCount", 0);
          route.push("/myprofile/?index=1");
        } else {
          alert(response.data.guide);
        }
      } catch (error) {
        toastError(error);
        setIsDisabledChangep(true);
        console.log(error);
      }
    }
  };

  const handleaddaddress = () => {
    setShowEditAddressComponent(false);
    setShowAddAddressComponent(true);

    route.push(`/myprofile?Address=1`);
  };

  const handleeditaddress = (id) => {
    setSelectedId(id);
    // Set the state to true to render the AddAddressComponent
    setShowEditAddressComponent(true);
    route.push(`/myprofile?EditAddress=1`);
  };

  const handleInputChange = (e) => {
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
  // const handleToggle = () => {
  //   setIsChecked(!isChecked);
  // };

  const handleInputChangeDateOfBirth = (e) => {
    const enteredDate = e.target.value;
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    // Check if the entered date is in the future
    const isFutureDate = moment(enteredDate).isAfter(moment());

    if (!enteredDate.match(dateFormat) || isFutureDate) {
      setDobError("Please enter a valid past date in the format MM-DD-YYY  ");
      setDateOfBirth("");
    } else {
      setDobError("");
      setDateOfBirth(enteredDate);
    }
  };

  return (
    <div>
      <Layout
        parent={t("Home")}
        sub={t("Pages")}
        subsuB={
          <Link href="/myprofile?index=2" as="/myprofile?index=2">
            {" "}
            <>
              {" "}
              <span></span> {t("Pages")}
            </>
          </Link>
        }
        subChild={breadCrumb}
      >
        <section className="pt-20 pb-50">
          <div className="container">
            <div className="row">
              {/* <div
                className={
                  activeIndex === 4
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="address"
                role="tabpanel"
                aria-labelledby="address-tab"
              >
                <div className="col-lg-12 text-end mb-2">
                  <button
                    className="btn btn-fill-out"
                    style={{ width: "150px", padding: "1rem" }}
                    onClick={handleaddaddress}
                  >
                    <i class="fa fa-plus fs-6 me-2"></i>
                    {t("Add Address")}
                  </button>
                </div>
              </div> */}

              <div className="col-lg-12 m-auto">
                <div className="row">
                  <div className="col-md-2">
                    <div className="dashboard-menu">
                      <ul className="nav flex-column" role="tablist">
                        <li
                          className="nav-item"
                          onClick={() => {
                            setBreadCrumb("Dashboard");
                            handleOnClick(1);
                          }}
                        >
                          <a
                            className={
                              activeIndex === 1 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-settings-sliders mr-10"></i>
                            {t("Dashboard")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            setBreadCrumb("Orders");
                            handleOnClick(2);
                          }}
                        >
                          <a
                            className={
                              activeIndex === 2 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-shopping-bag mr-10"></i>
                            {t("Orders")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => route.push("/shop-wishlist")}
                        >
                          <a
                            className={
                              activeIndex === 3 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-heart"></i>
                            &nbsp; {t("Wishlist")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            setBreadCrumb("My Address");
                            handleOnClick(4);
                          }}
                        >
                          <a
                            className={
                              activeIndex === 4 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-marker mr-10"></i>
                            {t("My Address")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            handleaddaddress();
                            // handleOnClick(8);
                            setActiveIndex(8);
                          }}
                        >
                          <a
                            className={
                              activeIndex === 8 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i class="fa fa-plus fs-6 me-2"></i>
                            {t("Add Address")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            setBreadCrumb(" Account details");
                            handleOnClick(5);
                          }}
                        >
                          <a
                            className={
                              activeIndex === 5 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-user mr-10"></i>
                            {t("Account details")}
                          </a>
                        </li>
                        <li
                          style={{ whiteSpace: "nowrap" }}
                          className="nav-item"
                          onClick={() => {
                            setBreadCrumb(" Change password");
                            handleOnClick(6);
                          }}
                        >
                          <a
                            className={
                              activeIndex === 6 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i class="fa fa-key mr-10"></i>
                            {t("Change password")}
                          </a>
                        </li>
                        <li className="nav-item">
                          <Link
                            href="/login"
                            onClick={() => {
                              localStorage.removeItem("access_token");
                              localStorage.removeItem("userId");
                              localStorage.setItem("wishListItemsCount", 0);
                              localStorage.setItem("cartItemsCount", 0);
                            }}
                          >
                            <a className="nav-link">
                              <i className="fi-rs-sign-out mr-10"></i>
                              {t("SingOut")}
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div>
                      <div className="tab-content dashboard-content">
                        <div
                          className={
                            activeIndex === 1
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="dashboard"
                          role="tabpanel"
                          aria-labelledby="dashboard-tab"
                        >
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">
                                {t("Welcome to KoraKagaj!")}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <p>
                                {t(
                                  "From your account dashboard. you can easily check"
                                )}{" "}
                                &amp; {t("view your")}
                                <a>{t("recent orders")}</a>, {t("manage your")}
                                <a>{t("shipping and billing addresses")}</a>
                                {t("and")}
                                <a>
                                  {t("edit your password and account details.")}
                                </a>
                              </p> */}
                              <p>
                                {t(
                                  "Welcome to your Shopper Dashboard! Dive into the latest trends, curated just for you. Explore our fashion haven and elevate your style. Happy shopping!"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeIndex === 2
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="orders"
                          role="tabpanel"
                          aria-labelledby="orders-tab"
                        >
                          {orderDetailsData.length == 0 ? (
                            <span
                              className="text-danger m-10"
                              style={
                                isMobile
                                  ? {
                                      display: "flex",
                                      justifyContent: "center",
                                      marginTop: "40px",
                                    }
                                  : {
                                      padding: "173px",
                                      display: "flex",
                                      justifyContent: "center",
                                    }
                              }
                            >
                              {t("Order Not Found")}
                            </span>
                          ) : (
                            <div className="card">
                              <div className="card-header">
                                <h5 className="mb-0">{t("Your Orders")}</h5>
                              </div>
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        {/* <th>{t("Product Image")}</th> */}
                                        <th>{t("Order Id")}</th>
                                        <th>{t("Date")}</th>
                                        {/* <th>{t("Total Item")}</th>
                                        <th>{t("Total Quantity")}</th>
                                        <th>{t("Total Amount")}</th>
                                        <th>{t("Coupon Discount")}</th>
                                        <th>{t("Coupon Code")}</th>
                                        <th>{t("Coupon Discounted Amount")}</th> */}
                                        <th>{t("Payable Amount")}</th>

                                        <th>{t("Order Status")}</th>
                                        <th>{t("Actions")}</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {orderDetailsData &&
                                        orderDetailsData.length > 0 &&
                                        orderDetailsData?.map((item, key) => (
                                          <tr key={key}>
                                            {/* <td
                                              className="text-right"
                                              data-title={t("Product Image")}
                                            >
                                              <img
                                                className="img-fluid rounded" // Make the image responsive
                                                crossOrigin="anonymous"
                                                src={
                                                  imageUrl +
                                                  item?.OrderDetails?.[0]
                                                    ?.Product?.image?.[0]
                                                }
                                                alt="Image"
                                                height={50}
                                                width={50}
                                              />
                                            </td> */}
                                            <td
                                              className="text-right"
                                              data-title={t("Order Id")}
                                            >
                                              {item?.id}
                                            </td>
                                            <td
                                              className="text-right"
                                              data-title={t("Date")}
                                            >
                                              {moment(item?.createdAt).format(
                                                "hh:mm A DD MMM YYYY"
                                              )}
                                            </td>
                                            {/* <td
                                              className="text-right"
                                              data-title={t("Total Item")}
                                            >
                                              {item?.totalItems}
                                            </td>
                                            <td
                                              className="text-right"
                                              data-title={t("Total Quantity")}
                                            >
                                              {item?.totalQuantity}
                                            </td>
                                            <td
                                              className="text-right"
                                              data-title={t("Total Amount")}
                                            >
                                              {item?.totalAmount}
                                            </td>

                                            <td
                                              className="text-right"
                                              data-title={t("Coupon Discount")}
                                            >
                                              {item?.couponPercent
                                                ? item?.couponPercent + "%"
                                                : "--"}
                                            </td>
                                            <td
                                              className="text-right"
                                              data-title={t("Coupon Code")}
                                            >
                                              {item?.couponCode
                                                ? item?.couponCode
                                                : "--"}
                                            </td>
                                            <td
                                              className="text-right"
                                              data-title={t("Discount Amount")}
                                            >
                                              {item?.discountAmount != 0
                                                ? item?.discountAmount
                                                : "--"}
                                            </td> */}
                                            <td
                                              className="text-right"
                                              data-title={t("Final Amount")}
                                            >
                                              {item?.finalAmount
                                                ? item?.finalAmount
                                                : "--"}
                                            </td>

                                            <td
                                              className="text-right"
                                              data-title={t("Order Status")}
                                            >
                                              {item?.paymentLogs[0]?.paymentResponse?.status
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                item?.paymentLogs[0]?.paymentResponse?.status?.slice(
                                                  1
                                                )}
                                            </td>
                                            <td
                                              className="text-right"
                                              data-title={t("Actions")}
                                            >
                                              <Link
                                                href={`/OrderViewDetails?orderId=${item.id}&orderIntial=${item?.paymentLogs[0]?.paymentResponse?.status}`}
                                              >
                                                <a>{t("View detail")}</a>
                                              </Link>
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div
                          className={
                            activeIndex === 3
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="track-orders"
                          role="tabpanel"
                          aria-labelledby="track-orders-tab"
                        >
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">{t("Orders tracking")}</h5>
                            </div>
                            <div className="card-body contact-from-area">
                              <p>
                                {t(
                                  "To track your order please enter your OrderID in the box below and press Track button. This was given to you on your receipt and in the confirmation email you should have received."
                                )}
                              </p>
                              <div className="row">
                                <div className="col-lg-8">
                                  <form
                                    className="contact-form-style mt-30 mb-50"
                                    action="#"
                                    method="post"
                                  >
                                    <div className="input-style mb-20">
                                      <label>{t("Order ID")}</label>
                                      <input
                                        name="order-id"
                                        placeholder="Found in your order confirmation email"
                                        type="text"
                                        className="square"
                                      />
                                    </div>
                                    <div className="input-style mb-20">
                                      <label>{t("Billing email")}</label>
                                      <input
                                        name="billing-email"
                                        placeholder="Email you used during checkout"
                                        type="email"
                                        className="square"
                                      />
                                    </div>
                                    <button
                                      className="submit submit-auto-width"
                                      type="submit"
                                    >
                                      {t("Track")}
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeIndex === 4 &&
                            showAddAddressComponent === false &&
                            showEditAddressComponent === false
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="address"
                          role="tabpanel"
                          aria-labelledby="address-tab"
                        >
                          <div className="row">
                            {alladdress?.length === 0 ? (
                              <span
                                className="text-danger m-10"
                                // style={{
                                //   textAlign: "center",
                                //   padding: "173px",
                                // }}

                                style={
                                  isMobile
                                    ? {
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "40px",
                                      }
                                    : {
                                        padding: "173px",
                                        display: "flex",
                                        justifyContent: "center",
                                      }
                                }
                              >
                                {t("Address Not Found")}
                              </span>
                            ) : (
                              alladdress?.map((user, index) => {
                                return (
                                  <div className="col-lg-6">
                                    <div className="card mb-3 mb-lg-0">
                                      <div className="card-header d-flex justify-content-between">
                                        <h5 className="mb-0">
                                          {t("Billing Address")}
                                        </h5>
                                        <span>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="flexSwitchCheckDefault"
                                            disabled="true"
                                            checked={user.defaultAddress}
                                          />
                                        </span>
                                      </div>

                                      <div
                                        className="card-body"
                                        onChange={(e) => setAllAddress()}
                                        key={index}
                                      >
                                        <address>
                                          {" "}
                                          <span
                                            style={{
                                              whiteSpace: "pre-wrap", // This property allows for line breaks
                                              wordWrap: "break-word", // This property allows for breaking words when needed
                                              overflowWrap: "break-word", // An alternative way to allow word breaking
                                              maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                            }}
                                          >
                                            {user.address.fullName}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              whiteSpace: "pre-wrap", // This property allows for line breaks
                                              wordWrap: "break-word", // This property allows for breaking words when needed
                                              overflowWrap: "break-word", // An alternative way to allow word breaking
                                              maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                            }}
                                          >
                                            {user.address.phoneNumber}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              whiteSpace: "pre-wrap", // This property allows for line breaks
                                              wordWrap: "break-word", // This property allows for breaking words when needed
                                              overflowWrap: "break-word", // An alternative way to allow word breaking
                                              maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                            }}
                                          >
                                            {user.address.houseNo}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              whiteSpace: "pre-wrap", // This property allows for line breaks
                                              wordWrap: "break-word", // This property allows for breaking words when needed
                                              overflowWrap: "break-word", // An alternative way to allow word breaking
                                              maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                            }}
                                          >
                                            {user.address.address}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              whiteSpace: "pre-wrap", // This property allows for line breaks
                                              wordWrap: "break-word", // This property allows for breaking words when needed
                                              overflowWrap: "break-word", // An alternative way to allow word breaking
                                              maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                            }}
                                          >
                                            {user.address.city}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              whiteSpace: "pre-wrap", // This property allows for line breaks
                                              wordWrap: "break-word", // This property allows for breaking words when needed
                                              overflowWrap: "break-word", // An alternative way to allow word breaking
                                              maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                            }}
                                          >
                                            {user.address.pinCode}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              whiteSpace: "pre-wrap", // This property allows for line breaks
                                              wordWrap: "break-word", // This property allows for breaking words when needed
                                              overflowWrap: "break-word", // An alternative way to allow word breaking
                                              maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                            }}
                                          >
                                            {user.address.state}
                                          </span>
                                        </address>

                                        <div className="col-lg-12 text-end ">
                                          <span
                                            style={{
                                              width: "150px",
                                              padding: "1rem",
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleeditaddress(user.id)
                                            }
                                          >
                                            {t("Edit Default Address")}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                        {showAddAddressComponent && <Addaddress />}

                        {showEditAddressComponent && (
                          <Editaddress id={selectedid} />
                        )}
                        <div
                          className={
                            activeIndex === 5
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="account-detail"
                          role="tabpanel"
                          aria-labelledby="account-detail-tab"
                        >
                          <div className="card">
                            <div className="card-header">
                              <h5>{t("Account Details")}</h5>
                            </div>
                            <div className="card-body">
                              <form method="post" onSubmit={handlesubmit}>
                                <div className="row">
                                  <div className="form-group col-md-6">
                                    <label>
                                      {t("First Name")}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required=""
                                      className="form-control square"
                                      name="name"
                                      type="text"
                                      value={firstName}
                                      placeholder={
                                        t("Enter First Name") + firstName
                                      }
                                      onChange={(e) => {
                                        setFirstName(e.target.value);
                                        if (!e.target.value.trim()) {
                                          setFirstNameError(
                                            "First name is required"
                                          );
                                        } else {
                                          setFirstName(e.target.value);
                                          setFirstNameError("");
                                        }
                                      }}
                                      onKeyDown={(e) => {
                                        const exceptThisSymbols = [
                                          "@",
                                          "#",
                                          "$",
                                        ]; // Example: Add the symbols you want to restrict

                                        const value = e.target.value.trim(); // Trim removes leading/trailing spaces

                                        if (
                                          e.key === " " && // If the pressed key is space
                                          value.length === 0 // And there are no characters yet
                                        ) {
                                          e.preventDefault(); // Prevent entering space at the beginning
                                        }

                                        if (
                                          exceptThisSymbols.includes(e.key) && // If the key is in the exception list
                                          e.key !== "Backspace" &&
                                          e.key !== "Delete"
                                        ) {
                                          e.preventDefault(); // Prevent input of restricted characters
                                        }

                                        // If the length is 0 and the key pressed is not Backspace or Delete
                                      }}
                                    />
                                    <div>
                                      {firstNameError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {firstNameError}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label>
                                      {t("Last Name")}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required=""
                                      className="form-control square"
                                      name="name"
                                      value={lastName}
                                      placeholder={
                                        t("Enter Last Name") + lastName
                                      }
                                      onChange={(e) => {
                                        setLastName(e.target.value);
                                        if (!e.target.value.trim()) {
                                          setLastNameError(
                                            "Last name is required"
                                          );
                                        } else {
                                          setLastName(e.target.value);
                                          setLastNameError("");
                                        }
                                      }}
                                      onKeyDown={(e) => {
                                        const exceptThisSymbols = [
                                          "@",
                                          "#",
                                          "$",
                                        ]; // Example: Add the symbols you want to restrict

                                        const value = e.target.value.trim(); // Trim removes leading/trailing spaces

                                        if (
                                          e.key === " " && // If the pressed key is space
                                          value.length === 0 // And there are no characters yet
                                        ) {
                                          e.preventDefault(); // Prevent entering space at the beginning
                                        }

                                        if (
                                          exceptThisSymbols.includes(e.key) && // If the key is in the exception list
                                          e.key !== "Backspace" &&
                                          e.key !== "Delete"
                                        ) {
                                          e.preventDefault(); // Prevent input of restricted characters
                                        }

                                        // If the length is 0 and the key pressed is not Backspace or Delete
                                      }}
                                    />
                                    <div>
                                      {lastNameError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {lastNameError}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="form-group col-md-12">
                                    <label>
                                      {t("Phone Number")}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required=""
                                      className="form-control square"
                                      name="phone"
                                      type="number"
                                      value={phoneNumber}
                                      placeholder={t("Enter Phone Number")}
                                      onChange={handleInputChange}
                                      onPaste={handlePaste}
                                      min="0"
                                      onKeyDown={(e) => {
                                        exceptThisSymbols.includes(e.key) &&
                                          e.preventDefault();
                                        if (
                                          e.target.value.length >= 10 &&
                                          e.key !== "Backspace" &&
                                          e.key !== "Delete"
                                        ) {
                                          e.preventDefault();
                                          setPhoneNumberError(
                                            "Number should be  10  digits."
                                          );
                                        }
                                      }}
                                    />
                                    <div>
                                      {phoneNumberError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {phoneNumberError}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label>
                                      {t("Email Address")}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required=""
                                      className="form-control square"
                                      disabled="true"
                                      name="email"
                                      type="email"
                                      value={email}
                                    />
                                    <div className="form-group col-md-12">
                                      <label>
                                        {t("Date of Birth")}
                                        <span className="required">*</span>
                                      </label>
                                      <input
                                        required=""
                                        className="form-control square"
                                        //    name="dob"
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={handleInputChangeDateOfBirth}
                                        max={moment().format("YYYY-MM-DD")}
                                      />
                                      {dobError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {dobError}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-12 mt-5">
                                    <button
                                      className="btn btn-fill-out "
                                      disabled={
                                        !(
                                          isDisabledAcount &&
                                          firstName &&
                                          dateOfBirth &&
                                          lastName &&
                                          phoneNumber
                                        )
                                      }
                                      // onClick={handlesubmit}
                                    >
                                      {t("Save")}
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeIndex === 6
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="account-detail"
                          role="tabpanel"
                          aria-labelledby="account-detail-tab"
                        >
                          <div className="card">
                            <div className="card-header">
                              <h5>{t("Change Password")}</h5>
                            </div>
                            <div className="card-body">
                              <form method="post" onSubmit={changepassword}>
                                <div className="row">
                                  <div className="form-group col-md-12">
                                    <label>
                                      {t("Current Password")}
                                      <span className="required">*</span>
                                    </label>
                                    <div className="d-flex flex-column align-items-end ">
                                      <input
                                        required=""
                                        className="form-control square"
                                        name="password"
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        placeholder={t("Password")}
                                        onChange={(e) => {
                                          const trimmedValue =
                                            e.target.value.trim(); // Remove leading/trailing spaces
                                          if (trimmedValue !== "") {
                                            setPassword(trimmedValue);
                                            setPasswordError(""); // Clear the error if the input is not just spaces
                                          } else {
                                            setPassword(""); // Optionally, you can clear the password state
                                            setPasswordError(
                                              "Old Password is required"
                                            );
                                          }
                                        }}
                                      />
                                      <span className="">
                                        <i
                                          onClick={() =>
                                            setShowPassword(!showPassword)
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              showPassword ? faEyeSlash : faEye
                                            }
                                            style={{
                                              height: "1rem",
                                              verticalAlign: "text-top",
                                              marginTop: "-2rem",
                                              marginRight: "1rem",
                                            }}
                                          />
                                        </i>
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        marginTop: "-1rem",
                                        paddingBottom: "17px",
                                      }}
                                    >
                                      {passwordError ? (
                                        <span
                                          className="text-start position-absolute"
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {passwordError}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div
                                    className="form-group col-md-12"
                                    style={{ marginTop: "-1rem" }}
                                  >
                                    <label>
                                      {t("New Password")}
                                      <span className="required">*</span>
                                    </label>
                                    <div className="d-flex flex-column align-items-end ">
                                      <input
                                        required=""
                                        className="form-control square"
                                        name="npassword"
                                        placeholder={t("New Password")}
                                        autoComplete="off"
                                        type={
                                          showPassword1 ? "text" : "password"
                                        }
                                        onChange={(e) => {
                                          if (e.target.value.trim() === "") {
                                            setIsDisabled(true);

                                            setNewPasswordError(
                                              "Requierd New Password"
                                            );
                                          } else if (
                                            e.target.value.trim().length < 8
                                          ) {
                                            setIsDisabled(true);
                                            setNewPasswordError(
                                              "Password must be at least 8 characters"
                                            );
                                          } else if (
                                            e.target.value.trim() ===
                                            confirmPassword
                                          ) {
                                            setIsDisabled(false);
                                            setNewPasswordError("");
                                            setConfirmPasswordError("");
                                          } else {
                                            setNewPassword(
                                              e.target.value.trimStart()
                                            );
                                            setNewPasswordError("");
                                          }

                                          setNewPassword(
                                            e.target.value.trimStart().trimEnd()
                                          );
                                        }}
                                        value={newpassword}
                                      />
                                      <span className="">
                                        <i
                                          onClick={() =>
                                            setShowPassword1(!showPassword1)
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              showPassword1 ? faEyeSlash : faEye
                                            }
                                            style={{
                                              height: "1rem",
                                              verticalAlign: "text-top",
                                              marginTop: "-2rem",
                                              marginRight: "1rem",
                                            }}
                                          />
                                        </i>
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        marginTop: "-1rem",
                                        paddingBottom: "17px",
                                      }}
                                    >
                                      {newpasswordError ? (
                                        <span
                                          className="text-start position-absolute"
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {newpasswordError}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div
                                    className="form-group col-md-12"
                                    style={{ marginTop: "-1rem" }}
                                  >
                                    <label>
                                      {t("Confirm Password")}
                                      <span className="required">*</span>
                                    </label>
                                    <div className="d-flex flex-column align-items-end ">
                                      <input
                                        required=""
                                        type={
                                          showPassword2 ? "text" : "password"
                                        }
                                        className="form-control square"
                                        name="cpassword"
                                        placeholder={t("confirm password")}
                                        autoComplete="off"
                                        onChange={(e) => {
                                          if (e.target.value.trim() === "") {
                                            setIsDisabled(true);

                                            setConfirmPasswordError(
                                              "Requierd Confirm Password"
                                            );
                                          } else if (
                                            e.target.value.trim() !==
                                            newpassword
                                          ) {
                                            setIsDisabled(true);

                                            setConfirmPasswordError(
                                              "Password does not match"
                                            );
                                          } else {
                                            setIsDisabled(false);
                                            setConfirmPassword(
                                              e.target.value.trimStart()
                                            );
                                            setConfirmPasswordError("");
                                          }

                                          setConfirmPassword(
                                            e.target.value.trimStart().trimEnd()
                                          );
                                        }}
                                        value={confirmPassword}
                                      />
                                      <span className="">
                                        <i
                                          onClick={() =>
                                            setShowPassword2(!showPassword2)
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              showPassword2 ? faEyeSlash : faEye
                                            }
                                            style={{
                                              height: "1rem",
                                              verticalAlign: "text-top",
                                              marginTop: "-2rem",
                                              marginRight: "1rem",
                                            }}
                                          />
                                        </i>
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        marginTop: "-1rem",
                                        paddingBottom: "17px",
                                      }}
                                    >
                                      {confirmPasswordError ? (
                                        <span
                                          className="text-start  position-absolute"
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {confirmPasswordError}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <button
                                      // type="submit"
                                      className="btn btn-fill-out  "
                                      // name="submit"
                                      // value="Submit"
                                      disabled={
                                        !(
                                          isDisabledChangeP &&
                                          password &&
                                          newpassword &&
                                          confirmPassword
                                        )
                                      }
                                      // onClick={changepassword}
                                    >
                                      {t("Save")}
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default Account;
