import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import FeaturedTab from './../elements/FeaturedTab';
import NewArrivalTab from './../elements/NewArrivalTab';
import TrendingTab from './../elements/TrendingTab';
import Link from "next/link"
import services from "../../services";
import { useTranslation } from "react-i18next";
function FeatchTab() {
  const { t } = useTranslation("common");
    const [active, setActive] = useState("1");
    const [newProudct, setNewProduct] = useState([]);
    const [getAllprodcut, setGETallProdcut] = useState([]);
    const [newArrival, setNewArrival] = useState([]);
    const [hover,setHover]=useState("")
    const [ productType,setProdcuType]=useState('')
const [hotDeals]=useState([])
    // const data = {
    //   subSubCategory: "",
    //   categoryId: "",
    //   productType:productType,
    //   order:"",
    //   maxPrice: "10000",
    //   minPrice:"0",
    //   color: "",
    //   size: "",
    // };
    const data = {
        subSubCategoryId: "",
        categoryId:"",
        productType:productType,
        order:"",
        priceTo:"10000",
        priceFrom:"0",
        colour: "",
        size:"",
      };
      let productData = {
        newProduct: [],
        hotDeals: [],
        bestSell: []
      };
      var condition1 = productData?.newProduct?.length >0&&true
      var condition2 = productData?.hotDeals?.length > 0&&true
      
      // Use ternary operator to set productType based on conditions
     
      

    const fillterProduct = async () => {
      try {
   
        const query = new URLSearchParams(data);
           const response =await services.product.GET_FILTER_PRODUCT(query)
           if(response){
          
            setNewProduct(response?.data?.data);
            setActive("0");
           }
     
      } catch (error) {
        console.log(error);
      }
    };
  
   const getallProdcut=async()=>{
 try {
    
    
    const response =await services.product.GET_PRODUCT()
    if(response){
   
        setGETallProdcut(response?.data?.data);
    
    }

 } catch (error) {
    console.log(error)
 }
   }
  

    useEffect(() => {
     
     
       
       
      fillterProduct();
      getallProdcut()
    }, [productType]);



     getAllprodcut.forEach((product) => {
    if (product.productType === 0) {
      productData.newProduct.push(product);
                     

     } else if (product.productType === 1) {
      productData.hotDeals.push(product);
  
     } else if (product.productType === 2) {
      productData.bestSell.push(product);
   
    }
  });
  
  // Now, productData object will have products categorized into newProduct, hotDeals, and bestSell
  

    return (
        <>

            <div className="tab-header">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
        {productData &&productData?.newProduct.length>0 &&
                    <li className="nav-item" role="presentation">
                        <button className={hover === "0" ? "nav-link active" : "nav-link"} onClick={()=>{setProdcuType("0"),setHover("0")}}>
                        {t("New Product")}
                        </button>
                    </li>
}
{productData &&productData?.hotDeals.length>0 &&
                    <li className="nav-item" role="presentation">
                        <button className={hover === "1" ? "nav-link active" : "nav-link"} onClick={()=>{setProdcuType("1"),setHover("1")}}>
                        {t("Hot Deals")}
                        </button>
                    </li>
}
{productData &&productData?.bestSell.length>0 &&


                    <li className="nav-item" role="presentation">
                        <button className={hover === "2" ? "nav-link active" : "nav-link"} onClick={()=>{setProdcuType("2"),setHover("2")}}>
                        {t("Best Seller")}
                        </button>
                    </li>
}
                </ul>
                <h6>
                    <Link href="/products">
                        <a className="view-more d-none d-md-flex">
                            {t("View More")}<i className="fi-rs-angle-double-small-right"></i>
                        </a>
                    </Link>
                </h6>
            </div>

            <div className="tab-content wow fadeIn animated">
                <div className={active === "0" ? "tab-pane fade show active" : "tab-pane fade"}>
                    <div className="product-grid-4 row">
                    <FeaturedTab products={newProudct} />
                    </div>
                </div>

                <div className={active === "1" ? "tab-pane fade show active" : "tab-pane fade"}>
                    <div className="product-grid-4 row">
                    <TrendingTab products={hotDeals} />
                    </div>
                </div>
                <div className={active === "2" ? "tab-pane fade show active" : "tab-pane fade"}>
                    <div className="product-grid-4 row">
                    <NewArrivalTab products={newArrival} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default FeatchTab;
