import { useTranslation } from "react-i18next";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import services from "../services";
function Contact() {
  const { t } = useTranslation("common");
  const [Data, setData] = useState("");
  const [Status, setStatus] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [Number, setNumber] = useState("");
  const [NumberError, setNumberError] = useState("");
  const [Subject, setSubject] = useState("");
  const [SubjectError, setSubjectError] = useState("");
  const [Message, setMessage] = useState("");
  const [MessageError, setMessageError] = useState("");
  let [CMSEMPTY, setCMSEMPTY] = useState("");
  useEffect(() => {
    GET_CMS();
  }, []);
  const GET_CMS = async () => {
    try {
      const response = await services.CMS.GET_CMS();
      let add = response?.data?.data?.rows[1].html.replace(/&lt;/g, "<");
      setData(add);
      CMSEMPTY = add.replace(/<p[^>]*><\/p>/g, "");
      setStatus(response?.data?.data?.rows[1]?.status);
      setCMSEMPTY(CMSEMPTY);
    } catch (e) {
      console.error(e);
    }
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (Email === "") {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else if (!validateEmail(Email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (FirstName == "") {
      setFirstNameError("Please enter a first name");
      isValid = false;
    }
    if (Subject == "") {
      setSubjectError("Please enter a Subject");
      isValid = false;
    }
    if (Message == "") {
      setMessageError("Please enter a message");
      isValid = false;
    }
    if (Number == "") {
      setNumberError("Please enter a Phone Number");
      isValid = false;
    }
    if (Number.length < 10) {
      setNumberError("Please enter a vaild Phone Number");
      isValid = false;
    }

    if (isValid) {
      const Data = {
        name: FirstName,
        email: Email,
        phoneNumber: Number,
        message: Message,
        subject: Subject,
      };
      try {
        const response = await services.CMS.Contact(Data);
        if (response) {
          ClearAllInput();
          toast.success("Drop Message Successfully");
        }
      } catch (e) {
        console.error(e);
        toast.error("An error occurred");
      }
    }
  };
  const ClearAllInput = () => {
    setFirstName("");
    setFirstNameError("");
    setEmail("");
    setEmailError("");
    setNumber("");
    setNumberError("");
    setSubject("");
    setSubjectError("");
    setMessage("");
    setMessageError("");
  };
  const handlePaste = (e) => {
    let isValid = true;
    const pastedText = e.clipboardData.getData("Text");
    if (pastedText.length > 10) {
      const isValidNumber = /^\d{10}$/;

      if (!isValidNumber.test(pastedText)) {
        e.preventDefault();
        setNumberError("Number should be  10  digits.");
        isValid = false;
      }
    }
  };
  const handleInputChange = (e) => {
    const enteredNumber = e.target.value;
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
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  return (
    <>
      <Layout parent={t("Home")} sub={t("Pages")} subChild={t("Contact")}>
        {/* <section className="hero-2 bg-green">
          <div className="hero-content">
            <div className="container">
              <div className="text-center">
                <h4 className="text-brand mb-20">{t("Get in touch")}</h4>
                <h1 className="mb-20 wow fadeIn animated font-xxl fw-900">
                  {t("Let's Talk About")} <br />
                  {t("Your")} <span className="text-style-1">{t("Idea")}</span>
                </h1>
                <p className="w-50 m-auto mb-50 wow fadeIn animated">
                  {t(
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam eius placeat, a quidem mollitia at accusantium reprehenderit pariatur provident nam ratione incidunt magnam sequi."
                  )}
                </p>
                <p className="wow fadeIn animated">
                  <Link href="/page-about">
                    <a className="btn btn-brand btn-lg font-weight-bold text-white border-radius-5 btn-shadow-brand hover-up">
                      {t("About Us")}
                    </a>
                  </Link>
                  <a className="btn btn-outline btn-lg btn-brand-outline font-weight-bold text-brand bg-white text-hover-white ml-15 border-radius-5 btn-shadow-brand hover-up">
                    {t("Support Center")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section> */}
        {Status && CMSEMPTY.length != 1 && (
          <section style={{ margin: "50px" }}>
            <div className="container">
              <div
                className="text-center"
                dangerouslySetInnerHTML={{ __html: Data }}
              />
            </div>
          </section>
        )}

        <section className="section-border pt-50 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-6 mb-md-0">
                <h4 className="mb-15 text-brand">{t("Office address")}</h4>
                {t("A 22/23 bhagwati garden dwarka mor")}
                <br />
                {t("110059 New Delhi")}
                <br />
                {/* <abbr title="Phone">{t("Phone:")}</abbr> (123) 456-7890
                <br />
                <abbr title="Email">{t("Email:")} </abbr>
                contact@korakagaj.com
                <br /> */}
                {/* <a className="btn btn-outline btn-sm btn-brand-outline font-weight-bold text-brand bg-white text-hover-white mt-20 border-radius-5 btn-shadow-brand hover-up">
                  <i className="fi-rs-marker mr-10"></i>
                  {t("View")}
                  {t("map")}
                </a> */}
              </div>
              <div className="col-md-6 mb-6 mb-md-0">
                <h4 className="mb-15 text-brand">{t("Registered Address")}</h4>
                {t("TEX 3D INNOVATIVES PRIVATE LIMITED Gadwal Ganeshpur Basti")}
                <br />
                {t("UP India 272001")}
                <br />
                <abbr title="Phone">{t("Phone:")}</abbr> 9791028374 / 9891088434
                <br />
                <abbr title="Email">{t("Email:")} </abbr>
                abhaysharma@korakagaj.com/santosh@korakagaj.com
                <br />
                {t("Company Founders")} -{" "}
                {t("Abhay Kumar Sharma & Santosh Kumar Sharma")}
                <br />
                {/* <a className="btn btn-outline btn-sm btn-brand-outline font-weight-bold text-brand bg-white text-hover-white mt-20 border-radius-5 btn-shadow-brand hover-up">
                  <i className="fi-rs-marker mr-10"></i>
                  {t("View")}
                  {t("map")}
                </a> */}
              </div>
              {/* <div className="col-md-4">
                <h4 className="mb-15 text-brand">{t("Shop")}</h4>
                {t("205 North Michigan Avenue, Suite 810")}
                <br />
                {t("Chicago, 60601, USA")}
                <br />
                <abbr title="Phone">{t("Phone:")}</abbr> (123) 456-7890
                <br />
                <abbr title="Email">{t("Email:")} </abbr>
                contact@korakagaj.com
                <br />
                <a className="btn btn-outline btn-sm btn-brand-outline font-weight-bold text-brand bg-white text-hover-white mt-20 border-radius-5 btn-shadow-brand hover-up">
                  {" "}
                  <i className="fi-rs-marker mr-10"></i> {t("View")}
                  {t("map")}
                </a>
              </div> */}
            </div>
          </div>
        </section>
        <section className="pt-50 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 m-auto">
                <div className="contact-from-area padding-20-row-col wow FadeInUp">
                  <h3 className="mb-10 text-center">{t("contactus")}</h3>

                  <form
                    className="contact-form-style text-center"
                    id="contact-form"
                    action="#"
                    method="post"
                  >
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            name="name"
                            placeholder={t("First Name")}
                            type="text"
                            onChange={(e) => {
                              setFirstName(e.target.value.trimStart());
                              setFirstNameError("");
                            }}
                            value={FirstName}
                          />
                          {FirstNameError && (
                            <div
                              className="error-message"
                              style={{ textAlign: "left" }}
                            >
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  position: "absolute",
                                }}
                              >
                                {FirstNameError}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            name="email"
                            placeholder={t("Your Email")}
                            type="text"
                            onChange={(e) => {
                              setEmail(e.target.value.trimStart());
                              setEmailError("");
                            }}
                            value={Email}
                          />
                          {EmailError && (
                            <div
                              className="error-message"
                              style={{ textAlign: "left" }}
                            >
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  position: "absolute",
                                }}
                              >
                                {EmailError}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            // type="number"
                            required=""
                            name="phoneNumber"
                            placeholder={t("Phone Number")}
                            value={Number}
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
                                setNumberError("Number should be  10  digits.");
                              }
                            }}
                          />
                          {NumberError && (
                            <div
                              className="error-message"
                              style={{ textAlign: "left" }}
                            >
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  position: "absolute",
                                }}
                              >
                                {NumberError}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            name="subject"
                            placeholder={t("Subject")}
                            type="text"
                            onChange={(e) => {
                              setSubject(e.target.value.trimStart());
                              setSubjectError("");
                            }}
                            value={Subject}
                          />
                          {SubjectError && (
                            <div
                              className="error-message"
                              style={{ textAlign: "left" }}
                            >
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  position: "absolute",
                                }}
                              >
                                {SubjectError}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="textarea-style mb-30">
                          <textarea
                            name="message"
                            placeholder={t("Message")}
                            onChange={(e) => {
                              setMessage(e.target.value.trimStart());
                              setMessageError("");
                            }}
                            value={Message}
                          ></textarea>

                          {MessageError && (
                            <div
                              className="error-message"
                              style={{ textAlign: "left" }}
                            >
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  position: "absolute",
                                }}
                              >
                                {MessageError}
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          className="submit submit-auto-width"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {t("Send message")}
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Contact;
