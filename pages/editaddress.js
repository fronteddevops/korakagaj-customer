import React, { useEffect, useState } from "react";
import services from "../services";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Editaddress(props) {
  const { t } = useTranslation("common");
  const route = useRouter();
  const [fullName, setFullName] = useState("");

  const id = props.id;
  console.log(id);
  const [phoneNumber, setPhoneNumber] = useState("");
  const exceptThisSymbols = ["+", "-", "*", "/", " "];
  const [fullNameError, setFullNameError] = useState("");

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [houseNoError, setHouseNoError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState();
 

  const toastSuccessprofileupdate = () =>
    toast.success("Updated Address  successfully");
  const toastError = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };
//get me address
  const handleAddressMe = async () => {
    try {
      const response = await services.myprofile.GET_MY_ADDRESS_BY_ID(id);
      setFullName(response?.data?.data[0]?.address.fullName);
      setPhoneNumber(response?.data?.data[0]?.address.phoneNumber);
      setPinCode(response?.data?.data[0]?.address.pinCode);
      setState(response?.data?.data[0]?.address.state);
      setCity(response?.data?.data[0]?.address.city);
      setHouseNo(response?.data?.data[0]?.address.houseNo);
      setAddress(response?.data?.data[0]?.address.address);
      setIsChecked(response?.data?.data[0]?.defaultAddress);
    } catch (error) {
      console.log(error);
    }
  };
//save address 
  const handlesubmitAddress = async (event) => {
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
            address,
          },
          defaultAddress: isChecked,
        };
        //   const dataString = JSON.stringify(data);
        //   console.log(dataString)
        const response = await services.myprofile.UPDATE_MY_ADDRESS_BY_ID(
          id,
          data
        );
        console.log();
        if (response) {
          setIsDisabled(false);

          toastSuccessprofileupdate();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        } else {
          alert(response?.data?.guide);
        }
      } catch (error) {
        console.log(error);
        setIsDisabled(true);
        toastError(error);
      }
    }
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
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



//pincode handel
  const handlePinCodeInputChange = (e) => {
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


  const handlePaste = (e) => {
    let isValid = true;
    const pastedText = e.clipboardData.getData("Text");
    const isValidNumber = /^\d{10}$/; // Validate 10-digit number
  
    if (!isValidNumber.test(pastedText)) {
      e.preventDefault(); // Prevent pasting invalid input
      setPhoneNumberError("Invalid phone number format");
      isValid = false;
    }
  };

  const handlePinCodePaste = (e) => {
    let isValid = true;
    const pastedText = e.clipboardData.getData("Text");
    const isValidPinCode = /^\d{6}$/; // Validate 6-digit pin code
  
    if (!isValidPinCode.test(pastedText)) {
      e.preventDefault(); // Prevent pasting invalid input
      setPinCodeError("Invalid pin code format");
      isValid = false;
    }
  };

  useEffect(() => {
    handleAddressMe();
  }, []);

  return (
    <div className=" ">
      <div
        className="tab-pane fade show active tab-pane fade"
        id="account-detail"
        role="tabpanel"
        aria-labelledby="account-detail-tab"
      >
        <div className="card">
          <div className=" d-flex justify-content-between card-header">
            <h5>{t("Edit Address")}</h5>
            <span>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isChecked}
                onChange={handleToggle}
              />
            </span>
          </div>
          <div className="card-body">
            <form method="post" onSubmit={handlesubmitAddress}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>
                    {t("Full Name")}
                    <span className="required">*</span>
                  </label>
                  <input
                    className="form-control square"
                    name="full name"
                    type="text"
                    value={fullName}
                    // placeholder="Enter Full Name"
                    placeholder={t("Enter Full Name") + fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (!e.target.value.trim()) {
                        setFullNameError("Full name is required");
                      } else {
                        setFullNameError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      const exceptThisSymbols = ["@", "#", "$"]; // Example: Add the symbols you want to restrict
                    
                      const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                      
                      if (
                        e.key === " " &&                 // If the pressed key is space
                        value.length === 0               // And there are no characters yet
                      ) {
                        e.preventDefault();              // Prevent entering space at the beginning
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
                    {fullNameError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize: "12px",
                        }}
                      >
                        {fullNameError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
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
                    placeholder={t("Enter Phone Number") + phoneNumber}
                    onChange={handleInputChange}
                    onPaste={handlePaste}
                    min="0"
                    onKeyDown={(e) => {
                      exceptThisSymbols.includes(e.key) && e.preventDefault();
                      if (
                        e.target.value.length >= 10 &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                        setPhoneNumberError("Number should be  10  digits.");
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
                <div className="form-group col-md-6">
                  <label>
                    {t("Pin Code")}
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="pincode"
                    type="number"
                    value={pinCode}
                    placeholder={t("Enter Pin Code") + pinCode}
                    onChange={handlePinCodeInputChange}
                    onPaste={handlePinCodePaste}
                    min="0"
                    onKeyDown={(e) => {
                      exceptThisSymbols.includes(e.key) && e.preventDefault();
                      if (
                        e.target.value.length >= 6 &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                        setPinCodeError("Pin Code should be  6  digits.");
                      }
                    }}
                  />
                  <div>
                    {pinCodeError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize: "12px",
                        }}
                      >
                        {pinCodeError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    {t("State")}
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="state"
                    type="text"
                    value={state}
                    placeholder={t("Enter Sate")+ state}
                    onChange={(e) => {
                      setState(e.target.value);
                      if (!e.target.value.trim()) {
                        setStateError("State is required");
                      } else {
                        setStateError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      const exceptThisSymbols = ["@", "#", "$"]; // Example: Add the symbols you want to restrict
                    
                      const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                      
                      if (
                        e.key === " " &&                 // If the pressed key is space
                        value.length === 0               // And there are no characters yet
                      ) {
                        e.preventDefault();              // Prevent entering space at the beginning
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
                    {stateError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize: "12px",
                        }}
                      >
                        {stateError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    {t("City")}
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="city"
                    type="text"
                    value={city}
                    placeholder={t("Enter City") + city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (!e.target.value.trim()) {
                        setCityError("City is required");
                      } else {
                        setCityError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      const exceptThisSymbols = ["@", "#", "$"]; // Example: Add the symbols you want to restrict
                    
                      const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                      
                      if (
                        e.key === " " &&                 // If the pressed key is space
                        value.length === 0               // And there are no characters yet
                      ) {
                        e.preventDefault();              // Prevent entering space at the beginning
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
                    {cityError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize: "12px",
                        }}
                      >
                        {cityError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    House No.
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="houseno"
                    type="text"
                    value={houseNo}
                    placeholder={`Enter HouseNo. ${houseNo}`}
                    onChange={(e) => {
                      setHouseNo(e.target.value);
                      if (!e.target.value.trim()) {
                        setHouseNoError("HouseNo is required");
                      } else {
                        setHouseNoError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      const exceptThisSymbols = ["@", "#", "$"]; // Example: Add the symbols you want to restrict
                    
                      const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                      
                      if (
                        e.key === " " &&                 // If the pressed key is space
                        value.length === 0               // And there are no characters yet
                      ) {
                        e.preventDefault();              // Prevent entering space at the beginning
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
                    {houseNoError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize: "12px",
                        }}
                      >
                        {houseNoError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-12">
                  <label>
                    Address
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="address"
                    type="address"
                    value={address}
                    placeholder={`Enter Address${address}`}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (!e.target.value.trim()) {
                        setAddressError("Address is required");
                      } else {
                        setAddressError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      const exceptThisSymbols = ["@", "#", "$"]; // Example: Add the symbols you want to restrict
                    
                      const value = e.target.value.trim(); // Trim removes leading/trailing spaces
                      
                      if (
                        e.key === " " &&                 // If the pressed key is space
                        value.length === 0               // And there are no characters yet
                      ) {
                        e.preventDefault();              // Prevent entering space at the beginning
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
                    {addressError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize: "12px",
                        }}
                      >
                        {addressError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-fill-out mt-25"
                  disabled={
                    !(isDisabled &&
                    fullName&&
                    phoneNumber&&
                    pinCode&&
                    state&&
                    city&&
                    houseNo&&
                    address)
                  }
                >
                  {t("Save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
