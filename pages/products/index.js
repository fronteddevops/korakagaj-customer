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
import services from "../../services";



const Products = ({ products, productFilters, fetchProduct }) => {
  console.log('pppppppppppppppppppppppppppppppdddddddddddddd',productFilters.category)
  const [product,setProduct]=useState([])
  const [FilterProdcut,setFilterProduct]=useState([])
  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;


    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    
    let [isFilterVisible, setIsFilterVisible] = useState(false);
    let [pages, setPages] = useState(Math.ceil(product.length / limit));
    let [currentPage, setCurrentPage] = useState(1);

const productData=async()=>{
    try {
        const response= await services.product.GET_PRODUCT()  
      
        if(response){
          
        setProduct(response.data.data.rows)
       }
       
        
    } catch (error) {
        console.log(error)
    }
}

//get filter prodcut 
const getFilterData = () => {
    if (productFilters && product) {
      console.log('ooooooooooooooooooo');
  
      if (FilterProdcut) {
        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqq',FilterProdcut)
        // Use the filter function to filter products based on selected categories
        const filteredData = product.filter((item) =>
        productFilters.category.includes(item.Category.categoryName)
        );
        console.log('Filtered Data:', filteredData);
  
        // Set the filtered products in the state
        setFilterProduct(filteredData);
      } else {
        console.error('FilterProdcut is not an array');
      }
    }
  };
  
  

  useEffect(() => {
    // searchTerm, "/static/product.json", productFilters;
  
    productData()
    getFilterData()
    cratePagination();
  }, [productFilters, limit, pages, product.length]);

  const cratePagination = () => {
    // set pagination
    let arr = new Array(Math.ceil(product?.length / limit))
      .fill()
      .map((_, idx) => idx + 1);

    setPagination(arr);
    setPages(Math.ceil(product?.length / limit));
  };

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  var getPaginatedProducts =product.slice(startIndex, endIndex);

console.log('gfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgf',getPaginatedProducts)
  let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
  let end = start + showPagination;
  const getPaginationGroup = pagination.slice(start, end);

  const next = () => {
    setCurrentPage((page) => page + 1);
  };

  const prev = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleActive = (item) => {
    setCurrentPage(item);
  };

    const selectChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
        setPages(Math.ceil(product.length / Number(e.target.value)));
    };
    console.log('prodcut.loenth',product.length)
    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Products">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                           {<div className={`${!isFilterVisible ?  'hide-on-mobile' : ''} col-lg-3 primary-sidebar sticky-sidebar`}>
                                <div className="widget-category p-3 mb-30">
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item className="custom-filter" eventKey="0">
                                            <Accordion.Header > <h5 className="w-100 section-title style-1 wow fadeIn animated">
                                                Category
                                            </h5></Accordion.Header>
                                            <Accordion.Body>
                                                <CategoryProduct />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item className="custom-filter mt-20" eventKey="1">
                                            <Accordion.Header > <h5 className="w-100 section-title style-1 wow fadeIn animated">
                                                Sub Category
                                            </h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* <CategoryProduct /> */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item className="custom-filter mt-20" eventKey="2">
                                            <Accordion.Header > <h5 className="w-100 section-title style-1 wow fadeIn animated">
                                                Sub Sub Category
                                            </h5></Accordion.Header>
                                            <Accordion.Body>
                                                {/* <CategoryProduct /> */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>

                                <div className="sidebar-widget price_range range mb-30">
                                    <div className="widget-header position-relative mb-20 pb-10">
                                        <h5 className="widget-title mb-10">
                                            Filter by price
                                        </h5>
                                        <div className="bt-1 border-color-1"></div>
                                    </div>

                                    <div className="price-filter">
                                        <div className="price-filter-inner">
                                            <br />
                                            <PriceRangeSlider />
                                            <br />
                                        </div>
                                    </div>

                                    <div className="list-group">
                                        <div className="list-group-item mb-10 mt-10">
                                            <label className="fw-900">
                                                Color
                                            </label>
                                            <BrandFilter />
                                            <label className="fw-900 mt-15">
                                                Item Condition
                                            </label>
                                            <SizeFilter />
                                        </div>
                                    </div>
                                    <br />
                                </div>

                                
                                
                            </div>}
                            <div className="col-lg-9">
                                <div className="shop-product-fillter">
                                    <div className="totall-product">
                                        <p>
                                            We found
                                            <strong className="text-brand">
                                            {FilterProdcut.length>0 ?(<>{FilterProdcut.length}</>):(<>  {product.length}</>) }
                                           
                                            </strong>
                                            items for you!
                                        </p>
                                        <span className="text-brand fw-bold" onClick={()=>setIsFilterVisible(!isFilterVisible)}>Show Filters</span>
                                    </div>
                                    <div className="sort-by-product-area">
                                        
                                        <div className="sort-by-cover">
                                            <SortSelect />
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-grid-3">
                                    {getPaginatedProducts.length === 0 && (
                                        <h3>No Products Found </h3>
                                    )}
  {FilterProdcut.length>0 ?(<>
    {FilterProdcut.map((item, i) => (
                                        <div
                                            className="col-lg-4 col-md-4 col-12 col-sm-6"
                                            key={i}
                                        >
                                      
                                            <SingleProduct product={item} />
                                            {/* <SingleProductList product={item}/> */}
                                        </div>
                                    ))}
  </>):(<>
    {getPaginatedProducts.map((item, i) => (
                                        <div
                                            className="col-lg-4 col-md-4 col-12 col-sm-6"
                                            key={i}
                                        >
                                      
                                            <SingleProduct product={item} />
                                            {/* <SingleProductList product={item}/> */}
                                        </div>
                                    ))}
  </>)}

                               
                            

                                </div>

                                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                    <nav aria-label="Page navigation example">
                                        <Pagination
                                            getPaginationGroup={
                                                getPaginationGroup
                                            }
                                            currentPage={currentPage}
                                            pages={pages}
                                            next={next}
                                            prev={prev}
                                            handleActive={handleActive}
                                        />
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

const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
});

const mapDidpatchToProps = {
  // openCart,
  fetchProduct,
  // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
