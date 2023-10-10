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
import Accordion from "react-bootstrap/Accordion";
import filterProduct from "../../util/filterProduct";
import services from "../../services";
import SubCategory from "../../components/ecommerce/SubCategory";
import Form from "react-bootstrap/Form";
import { clearWishlist } from "../../redux/action/wishlistAction";
import Slider from "rc-slider";
const Products = ({ product, productFilters, fetchProduct }) => {
  const [category, setCategory] = useState([]);
  const [fillter, setFilterProduct] = useState([]);
  const [products, setProdcut] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState([]);
  const [subSubcategory, setSubSubCategory] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [price, setPrice] = useState({ value: { min: 0, max: 10000 } });
  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);

  let [isFilterVisible, setIsFilterVisible] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [pages, setPages] = useState(Math.ceil(products.length / limit));
  console.log('pages',pages)
  useEffect(() => {
    fetchProduct(searchTerm, productFilters);
    cratePagination();
    getSubCategory();
    getCategroy();
   // prodcutAll();
    prodcutFilters()
    getSubSubCategory();
  }, [
    selectedCategories,
    selectedSubCategories,
    selectedSubSubCategories,
    selectedColors,
    limit,
    pages,
    products.length,
  ]);

  
  // //get prodcut
  // const prodcutAll = async () => {
  //   const response = await services.product.GET_PRODUCT();
  //   setProdcut(response?.data?.data?.rows);
  // };

  const cratePagination = () => {
    // set pagination
    let arr = new Array(Math.ceil(products.length / limit))
      .fill()
      .map((_, idx) => idx + 1);

    setPagination(arr);
    setPages(Math.ceil(products.length / limit));
   
  };

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  const getPaginatedProducts = products.slice(startIndex, endIndex);

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
    setPages(Math.ceil(products.length / Number(e.target.value)));
  };

  //get category
  const getCategroy = async () => {
    try {
      const response = await services.category.GET_CATEGORY();
      if (response) {
        setCategory(response?.data?.data?.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  //filter prodcut
  const prodcutFilters = async () => {
    try {
      const response = await services.product.GET_FILTER_PRODUCT(
        selectedColors,
        selectedCategories,
        
        selectedSubSubCategories,
        selectedSubCategories,
        price.value.max,
        price.value.min
      );
      if (response) {
        setProdcut(response?.data?.data?.rows);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  //get subcategory
  const getSubCategory = async () => {
    const response = await services.subCategory.GET_SUB_CATEGORY();
    setSubCategory(response?.data?.data?.rows);
  };
  //getSubSubCATEGPRY
  const getSubSubCategory = async () => {
    const response = await services.subSubCategory.GET_SUB_SUB_CATEGORY();
    setSubSubCategory(response?.data?.data?.rows);
  };

  //SORTING BY DEALS
  const featuredProduct = async () => {
    try {
      const response = await services.product.GET_PRODUCT();

      const newProudct = response?.data?.data?.rows.filter(
        (product) => product.productType == 0
      );
      if (newProudct) {
        setFilterProduct(newProudct);
        setProdcut([])
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
      
        setFilterProduct(hotDeals)
        setProdcut([])
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
        setFilterProduct(NewArrival);

            setProdcut([])
      }
    } catch (error) {
      console.log(error);
    }
  };
  const default1  =async()=>{
  try {
    const response = await services.product.GET_PRODUCT();
      setProdcut(response?.data?.data?.rows);
   setFilterProduct([])

  } catch (error) {
    console.log(error)
  }
  }
//FILTER CASE 
  const handleChange = (selectedValue) => {
    // Call the appropriate function based on the selected value
    switch (selectedValue) {
      case "newProduct":
        featuredProduct();
        break;
      case "hotDeals":
        trendingProduct();
        break;
      case "bestSeller":
        newArrivalProduct();
        break;
        case"Default":
        default1()
      // Handle additional cases if needed
      default:
      
        break;
    }
  };

  //color array
  const brands = [
      
    {value: "Red"},
    {value: "Blue"},
    {value: "Green"},

];

//color set function 
const handleCheckboxChange = (value) => {
  const updatedBrands = selectedColors.includes(value)
      ? selectedColors.filter((brand) => brand !== value)
      : [...selectedColors, value];

  setSelectedColors(updatedBrands);
  // You can now use the updatedBrands array in your filter logic.
};
 // Replace this with your actual array of products
;
console.log("profuctttt11111111111111111111111111111",products)
  return (
    <>
      <Layout parent="Home" sub="Shop" subChild="Products">
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              {
                <div
                  className={`${
                    !isFilterVisible ? "hide-on-mobile" : ""
                  } col-lg-3 primary-sidebar sticky-sidebar`}
                >
                  <div className="widget-category p-3 mb-30">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item className="custom-filter" eventKey="0">
                        <Accordion.Header>
                          {" "}
                          <h5 className="w-100 section-title style-1 wow fadeIn animated">
                            Category
                          </h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          <>
                            <Form>
                              <ul className="categories">
                               
                                {category.map((item) => (
                                  <Form.Check
                                    key={item.id}
                                    type="checkbox"
                                    id={`default-${item.id}`}
                                    label={item.categoryName}
                                    onChange={() => {
                                      const categoryId = item.id;
                                      const updatedCategories =
                                        selectedCategories.includes(categoryId)
                                          ? selectedCategories.filter(
                                              (id) => id !== categoryId
                                            )
                                          : [...selectedCategories, categoryId];

                                      setSelectedCategories(updatedCategories);
                                      // Pass the updated array to your filter function
                                    }}
                                    checked={selectedCategories.includes(
                                      item.id
                                    )}
                                    onClick={prodcutFilters}
                                  />
                                ))}
                              </ul>
                            </Form>
                          </>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        className="custom-filter mt-20"
                        eventKey="1"
                      >
                        <Accordion.Header>
                          {" "}
                          <h5 className="w-100 section-title style-1 wow fadeIn animated">
                            Sub Category
                          </h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          {subcategory &&
                            subcategory.map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.subCategoryName}
                                onChange={() => {
                                  const subCategoryId = item.id;
                                  const updatedSubCategories =
                                    selectedSubCategories.includes(
                                      subCategoryId
                                    )
                                      ? selectedSubCategories.filter(
                                          (id) => id !== subCategoryId
                                        )
                                      : [
                                          ...selectedSubCategories,
                                          subCategoryId,
                                        ];

                                  setSelectedSubCategories(
                                    updatedSubCategories
                                  );

                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedSubCategories.includes(
                                  item.id
                                )}
                              
                              />
                            ))}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item
                        className="custom-filter mt-20"
                        eventKey="2"
                      >
                        <Accordion.Header>
                          {" "}
                          <h5 className="w-100 section-title style-1 wow fadeIn animated">
                            Sub Sub Category
                          </h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          {subSubcategory &&
                            subSubcategory.map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.subSubCategoryName}
                                onChange={() => {
                                  const subSubCategoryId = item.id;
                                  const updatedSubCategories =
                                    selectedSubSubCategories.includes(
                                      subSubCategoryId
                                    )
                                      ? selectedSubSubCategories.filter(
                                          (id) => id !== subSubCategoryId
                                        )
                                      : [
                                          ...selectedSubSubCategories,
                                          subSubCategoryId,
                                        ];

                                  setSelectedSubSubCategories(
                                    updatedSubCategories
                                  );

                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedSubSubCategories.includes(
                                  item.id
                                )}
                              />
                            ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>

                  <div className="sidebar-widget price_range range mb-30">
                    <div className="widget-header position-relative mb-20 pb-10">
                      <h5 className="widget-title mb-10">Filter by price</h5>
                      <div className="bt-1 border-color-1"></div>
                    </div>

                    <div className="price-filter">
                      <div className="price-filter-inner">
                        <br />
                        <div className="korakagaj_price_slider_amount">
                          <Slider
                            range
                            allowCross={false}
                            defaultValue={[0, 100]}
                            min={0}
                            max={9000}
                     
                            onChange={(value) => {
                              //  PriceRange({ value: { min: value[0], max: value[1] } })

                              setPrice({
                                value: { min: value[0], max: value[1] },
                              });
                              prodcutFilters(selectedCategories);
                            }}
                          />

                          <div className="d-flex justify-content-between">
                            <span>{price.value.min}</span>
                            <span>{price.value.max}</span>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>

                    <div className="list-group">
                      <div className="list-group-item mb-10 mt-10">
                        <label className="fw-900">Color</label>
                        <>
                        <ul className="categories">
                {brands.map((item) => (
                    <li key={item.value}>
                        <Form.Check
                            type="checkbox"
                            id={`checkbox-${item.value}`}
                            label={item.value}
                            onChange={() => handleCheckboxChange(item.value)}
                            checked={selectedColors.includes(item.value)}
                        />
                    </li>
                ))}
            </ul>
        </>
                        <label className="fw-900 mt-15">Item Condition</label>
                        {/* <SizeFilter /> */}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              }
              <div className="col-lg-9">
                <div className="shop-product-fillter">
                  <div className="totall-product">
                    <p>
                      We found
                      <strong className="text-brand">
                        {fillter.length > 0 ? (
                          <>{fillter.length}</>
                        ) : (
                          <> {products.length}</>
                        )}
                      </strong>
                      items for you!
                    </p>
                    <span
                      className="text-brand fw-bold"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                      Show Filters
                    </span>
                  </div>
                  <div className="sort-by-product-area">
                    <div className="sort-by-cover">
                      <div className="sort-by-product-wrap">
                        <div className="sort-by">
                          <span>
                            <i className="fi-rs-apps-sort"></i>
                            Sort by:
                          </span>
                        </div>
                        <div>
                          <select
                            onChange={(event) =>
                              handleChange(event.target.value)
                            }
                          >
                            <option value="Default">Default</option>
                            <option value="newProduct">New Product</option>
                            <option value="hotDeals">Hot Deals</option>
                            <option value="bestSeller">Best Seller</option>
                            {/* <option value="lowToHigh">Low To High</option>
                        <option value="highToLow">High To Low</option> */}
                            {/* Add more options if needed */}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row product-grid-3">
                  {getPaginatedProducts.length === 0 && (
                    <h3>No Products Found </h3>
                  )}

                  {fillter && fillter.length > 0 ? (
  <>
    {fillter?.map((item, i) => (
      <div
        className="col-lg-4 col-md-4 col-12 col-sm-6"
        key={i}
      >{console.log('555555555555555555555555555555555555555555555', item)}
        <SingleProduct product={item} />
        {/* <SingleProductList product={item}/> */}
      </div>
    ))}{" "}
  </>
) : (
  <>
    {getPaginatedProducts?.map((item, i) => (
      <div
        className="col-lg-4 col-md-4 col-12 col-sm-6"
        key={i}
      >
        {console.log('555555555555555555555555555555555555555555555', getPaginatedProducts)}
        <SingleProduct product={item} />
        {/* <SingleProductList product={item}/> */}
      </div>
    ))}
  </>
)}

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
