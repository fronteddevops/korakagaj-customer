
import Layout from "../components/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import services from "../services/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter()
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledPassword, setIsDisabledpassword] = useState(true);
  const [passwordVisibleLogin, setPasswordVisibleLogin] = useState(false);
  const [showForgetPasswordComponent, setShowForgetPasswordComponent] = useState(false);
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
  const  handleLogin = async (event) => {
    
    event?.preventDefault(); // This prevents the default form submission behavior
    let isValid = true;
    setEmailError("");
    setPasswordError("");
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
          email: email,
          password: password,
          role: "Customer",
        };
        console.log(payLoad);
        const response = await services.auth.LOGIN_USER(payLoad);
        // await handleCart();
    
        if (response) {
         
          localStorage.setItem("userId", response?.data?.user.id);
          toastSuccessLogin();
          setIsDisabled(false)
          setTimeout(() => {
            route.push('/');
          }, 1000);
        } 
      
      } catch (error) {
        setIsDisabled(true)
        toastErrorLogin(error);
        
      }
    }
  };

  const handleCart = async () => {
    if (localStorage.getItem("cartDetail")) {

      const cartLocal = localStorage.getItem('cartDetail') && JSON.parse(localStorage.getItem('cartDetail'))
      let cartDetailsLocal = []
      if (cartLocal && cartLocal.cartDetails.length > 0) {
        cartDetailsLocal = cartLocal.cartDetails
      }
      const cart = await services.cart.GET_CART()
      let cartDetails = []
      if (cart.data.data[0].cartDetail) {
        cartDetails = cart.data.data[0].cartDetail.cartDetails
      }
      cartDetails = [...cartDetails, ...cartDetailsLocal]

      const key = 'id';
      const unique = [...new Map(cartDetails.map(item =>
        [item[key], item])).values()];
      let data = {
        cartDetail: { cartDetails: unique }
      }
      console.log(data)
      const updateCart = await services.cart.UPDATE_CART(data)
      console.log(updateCart)
      localStorage.removeItem('cartDetail')

    }
  };
  //set toster  login
  const toastSuccessLogin = () => toast.success("Login User successfully");
  const toastErrorLogin = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };

  const togglePasswordVisibilityLogin = () => {
    setPasswordVisibleLogin(!passwordVisibleLogin);
  };
  const toastSuccessEmailSent = () =>
    toast.success("Email Sent successfully");

  const handleForgetPassword = async () => {
    setIsDisabledpassword(true)
    setShowForgetPasswordComponent(true)
  }

  const handleForgotEmail = async (event) => {
setIsDisabledpassword(false)
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
      try{
        let data={
            email:emailForgot
          }
          console.log(data)
          const response = await services.auth.FORGOT_PASSWORD(data)
          if(response)
          {
           
            toastSuccessEmailSent()
            
           setShowForgetPasswordComponent(false)
          setIsDisabledpassword(false)
          
          }else {
            alert(response.data.guide);
          }
      }
      catch (error) {
        toastErrorForgot(error);
        setIsDisabledpassword(true
          )
        console.log(error)

      }
    }
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {showForgetPasswordComponent === false &&
        <Layout parent="Home" sub={<a href="/login">login</a>} >
          <section className="pt-100 pb-100 bg-image" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('assets/imgs/login-bg-2.jpg')" }}>

            <div className="container">
              <div className="row">
                <div className="col-lg-12 m-auto">
                  <div className="row justify-content-around">
                    <div className="col-lg-5">
                      <div className="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                        <div className="padding_eight_all bg-white">
                          <div className="heading_s1">
                            <h3 className="mb-30">
                              Login
                            </h3>
                          </div>
                          <form method="post" onSubmit={handleLogin}>
                            <div className="col-md-12 mt-4">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder="Your Email"
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
                                type={passwordVisibleLogin ? "text" : "password"}
                                name="password"
                                placeholder="Password"
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
                                    value=""
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleCheckbox1"
                                  >
                                    <span>Remember me</span>
                                  </label>
                                </div>
                              </div>
                              <span
                                onClick={handleForgetPassword}
                                style={{ cursor: 'pointer' }}
                              >
                                Forgot password?
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
                                Log in
                              </button>
                            </div>
                          </form>
                      
                          <div className="divider-text-center mt-15 mb-15">
                            <span> or</span>
                          </div>
                          <ul className="btn-login list_none text-center mb-15">
                            <li>
                              <a
                                href="#"
                                className="btn btn-facebook hover-up mb-lg-0 mb-sm-4"
                              >
                                Login With Facebook
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="btn btn-google hover-up mt-2"
                              >
                                Login With Google
                              </a>
                            </li>
                          </ul>
                          <div class="text-muted text-center"> Don't have an account ?  <a href="/register">Sign up now</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      }
      {showForgetPasswordComponent &&
        <Layout parent="Home" sub={<a href="/login">login</a>} >
          <section className="pt-100 pb-100 bg-image" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('assets/imgs/login-bg-2.jpg')" }}>

            <div className="container">
              <div className="row">
                <div className="col-lg-12 m-auto">
                  <div className="row justify-content-around">
                    <div className="col-lg-5">
                      <div className="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                        <div className="padding_eight_all bg-white">
                          <div className="heading_s1">
                            <h4 className="mb-30">
                              Enter your email to reset your password
                            </h4>
                          </div>
                          <form method="post"

                            onSubmit={handleForgotEmail}

                          >
                            <div className="col-md-12 mt-4">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder="Your Email"
                                value={emailForgot}
                                onChange={(e) => {
                                  setEmailForgot(e.target.value.trim());
                                  setIsDisabledpassword(true)
                                  if (e.target.value.trim()) {
                                    setEmailForgot(e.target.value);
                                  }
                                  if (e.target.value.length === 0) {
                                    setEmailErrorForgot("Required");
                                    setIsDisabledpassword(true)

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
                                save
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

      }
    </>
  );
}

export default Login;
