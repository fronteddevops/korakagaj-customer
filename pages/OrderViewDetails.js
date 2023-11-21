import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";

import React, { useEffect, useState } from "react";

import ReactStars from "react-rating-stars-component";

import services from "../services";

import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import nextConfig from "../next.config";

function OrderViewDetails({ data }) {
  const { t } = useTranslation("common");
  const Router = useRouter()
  const [orderDetailsData, setOrderDetailsData] = useState([]);
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


        <div >
          <div >

            <div >

              {orderDetailsData?.map((itemArray, outerKey) => (


                <ul className="list-group  p-5 " >

                  {itemArray?.Order?.orderDetails?.map((item, index) => {
                   
                    return (
                      <>
                        <div key={index}>
                          <h4 className="mb-3 ">Product Details</h4>
                          <li className="list-group-item "><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Product Image :")} </b> <img
                            className='rounded'
                            crossOrigin='anonymous'
                            src={imageUrl + item?.featuredImage}
                            alt='Image'
                            height={120}
                            width={100}
                          /></li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Brand Name :")}</b> {item?.brandName}</li>
                          <li className="list-group-item">
                            <b style={{ fontSize: '15px', fontWeight: 'bold' }}>Product Name :</b>{item?.productName}</li>
                          <li className="list-group-item">  <b style={{ fontSize: '15px', fontWeight: 'bold' }} >{t("Designer Name :")}</b> {item?.designerName}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Description :</b> {item?.description}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Tracking Id :")}</b> {item?.trackingId}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Tracking Link :</b> {item?.trackingLink}</li>
                          {/* <li className="list-group-item"><b  style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Order Date :")}</b> {moment(item?.createdAt).format("DD MMM YYYY hh:mm A")
                    }</li> */}
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Tag :</b>{item?.tags}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Sku Number :")}</b> {item?.sku}</li>
                          {/* <li className="list-group-item">Fabric Name : {item?.fabric}</li> */}
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Colour :")}</b> {item?.selectedColor}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Base Price :")}</b> {item?.basePrice}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Size:</b> {item?.selectedSize}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Quantity :")}</b> {item?.selectedQuantity}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Final Amount :</b> {item?.finalAmount}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Category Name :</b> {item?.Category?.categoryName}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Sub Category Name :</b> {item?.SubCategory?.subCategoryName}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Sub Sub Category Name :</b> {item?.SubSubCategory?.subSubCategoryName}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Discount Percentage : </b>{item?.discountPercentage}%</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>{t("Total Price :")}</b> {item?.totalPrice}</li>
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Current Stock :</b> {item?.currentStock}</li>
                          {/* <li className="list-group-item">{t("Additional Information :")} {item?.additionalInformation}</li> */}
                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Product Type : </b>
                            {item?.productType == 1 ? "Hot Deals" : null}
                            {item?.productType == 0 ? "New Product" : null}
                            {item?.productType == 3 ? "UP  Coming" : null}
                            {item?.productType == 2 ? "Best Seller" : null}
                          </li>

                          <li className="list-group-item"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Length :</b> {item?.length}</li>

                          <li className="list-group-item d-flex"><b style={{ fontSize: '15px', fontWeight: 'bold' }}>Rating  : </b>&nbsp;<ReactStars
                            value={item?.averageRating}
                            count={5}
                            size={20}
                            activeColor="#ffd700"
                            isHalf={true} // Disable half ratings
                            edit={false}   // Disable user rating changes
                          /></li>
                        </div>
                      </>
                    )
                  })}
                </ul>
                // ))

              ))}





            </div>
          </div>
        </div>





      </div>
    </Layout>
  );
}

export default OrderViewDetails;
