import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";

import React, { useEffect, useState } from "react";

import services from "../services";

import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function OrderViewDetails({ data }) {
  const { t } = useTranslation("common");
const Router=useRouter()
  const [orderDetailsData, setOrderDetailsData] = useState();
 const ProductId=Router.query.orderId
//order details function
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
    <Layout parent={t("Home")} sub={t("Pages")} subChild={t("View Order Details")}>
      <div className="container">


        <div className="container mt-5">
          <h1 className="text-center">{t("Order Details")}</h1>
          <div className="card">

            <div className="card-body">

              {orderDetailsData?.map((item, key) => {
               let color = "";

               if (item?.Product?.colour && item?.Product?.colour.length > 0) {
                 try {
                   const colorArray = JSON.parse(item.Product.colour);
                   if (Array.isArray(colorArray)) {
                     color = colorArray.join(', ');
                   }
                 } catch (error) {
                   // Handle the JSON parsing error here, or you can ignore it
                 }
               }
           
                return (
                  <ul className="list-group" key={key}>
                    <li className="list-group-item">{t("Brand Name :")} {item?.Product?.brandName}</li>
                    <li className="list-group-item">Product Name : {item?.Product?.productName}</li>
                    <li className="list-group-item">{t("Designer Name :")} {item?.Product?.designerName}</li>
                    <li className="list-group-item">Description : {item?.Product?.description}</li>
                    <li className="list-group-item">{t("Tracking Id :")} {item?.Product?.trackingId}</li>
                    <li className="list-group-item">Tracking Link : {item?.trackingLink}</li>
                    <li className="list-group-item">{t("Order Date :")} {moment(item?.createdAt).format("MMM DD, YYYY hh:mm A")
                    }</li>
                    <li className="list-group-item">Tag :{item?.Product?.tags}</li>
                    <li className="list-group-item">{t("Sku Number :")} {item?.Product?.sku}</li>
                    <li className="list-group-item">Fabric Name : {item?.Product?.fabric}</li>
                    <li className="list-group-item">{t("Colour :")} {color}</li>
                    <li className="list-group-item">{t("Quantity :")} {item?.Product?.quantity}</li>
                    <li className="list-group-item">Price : {item?.amount}</li>
                    <li className="list-group-item">{t("Total Price :")} {item?.Product?.totalPrice}</li>
                    <li className="list-group-item">Current Stock : {item?.Product?.currentStock}</li>
                    <li className="list-group-item">{t("Additional Information :")} {item?.Product?.additionalInformation}</li>

                    <li className="list-group-item">Total Items : {item?.Order?.totalItems
                    }</li>
                    <li className="list-group-item">{t("Total Quantity :")} {item?.Order?.totalQuantity
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
