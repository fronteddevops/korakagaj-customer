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
import Link from "next/link";
import productdeteailss from '../../jsondata/producttype/producttype.json'

const ProductId = ({ product }) => {
  const { t } = useTranslation("common");
  const [data, setData] = useState([]);
  const router = useRouter();




  // set query data
  const prodcutId = router.query.productId
    ? router.query.productId
    : router.query.slug;

    
  const totalPrice = router.query.totalPrice ? router.query.totalPrice : "";
  const fabricPrice = router.query.fabricPrice ? router.query.fabricPrice : "";
  const fabricId = router.query.fabricId ? router.query.fabricId : "";
  const fabricName = router.query.fabricName ? router.query.fabricName : "";


  useEffect(()=>{
    const productdeteails=productdeteailss?.find((newdata)=>newdata.id==prodcutId.split('_')[0])
    setData(productdeteails)
  },[prodcutId])

  const getProdcut = async () => {
    // Fetch product data here and return it as props

    try {
      let id = prodcutId.split('_')[0]
      const response = await services.product.GET_PRODUCT_BY_ID(id);

      // const filteredProducts = response.data.data.rows.filter(
      //   (product) => product.id == id

      if (response) {
        // Assuming 'setData' is a state-setting function
        setData(response?.data?.data[0]);
      } else {
        // Handle the case where no products match the criteria
        // For example, set an empty array or show an error message.
        setData([]); // Set an empty array if no products match
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //get prodcut function call
    // getProdcut();
  }, [prodcutId, totalPrice, fabricPrice]);

  return (
    <>
      {data && data?.length > 0 && (
        <Layout
          parent={t("Home")}
          sub={
            <>
              <Link href="/products" as="/products">
                {t("Product")}
              </Link>
            </>
          }
          subChild={data?.productName}
        >
          <div className="container">
            <ProductDetails
              product={data}
              fabricPrice={fabricPrice}
              fabricId={fabricId}
              totalPrice={totalPrice}
              fabricName={fabricName}
            />
          </div>
        </Layout>
      )}
    </>
  );
};

export default ProductId;
