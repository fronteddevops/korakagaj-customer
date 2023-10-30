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

function Account() {
  const route = useRouter();
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
  const [passwordType, setPasswordType] = useState("password");
  const [newpassword, setNewPassword] = useState("");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [newpasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordError, setPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [alladdress, setAllAddress] = useState([]);
  const [orderDetailsData, setOrderDetailsData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showAddAddressComponent, setShowAddAddressComponent] = useState(false);
  const [showEditAddressComponent, setShowEditAddressComponent] = useState(false);

  const exceptThisSymbols = ["+", "-", "*", "/", " "];

  const imageUrl = nextConfig.BASE_URL_UPLOADS
  // const token = JSON.parse(localStorage.getItem("access_token"))

  const toastSuccesschangepassword = () =>
    toast.success("Change password successfully");
  const toastSuccessprofileupdate = () =>
    toast.success("Updated User successfully");
  const toastError = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };

  const handleOnClick = async (index) => {

    setActiveIndex(index);
    setShowAddAddressComponent(false);
    setShowEditAddressComponent(false)
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");
    setPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");



    if (index === 5) {

      try {
        const response = await services.myprofile.GET_MY_PROFILE();
        console.log(response.data.data)
        setFirstName(response?.data?.data?.firstName);
        setLastName(response?.data?.data?.lastName);
        setEmail(response?.data?.data?.email);
        setPhoneNumber(response?.data?.data?.phoneNumber);
        localStorage.setItem("user",JSON.stringify())
      } catch (error) {
        console.log(error);
      }
    } if (index == 2) {

      try {

        const response = await services.orderDetails.GET_ORDER_DETAILS();
        setOrderDetailsData(response?.data?.data.rows)
        // console.log("777777777777777777777",response.data)


      } catch (error) {
        console.log(error);
        toastError(error);
      }
    }
    if (index === 4) {

      try {
        const response = await services.myprofile.GET_MY_ADDRESS();
        console.log(response.data);
        setAllAddress(response?.data?.data);
      } catch { }
    } else {
    }
  };
  const handlesubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    if (phoneNumber.length < 10) {
      setPhoneNumberError(" Number should be  10  digits.");
      isValid = false;
    }
    if (isValid) {
      setPhoneNumberError("")
    try {
      const data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
      };
      const response = await services.myprofile.UPDATE_MY_PROFILE(data);
      if (response) {
      
       localStorage.setItem("user",JSON.stringify({firstName:data.firstName,lastName:data.lastName}))
    
        toastSuccessprofileupdate();
      } else {
      }
    }catch(e){
      console.log(e)
    }
  }}

  const changepassword = async (event) => {
    event.preventDefault();
    setNewPasswordError("")
    let isValid = true;

    setConfirmPasswordError("");
    if (newpassword !== confirmPassword) {
      // Update the passwordConfirm variable with an error message
      setConfirmPasswordError("password not match");
      isValid = false; // Set isValid to false
    }
    if (newpassword === "") {
      setNewPasswordError("Please enter password");
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
          toastSuccesschangepassword();
        } else {
          alert(response.data.guide);
        }
      } catch (error) {
        toastError(error);
        console.log(error);
      }

    }
  };

  const handleaddaddress = () => {
    setShowEditAddressComponent(false)
    // Set the state to true to render the AddAddressComponent
    setShowAddAddressComponent(true);
  };


  const handleeditaddress = (id) => {
    setSelectedId(id);
    // Set the state to true to render the AddAddressComponent
    setShowEditAddressComponent(true);
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

  return (
    <div>
      <Layout parent="Home" sub="Pages" subChild="Account">
        <section className="pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div
                className={
                  activeIndex === 4
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="address"
                role="tabpanel"
                aria-labelledby="address-tab"
              >
                <div className="col-lg-11 text-end mb-2">

                  <button
                    className="btn btn-fill-out"
                    style={{ width: "150px", padding: "1rem" }}
                    onClick={handleaddaddress}

                  >

                    <i class="fa fa-plus fs-6 me-2"></i>
                    Add Address
                  </button>
                </div>
              </div>

              <div className="col-lg-10 m-auto">
                <div className="row">
                  <div className="col-md-4">
                    <div className="dashboard-menu">
                      <ul className="nav flex-column" role="tablist">
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(1)}
                        >
                          <a
                            className={
                              activeIndex === 1 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-settings-sliders mr-10"></i>
                            Dashboard
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(2)}
                        >
                          <a
                            className={
                              activeIndex === 2 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-shopping-bag mr-10"></i>
                            Orders
                          </a>
                        </li>
                        {/* <li
                          className="nav-item"
                          onClick={() => handleOnClick(3)}
                        >
                          <a
                            className={
                              activeIndex === 3 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-shopping-cart-check mr-10"></i>
                            Track Your Order
                          </a>
                        </li> */}
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(4)}
                        >
                          <a
                            className={
                              activeIndex === 4 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-marker mr-10"></i>
                            My Address
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(5)}
                        >
                          <a
                            className={
                              activeIndex === 5 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-user mr-10"></i>
                            Account details
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(6)}
                        >
                          <a
                            className={
                              activeIndex === 6 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i class="fa fa-key mr-10"></i>
                            Change password
                          </a>
                        </li>
                        <li className="nav-item">
                          <Link href="/login">
                            <a className="nav-link">
                              <i className="fi-rs-sign-out mr-10"></i>
                              Logout
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-8">
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
                              <h5 className="mb-0">Hello Rosie!</h5>
                            </div>
                            <div className="card-body">
                              <p>
                                From your account dashboard. you can easily
                                check &amp; view your
                                <a href="#">recent orders</a>, manage your
                                <a href="#">shipping and billing addresses</a>
                                and
                                <a href="#">
                                  edit your password and account details.
                                </a>
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
                          <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Your Orders</h5>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Product Image</th>
                                      <th>Order Id</th>
                                      <th>Date</th>
                                      <th>Total Item</th>
                                      <th>Total Quantity</th>
                                      <th>Total Amount</th>
                                      <th>Order Status</th>
                                      <th>Actions</th>
                                      <th>Review</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orderDetailsData?.map((item, key) => {
                                      return (
                                        <tr key={key}>
                                          <td> <img
                                            className='rounded'
                                            crossOrigin='anonymous'
                                            src={imageUrl+ item?.OrderDetails?.[0]?.Product?.image?.[0]
                                            }
                                            alt='Image'
                                            height={50}
                                            width={50}
                                          /></td>
                                          <td>{item?.id}</td>
                                          <td>{moment(item?.createdAt).format("MMM DD, YYYY hh:mm A")}</td>
                                          <td>{item?.totalItems}</td>
                                          <td>{item?.totalQuantity}</td>
                                          <td>{item?.totalAmount}</td>
                                          <td>{item?.OrderDetails?.map((item, index) => {
                                            if (index === 0) {
                                              return item.type
                                            }

                                          }, [])}

                                          </td>
                                          <td>{item?.OrderDetails?.map((item, index) => {
                                            if (index === 0) {
                                              item?.image?.map((item, index) => {
                                                if (index === 0) {
                                                  return item
                                                }

                                              })
                                            }

                                          }, [])}

                                          </td>

                                          <td>   <Link href={`/OrderViewDetails?orderId=${item.id}`}>
                                            <a> View details</a>
                                          </Link></td>
                                          <td>   <Link href={`/ReviewRetting?orderId=${item.id}`}>
                                            <a> Review</a>
                                          </Link></td>

                                        </tr>
                                      )
                                    })}

                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
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
                              <h5 className="mb-0">Orders tracking</h5>
                            </div>
                            <div className="card-body contact-from-area">
                              <p>
                                To track your order please enter your OrderID in
                                the box below and press "Track" button. This was
                                given to you on your receipt and in the
                                confirmation email you should have received.
                              </p>
                              <div className="row">
                                <div className="col-lg-8">
                                  <form
                                    className="contact-form-style mt-30 mb-50"
                                    action="#"
                                    method="post"
                                  >
                                    <div className="input-style mb-20">
                                      <label>Order ID</label>
                                      <input
                                        name="order-id"
                                        placeholder="Found in your order confirmation email"
                                        type="text"
                                        className="square"
                                      />
                                    </div>
                                    <div className="input-style mb-20">
                                      <label>Billing email</label>
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
                                      Track
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeIndex === 4 && showAddAddressComponent === false && showEditAddressComponent === false
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id="address"
                          role="tabpanel"
                          aria-labelledby="address-tab"
                        >

                          <div className="row">
                            {alladdress?.map((user, index) => {
                              return (
                                <div className="col-lg-6">
                                  <div className="card mb-3 mb-lg-0">
                                    <div className="card-header">
                                      <h5 className="mb-0">Billing Address</h5>
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

                                          style={{ width: "150px", padding: "1rem", color: "red", cursor: 'pointer' }}

                                          onClick={() => handleeditaddress(user.id)}
                                        >

                                          Edit
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {showAddAddressComponent && <Addaddress />}

                        {showEditAddressComponent && <Editaddress id={selectedid} />}
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
                              <h5>Account Details</h5>
                            </div>
                            <div className="card-body">
                              <form method="post" onSubmit={handlesubmit}>
                                <div className="row">
                                  <div className="form-group col-md-6">
                                    <label>
                                      First Name
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required=""
                                      className="form-control square"
                                      name="name"
                                      type="text"
                                      value={firstName}
                                      placeholder={`Enter ${firstName}`}
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
                                        setFirstName(e.target.value.trim());
                                      }}
                                    />
                                    <div>
                                      {firstNameError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
                                            fontSize: "12px"
                                          }}
                                        >
                                          {firstNameError}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label>
                                      Last Name
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required=""
                                      className="form-control square"
                                      name="name"
                                      value={lastName}
                                      placeholder={`Enter ${lastName}`}
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
                                        setLastName(e.target.value.trim());
                                      }}
                                    />
                                    <div>
                                      {lastNameError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
                                            fontSize: "12px"
                                          }}
                                        >
                                          {lastNameError}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="form-group col-md-12">
                                    <label>
                                      Phone Number
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required=""
                                      className="form-control square"
                                      name="phone"
                                      type="number"
                                      value={phoneNumber}
                                      placeholder={`Enter ${phoneNumber}`}
                                      onChange={handleInputChange}
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
                                            fontSize: "12px"
                                          }}
                                        >
                                          {phoneNumberError}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label>
                                      Email Address
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
                                  </div>
                                  <div className="col-md-12 mt-5">
                                    <button
                                      className="btn btn-fill-out "
                                      disabled={
                                        firstNameError ||
                                        lastNameError

                                      }
                                    // onClick={handlesubmit}
                                    >
                                      Save
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
                              <h5>Change Password</h5>
                            </div>
                            <div className="card-body">
                              <form method="post" onSubmit={changepassword}>
                                <div className="row">
                                  <div className="form-group col-md-12">
                                    <label>
                                      Current Password
                                      <span className="required">*</span>
                                    </label>
                                    <div className="d-flex flex-column align-items-end ">
                                      <input
                                        required=""
                                        className="form-control square"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => {
                                          const trimmedValue = e.target.value.trim(); // Remove leading/trailing spaces
                                          if (trimmedValue !== "") {
                                            setPassword(trimmedValue);
                                            setPasswordError(""); // Clear the error if the input is not just spaces
                                          } else {
                                            setPassword(""); // Optionally, you can clear the password state
                                            setPasswordError("Old Password is required");
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
                                    <div style={{ marginTop: '-1rem', paddingBottom: '17px' }}>
                                      {passwordError ? (
                                        <span
                                          className="text-start position-absolute"
                                          style={{
                                            color: "red", fontSize: "12px",
                                          }}
                                        >
                                          {passwordError}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-12"
                                    style={{ marginTop: "-1rem" }}
                                  >
                                    <label>
                                      New Password
                                      <span className="required">*</span>
                                    </label>
                                    <div className="d-flex flex-column align-items-end ">
                                      <input
                                        required=""
                                        className="form-control square"
                                        name="npassword"
                                        placeholder="new password"
                                        autoComplete="off"
                                        type={
                                          showPassword1 ? "text" : "password"
                                        }
                                        onChange={(e) => {
                                          if (e.target.value.trim() === "") {
                                            setIsDisabled(true);

                                            setNewPasswordError("Requierd New Password");
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
                                            e.target.value.trimStart()
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
                                    <div style={{ marginTop: '-1rem', paddingBottom: '17px' }}>
                                      {newpasswordError ? (
                                        <span
                                          className="text-start position-absolute"
                                          style={{ color: "red", fontSize: "12px" }}
                                        >
                                          {newpasswordError}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="form-group col-md-12"
                                    style={{ marginTop: "-1rem" }}
                                  >
                                    <label>
                                      Confirm Password
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
                                        placeholder="confirm password"
                                        autoComplete="off"
                                        onChange={(e) => {
                                          if (e.target.value.trim() === "") {
                                            setIsDisabled(true);

                                            setConfirmPasswordError("Requierd Confirm Password");
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
                                            e.target.value.trimStart()
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
                                    <div style={{ marginTop: '-1rem', paddingBottom: '17px' }}>
                                      {confirmPasswordError ? (
                                        <span
                                          className="text-start  position-absolute"
                                          style={{ color: "red", fontSize: "12px" }}
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
                                          password &&
                                          newpassword &&
                                          confirmPassword
                                        )
                                      }
                                    // onClick={changepassword}
                                    >
                                      Save
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
