import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import BrandFilter from "../../components/ecommerce/BrandFilter";
import CategoryProduct from "../../components/ecommerce/CategoryProduct";
import Pagination from "../../components/ecommerce/Pagination";
import PriceRangeSlider from "../../components/ecommerce/PriceRangeSlider";
import QuickView from "../../components/ecommerce/QuickView";
import ShowSelect from "../../components/ecommerce/ShowSelect";
import SingleProduct from "../../components/ecommerce/SingleProduct";
import SizeFilter from "../../components/ecommerce/SizeFilter";
import SortSelect from "../../components/ecommerce/SortSelect";
import WishlistModal from "../../components/ecommerce/WishlistModal";
import Layout from "../../components/layout/Layout";
import { fetchProduct } from "../../redux/action/product";
import Link from "next/link";
import Accordion from 'react-bootstrap/Accordion';

import SingleFabric from "../../components/ecommerce/SingleFabric";

const Fabrics = ({ products, productFilters, fetchProduct }) => {
var data = [
    {
        "title": "Cotton Fabric",
        "id": "1",
        "price": 238.85, "image": "/assets/imgs/fabric.jpg",
    }, {
        "title": "Linen Fabric",
        "id": "1",
        "price": 238.85, "image": "/assets/imgs/fabric.jpg",
    }, {
        "title": "Synthetic Fabric",
        "id": "1",
        "price": 238.85, "image": "/assets/imgs/fabric.jpg",
    }, {
        "title": "Pure Cotton Fabric",
        "id": "1",
        "price": 238.85, "image": "/assets/imgs/fabric.jpg",
    },
]

    const Router = useRouter()
       

    const [pagination, setPagination] = useState([]);
    const [limit, setLimit] = useState();
    const [pages, setPages] = useState(Math.ceil(data.length / limit));
    const [currentPage, setCurrentPage] = useState(1);
    const [fabricList, setFabricList] = useState([]);
    let [isFilterVisible, setIsFilterVisible] = useState(false);

    useEffect(() => {
        setFabricList(data)  
    }, []);








    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Select Fabric">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                        <div className="shop-product-fillter d-lg-none d-block">
                                    <div className="totall-product">
                                        <p>
                                            We found
                                            <strong className="text-brand">
                                                {data.length}
                                            </strong>
                                            items for you!
                                        </p>
                                    </div>
                                    <div className="sort-by-product-area justify-content-between align-items-center">
                                    <span className="text-brand fw-bold" onClick={()=>setIsFilterVisible(!isFilterVisible)}>Show Filters</span>
                                        
                                        <div className="sort-by-cover">
                                            <SortSelect />
                                        </div>
                                    </div>
                                </div>
                            <div className={`${!isFilterVisible ?  'hide-on-mobile' : ''} col-lg-3 primary-sidebar sticky-sidebar`}>
                              

                                <div className="sidebar-widget price_range range mb-30">
                                    <div className="widget-header position-relative mb-20 pb-10">
                                        <h5 className="widget-title mb-10">
                                           Filter Fabric
                                        </h5>
                                        <div className="bt-1 border-color-1"></div>
                                    </div>

                                 
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item className="custom-filter" eventKey="0">
                                            <Accordion.Header > <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                                            Weight
                                            </h5></Accordion.Header>
                                            <Accordion.Body>
                                                <BrandFilter />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item className="custom-filter mt-20" eventKey="1">
                                            <Accordion.Header > <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                                            Fabric Type
                                            </h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* <CategoryProduct /> */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item className="custom-filter mt-20" eventKey="2">
                                            <Accordion.Header > <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                                            Print Type
                                            </h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* <CategoryProduct /> */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                   
                                </div>

                            
                            </div>
                            <div className="col-lg-9">
                            <div className="shop-product-fillter d-lg-block d-none">
                                    <div className="totall-product">
                                        <p>
                                            We found
                                            <strong className="text-brand">
                                                {data.length}
                                            </strong>
                                            items for you!
                                        </p>
                                    </div>
                                    <div className="sort-by-product-area justify-content-between align-items-center">
                                    <span className="text-brand fw-bold" onClick={()=>setIsFilterVisible(!isFilterVisible)}>Show Filters</span>
                                        
                                        <div className="sort-by-cover">
                                            <SortSelect />
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-grid-3">
                                    {fabricList.length === 0 && (
                                        <h3>No Fabric Found </h3>
                                    )}

                                    {fabricList.map((item, i) => (
                                        <div
                                            className="col-lg-4 col-md-4 col-6 col-sm-6"
                                            key={i}
                                        >
                                            <SingleFabric product={item} />
                                            {/* <SingleProductList product={item}/> */}
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                    <nav aria-label="Page navigation example">
                                        {/* <Pagination
                                            getPaginationGroup={
                                                getPaginationGroup
                                            }
                                            currentPage={currentPage}
                                            pages={pages}
                                            next={next}
                                            prev={prev}
                                            handleActive={handleActive}
                                        /> */}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <WishlistModal />
                {/* <CompareModal /> */}
                {/* <CartSidebar /> */}
                <QuickView />                
            </Layout>
        </>
    );
};



export default (Fabrics);
