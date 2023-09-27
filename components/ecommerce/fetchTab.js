import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import FeaturedTab from "./../elements/FeaturedTab";
import NewArrivalTab from "./../elements/NewArrivalTab";
import TrendingTab from "./../elements/TrendingTab";
import Link from "next/link";
import services from "../../services";

function FeatchTab() {
  const [active, setActive] = useState("1");
  const [newProudct, setNewProduct] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  const featuredProduct = async () => {
    try {
      const response = await services.product.GET_PRODUCT();

      const newProudct = response?.data?.data?.rows.filter(
        (product) => product.productType == 0
      );
      if (newProudct) {
        setNewProduct(newProudct);
        setActive("0");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const trendingProduct = async () => {
    try {
      const response = await services.product.GET_PRODUCT();

      const hotDeals = response?.data?.data?.rows.filter(
        (product) => product.productType == 1
      );
      if (hotDeals) {
        setHotDeals(hotDeals);
        setActive("1");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const newArrivalProduct = async () => {
    try {
      const response = await services.product.GET_PRODUCT();

      const NewArrival = response?.data?.data?.rows.filter(
        (product) => product.productType == 2
      );
      if (NewArrival) {
        setNewArrival(NewArrival);
        setActive("2");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    featuredProduct();
  }, []);

  return (
    <>
      <div className="tab-header">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={active === "0" ? "nav-link active" : "nav-link"}
              onClick={featuredProduct}
            >
              New Product
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={active === "1" ? "nav-link active" : "nav-link"}
              onClick={trendingProduct}
            >
              Hot Deals
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={active === "2" ? "nav-link active" : "nav-link"}
              onClick={newArrivalProduct}
            >
              Best Seller
            </button>
          </li>
        </ul>
        <h6>
          <Link href="/products/shop-grid-right">
            <a className="view-more d-none d-md-flex">
              View More<i className="fi-rs-angle-double-small-right"></i>
            </a>
          </Link>
        </h6>
      </div>

      <div className="tab-content wow fadeIn animated">
        <div
          className={
            active === "0" ? "tab-pane fade show active" : "tab-pane fade"
          }
        >
          <div className="product-grid-4 row">
            <FeaturedTab products={newProudct} />
          </div>
        </div>

        <div
          className={
            active === "1" ? "tab-pane fade show active" : "tab-pane fade"
          }
        >
          <div className="product-grid-4 row">
            <TrendingTab products={hotDeals} />
          </div>
        </div>
        <div
          className={
            active === "2" ? "tab-pane fade show active" : "tab-pane fade"
          }
        >
          <div className="product-grid-4 row">
            <NewArrivalTab products={newArrival} />
          </div>
        </div>
      </div>
    </>
  );
}
export default FeatchTab;
