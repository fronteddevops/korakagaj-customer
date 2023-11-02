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
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import services from "../../services";
import Form from "react-bootstrap/Form";
import Slider from "rc-slider";
import 'i18next'
import { useTranslation } from "react-i18next";


const Products = ({ products1, productFilters }) => {
  const { t } = useTranslation("common");
  const [category, setCategory] = useState([]);
  const [subSubcategory, setSubSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fillter, setFilterProduct] = useState([]);
  const [products, setProdcut] = useState([]);
  // const [prodcutAll,setprodcutAll]=useState([])
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSizes] = useState([]);
  const [price, setPrice] = useState({ value: { min: 0, max: 10000 } });
  const [active, setActive] = useState(0);
  const [toggle,setToggle]=useState(true)
  const [productType,setProdcutType]=useState("")
  const [prodcutprice,setProdcutPrice]=useState("")

  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;
  //get query data 
  const fabricPrice = Router.query.fabricPrice ? Router.query.fabricPrice : "";
  const categoryId = Router.query.categoryId ? Router.query.categoryId : "";
  const categoryName = Router.query.categoryName
  const searchProduct = Router.query.searchProdcut ? Router.query.searchProdcut : "";

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);

  let [isFilterVisible, setIsFilterVisible] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [pages, setPages] = useState(Math.ceil(products?.length / limit));

  useEffect(() => {

    cratePagination();
    prodcutFilters();

    getCategroy();
  }, [
    categoryId,
    selectedSubSubCategories,
  productType,
    prodcutprice,
    selectedColors,
    selectedSizes,
    price,
    limit,
    pages,
    products?.length,
  ]);

  const clearAllFilter = () => {
    window.location.href = '/products'


  }




  //get prodcut

  //color
  const color = ["red", "blue", "green", "yellow", "white", "black", "orange", "purple"];
  //size
  const sizes = ["", "s", "m", "xl", "xxl"];
  //size function

  const handleClick = (i, target) => {
    setSizes(target);
    setActive(active == i ? 0 : i);
  };
  const cratePagination = () => {
    // set pagination
    let arr = new Array(Math.ceil(products?.length / limit))
      .fill()
      .map((_, idx) => idx + 1);

    setPagination(arr);
    setPages(Math.ceil(products?.length / limit));
  };

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  const getPaginatedProducts = products?.slice(startIndex, endIndex);

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

  //filter prodcut
  const prodcutFilters = async () => {
    const data = {
      subSubCategory: selectedSubSubCategories,
      categoryId: categoryId,
      productType:productType,
      order:prodcutprice,
      maxPrice: price.value.max,
      minPrice: price.value.min,
      color: selectedColors,
      size: selectedSizes,
    };
    try {
      if (searchProduct) {


        const response = await services.searchProdcut.SEARCH_PRODCUT(searchProduct)
        if (response) {
          setProdcut(response?.data?.data?.rows)
        }
      }
      else {

        const response = await services.product.GET_FILTER_PRODUCT(data);
        if (response && toggle) {
          const data = response?.data?.data


          if (data.length <= 12) {
            setProdcut(data)
            setLoading(true)

            setCurrentPage(1)
          }
          else {
            setProdcut(data)
          }


        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCategroy = async () => {
    try {
      const response = await services.category.GET_CATEGORY_ALL();
      if (response) {
        setCategory(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //SORTING BY 


  const featuredProduct = async () => {

    try {
      if (!localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT();

        const newProudct = response?.data?.data?.filter(
          (product) => product.productType == 0
        );
        if (newProudct.length <= 12) {
        
       
          setCurrentPage(1)
          setProdcut(newProudct);
          setToggle(false)
        } else {
          setProdcut(newProudct);
          setToggle(false)
        }

      } else if (localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT_AUTH();
        const newProudct = response?.data?.data?.filter(
          (product) => product.productType == 0
        );
        if (newProudct.length <= 12) {
        
         
           setCurrentPage(1)
           setProdcut(newProudct);
           setToggle(false)
         } else {
           setProdcut(newProudct);
           setToggle(false)
         }


    }} catch (error) {
      console.log(error);
    }
  };

  const trendingProduct = async () => {
    try {
      if (!localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT();
        const hotDeals = response?.data?.data?.filter(
          (product) => product.productType == 1
        );
        if (hotDeals.length <= 12) {
          setProdcut(hotDeals);
          setCurrentPage(1)
        setToggle(false)
        }
        else {
          setProdcut(hotDeals);
          setCurrentPage(1)
        }



      } else if (localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT_AUTH();
        const hotDeals = response?.data?.data?.filter(
          (product) => product.productType == 1
        );
        if (hotDeals.length <= 12) {
          setProdcut(hotDeals);
          setCurrentPage(1)
        setToggle(false)
        }
        else {
          setProdcut(hotDeals);
          setCurrentPage(1)
        }
      }


    } catch (error) {
      console.log(error);
    }
  };
  const newArrivalProduct = async () => {
    try {
      if (!localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT();
        const NewArrival = response?.data?.data?.filter(
          (product) => product.productType == 2
        );
        if (NewArrival.length <= 12) {
          setProdcut(NewArrival);
          setCurrentPage(1)
         setToggle(false)
        }
        else {
          setProdcut(NewArrival);
        
         setToggle(false)

        }
      } else if (localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT_AUTH();
        const NewArrival = response?.data?.data?.filter(
          (product) => product.productType == 2
        );
        if (NewArrival.length <= 12) {
          setProdcut(NewArrival);
          setCurrentPage(1)
         setToggle(false)
        }
        else {
          setProdcut(NewArrival);
        
         setToggle(false)

        }
      }


    } catch (error) {
      console.log(error);
    }
  };
  const default1 = async () => {
    try {
      if (!localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT();
        if (response?.data?.data?.length <= 12) {
          setProdcut(response?.data?.data);
          setToggle(true)
          setCurrentPage(1)
        }
        else {
          setProdcut(response?.data?.data);
          setToggle(true)

        }

      } else if (localStorage.getItem('access_token')) {
        const response = await services.product.GET_PRODUCT_AUTH();
        if (response?.data?.data?.length <= 12) {
          setProdcut(response?.data?.data);
        setToggle(true)
          setCurrentPage(1)
        }
        else {
          setProdcut(response?.data?.data);
       
          setToggle(true)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const LowToHigh = async () => {
    try {
      const response = await services.product.PRODCUT_GET_LowToHigh();
      if (response?.data?.data?.length <= 12) {
        setProdcut(response?.data?.data);

     setToggle(false)
        setCurrentPage(1)
      }
      else {
        setProdcut(response?.data?.data);
        setToggle(false)
      }

    } catch (error) {
      console.log(error);
    }
  };

  const HighToLow = async () => {
    try {
      const response = await services.product.PRODCUT_GET_HighToLow();
      if (response?.data?.data?.length <= 12) {
        setProdcut(response?.data?.data);
setToggle(false)
      
        setCurrentPage(1)
      }
      else {
        setProdcut(response?.data?.data);

        setToggle(false)


      }
    } catch (error) {
      console.log(error);
    }
  };

  //FILTER CASE
  const handleChange = (selectedValue) => {
    // Call the appropriate function based on the selected value
    switch (selectedValue) {
      case "0":
       setProdcutType("0")
        break;
      case "1":
        setProdcutType("1")
        break;
      case "2":
        setProdcutType("2")
        break;
      case "LowToHigh":
        setProdcutPrice("asc")
        setProdcutType("")
        break;
      case "HighToLow":
        setProdcutPrice("desc")
        setProdcutType("")
        break;
      case "Default":
        prodcutFilters();
        setProdcutType("")
        setProdcutPrice("")
        break;
      // Handle additional cases if needed
      default:
        break;
    }
  };

  //color array

  //color set function
  const handleCheckboxChange = (value) => {
    const updatedBrands = selectedColors.includes(value)
      ? selectedColors.filter((brand) => brand !== value)
      : [...selectedColors, value];

    setSelectedColors(updatedBrands);
    // You can now use the updatedBrands array in your filter logic.
  };
  // Replace this with your actual array of products


  const [activeCategory, setActiveCategory] = useState([0, 0, 0]); // Replace DEFAULT_CATEGORY_INDEX with the actual index of your default category


  // const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (categoryIndex) => {
    setActiveCategory(activeCategory === categoryIndex ? null : categoryIndex);
  };


  return (
    <>
      <Layout parent={t("Home")} sub={categoryId ? (<><a href="/categories"> {t("Category")}</a></>) :
        <><a href="/products"> {t("Shop")}</a></>} subSub={categoryId && <a href="/categories"> {categoryName} <span></span></a>
        } subChild={t("Products")}>

        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="shop-product-fillter d-lg-none d-block  ">
                <div className="totall-product">
                  <p>
                    {t("We found")}
                    {/* <strong className="text-brand">
                                            {products?.items?.length}
                                        </strong> */}
                    {t("items for you!")}
                  </p>
                </div>
                <div className="sort-by-product-area justify-content-between align-items-center">
                  <span
                    className="text-brand fw-bold"
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    {t("Show Filters")}
                  </span>
                  <span
                    className="text-brand fw-bold"
                    onClick={() => clearAllFilter()}
                    style={{ cursor: "pointer" }}
                  >
                    {t("Clear All Filter")}
                  </span>

                  <div className="sort-by-cover">
                    <div className="sort-by-product-wrap">
                      <div className="sort-by">
                        <span>
                          <i className="fi-rs-apps-sort"></i>
                          {t('Sort by:')}
                        </span>
                      </div>
                      <div className="sort-by-dropdown-wrap custom-select">
                        <select
                          onChange={(event) => handleChange(event.target.value)}
                        >
                          <option value="Default">{t("Default")}</option>
                            <option value="0">{t("New Product")}</option>
                            <option value="1">{t("Hot Deals")}</option>
                            <option value="2">{t("Best Seller")}</option>
                            <option value="LowToHigh">{t("Low To High")}</option>
                            <option value="HighToLow">{t("High To Low")}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                <div
                  className={`${!isFilterVisible ? "hide-on-mobile" : ""
                    } col-lg-3 primary-sidebar sticky-sidebar`}
                >
                  <div className="widget-category p-3 mb-30">
                    {category?.map((Item, index) => (
                      <Accordion key={index} activeKey={activeCategory}>
                        <Accordion.Item className="custom-filter" eventKey={index} key={index}>
                          <Accordion.Header onClick={() => toggleCategory(index)}>
                            <h5 className="w-100 section-title style-1 wow fadeIn animated">
                              {Item?.categoryName}
                            </h5>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Accordion>
                              {Item?.SubCategories?.map((subCategory, subIndex) => (
                                <Accordion.Item
                                  className="custom-filter ms-3"
                                  eventKey={subIndex}
                                  key={subCategory.id}
                                >
                                  <Accordion.Header>
                                    <h5 className="w-100 style-1 wow fadeIn animated">
                                      {subCategory?.subCategoryName}
                                    </h5>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    {/* Subcategory content here */}
                                    {subCategory?.SubSubCategories.map((item, itemIndex) => (
                                      <div key={item.id}>
                                        <Form.Check
                                          type="checkbox"
                                          id={`default-${item.id}`}
                                          label={item?.subSubCategoryName}
                                          onChange={() => {
                                            const subSubCategoryId = item.id;
                                          setToggle(true)
                                            if (
                                              selectedSubSubCategories?.includes(subSubCategoryId)
                                            ) {
                                              // If the subSubCategoryId is already in the array, remove it
                                              const updatedSubCategories =
                                                selectedSubSubCategories?.filter(
                                                  (id) => id !== subSubCategoryId
                                                );
                                              setSelectedSubSubCategories(updatedSubCategories);
                                            } else {
                                              // If the subSubCategoryId is not in the array, add it
                                              const updatedSubCategories = [
                                                ...selectedSubSubCategories,
                                                subSubCategoryId,
                                              ];
                                              setSelectedSubSubCategories(updatedSubCategories);
                                            }
                                          }}
                                          checked={selectedSubSubCategories?.includes(item?.id)}
                                        />
                                      </div>
                                    ))}
                                  </Accordion.Body>
                                </Accordion.Item>
                              ))}
                            </Accordion>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ))}


                  </div>

                  <div className="sidebar-widget price_range range mb-30">
                    <div className="widget-header position-relative mb-20 pb-10">
                      <h5 className="widget-title mb-10">{t("Filter by price")}</h5>
                      <div className="bt-1 border-color-1"></div>
                    </div>

                    <div className="price-filter">
                      <div className="price-filter-inner">
                        <br />
                        {/* <PriceRangeSlider /> */}
                        <div className="korakagaj_price_slider_amount">
                          <Slider
                            range
                            allowCross={false}
                            defaultValue={[0, 100]}
                            min={0}
                            max={9000}
                            onChange={(value) => {
                              //  PriceRange({ value: { min: value[0], max: value[1] } })
                              setToggle(true)
                              setPrice({
                                value: { min: value[0], max: value[1] },
                              });
                              //  prodcutFilters(selectedCategories);
                            }}
                          />

                          <div className="d-flex justify-content-between">
                            <span>{price?.value?.min}</span>
                            <span>{price?.value?.max}</span>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>

                    <div className="list-group">
                      <div className="list-group-item mb-10 mt-10">
                        <label className="fw-900">{t("Color")}</label>
                        {/* <BrandFilter /> */}
                        <>
                          <ul className="categories">
                            {color?.map((item) => (
                              <li key={item}>
                                <Form.Check
                                  type="checkbox"
                                  id={`checkbox-${item}`}
                                  label={item}
                                  onChange={() =>{
                                    setToggle(true)
                                    handleCheckboxChange(item)}}
                                  checked={selectedColors?.includes(item)}
                                  style={{ textTransform: "capitalize" }}
                                />
                              </li>
                            ))}
                          </ul>
                        </>
                        <label className="fw-900 mt-15">{t("Item Size")}</label>
                        <ul className="list-filter size-filter font-small">
                          {sizes.map((tag, i) => (
                            <li
                              className={active == i ? "active" : ""}
                              onClick={() =>{
                                setToggle(true)
                                handleClick(i, tag)}}
                              key={i}
                            >
                              <a>{i == 0 ? "all" : `${tag}`}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              }
              <div className="col-lg-9">
                <div className="shop-product-fillter d-lg-block d-none">
                  <div className="totall-product">
                    <p>
                      {t("We found")}
                      <strong className="text-brand">
                        {fillter.length > 0 ? (
                          <>{fillter?.length}</>
                        ) : (
                          <> {products?.length}</>
                        )}
                      </strong>
                      {t("items for you!")}
                    </p>
                  </div>
                  <div className="sort-by-product-area justify-content-between align-items-center">
                    <span
                      className="text-brand fw-bold"
                      onClick={() => clearAllFilter()}
                      style={{ cursor: "pointer" }}
                    >
                      {t("Clear All Filter")}
                    </span>

                    <div className="sort-by-cover">
                      <div className="sort-by-product-wrap">
                        <div className="sort-by">
                          <span>
                            <i className="fi-rs-apps-sort"></i>
                            {t("Sort by:")}
                          </span>
                        </div>
                        <div className="sort-by-dropdown-wrap custom-select">
                          <select
                            onChange={(event) =>
                              handleChange(event.target.value)
                            }
                          >
                            <option value="Default">{t("Default")}</option>
                            <option value="0">{t("New Product")}</option>
                            <option value="1">{t("Hot Deals")}</option>
                            <option value="2">{t("Best Seller")}</option>
                            <option value="LowToHigh">{t("Low To High")}</option>
                            <option value="HighToLow">{t("High To Low")}</option>
                          </select>
                        </div>
                      </div>

                      {/* <SortSelect /> */}
                    </div>
                  </div>
                </div>
                <div className="row product-grid-3">
                  {getPaginatedProducts?.length === 0 && (
                    <h3>{t("No Products Found")} </h3>
                  )}

                 
                      {getPaginatedProducts?.map((item, i) => (
                        <div
                          className="col-lg-4 col-md-4 col-12 col-sm-6"
                          key={i}
                        >
                          <SingleProduct
                            product={item}
                            fabricPrice={fabricPrice}
                          />

                          {/* <SingleProductList product={item}/> */}
                        </div>
                      ))}
              
                </div>

                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                  <nav aria-label="Page navigation example">
                    <Pagination
                      getPaginationGroup={getPaginationGroup}
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

};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
