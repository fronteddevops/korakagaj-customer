import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";

import React, { useEffect, useState } from "react";
import {  toast } from "react-toastify";

import ReactStars from "react-rating-stars-component";
import services from "../services";

import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import nextConfig from "../next.config";
import Link from "next/link";

function OrderViewDetails({ data }) {
  const { t } = useTranslation("common");
  const Router = useRouter()
  const [orderDetailsData, setOrderDetailsData] = useState([]);
  const orderId = Router.query.orderId
  const imageUrl = nextConfig.BASE_URL_UPLOADS


  const orderDetials = async (id) => {

    try {

      const response = await services.orderDetails.GET_ORDER_DETAILS_BY_ID(orderId);

    
      setOrderDetailsData(response?.data?.data)
      // localStorage.removeItem("ProductID")
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    orderDetials()
  }, []);
 
//send revting



  //reting change function 
 


  return (
    <Layout parent={t("Home")} sub={<Link href='/myprofile/?index=2'>{t("Pages")}</Link>} subChild={t("View Order Details")}>
      <section className="mt-50 mb-50">
        <div className="container ">
          <div className="row">
            <div className="col-15 ">
              <div className="table-responsive ">
                <table
                  className={
                    orderDetailsData?.length > 0
                      ? "table shopping-summery text-center clean"
                      : "d-none"
                  }
                >
                  <thead>
                    <tr className="main-heading ">
                      <th scope="col">{t("Image")}</th>
                      <th scope="col">{("Product Name")}</th>
                      <th scope="col">{t("Brand Name")}</th>
                      <th scope="col">{t("Designer Name")}</th>
                      <th scope="col">{t("Total Price")}</th>
                      <th scope="col">{t("Discount Percentage")}</th>
                      <th scope="col">{t("Final Amount")}</th>
                      <th scope="col">{t("Product Type")}</th>
                      {/* <th scope="col">{("Tags")}</th> */}
                      <th scope="col">{t("TrackingId")}</th>
                      <th scope="col">{t("TrackingLink")}</th>
                      <th scope="col">{t("Order Date")}</th>
                      <th scope="col">{t("Selected Color")}</th>
                      <th scope="col">{t("Selected Size")}</th>
                      <th scope="col">{t("Selected Quantity")}</th>
                      <th scope="col">{t("  Add Review")}</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetailsData?.length > 0 && orderDetailsData &&
                      orderDetailsData.map((product, j) => {
                        const outerId = product?.Product?.id;
                      
                        
                        const matchingProducts = product?.Order?.orderDetails?.filter(
                          (innerProduct) => {
                            const innerID = innerProduct?.id;
                            return innerID === outerId;
                          }
                        );

                        return matchingProducts?.map((product, i) => (
                          <tr key={i}   >
                            <td className="image product-thumbnail">
                              <img
                                src={imageUrl + product?.featuredImage}
                                alt=""
                                crossOrigin="anonymous"
                              />

                            </td>

                            <td className="product-des product-name">
                              <span>
                                {product?.productName}
                              </span>
                            </td>
                            <td className="price" data-title="Price">
                              <span>{product?.brandName}</span>
                            </td>

                            <td className="text-center" data-title="Stock">
                              {product?.designerName}
                            </td>

                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.totalPrice}
                              </span>
                            </td>
                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.discountPercentage}%
                              </span>
                            </td>
                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.finalAmount}
                              </span>
                            </td>
                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.productType == 1 ? "Hot Deals" : null}
                                {product?.productType == 0 ? "New Product" : null}
                                {product?.productType == 3 ? "UP  Coming" : null}
                                {product?.productType == 2 ? "Best Seller" : null}
                              </span>

                            </td>

                            {/* <td className="text-right" data-title="Cart">
                              <span>
                                {product?.tags}
                              </span>
                            </td> */}
                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.trackingId}
                              </span>
                            </td>
                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.trackingLink}
                              </span>
                            </td>

                            <td className="text-right" data-title="Cart">
                              <span>
                                {moment(product?.createdAt).format("DD MMM YYYY")}

                              </span>
                            </td>

                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.selectedColor}

                              </span>
                            </td>
                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.selectedSize}

                              </span>
                            </td>
                            <td className="text-right" data-title="Cart">
                              <span>
                                {product?.selectedQuantity}

                              </span>
                            </td>


                              
              {/* <td>   <Link href={`/ReviewRetting?orderId=${item?.id}`}>
                                            <a> {t("Review")}</a>
                                          </Link></td> */}

   <td className="text-right" data-title="Cart">
                              <span>
                               
                              <Link href={`/ReviewRetting?orderID=${orderId}&product=${product.id}`}>
  <a>{t("Review")}</a>
</Link>

                              </span>
                            </td>



            



                          
            
 




                          </tr>
                        ));
                      })}

                    <tr>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>


    </Layout>
  );
}

export default OrderViewDetails;
