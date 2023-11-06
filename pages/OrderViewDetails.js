import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import ReactStars from "react-rating-stars-component";

import services from "../services";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import nextConfig from "../next.config";

function OrderViewDetails({ data }) {
  const { t } = useTranslation("common");
  const Router = useRouter()
  const [orderDetailsData, setOrderDetailsData] = useState();
  const ProductId = Router.query.orderId
  const imageUrl = nextConfig.BASE_URL_UPLOADS

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
                  // <div className="card border border-dark">
                  //   <div className="card-header" key={key}>
                  //     <h3 className='fw-bold'> {item?.Product?.brandName}</h3>


                  //   </div>
                  //   <div className="card-body">

                  //     <div className='d-flex justify-content-start align-item-center '>

                  //       <div className=' '>  <img
                  //         className='rounded'
                  //         crossOrigin='anonymous'
                  //         src={imageUrl + item?.Product?.image[0]}
                  //         alt='Image'
                  //         height={120}
                  //         width={100}
                  //       />
                  //       </div>

                  //       <div className='ms-3'>
                  //         <h5 className="card-title">{item?.Product?.productName}</h5>
                  //         <p className="card-text">{item?.Product?.description}</p>
                  //         <span className='fw-bold'>{t("Total Quantity :")} {item?.totalQuantity}</span>&nbsp;  &nbsp; &nbsp;
                  //         <span className='fw-bold'>{t("Price :")} {item?.Product?.totalPrice}</span>
                  //         <div className="d-flex ">
                  //         <span className='fw-bold'>
                  //           Rating Review  : 
                  //          </span> &nbsp;
                  //         <span className='fw-bold'>
                  //           <ReactStars
                  //             value={item?.Product?.averageRating}
                  //             count={5}
                  //             size={20}
                  //             activeColor="#ffd700"
                  //             isHalf={true} // Disable half ratings
                  //             edit={false}   // Disable user rating changes
                  //           /></span>
                  //         </div>
                         
                  //       </div>

                  //     </div>

                  //   </div>
                  // </div>
                  <ul className="list-group border border-black p-5 " key={key}>
                    <h4 className="mb-3 ">Product Details</h4>
                     <li className="list-group-item">{t("Brand Name :")}  <img
                          className='rounded'
                          crossOrigin='anonymous'
                          src={imageUrl + item?.Product?.image[0]}
                          alt='Image'
                          height={120}
                          width={100}
                        /></li>
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
                       <li className="list-group-item d-flex">Rating  : &nbsp;<ReactStars
                  value={item?.Product?.averageRating}
                  count={5}
                  size={20}
                  activeColor="#ffd700"
                  isHalf={true} // Disable half ratings
                  edit={false}   // Disable user rating changes
                /></li>
                      <li className="list-group-item">Review : {item?.Order?.User?.Ratings[0]?.review
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
