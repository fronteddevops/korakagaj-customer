import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import services from "../services";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
export default function Forgetpassword() {
  const route = useRouter();
  const { t, i18n } = useTranslation("common");
  const [newpassword, setNewPassword] = useState("");

  const [newpasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const search =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : null;


  const toastSuccessResetPassword = () =>
    toast.success("Reset Password successfully");
    const toastError = (error) => {
        toast.error(error.response?.data?.message || "An error occurred");
      };
// reset Password user
  const handleResetPassword = async (event) => {
    event.preventDefault();
    setNewPasswordError("")
    let isValid = true;
  
    setConfirmPasswordError("");
    if (newpassword !== confirmPassword) {
      // Update the passwordConfirm variable with an error message
      setIsDisabled(false)
      setConfirmPasswordError("Password does not match");
      isValid = false; // Set isValid to false
    }
    if (newpassword === "") {
      setNewPasswordError("Please enter password");
      isValid = false;
    }
    if (isValid) {
    try {
      let data1 = {
        token: search,
      };
      const query = new URLSearchParams(data1);
      let data = {
        password: newpassword,
      };
      const response = await services.auth.RESET_PASSWORD(query, data);
      if (response) {
        setIsDisabled(false)
        toastSuccessResetPassword();
        route.push("/login");
      }else {
        alert(response.data.guide);
      }
    } catch (error) {
      setIsDisabled(true)
        toastError(error);
        
      console.log(error);
    }
  }
  };

  return (
    <div>
      <Layout parent={t("Home")} sub={t("Login")}>
        <section
          className="pt-100 pb-100 bg-image"
         
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="row justify-content-around">
                  <div className="col-lg-5">
                    <div className="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h3 className="mb-30">{t("Forgot Password")}</h3>
                        </div>
                        <form
                          method="post"
                          onSubmit={handleResetPassword}
                          // onSubmit={handleLogin}
                        >
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
                                placeholder={t("Enter New password")}
                                autoComplete="off"
                                type={showPassword1 ? "text" : "password"}
                                onChange={(e) => {
                                  if (e.target.value.trim() === "") {
                                    setIsDisabled(false);

                                    setNewPasswordError(
                                      "Requierd New Password"
                                    );
                                  } else if (
                                    e.target.value.trim() === confirmPassword
                                  ) {
                                    setIsDisabled(true);
                                    setNewPasswordError("");
                                    setConfirmPasswordError("");
                                  } else {
                                    setIsDisabled(true);
                                    setNewPassword(e.target.value.trimStart().trimEnd());
                                    setNewPasswordError("");
                                  }

                                  setNewPassword(e.target.value.trimStart().trimEnd());
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
                                    icon={showPassword1 ? faEyeSlash : faEye}
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
                                  style={{ color: "red", fontSize: "12px" }}
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
                                type={showPassword2 ? "text" : "password"}
                                className="form-control square"
                                name="cpassword"
                                placeholder={t("Enter Confirm password")}
                                autoComplete="off"
                                onChange={(e) => {
                                  if (e.target.value.trim() === "") {
                                    setIsDisabled(false);

                                    setConfirmPasswordError(
                                      "Requierd Confirm Password"
                                    );
                                  } else if (
                                    e.target.value.trim() !== newpassword
                                  ) {
                                    setIsDisabled(false);

                                    setConfirmPasswordError(
                                      "Password does not match"
                                    );
                                  } else {
                                    setIsDisabled(true);
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
                                    icon={showPassword2 ? faEyeSlash : faEye}
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
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  {confirmPasswordError}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="form-group">
                            <button
                              //   type="submit"
                              className="btn btn-fill-out btn-block hover-up w-100"
                              //   name="login"
                              disabled={
                                !(
                                  isDisabled &&
                                  newpassword &&
                                  confirmPassword
                               
                                 
                                )
                              }
                              // onClick={handleResetPassword}
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
    </div>
  );
}
