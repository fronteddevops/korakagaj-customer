import React, { useEffect, useLayoutEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import services from "../services";
import nextConfig from "../next.config";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Link from "next/link";

const propTypes = {};

const defaultProps = {};

const ReviewRetting = () => {
  const { t } = useTranslation("common");

  const Router = useRouter();

  const [orderDetailsData1, setOrderDetailsData1] = useState();
  const [reviewRating, setReviewRating] = useState();
  const [description, setdescription] = useState("");
  const [descriptionError, setdescriptionError] = useState("");

  const [Rating, setRating] = useState(0);
  const toastSuccessReviewRating = () =>
    toast.success("Review rating has been submitted successfully");
  const orderId = Router?.query?.orderID;
  const product = Router?.query?.product;

  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const orderDetials = async () => {
    try {
      const response = await services.product.GET_PRODUCT_BY_ID(product);

      setOrderDetailsData1(response?.data?.data[0]);
      setRating(response?.data?.data[0]?.averageRating);
    } catch (error) {
      console.log(error);
    }
  };

  const ReviewByUser = async () => {
    try {
      const data = {
        orderId: orderId,
        productId: product,
        review: description,
        ratings: reviewRating,
        status: true,
        orderDetailId: new URLSearchParams(window.location.search).get(
          "OrderdetailsId"
        ),
      };

      const response = await services.review.POST_REVIEW_BY_USER(data);
      if (response) {
        setReviewRating("");
        setdescription("");
        toastSuccessReviewRating();

        setTimeout(() => {
          Router.push("/myprofile/?index=2");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    orderDetials();
  }, [product, Rating]);

  const ratingChanged = (newRating) => {
    if (newRating < 1) {
      setReviewRating("");
    } else {
      setReviewRating(newRating);
    }
  };

  return (
    <Layout
      parent={t("Home")}
      sub={<Link href="/myprofile?index=2">{t("Pages")}</Link>}
      subChild={t("Review Reting")}
    >
      <div className="d-flex-inline-block justify-content-center align-item-center ">
        <div className="container m-20 p-20 w-50 ">
          <div className="container m-20 p-20">
            {/* <div className="card">
              <div className="card-header">
                <h3 className="fw-bold">
                  {" "}
                  {orderDetailsData1?.Product?.brandName}
                </h3>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-start align-item-center ">
                  <div className=" ">
                    <img
                      className="rounded"
                      crossOrigin="anonymous"
                      src={imageUrl + orderDetailsData1?.featuredImage}
                      alt="Image"
                      height="50%"
                      width="502%"
                    />
                  </div>

                  <div className="ms-3">
                    <h5 className="card-title">
                      {orderDetailsData1?.productName}
                    </h5>
                    <p className="card-text">
                      {orderDetailsData1?.description}
                    </p>
                  
                    <span className="fw-bold">
                      {t("Price :")} {orderDetailsData1?.finalAmount}
                    </span>

                    <div className="d-flex ">
                      <span className="fw-bold">{t("Rating Review")}:</span>{" "}
                      &nbsp;
                      <span className="fw-bold">
                        <ReactStars
                          value={Rating}
                          count={5}
                          size={20}
                          activeColor="#ffd700"
                          isHalf={true}
                          edit={false}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h3 className="fw-bold">
                  {orderDetailsData1?.Product?.brandName}
                </h3>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-start align-items-center">
                  <div className="me-3">
                    <img
                      className="rounded"
                      crossOrigin="anonymous"
                      src={imageUrl + orderDetailsData1?.featuredImage}
                      alt="Product Image"
                      height="150"
                      width="150"
                    />
                  </div>
                  <div>
                    <h5 className="card-title">
                      {orderDetailsData1?.productName}
                    </h5>
                    <p className="card-text">
                      {orderDetailsData1?.description}
                    </p>
                    <p className="fw-bold">
                      {t("Price:")} {orderDetailsData1?.finalAmount}
                    </p>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-2">
                        {t("Rating & Review")}:{" "}
                      </span>
                      <ReactStars
                        value={Rating}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        edit={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contanier d-flex-inline-block justify-content-center align-item-center  p-20">
              <div className="">
                <h4>{t("Rating star")}</h4>
                <div className="mt-10 p-10">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={37}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <div className="mt-10">
                <h4>{t("Add a written review")}</h4>

                <textarea
                  className="form-control mt-10"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value.trim());
                    if (e.target.value.trim()) {
                      setdescription(e.target.value);
                    }
                    if (e.target.value.length === 0) {
                      setdescriptionError("Required");
                    } else {
                      setdescriptionError("");
                    }
                  }}
                  placeholder={t(
                    "What did you like or dislike? What did you use this product for"
                  )}
                  id="exampleFormControlTextarea1"
                  style={{ height: "100px" }} // Adjust the height as needed
                  rows="5"
                  cols="10"
                ></textarea>
                {descriptionError && (
                  <span
                    className="text-danger"
                    style={{ position: "absolute" }}
                  >
                    {descriptionError}
                  </span>
                )}
                <div className="mt-10">
                  {" "}
                  <button
                    className="btn btn-primary float-end"
                    disabled={!(reviewRating && description)}
                    onClick={ReviewByUser}
                  >
                    {t("Submit Review")}
                  </button>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

ReviewRetting.propTypes = propTypes;
ReviewRetting.defaultProps = defaultProps;
// #endregion

export default ReviewRetting;
