import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Link from "next/link";
import services from "../../services";
import { useTranslation } from "react-i18next";
import nextConfig from "../../next.config";
import moment from "moment";

const Deals1 = () => {
  const { t } = useTranslation("common");
  const [data, setData] = useState([]);
  const [width, setWidth] = useState();
  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  useEffect(() => {
    const updateWidth = () => {
      width = window.innerWidth;
      setWidth(width);
    };

    window.addEventListener("resize", updateWidth);
    const fetchProducts = async () => {
      try {
        // Without access_token, get up_coming products
        const response = await services.product.UP_COMING_PRODUCT();
        if (response) {
          setData(response?.data?.data?.rows);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [width]);
  const deals1Style = {
    display: width <= 700 ? "block" : "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  };

  return (
    <>
      {data &&
        data?.map((product, index) => {
          const basePrice = product?.totalPrice || 0;
          const discountPercentage = product?.discountPercentage || 0;
          const discountAmount = (basePrice * discountPercentage) / 100;
          const totalPrice = basePrice - discountAmount;
          const endDateTime = new Date(product.upComingDate);
          return (
            <>
              <div
                className="d-flex p-2"
                style={{
                  deals1Style,

                  margin: "10px",
                }}
              >
                {endDateTime - new Date() > 0 ? (
                  <>
                    <img
                      src={imageUrl + product?.upComingImg}
                      alt="Not found"
                      crossOrigin="anonymous"
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "420px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      key={index}
                      className="deal position-relative wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0  d-flex flex-wrap "
                    >
                      <div className="deal-top">
                        <h2 className="text-brand">{t("Deal of the Day")}</h2>
                        <h5>{t("Limited quantities.")}</h5>
                      </div>
                      <div className="deal-content">
                        <h6 className="product-title">
                          <Link href="/products">
                            <a>{product.productName}</a>
                          </Link>
                        </h6>
                        <div className="product-price">
                          <span className="new-price">Rs.{totalPrice}</span>
                          <span className="old-price">
                            Rs.{product.totalPrice}
                          </span>
                        </div>
                      </div>
                      <div className="deal-bottom">
                        <p>{t("Hurry Up! Offer Ends In:")}</p>
                        {product.upComingDate && (
                          <Timer endDateTime={endDateTime} />
                        )}
                        {console.log(product)}
                        <Link
                          href={`/products/${product?.id}`}
                          as={`/products/${product?.id}`}
                        >
                          <a className="btn hover-up">
                            {t("Shop Now")}{" "}
                            <i className="fi-rs-arrow-right"></i>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          );
        })}
    </>
  );
};

export default Deals1;
