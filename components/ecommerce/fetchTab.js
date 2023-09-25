
import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import FeaturedTab from './../elements/FeaturedTab';
import NewArrivalTab from './../elements/NewArrivalTab';
import TrendingTab from './../elements/TrendingTab';
import Link from "next/link"
import services from "../../services";


function FeatchTab() {
    const [active, setActive] = useState("1");
    const [featured, setFeatured] = useState([]);
    const [trending, setTrending] = useState([]);
    const [newArrival, setNewArrival] = useState([]);


    const featuredProduct = async () => {
        const response =  await fetch(`${server}/static/product.json`);
        const allProducts =  await response.json()
        
         const featuedItem = allProducts.filter((item) => item.featured);
         setFeatured(featuedItem);
         setActive("1");

        try {
            const response =   await services.product.GET_PRODUCT()
          
       
             console.log("-------------------------------------",response?.data);
         
           } catch (error) {
             console.log(error);
           }

    };

    const trendingProduct = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
        const trendingItem = allProducts.filter((item) => item.trending);
        setTrending(trendingItem);
        setActive("2");
    };
    const newArrivalProduct = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
        const newArrivalItem = allProducts.sort(function (a, b) {
            return a.created > b.created ? -1 : 1;
        });
        setNewArrival(newArrivalItem);
        setActive("3");
    };

    useEffect(() => {
        featuredProduct();
    }, []);

    return (
        <>
            <div className="tab-header">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={active === "0" ? "nav-link active" : "nav-link"} onClick={featuredProduct}>
                            New Product 
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={active === "1" ? "nav-link active" : "nav-link"} onClick={trendingProduct}>
                           Hot Deals
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={active === "2" ? "nav-link active" : "nav-link"} onClick={newArrivalProduct}>
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
                <div className={active === "1" ? "tab-pane fade show active" : "tab-pane fade"}>
                    <div className="product-grid-4 row">
                        <FeaturedTab products={featured} />
                    </div>
                </div>

                <div className={active === "2" ? "tab-pane fade show active" : "tab-pane fade"}>
                    <div className="product-grid-4 row">
                        <TrendingTab products={trending} />
                    </div>
                </div>
                <div className={active === "3" ? "tab-pane fade show active" : "tab-pane fade"}>
                    <div className="product-grid-4 row">
                        <NewArrivalTab products={newArrival} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default FeatchTab;
