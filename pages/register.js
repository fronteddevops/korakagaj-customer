import Link from "next/link";
import Layout from "../components/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import services from "../services/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Preloader from "../components/elements/Preloader.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
function Register() {
  const route = useRouter();
  const { t } = useTranslation("common");
  //error handling

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState();
  const [emailErrorRegister, setEmailErrorRegister] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [passwordErrorRegister, setPasswordErrorRegister] = useState("");
  //password show icon set value in state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleLogin, setPasswordVisibleLogin] = useState(false);
  const [Load, setLoad] = useState(false);
  const [passwordVisibleConfirmPassword, setpasswordVisibleConfirmPassword] =
    useState(false);

  //Register user State
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  //email validate

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const onSuccesshandler = (token) => {
    if (token) {
      const decoded = jwtDecode(token?.credential);
      GoogleAuth(
        decoded.email,
        decoded?.sub,
        decoded.given_name,
        decoded.family_name
      );
    }
  };
  const GoogleAuth = async (email, gAuth, firstname, lastname) => {
    const data = {
      email,
      gAuth,
      firstname,
      lastname,
    };
    try {
      const response = await services.GoogleAuth.GoogleAuth(data);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem("userId", response?.data?.user?.id);
        if (response?.data?.tokens?.access?.token) {
          localStorage.setItem(
            "access_token",
            response.data.tokens.access.token
          );
        }
        toastSuccessFully();
        setIsValid(false);
        await handleCart();
        route.push("/myprofile/?index=5");
      } else {
        alert(response.data.guide);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //handle cart data
  const handleCart = async () => {
    try {
      if (localStorage.getItem("cartDetail")) {
        const cartLocal =
          localStorage.getItem("cartDetail") &&
          JSON.parse(localStorage.getItem("cartDetail"));
        let cartDetailsLocal = [];
        if (cartLocal && cartLocal?.cartDetails?.length > 0) {
          cartDetailsLocal = cartLocal.cartDetails;
        }
        const cart = await services.cart.GET_CART();

        let cartDetails = [];
        if (cart?.data?.data?.cartDetail?.cartDetails) {
          cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
        }
        cartDetails = [...cartDetails, ...cartDetailsLocal];
        const key = "id";
        const unique = cartDetails.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.id === value.id &&
                t.selectedSize === value.selectedSize &&
                t.selectedColor === value.selectedColor &&
                t.fabric === value.fabric
            )
        );
        // const unique = [...new Map(cartDetails.map(item =>
        //   [item[key], item])).values()];
        let data = {
          cartDetail: { cartDetails: unique },
        };
        localStorage.setItem("cartItemsCount", unique.length);
        const updateCart = await services.cart.UPDATE_CART(data);

        localStorage.removeItem("cartDetail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exceptThisSymbolspassword = ["+", "-"];

  const handleRegister = async (event) => {
    event.preventDefault();
    setPasswordConfirmError("");

    let isValid = true;
    setEmailErrorRegister("");
    setPasswordErrorRegister("");

    if (passwordRegister.length < 8) {
      setPasswordErrorRegister("Password must be at least 8 characters");
      isValid = false;
    }

    if (passwordRegister !== passwordConfirm) {
      setPasswordConfirmError("Password not match");
      isValid = false;
    }
    if (number.length < 10) {
      setNumberError(" Number should be  10  digits.");
      isValid = false;
    }

    if (emailRegister === "") {
      setEmailErrorRegister("Enter a valid email address");
      isValid = false;
    } else if (!validateEmail(emailRegister)) {
      setEmailErrorRegister("Enter a valid email address");
      isValid = false;
    }
    if (passwordRegister === "") {
      setPasswordErrorRegister("Please enter password");
      isValid = false;
    }

    if (isValid) {
      setNumberError("");
      try {
        setIsValid(false);
        let payLoad = {
          email: emailRegister.toLowerCase(),
          password: passwordRegister,
          role: "Customer",
          firstName: firstName,
          lastName: lastName,
          phoneNumber: number,
        };
        setLoad(true);
        const response = await services.auth.REGISTER_USER(payLoad);

        setLoad(false);
        if (response) {
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          localStorage.setItem("userId", response?.data?.user.id);
          toastSuccess();
          setIsValid(false);
          await handleCart();
          route.push("/myprofile/?index=5");
        } else {
          alert(response.data.guide);
        }
      } catch (error) {
        setIsValid(true);
        setLoad(false);
        toastError(error);
      }
    }
  };

  //number validation

  const handleInputChange = (e) => {
    const enteredNumber = e.target.value;

    // Ensure that the entered number is not negative
    if (enteredNumber >= 0 || enteredNumber === "") {
      setNumber(enteredNumber);

      if (enteredNumber.length >= 10) {
        setNumberError("");
      } else if (enteredNumber.length === 0) {
        setNumberError("Required");
      } else {
        setNumberError("");
      }
    }
  };

  //set toster  register
  const toastSuccess = () => toast.success("Register User successfully");
  const toastSuccessFully = () => toast.success("Register Successfully");
  const toastError = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };
  //set toster  login
  const toastSuccessLogin = () => toast.success("Login User successfully");
  const toastErrorLogin = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };
  //password show in eye icon
  const togglePasswordVisibilityRegister = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleVisibilityComfromPaassword = () => {
    setpasswordVisibleConfirmPassword(!passwordVisibleConfirmPassword);
  };
  const togglePasswordVisibilityLogin = () => {
    setPasswordVisibleLogin(!passwordVisibleLogin);
  };
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  //hnadle copy paste
  const handlePaste = (e) => {
    let isValid = true;

    const pastedText = e.clipboardData.getData("Text");
    if (pastedText.length > 10) {
      const isValidNumber = /^\d{10}$/; // Validate 10-digit number

      if (!isValidNumber.test(pastedText)) {
        e.preventDefault(); // Prevent pasting invalid input
        setNumberError("Number should be  10  digits.");
        isValid = false;
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); 
  };

  return (
    <>
      {Load && <Preloader />}
      <Layout parent={t("Home")} sub={t("Register")}>
        <section className="pt-100 pb-100 bg-image">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="row justify-content-around">
                  <div className="col-lg-5">
                    <div className="login_wrap widget-taber-content p-30 background-white border-radius-5">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h3 className="mb-30">{t("Create an Account")}</h3>
                        </div>
                        <p className="mb-50 font-sm">
                          {t(
                            "Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy"
                          )}
                        </p>
                        <form method="post" onSubmit={handleRegister}>
                          <div className="col-md-12 mt-4">
                            <input
                              type="text"
                              required=""
                              name="firstname"
                              placeholder={t("First Name")}
                              value={firstName}
                              onChange={(e) => {
                                setFirstName(e.target.value.trimStart());
                                if (e.target.value.trimStart()) {
                                  setFirstName(e.target.value);
                                }
                                if (e.target.value.length === 0) {
                                  setFirstNameError("Required");
                                } else {
                                  setFirstNameError("");
                                }
                              }}
                            />
                            {firstNameError && (
                              <>
                                <div className="error-message">
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      position: "absolute",
                                    }}
                                  >
                                    {firstNameError}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="col-md-12 mt-4">
                            <input
                              type="text"
                              required=""
                              name="lastName"
                              placeholder={t("Last Name")}
                              value={lastName}
                              onChange={(e) => {
                                setLastName(e.target.value.trim()); // Trim whitespace before setting
                                if (e.target.value.trim()) {
                                  setLastName(e.target.value);
                                }
                                if (e.target.value.length === 0) {
                                  setLastNameError("Required");
                                } else {
                                  setLastNameError("");
                                }
                              }}
                            />
                            {lastNameError && (
                              <>
                                <div className="error-message">
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      position: "absolute",
                                    }}
                                  >
                                    {lastNameError}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="col-md-12 mt-4">
                            <input
                              type="number"
                              required=""
                              name="phoneNumber"
                              placeholder={t("Phone Number")}
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
                                  setNumberError(
                                    "Number should be  10  digits."
                                  );
                                }
                              }}
                            />
                            {numberError && (
                              <>
                                <div className="error-message">
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      position: "absolute",
                                    }}
                                  >
                                    {numberError}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="col-md-12 mt-4">
                            <input
                              type="email"
                              required=""
                              name="email"
                              placeholder={t("Email")}
                              value={emailRegister}
                              onChange={(e) => {
                                setEmailRegister(e.target.value.trim()); // Trim whitespace before setting
                                if (e.target.value.trim()) {
                                  setEmailRegister(e.target.value);
                                }
                                if (e.target.value.length === 0) {
                                  setEmailErrorRegister("Required");
                                } else {
                                  setEmailErrorRegister("");
                                }
                              }}
                            />
                            {emailErrorRegister ? (
                              <div className="error-message">
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    position: "absolute",
                                  }}
                                >
                                  {emailErrorRegister}
                                </span>
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-12 mt-4">
                            <input
                              required=""
                              type={passwordVisible ? "text" : "password"}
                              name="password"
                              placeholder={t("Password")}
                              value={passwordRegister}
                              onChange={(e) => {
                                setPasswordConfirmError("");
                                const passwordValue = e.target.value;

                                setPasswordRegister(
                                  passwordValue.trimStart().trimEnd()
                                );

                                if (passwordValue.trim().length >= 8) {
                                  setPasswordErrorRegister("");
                                } else {
                                  setPasswordErrorRegister(
                                    "Password must be at least 8 characters"
                                  );
                                }
                              }}
                              aria-describedby="password"
                            />
                            <FontAwesomeIcon
                              icon={passwordVisible ? faEyeSlash : faEye}
                              className="icon-class" // You can add a custom class for styling
                              onClick={togglePasswordVisibilityRegister}
                              style={{
                                position: "absolute",

                                cursor: "pointer",
                                marginTop: "13px",
                                width: "17px",
                                marginLeft: "-29px",
                              }}
                            />{" "}
                            {passwordErrorRegister ? (
                              <div className="error-message">
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    position: "absolute",
                                  }}
                                >
                                  {passwordErrorRegister}
                                </span>
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-12 mt-4">
                            <input
                              required=""
                              type={
                                passwordVisibleConfirmPassword
                                  ? "text"
                                  : "password"
                              }
                              name="password"
                              placeholder={t("Password Confirm")}
                              value={passwordConfirm}
                              onChange={(e) => {
                                const passwordValue = e.target.value;
                                setPasswordConfirm(
                                  passwordValue.trimStart().trimEnd()
                                );
                                if (passwordValue.trim()) {
                                  setPasswordConfirmError("");
                                } else {
                                  setPasswordConfirmError("Required");
                                }
                              }}
                              aria-describedby="password"
                            />

                            <FontAwesomeIcon
                              icon={
                                passwordVisibleConfirmPassword
                                  ? faEyeSlash
                                  : faEye
                              }
                              className="icon-class" // You can add a custom class for styling
                              onClick={toggleVisibilityComfromPaassword}
                              style={{
                                position: "absolute",
                                cursor: "pointer",
                                marginTop: "13px",
                                width: "17px",
                                marginLeft: "-29px",
                              }}
                            />
                            {passwordConfirmError ? (
                              <div className="error-message">
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    position: "absolute",
                                  }}
                                >
                                  {passwordConfirmError}
                                </span>
                              </div>
                            ) : null}
                          </div>
                          &nbsp; &nbsp; &nbsp;
                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="exampleCheckbox12"
                                  checked={isChecked}
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox12"
                                >
                                  <span>
                                    {t("I agree to terms")} &amp; {t("Policy.")}
                                  </span>
                                </label>
                              </div>
                            </div>

                            <Link href="/page-privacy-policy">
                              <a>
                                <i className="fi-rs-book-alt mr-5 text-muted"></i>
                                {t("Lean more")}
                              </a>
                            </Link>
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn w-100 btn-fill-out btn-block hover-up"
                              name="login"
                              disabled={
                                !(
                                  lastName &&
                                  firstName &&
                                  isChecked &&
                                  number &&
                                  emailRegister &&
                                  passwordRegister &&
                                  passwordConfirm &&
                                  isValid
                                )
                              }
                            >
                              {t("Submit")} &amp; {t("Sign up")}
                            </button>
                          </div>
                        </form>

                        <div className="divider-text-center mt-15 mb-15">
                          <span> {t("or")}</span>
                        </div>
                        <ul className="btn-login list_none text-center mb-15">
                          {/* <li>
                            <a className="btn btn-facebook hover-up mb-lg-0 mb-sm-4">
                              {t("Login With Facebook")}
                            </a>
                          </li> */}
                          <li>
                            {/* <a className="btn btn-google hover-up mt-2">
                              {t("Login With Google")}
                            </a> */}

                            <div>
                              {/* <h2>Google Login</h2> */}
                              <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                  if (credentialResponse.credential != null) {
                                    onSuccesshandler(credentialResponse);
                                  }
                                }}
                                onError={() => {
                                  console.log("Login Failed");
                                }}
                              />
                              ;
                            </div>
                          </li>
                        </ul>
                        <div className="text-muted text-center">
                          {t("Already have an account?")}{" "}
                          <Link href="/login">{t("Sign in now")}</Link>
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
    </>
  );
}

export default Register;
