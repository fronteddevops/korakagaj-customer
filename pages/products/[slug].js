import React from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from "../../components/layout/Layout";
import { server } from "../../config/index";
import { findProductIndex } from "../../util/util";
import services from "../../services";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";

const ProductId = ({ product }) => {
  const { t} = useTranslation("common");
  const [data, setData] = useState([]);
  const router = useRouter();
  
// set query data 
  const prodcutId = router.query.productId ? router.query.productId : router.query.slug;
  const newFabricPrice = router.query.fabricPrice ? router.query.fabricPrice : ""

  const getProdcut = async () => {
    // Fetch product data here and return it as props
    try {
      const response = await services.product.GET_PRODUCT_BY_ID(prodcutId);
    

      // const filteredProducts = response.data.data.rows.filter(
      //   (product) => product.id == id


      if (response) {
        // Assuming 'setData' is a state-setting function
        setData(response?.data?.data[0]);
      } else {
        // Handle the case where no products match the criteria
        // For example, set an empty array or show an error message.
        setData([]); // Set an empty array if no products match
        console.log("No products match the criteria.");
      }
    } catch (error) {
      console.log(error)
    }

  };
  useEffect(() => {
    //get prodcut function call
    getProdcut();
  }, [prodcutId, newFabricPrice]);

  return (
    <>
      {data && data?.length > 0 && (
        <Layout parent={t("Home")} sub={<><a href="/products"> {t("Product")}</a></>} subChild={data?.productName}>
          <div className="container">
            <ProductDetails product={data} fabricPrice={newFabricPrice} />
          </div>
        </Layout>
      )}
    </>
  );
};

export default ProductId;
