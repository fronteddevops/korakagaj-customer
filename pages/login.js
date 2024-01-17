import Layout from "../components/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import services from "../services/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledPassword, setIsDisabledpassword] = useState(true);
  const [passwordVisibleLogin, setPasswordVisibleLogin] = useState(false);
  const [showForgetPasswordComponent, setShowForgetPasswordComponent] =
    useState(false);
  const [emailForgot, setEmailForgot] = useState("");

  const [emailErrorForgot, setEmailErrorForgot] = useState("");
  const toastErrorForgot = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };
  //email validate
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validateEmailForgot = (emailForget) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForget);
  };
  //handle login  email
  const handleLogin = async (event) => {
    console.log("handleLogin");

    event?.preventDefault();
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    // Assuming you have a state variable for rememberMe
    if (rememberMe) {
      localStorage.setItem("rememberedUsername", email);
      localStorage.setItem("rememberedPassword", password);
      localStorage.setItem("rememberMe", true);
    } else {
      // Clear saved credentials if "Remember Me" is unchecked
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberMe");
    }

    if (email === "") {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }
    if (password === "") {
      setPasswordError("Please enter the password");
      isValid = false;
    }

    if (isValid) {
      try {
        let payLoad = {
          email: email.toLowerCase(),
          password: password,
          role: "Customer",
        };

        const response = await services.auth.LOGIN_USER(payLoad);

        await handleCart();
        await previous();
        if (response) {
          localStorage.setItem("userId", response?.data?.user.id);
          toastSuccessLogin();
          setIsDisabled(false);
          setTimeout(() => {
            route.push("/");
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        setIsDisabled(true);
        toastErrorLogin(error);
      }
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("rememberedUsername");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedRememberMe) {
      setEmail(storedUsername || "");
      setPassword(storedPassword || "");
      setRememberMe(true);
    }
  }, []);

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
        // const unique = [
        //   ...new Map(cartDetails.map((item) => [item[key], item])).values(),
        // ];
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
  //set toster  login
  const toastSuccessLogin = () => toast.success("Login User successfully");
  const toastSuccess = () => toast.success("Login Successfully");
  const toastErrorLogin = (error) => {
    toast.error(error?.response?.data?.message || "An error occurred");
  };

  const togglePasswordVisibilityLogin = () => {
    setPasswordVisibleLogin(!passwordVisibleLogin);
  };
  const toastSuccessEmailSent = () => toast.success("Email Sent successfully");

  const handleForgetPassword = async () => {
    setIsDisabledpassword(true);
    setShowForgetPasswordComponent(true);
  };
  //handle Forgot email
  const handleForgotEmail = async (event) => {
    setIsDisabledpassword(false);
    event.preventDefault();
    let isValidForget = true;
    setEmailErrorForgot("");

    if (emailForgot === "") {
      setEmailErrorForgot("Enter a valid email address");
      isValidForget = false;
    } else if (!validateEmailForgot(emailForgot)) {
      setEmailErrorForgot("Enter a valid email address");
      isValidForget = false;
    }

    if (isValidForget) {
      try {
        let data = {
          email: emailForgot.toLowerCase(),
        };
        const response = await services.auth.FORGOT_PASSWORD(data);
        if (response) {
          toastSuccessEmailSent();

          setShowForgetPasswordComponent(false);
          setIsDisabledpassword(false);
        } else {
          alert(response.data.guide);
        }
      } catch (error) {
        toastErrorForgot(error);
        setIsDisabledpassword(true);
        console.log(error);
      }
    }
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
        localStorage.setItem("userId", response?.data?.user.id);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        if (response?.data?.tokens?.access?.token) {
          localStorage.setItem(
            "access_token",
            response.data.tokens.access.token
          );
        }
        toastSuccess();
        setIsDisabled(false);
        await handleCart();
        await previous();
        setTimeout(() => {
          route.push("/");
        }, 1000);
      } else {
        alert(response.data.guide);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const previous = async () => {
    try {
      const cart = await services.cart.GET_CART();
      localStorage.setItem(
        "cartItemsCount",
        cart?.data?.data?.cartDetail?.cartDetails?.length
      );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      {showForgetPasswordComponent === false && (
        <Layout
          parent={t("Home")}
          sub={
            <Link href="/login" as="/login">
              {t("Sign In")}
            </Link>
          }
        >
          <section className="pt-100 pb-100 bg-image">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 m-auto">
                  <div className="row justify-content-around">
                    <div className="col-lg-5">
                      <div className="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                        <div className="padding_eight_all bg-white">
                          <div className="heading_s1">
                            <h3 className="mb-30">{t("Sign In")}</h3>
                          </div>
                          <form method="post" onSubmit={handleLogin}>
                            <div className="col-md-12 mt-4">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder={t("Your Email")}
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value.trim()); // Trim whitespace before setting
                                  if (e.target.value.trim()) {
                                    setEmail(e.target.value);
                                  }
                                  if (e.target.value.length === 0) {
                                    setEmailError("Required");
                                  } else {
                                    setEmailError("");
                                  }
                                }}
                                onKeyDown={(e) => {
                                  e.key === "Enter"
                                    ? handleLogin()
                                    : setEmail(e.target.value);
                                }}
                              />
                              {emailError ? (
                                <div className="error-message">
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      position: "absolute",
                                    }}
                                  >
                                    {emailError}
                                  </span>
                                </div>
                              ) : null}
                            </div>
                            <div className="col-md-12 mt-4">
                              <input
                                required=""
                                type={
                                  passwordVisibleLogin ? "text" : "password"
                                }
                                name="password"
                                placeholder={t("Password")}
                                onChange={(e) => {
                                  setPassword(e.target.value.trim());
                                  if (e.target.value.trim()) {
                                    setPassword(e.target.value);
                                  }
                                  if (e.target.value.length === 0) {
                                    setPasswordError("Required");
                                  } else {
                                    setPasswordError("");
                                  }
                                }}
                                value={password}
                                onKeyDown={(e) => {
                                  e.key === "Enter"
                                    ? handleLogin()
                                    : setPassword(e.target.value);
                                  if (e.target.value) {
                                    setPasswordError("");
                                  }
                                }}
                                aria-describedby="password"
                              />
                              <FontAwesomeIcon
                                icon={passwordVisibleLogin ? faEyeSlash : faEye}
                                className="icon-class" // You can add a custom class for styling
                                onClick={togglePasswordVisibilityLogin}
                                style={{
                                  position: "absolute",

                                  cursor: "pointer",
                                  marginTop: "13px",
                                  width: "17px",
                                  marginLeft: "-29px",
                                }}
                              />

                              {passwordError ? (
                                <div className="error-message">
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      position: "absolute",
                                    }}
                                  >
                                    {passwordError}
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
                                    id="exampleCheckbox1"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleCheckbox1"

                                    // onClick={rememberMe1}
                                  >
                                    <span>{t("Remember me")}</span>
                                  </label>
                                </div>
                              </div>

                              <span
                                onClick={handleForgetPassword}
                                style={{ cursor: "pointer" }}
                              >
                                {t("Forgot password?")}
                              </span>
                            </div>
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-fill-out btn-block hover-up w-100"
                                name="login"
                                disabled={!(email && password && isDisabled)}
                                // onClick={handleLogin}
                              >
                                {t("Sign In")}
                              </button>
                            </div>
                          </form>

                          <div className="divider-text-center mt-15 mb-15">
                            <span> {t("or")}</span>
                          </div>
                          <ul className="btn-login list_none text-center mb-15">
                            {/* <li>
                              <a
                                className="btn btn-facebook hover-up mb-lg-0 mb-sm-4"
                              >
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
                                    console.error("Login Failed");
                                  }}
                                />
                                ;
                              </div>
                            </li>
                          </ul>
                          <div className="text-muted text-center">
                            {" "}
                            {t("Don't have an account ?")}{" "}
                            <Link href="/register" as="/register">
                              {t("Sign up now")}
                            </Link>
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
      )}
      {showForgetPasswordComponent && (
        <Layout
          parent={t("Home")}
          sub={
            <Link href="/login" as="/login">
              {t("Sign In")}
            </Link>
          }
        >
          <section className="pt-100 pb-100 bg-image">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 m-auto">
                  <div className="row justify-content-around">
                    <div className="col-lg-5">
                      <div className="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                        <div className="padding_eight_all bg-white">
                          <div className="heading_s1">
                            <h4 className="mb-30">
                              {t("Enter your email to reset your password")}
                            </h4>
                          </div>
                          <form method="post" onSubmit={handleForgotEmail}>
                            <div className="col-md-12 mt-4">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder={t("Your Email")}
                                value={emailForgot}
                                onChange={(e) => {
                                  setEmailForgot(e.target.value.trim());
                                  setIsDisabledpassword(true);
                                  if (e.target.value.trim()) {
                                    setEmailForgot(e.target.value);
                                  }
                                  if (e.target.value.length === 0) {
                                    setEmailErrorForgot("Required");
                                    setIsDisabledpassword(true);
                                  } else {
                                    setEmailErrorForgot("");
                                  }
                                }}
                                onKeyDown={(e) => {
                                  e.key === "Enter"
                                    ? handleForgotEmail()
                                    : setEmailForgot(e.target.value);
                                }}
                              />
                              {emailErrorForgot ? (
                                <div className="error-message">
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      position: "absolute",
                                    }}
                                  >
                                    {emailErrorForgot}
                                  </span>
                                </div>
                              ) : null}
                            </div>
                            &nbsp; &nbsp; &nbsp;
                            <div className="form-group">
                              <button
                                // type="submit"
                                className="btn btn-fill-out btn-block hover-up w-100"
                                disabled={!(isDisabledPassword && emailForgot)}

                                // onClick={handleLogin}
                              >
                                {t("Save")}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
}

export default Login;
