
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
  //error handling
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
 
 
  //password show icon set value in state
 
  const [passwordVisibleLogin, setPasswordVisibleLogin] = useState(false);
 
  
  //email validate

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  //handle login  email

  const handleLogin = async (event) => {
    event.preventDefault();
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
      setPasswordError("Please enter password");
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

        if (response) {
       
        localStorage.setItem("user",JSON.stringify(response?.data?.user))
          toastSuccessLogin();
          //step 1 get data localstorage 
      
          //map cart function 


          // const mappedData = cartDetails.map((item) => {
          //   return {
          //     quantity: item.quantity,
          //     totalPrice: item.totalPrice,
          //     productId: item.id
          //   };
          // });

          // console.log("Mapped Data:", mappedData);


          //get cart api call
         
// navigate home page \
setTimeout(() => {
  route.push('/')
}, 1000);
         
        } else {
          alert(response.data.guide);
        }
      } catch (error) {
        toastErrorLogin(error);
      }
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
      <Layout parent="Home" sub="Login" >
        <section className="pt-100 pb-100 bg-image" style={{backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('assets/imgs/login-bg-2.jpg')"}}>
          
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
                            <a className="text-muted" href="#">
                              Forgot password?
                            </a>
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-fill-out btn-block hover-up w-100"
                              name="login"
                              disabled={!(email && password)}
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
                              className="btn btn-google hover-up"
                            >
                              Login With Google
                            </a>
                          </li>
                        </ul>
                        <div class="text-muted text-center">Already have an account? <a href="/register">Sign in now</a></div>
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

export default Login;
