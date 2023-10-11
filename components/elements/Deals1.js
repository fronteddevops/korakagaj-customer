import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Link from "next/link";   
import services from "../../services";

const Deals1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await services.product.GET_PRODUCT();
        const newProducts = response?.data?.data?.rows.filter(
          (product) => product.productType === 3
        );

        if (newProducts) {
          setData(newProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
console.log("data",data)
  return (
    <>
      {data.map((product, index) => {
        const basePrice = product?.totalPrice || 0; // Ensure basePrice is a number or set it to 0
        const discountPercentage = product?.discountPercentage || 0; // Ensure discountPercentage is a number or set it to 0
        const discountAmount = (basePrice * discountPercentage) / 100;
        const totalPrice = basePrice - discountAmount;

        return (
          <div
            key={index}
            className="deal wow fadeIn animated mb-md-4 mb-sm-4 mb-lg-0"
            style={{
              backgroundImage: "url('assets/imgs/banner/menu-banner-7.jpg')",
            }}
          >
            <div className="deal-top">
              <h2 className="text-brand">Deal of the Day</h2>
              <h5>Limited quantities.</h5>
            </div>
            <div className="deal-content">
              <h6 className="product-title">
                <Link href="/products">
                  <a>{product.productName}</a>
                </Link>
              </h6>
              <div className="product-price">
                <span className="new-price">${totalPrice}</span>
                <span className="old-price">${product.totalPrice}</span>
              </div>
            </div>
            <div className="deal-bottom">
              <p>Hurry Up! Offer Ends In:</p>

              {product.upComingDate && (
                <Timer endDateTime={product.upComingDate} />
              )}

              <Link href="/products">
                <a className="btn hover-up">
                  Shop Now <i className="fi-rs-arrow-right"></i>
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Deals1;
