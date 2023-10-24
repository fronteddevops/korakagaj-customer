import React, { useState } from 'react'
import services from '../services'
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
export default function addaddress() {
    const route = useRouter()
    const [fullName,setFullName]=useState('')
 
    
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
    const toastSuccesscreateaddress = () => toast.success("Created Address successfully");

    const handlesave = async ()=>{
        try{
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
            }
            const response = await services.myprofile.CREATE_MY_ADDRESS(data)
            console.log(response)
            if(response)
          {
              
                console.log('Before route.push');
                route.push('/myprofile?index=4');
                console.log('After route.push');
                toastSuccesscreateaddress()

            }
        }
        catch(error){
          console.log(error)
        }
      
    }
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
                placeholder="Enter Full Name"
                onChange={(e) => {
                  setFullName(e.target.value);
                
                  {
                    setFullNameError()
                  }
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
            // placeholder="Enter Phone Number"
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
                    <div >
                    {pinCodeError && (
                      
                        <span
                          style={{
                            color: "red",
                            position: "absolute",
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
                <div >
                {stateError && (
                  
                    <span
                      style={{
                        color: "red",
                        position: "absolute",
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
                // placeholder={`Enter ${phoneNumber}`}
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
            <div >
            {cityError && (
              
                <span
                  style={{
                    color: "red",
                    position: "absolute",
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
        <div >
        {houseNoError && (
          
            <span
              style={{
                color: "red",
                position: "absolute",
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
    <div >
    {addressError && (
      
        <span
          style={{
            color: "red",
            position: "absolute",
          }}
        >
          {addressError}
        </span>
      
    )}
    </div>
</div>
            </div>
        </form>
                <a
                    href="#"
                    className="btn-small"
                    
                    
                >
                <button
                className="btn btn-fill-out mt-10"
                disabled={fullName==="" 
                   || phoneNumber==="" || pinCode==="" || state==="" || city==="" || houseNo==="" || address==="" 
                  ||fullNameError|| phoneNumberError || pinCodeError || stateError || cityError || houseNoError||addressError}
                onClick={handlesave}
                >
                save
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
