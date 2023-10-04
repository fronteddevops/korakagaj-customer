import React from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from "../../components/layout/Layout";
import { server } from "../../config/index";
import { findProductIndex } from "../../util/util";
import services from "../../services";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

const ProductId = ({ product }) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const id = router.query.slug;

  const getProdcut = async () => {
    // Fetch product data here and return it as props
    try {
        const response = await services.product.GET_PRODUCT();

    const filteredProducts = response.data.data.rows.filter(
      (product) => product.id == id
    );

    if (filteredProducts.length > 0) {
      // Assuming 'setData' is a state-setting function
      setData(filteredProducts);
      console.log("Filtered Products:", filteredProducts);
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
    getProdcut();
  },[]);

  return (
    <>
      {data.length>0 && (
        <Layout parent="Home" sub="Shop" subChild={product?.productName}>
          <div className="container">
            <ProductDetails product={data[0]} />
          </div>
        </Layout>
      )}
    </>
  );
};

export default ProductId;
