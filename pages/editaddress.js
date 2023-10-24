import React, { useEffect, useState } from 'react'
import services from '../services'
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";

export default function addaddress() {
    const route = useRouter()
    const [fullName,setFullName]=useState('')
 
 const id= route?.query?.userid
 console.log(id)
    const [phoneNumber,setPhoneNumber]=useState('')
    const [fullNameError,setFullNameError]=useState('')
    
    const [phoneNumberError,setPhoneNumberError]=useState('')
    const [pinCode,setPinCode]=useState('')
    const [pinCodeError,setPinCodeError]=useState('')
    const [state,setState]=useState('')
    const [stateError,setStateError]=useState('')
    const [city,setCity]=useState('')
    const [cityError,setCityError]=useState('')
    const [houseNo,setHouseNo]=useState('')
    const [houseNoError,setHouseNoError]=useState('')
    const [address,setAddress]=useState('')
    const [addressError,setAddressError]=useState('')
   
    const toastSuccessprofileupdate = () =>
    toast.success("Updated Address  successfully");
  const toastError = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };

 
     const handleaddress = async ()=>{
        try{
            const response = await services.myprofile.GET_MY_ADDRESS_BY_ID(id)
            setFullName(response?.data?.data[0]?.address.fullName)
            setPhoneNumber(response?.data?.data[0]?.address.phoneNumber)
            setPinCode(response?.data?.data[0]?.address.pinCode)
            setState(response?.data?.data[0]?.address.state)
            setCity(response?.data?.data[0]?.address.city)
            setHouseNo(response?.data?.data[0]?.address.houseNo)
            setAddress(response?.data?.data[0]?.address.address)
            
        }
        catch(error){
        console.log(error)
        }
        
     }

     const handlesubmit = async () => {
        try {
         
          const data = {
            address:{
            fullName,
            phoneNumber,
            pinCode,
            state,
            city,
            houseNo,
            address
            }
          };
        //   const dataString = JSON.stringify(data);
        //   console.log(dataString)
          const response = await services.myprofile.UPDATE_MY_ADDRESS_BY_ID(id,data)
          console.log()
          if (response) {
            toastSuccessprofileupdate();
          } else {
          }
        } catch (error) {
          console.log(error);
          toastError(error);
        }
      };

     useEffect(()=>{
        handleaddress()
     },[])
    
  
  return (
    <div className=' '>
    

        
<div className="container ">
<div className="row">
  <div className="col-lg-12 m-auto ">
    <div className="row justify-content-around">
      <div className="col-lg-8 ">
        <div className="login_wrap widget-taber-content mt-100 p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
          <div className="padding_eight_all bg-white">
            <div className="heading_s1">
              <h3 className="mb-30">
              
              </h3>
            </div>
            <div className="card-body">
            <form
            method="post"
            name="enq"
        >
            <div className="row">
            <div className="form-group col-md-6">
            <label>
                Full
                Name
                <span className="required">
                    *
                </span>
            </label>
            <input
              
                className="form-control square"
                name="full name"
                type="text"
                value={fullName}
                // placeholder="Enter Full Name"
                placeholder={`Enter ${fullName}`}
                                      onChange={(e) => {
                                        setFullName(e.target.value);
                                        if (!e.target.value.trim()) {
                                          setFullNameError(
                                            "Full name is required"
                                          );
                                        } else {
                                            setFullNameError("");
                                        }
                                      }}
               
            />
            <div >
            {fullNameError && (
              
                <span
                  style={{
                    color: "red",
                    position: "absolute",
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
            <span className="required">
                *
            </span>
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
                      )
                    }
                    
                    else {
                        setPhoneNumberError("");
                    }
                  }}
        />
        <div >
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
                <div className="form-group col-md-6">
                    <label>
                      Pin Code
                        <span className="required">
                            *
                        </span>
                    </label>
                    <input
                        required=""
                        className="form-control square"
                        name="pincode"
                        type="number"
                        value={pinCode}
                        placeholder={`Enter ${pinCode}`}
                       onChange={(e) => {
                    setPinCode(e.target.value);
                    if (!e.target.value.trim()) {
                        setPinCodeError(
                        "Pin Code is required"
                      )
                    }
                    
                    else {
                        setPinCodeError("");
                    }
                  }}
                    />
                </div>
                <div className="form-group col-md-6">
                <label>
                  State
                    <span className="required">
                        *
                    </span>
                </label>
                <input
                    required=""
                    className="form-control square"
                    name="state"
                    type="text"
                    value={state}
                    placeholder={`Enter ${state}`}
                    onChange={(e) => {
                 setState(e.target.value);
                 if (!e.target.value.trim()) {
                     setStateError(
                     "State is required"
                   )
                 }
                 
                 else {
                    setStateError("");
                 }
               }}
                />
            </div>
            <div className="form-group col-md-6">
            <label>
              City
                <span className="required">
                    *
                </span>
            </label>
            <input
                required=""
                className="form-control square"
                name="city"
                type="text"
                value={city}
                placeholder={`Enter ${city}`}
                onChange={(e) => {
             setCity(e.target.value);
             if (!e.target.value.trim()) {
                 setCityError(
                 "City is required"
               )
             }
             
             else {
                setCityError("");
             }
           }}
            />
        </div>
        <div className="form-group col-md-6">
        <label>
           House No.
            <span className="required">
                *
            </span>
        </label>
        <input
            required=""
            className="form-control square"
            name="houseno"
            type="text"
            value={houseNo}
            placeholder={`Enter ${houseNo}`}
            onChange={(e) => {
         setHouseNo(e.target.value);
         if (!e.target.value.trim()) {
             setHouseNoError(
             "HouseNo is required"
           )
         }
         
         else {
            setHouseNoError("");
         }
       }}
        />
    </div>
    <div className="form-group col-md-12">
    <label>
        Address
        <span className="required">
            *
        </span>
    </label>
    <input
        required=""
        className="form-control square"
        name="address"
        type="address"
        value={address}
        placeholder={`Enter ${address}`}
        onChange={(e) => {
     setAddress(e.target.value);
     if (!e.target.value.trim()) {
         setAddressError(
         "Address is required"
       )
     }
     
     else {
        setAddressError("");
     }
   }}
    />
</div>
            </div>
        </form>
                <a
                    href="#"
                    className="btn-small"
                    // onClick={handlesave}
                >
                <button
                className="btn btn-fill-out "
                disabled={
                  fullNameError||
                  phoneNumberError ||
                  pinCodeError ||
                  stateError ||
                  cityError ||
                  houseNoError||
                  addressError
                }
                onClick={handlesubmit}
              >
                Save
              </button>
                  
                </a>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    </div>
  )
}
