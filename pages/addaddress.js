import React, { useState } from "react";
import services from "../services";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
export default function Addaddress() {
  const route = useRouter();
  const [fullName, setFullName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const exceptThisSymbols = ["+", "-", "*", "/", " "];
  const [fullNameError, setFullNameError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

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
  const [isChecked, setIsChecked] = useState(false);

  const toastSuccesscreateaddress = () =>
    toast.success("Created Address successfully");

  const handlesave = async (event) => {
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
        address: {
          fullName,
          phoneNumber,
          pinCode,
          state,
          city,
          houseNo,
          address,
        },
        defaultAddress:isChecked
      };
      const response = await services.myprofile.CREATE_MY_ADDRESS(data);
   
      if (response) {
        setIsDisabled(true);
        toastSuccesscreateaddress();
        window.location.reload();
      }else {
        alert(response?.data?.guide);
      }
    } catch (error) {
      console.log(error);
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
            <h5>Add Address</h5>
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
            <form method="post"  onSubmit={handlesave}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>
                    Full Name
                    <span className="required">*</span>
                  </label>
                  <input
                    className="form-control square"
                    name="full name"
                    type="text"
                    value={fullName}
                    placeholder="Enter Full Name"
                    onChange={(e) => {
                      setFullName(e.target.value);

                      {
                        setFullNameError();
                      }
                      if (!e.target.value.trim()) {
                        setFullNameError("Full name is required");
                      } else {
                        setFullNameError("");
                      }
                    }}
                  />
                  <div>
                    {fullNameError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize:"12px"
                        }}
                      >
                        {fullNameError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    Phone Number
                    <span className="required">*</span>
                  </label>
                  <input
                  type="number"
                  required=""
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
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
                          fontSize:"12px"
                        }}
                      >
                        {phoneNumberError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    Pin Code
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="pincode"
                    type="number"
                    value={pinCode}
                    placeholder="Enter Pin Code"
                    onChange={(e) => {
                      setPinCode(e.target.value);
                      if (!e.target.value.trim()) {
                        setPinCodeError("Pin Code is required");
                      } else {
                        setPinCodeError("");
                      }
                    }}
                  />
                  <div>
                    {pinCodeError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize:"12px"
                        }}
                      >
                        {pinCodeError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    State
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="state"
                    type="text"
                    value={state}
                    placeholder="Enter State"
                    onChange={(e) => {
                      setState(e.target.value);
                      if (!e.target.value.trim()) {
                        setStateError("State is required");
                      } else {
                        setStateError("");
                      }
                    }}
                  />
                  <div>
                    {stateError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize:"12px"
                        }}
                      >
                        {stateError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>
                    City
                    <span className="required">*</span>
                  </label>
                  <input
                    required=""
                    className="form-control square"
                    name="city"
                    type="text"
                    value={city}
                    placeholder="Enter City"
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (!e.target.value.trim()) {
                        setCityError("City is required");
                      } else {
                        setCityError("");
                      }
                    }}
                  />
                  <div>
                    {cityError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize:"12px"
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
                    placeholder="Enter HouseNo."
                    onChange={(e) => {
                      setHouseNo(e.target.value);
                      if (!e.target.value.trim()) {
                        setHouseNoError("HouseNo is required");
                      } else {
                        setHouseNoError("");
                      }
                    }}
                  />
                  <div>
                    {houseNoError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize:"12px"
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
                    placeholder="Enter Address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (!e.target.value.trim()) {
                        setAddressError("Address is required");
                      } else {
                        setAddressError("");
                      }
                    }}
                  />
                  <div>
                    {addressError && (
                      <span
                        style={{
                          color: "red",
                          position: "absolute",
                          fontSize:"12px"
                        }}
                      >
                        {addressError}
                      </span>
                    )}
                  </div>
                  <div>
                    <button
                      className="btn btn-fill-out mt-25"
                      disabled={isDisabled||
                        fullName === "" ||
                        phoneNumber === "" ||
                        pinCode === "" ||
                        state === "" ||
                        city === "" ||
                        houseNo === "" ||
                        address === "" ||
                        fullNameError ||
                        
                        pinCodeError ||
                        stateError ||
                        cityError ||
                        houseNoError ||
                        addressError
                      }
                     
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
