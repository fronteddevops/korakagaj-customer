import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import services from "../services";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

function OrderViewDetails({ data }) {
const Router=useRouter()
  const [orderDetailsData, setOrderDetailsData] = useState();
 const ProductId=Router.query.orderId

  const orderDetials = async (id) => {
  
    try {

      const response = await services.orderDetails.GET_ORDER_DETAILS_BY_ID(ProductId);
      setOrderDetailsData(response?.data?.data)
      // localStorage.removeItem("ProductID")
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    orderDetials()
  }, []);



  return (
    <Layout parent="Home" sub="Pages" subChild="View Order Details">
      <div className="container">


        <div className="container mt-5">
          <h1 className="text-center">Order Details</h1>
          <div className="card">

            <div className="card-body">

              {orderDetailsData?.map((item, key) => {
                const color= JSON.parse(item?.Product?.colour)
                return (
                  <ul className="list-group" key={key}>
                    <li className="list-group-item">Brand Name : {item?.Product?.brandName}</li>
                    <li className="list-group-item">Product Name : {item?.Product?.productName}</li>
                    <li className="list-group-item">Designer Name : {item?.Product?.designerName}</li>
                    <li className="list-group-item">Description : {item?.Product?.description}</li>
                    <li className="list-group-item">Tracking Id : {item?.Product?.trackingId}</li>
                    <li className="list-group-item">Tracking Link : {item?.trackingLink}</li>
                    <li className="list-group-item">Order Date : {moment(item?.createdAt).format("MMM DD, YYYY hh:mm A")
                    }</li>
                    <li className="list-group-item">Tag :{item?.Product?.tags}</li>
                    <li className="list-group-item">Sku Number : {item?.Product?.sku}</li>
                    <li className="list-group-item">Fabric Name : {item?.Product?.fabric}</li>
                    <li className="list-group-item">Colour : {color}</li>
                    <li className="list-group-item">Quantity : {item?.Product?.quantity}</li>
                    <li className="list-group-item">Price : {item?.amount}</li>
                    <li className="list-group-item">Total Price : {item?.Product?.totalPrice}</li>
                    <li className="list-group-item">Current Stock : {item?.Product?.currentStock}</li>
                    <li className="list-group-item">Additional Information : {item?.Product?.additionalInformation}</li>

                    <li className="list-group-item">Total Items : {item?.Order?.totalItems
                    }</li>
                    <li className="list-group-item">Total Quantity : {item?.Order?.totalQuantity
                    }</li>
                  </ul>
                )
              })}


            </div>
          </div>
        </div>





      </div>
    </Layout>
  );
}

export default OrderViewDetails;
