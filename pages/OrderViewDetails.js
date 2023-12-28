import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ReactStars from "react-rating-stars-component";
import services from "../services";

import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import nextConfig from "../next.config";
import Link from "next/link";

function OrderViewDetails({ data }) {
  const { t } = useTranslation("common");
  const Router = useRouter();
  const [orderDetailsData, setOrderDetailsData] = useState([]);
  const orderId = Router.query.orderId;
  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const [address, setaddress] = useState([]);
  const [OrderStatusUrl, setOrderStatusUrl] = useState("");
  const orderDetials = async (id) => {
    try {
      const response = await services.orderDetails.GET_ORDER_DETAILS_BY_ID(
        orderId
      );
      // setaddress(response?.data?.data[0].Order?.Address?.address);

      setaddress(response.data?.data[0]?.Address?.address);
      setOrderDetailsData(response?.data?.data[0]?.OrderDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    orderDetials();
    const orderStatus = new URLSearchParams(window.location.search);
    setOrderStatusUrl(orderStatus.get("orderStatus"));
  }, []);

  return (
    <Layout
      parent={t("Home")}
      sub={<Link href="/myprofile/?index=2">{t("Pages")}</Link>}
      subChild={t("View Order Details")}
    >
      {/* <div className="mt-3 ">
        <div className="card mb-3 mb-lg-0">
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0 ml-20 mr-20">{t("Billing Address")}</h5>
          </div>
          <address className="ml-40 mb-0">
            <b>Address</b>&nbsp;:&nbsp;
            <span
              style={{
                whiteSpace: "pre-wrap", // This property allows for line breaks
                wordWrap: "break-word", // This property allows for breaking words when needed
                overflowWrap: "break-word", // An alternative way to allow word breaking
                maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
              }}
            >
              
              {address?.address}
            </span>
            <br />
            <b>City</b>&nbsp;:&nbsp;
            <span
              style={{
                whiteSpace: "pre-wrap", // This property allows for line breaks
                wordWrap: "break-word", // This property allows for breaking words when needed
                overflowWrap: "break-word", // An alternative way to allow word breaking
                maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
              }}
            >
              {address?.city}
            </span>
            <br />
            <b>House No</b>&nbsp;:&nbsp;
            <span
              style={{
                whiteSpace: "pre-wrap", // This property allows for line breaks
                wordWrap: "break-word", // This property allows for breaking words when needed
                overflowWrap: "break-word", // An alternative way to allow word breaking
                maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
              }}
            >
              {address?.houseNo}
            </span>
            <br />
            <b>Phone Number</b>&nbsp;:&nbsp;
            <span
              style={{
                whiteSpace: "pre-wrap", // This property allows for line breaks
                wordWrap: "break-word", // This property allows for breaking words when needed
                overflowWrap: "break-word", // An alternative way to allow word breaking
                maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
              }}
            >
              {address?.phoneNumber}
            </span>
            <br />
            <b>Pin Code</b>&nbsp;:&nbsp;
            <span
              style={{
                whiteSpace: "pre-wrap", // This property allows for line breaks
                wordWrap: "break-word", // This property allows for breaking words when needed
                overflowWrap: "break-word", // An alternative way to allow word breaking
                maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
              }}
            >
              {address?.pinCode}
            </span>
            <br />
            <span
              style={{
                whiteSpace: "pre-wrap", // This property allows for line breaks
                wordWrap: "break-word", // This property allows for breaking words when needed
                overflowWrap: "break-word", // An alternative way to allow word breaking
                maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
              }}
            >
              <b>State</b>&nbsp;:&nbsp;
              {address?.state}
            </span>
            <br />
            <span
              style={{
                whiteSpace: "pre-wrap", // This property allows for line breaks
                wordWrap: "break-word", // This property allows for breaking words when needed
                overflowWrap: "break-word", // An alternative way to allow word breaking
                maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
              }}
            >
              {}
            </span>
          </address>
        </div>
      </div> */}

      <section className="mt-50 mb-50">
        <div className="col-lg-6"></div>
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
                      <th scope="col">{t("Product Name")}</th>
                      <th scope="col">{t("MRP")}</th>
                      <th scope="col">{t("Discount Percentage")}</th>
                      <th scope="col">{t("Final Amount")}</th>
                      <th scope="col">{t("Fabric Name")}</th>
                      {/* <th scope="col">{("Tags")}</th> */}

                      <th scope="col">{t("Order Date")}</th>
                      <th scope="col">{t("Selected Color")}</th>
                      <th scope="col">{t("Selected Size")}</th>
                      <th scope="col">{t("Selected Quantity")}</th>
                      <th scope="col">{t("Tracking Id & Link")}</th>

                      {OrderStatusUrl != "Payment Failed" && (
                        <th scope="col">{t("Add Review")}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetailsData &&
                      orderDetailsData?.length > 0 &&
                      orderDetailsData.map((product, j) => {
                        const dataOfMargin = product?.detail;
                        // const marginBefore = dataOfMargin?.totalPrice -(dataOfMargin?.basePrice * dataOfMargin?.length)
                        // const marginAfter = dataOfMargin?.finalAmount -(dataOfMargin?.basePrice * dataOfMargin?.length)
                        //  const margin = (marginBefore - marginAfter)
                        //  const discountper = (margin/dataOfMargin?.totalPrice*100)

                        const basePrice =
                          dataOfMargin?.basePrice * dataOfMargin?.length +
                          dataOfMargin?.marginAmount;
                        const percentOfmargin =
                          (100 - dataOfMargin.discountPercentage) / 100;
                        const MRP = basePrice / percentOfmargin;
                        return (
                          <>
                            <tr>
                              <td className="image product-thumbnail">
                                <img
                                  src={
                                    imageUrl + product?.detail?.featuredImage
                                  }
                                  alt=""
                                  crossOrigin="anonymous"
                                />
                              </td>

                              <td className="product-des product-name">
                                <Link
                                  href="/products/[slug]"
                                  as={`/products/${product?.productId}`}
                                >
                                  <a>
                                    <span>{product?.detail?.productName}</span>
                                  </a>
                                </Link>
                              </td>

                              <td
                                className="text-right"
                                data-title="Total Price"
                              >
                                <span>{MRP.toFixed(2)}</span>
                              </td>
                              <td
                                className="text-right"
                                data-title="Discount Percentage"
                              >
                                <span>{dataOfMargin?.discountPercentage}%</span>
                              </td>
                              <td
                                className="text-right"
                                data-title="Final Amount"
                              >
                                <span>{product?.detail?.finalAmount}</span>
                              </td>
                              <td
                                className="text-right"
                                data-title="Final Amount"
                              >
                                <span>{product?.detail?.fabric}</span>
                              </td>
                              {/* <td
                                className="text-right d-none d-sm-table-cell"
                                data-title="Product Type"
                              >
                                <span>
                                  {product?.productType == 1
                                    ? "Hot Deals"
                                    : null}
                                  {product?.productType == 0
                                    ? "New Product"
                                    : null}
                                  {product?.productType == 3
                                    ? "UP  Coming"
                                    : null}
                                  {product?.productType == 2
                                    ? "Best Seller"
                                    : null}
                                </span>
                              </td> */}

                              <td
                                className="text-right"
                                data-title="Order Date"
                              >
                                <span>
                                  {moment(product?.updatedAt).format(
                                    "DD MMM YYYY"
                                  )}
                                </span>
                              </td>

                              <td
                                className="text-right"
                                data-title="Selected Color"
                              >
                                <span
                                  className="d-inline-block rounded-circle ps-1 pe-0 m-0 mt-2"
                                  style={{
                                    border: "1px solid black",
                                    width: "22px",
                                    height: "22px",
                                    backgroundColor:
                                      product?.detail?.selectedColor,
                                  }}
                                ></span>
                              </td>
                              <td
                                className="text-right"
                                data-title="Selected Size"
                              >
                                <span>{product?.detail?.selectedSize}</span>
                              </td>
                              <td
                                className="text-right"
                                data-title="Selected Quantity"
                              >
                                <span>{product?.detail?.selectedQuantity}</span>
                              </td>
                              <td
                                className="text-right"
                                data-title="Tracking Id & Link"
                              >
                                <span>
                                  {product?.Product?.trackingId} <br />
                                  {product?.Product?.trackingLink}
                                </span>
                              </td>
                              <td
                                className="text-right"
                                data-title="Selected Quantity"
                              >
                                {OrderStatusUrl != "Payment Failed" ? (
                                  !product?.Rating ? (
                                    <span>
                                      <Link
                                        href={`/ReviewRetting?orderID=${orderId}&product=${product?.Product?.id}&OrderdetailsId=${product?.id}`}
                                      >
                                        <a>{t("Review")}</a>
                                      </Link>
                                    </span>
                                  ) : (
                                    <div>Reviewed</div>
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>

                <div className="mt-3 ">
                  <div className="card mb-3 mb-lg-0">
                    <div className="card-header d-flex justify-content-between">
                      <h5 className="mb-0 ml-20 mr-20">
                        {t("Billing Address")}
                      </h5>
                    </div>
                    <address className="ml-40 mb-0">
                      <b>{t("Addres")}</b>&nbsp;:&nbsp;
                      <span
                        style={{
                          whiteSpace: "pre-wrap", // This property allows for line breaks
                          wordWrap: "break-word", // This property allows for breaking words when needed
                          overflowWrap: "break-word", // An alternative way to allow word breaking
                          maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                        }}
                      >
                        {address?.address}
                      </span>
                      <br />
                      <b>{t("City")}</b>&nbsp;:&nbsp;
                      <span
                        style={{
                          whiteSpace: "pre-wrap", // This property allows for line breaks
                          wordWrap: "break-word", // This property allows for breaking words when needed
                          overflowWrap: "break-word", // An alternative way to allow word breaking
                          maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                        }}
                      >
                        {address?.city}
                      </span>
                      <br />
                      <b>{t("House No.")}</b>&nbsp;:&nbsp;
                      <span
                        style={{
                          whiteSpace: "pre-wrap", // This property allows for line breaks
                          wordWrap: "break-word", // This property allows for breaking words when needed
                          overflowWrap: "break-word", // An alternative way to allow word breaking
                          maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                        }}
                      >
                        {address?.houseNo}
                      </span>
                      <br />
                      <b>{t("Phone Number")}</b>&nbsp;:&nbsp;
                      <span
                        style={{
                          whiteSpace: "pre-wrap", // This property allows for line breaks
                          wordWrap: "break-word", // This property allows for breaking words when needed
                          overflowWrap: "break-word", // An alternative way to allow word breaking
                          maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                        }}
                      >
                        {address?.phoneNumber}
                      </span>
                      <br />
                      <b>{t("Pin Code")}</b>&nbsp;:&nbsp;
                      <span
                        style={{
                          whiteSpace: "pre-wrap", // This property allows for line breaks
                          wordWrap: "break-word", // This property allows for breaking words when needed
                          overflowWrap: "break-word", // An alternative way to allow word breaking
                          maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                        }}
                      >
                        {address?.pinCode}
                      </span>
                      <br />
                      <span
                        style={{
                          whiteSpace: "pre-wrap", // This property allows for line breaks
                          wordWrap: "break-word", // This property allows for breaking words when needed
                          overflowWrap: "break-word", // An alternative way to allow word breaking
                          maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                        }}
                      >
                        <b>{t("State")}</b>&nbsp;:&nbsp;
                        {address?.state}
                      </span>
                      <br />
                      <span
                        style={{
                          whiteSpace: "pre-wrap", // This property allows for line breaks
                          wordWrap: "break-word", // This property allows for breaking words when needed
                          overflowWrap: "break-word", // An alternative way to allow word breaking
                          maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                        }}
                      >
                        {}
                      </span>
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default OrderViewDetails;
