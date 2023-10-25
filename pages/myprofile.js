import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Addaddress from "./addaddress";

import services from "../services";
import Link from "next/link";
import { useRouter } from "next/router";

function Account() {
  const route = useRouter();
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
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showAddAddressComponent, setShowAddAddressComponent] = useState(false);

  const exceptThisSymbols = ["+", "-", "*", "/", " "];

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
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");
    setPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    if (index === 5) {
      try {
        const response = await services.myprofile.GET_MY_PROFILE();
        setFirstName(response?.data?.data?.firstName);
        setLastName(response?.data?.data?.lastName);
        setEmail(response?.data?.data?.email);
        setPhoneNumber(response?.data?.data?.phoneNumber);
      } catch (error) {
        console.log(error);
      }
    }
    if (index === 4) {
      try {
        const response = await services.myprofile.GET_MY_ADDRESS();
        console.log(response.data);
        setAllAddress(response?.data?.data);
      } catch {}
    } else {
    }
  };
  const handlesubmit = async () => {
    try {
      const data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
      };
      const response = await services.myprofile.UPDATE_MY_PROFILE(data);
      if (response) {
        toastSuccessprofileupdate();
      } else {
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  const changepassword = async () => {
    if (index === 6) {
      setPasswordError("");
      if (password === "") {
        setPasswordError("Please enter password"); // eslint-disable-next-line
        isValid = false;
      }
      if (newpassword !== confirmPassword) {
        setConfirmPasswordError("Password does not match");
      } else {
        try {
          const data = {
            newPassword: newpassword,
            oldPassword: password,
          };
          const response = await services.myprofile.CHANGE_PASSWORD(data);
          if (response) {
            toastSuccesschangepassword();
          }
        } catch (error) {
          toastError(error);
          console.log(error);
        }
      }
    }
  };

  const handleaddaddress = () => {
    // Set the state to true to render the AddAddressComponent
    setShowAddAddressComponent(true);
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
                        <li
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
                        </li>
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
                                      <th>Order</th>
                                      <th>Date</th>
                                      <th>Status</th>
                                      <th>Total</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>#1357</td>
                                      <td>March 45, 2020</td>
                                      <td>Processing</td>
                                      <td>Rs.125.00 for 2 item</td>
                                      <td>
                                        <a
                                          href="#"
                                          className="btn-small d-block"
                                        >
                                          View
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#2468</td>
                                      <td>June 29, 2020</td>
                                      <td>Completed</td>
                                      <td>Rs.364.00 for 5 item</td>
                                      <td>
                                        <a
                                          href="#"
                                          className="btn-small d-block"
                                        >
                                          View
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#2366</td>
                                      <td>August 02, 2020</td>
                                      <td>Completed</td>
                                      <td>Rs.280.00 for 3 item</td>
                                      <td>
                                        <a
                                          href="#"
                                          className="btn-small d-block"
                                        >
                                          View
                                        </a>
                                      </td>
                                    </tr>
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
                            activeIndex === 4 && showAddAddressComponent===false
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
                                        {user.address.fullName}
                                        <br /> {user.address.phoneNumber}
                                        <br />
                                        {user.address.houseNo}
                                        {user.address.address}
                                        <br />
                                        {user.address.city}
                                        <br />
                                        {user.address.pinCode}
                                        <br />
                                        {user.address.state}
                                      </address>
                                      <a
                                        href={`/editaddress/?userid=${user.id}`}
                                        className="btn-small"
                                      >
                                        Edit
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {showAddAddressComponent && <Addaddress />}
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
                              <form method="post" name="enq">
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
                                          setLastNameError("");
                                        }
                                        setLastName(e.target.value);
                                        setLastNameError("");
                                      }}
                                    />
                                    <div>
                                      {lastNameError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
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
                                      onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        if (!e.target.value.trim()) {
                                          setPhoneNumberError(
                                            "Phone number is required"
                                          );
                                        } else {
                                          setPhoneNumberError("");
                                        }
                                        setPhoneNumber(e.target.value);
                                        setPhoneNumberError("");
                                      }}
                                    />
                                    <div>
                                      {phoneNumberError && (
                                        <span
                                          style={{
                                            color: "red",
                                            position: "absolute",
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
                                        lastNameError ||
                                        phoneNumberError
                                      }
                                      onClick={handlesubmit}
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
                              <form method="post" name="enq">
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
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        placeholder="password"
                                        onChange={(e) => {
                                          if (e.target.value.trim() === "") {
                                            setIsDisabled(true);
                                            setPasswordError("Required");
                                          } else {
                                            setPassword(
                                              e.target.value.trimStart()
                                            );
                                            setPasswordError("");
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

                                    {passwordError ? (
                                      <p
                                        className="text-start  position-absolute "
                                        style={{ color: "red" }}
                                      >
                                        {passwordError}
                                      </p>
                                    ) : null}
                                  </div>
                                  <div className="form-group col-md-12">
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

                                            setNewPasswordError("Requierd");
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
                                    {newpasswordError ? (
                                      <p
                                        className="text-start  position-absolute mt-2"
                                        style={{ color: "red" }}
                                      >
                                        {newpasswordError}
                                      </p>
                                    ) : null}
                                  </div>
                                  <div className="form-group col-md-12">
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

                                            setConfirmPasswordError("Requierd");
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
                                    {confirmPasswordError ? (
                                      <p
                                        className="text-start  position-absolute mt-2"
                                        style={{ color: "red" }}
                                      >
                                        {confirmPasswordError}
                                      </p>
                                    ) : null}
                                  </div>
                                  <div className="col-md-12">
                                    <button
                                      // type="submit"
                                      className="btn btn-fill-out "
                                      // name="submit"
                                      // value="Submit"
                                      disabled={
                                        !(
                                          password &&
                                          newpassword &&
                                          confirmPassword
                                        )
                                      }
                                      onClick={changepassword}
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
