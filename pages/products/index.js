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
import "i18next";
import { useTranslation } from "react-i18next";

const Products = ({ products1, productFilters }) => {
  const { t } = useTranslation("common");
  const [category, setCategory] = useState([]);

  const [displayedColors, setDisplayedColors] = useState(2);
  const [showMore, setShowMore] = useState(false);
  const [products, setProdcut] = useState([]);
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSizes] = useState([]);
  const [price, setPrice] = useState({ value: { min: 0, max: 1000000 } });
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [searchToggle, setSeachToggle] = useState(true);
  const [productType, setProdcutType] = useState("");
  const [prodcutprice, setProdcutPrice] = useState("");
  const [color, setcolor] = useState([]);
  const [SortBaar, setSortBaar] = useState(false);

  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;
  //get query data
  const fabricPrice = Router.query.fabricPrice ? Router.query.fabricPrice : "";
  const categoryId = Router.query.categoryId ? Router.query.categoryId : "";
  const subCategoryId = Router.query.subcategoryId
    ? Router.query.subcategoryId
    : "";
  const categoryName = Router.query.categoryName;
  let searchProduct = Router.query.searchProdcut
    ? Router.query.searchProdcut
    : "";

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);

  let [isFilterVisible, setIsFilterVisible] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [pages, setPages] = useState(Math.ceil(products?.length / limit));

  const clearAllFilter = () => {
    searchProduct = "";

    setSelectedSubSubCategories([]);
    setSizes([]);
    setPrice({ value: { min: 0, max: 1000000 } });
    setProdcutType("");

    setSeachToggle(false);
    setTimeout(() => {
      setSeachToggle(true);
    }, 1500);
    // handleChange("Default");
    setSortBaar(!SortBaar);
    prodcutFilters();
  };
  const sizes = ["", "s", "m", "xl", "xxl"];

  const handleClick = (i, target) => {
    setSizes(target);

    setActive(active == i ? 0 : i);
  };
  const cratePagination = () => {
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

  useEffect(() => {
    if (searchProduct) {
      prodcutFilters();
    }
  }, [searchProduct]);
  useEffect(() => {
    setSelectedSubSubCategories([]);
  }, [categoryId, subCategoryId]);
  const prodcutFilters = async () => {
    const data = {
      subSubCategoryId: selectedSubSubCategories,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      productType: productType,
      order: prodcutprice,
      priceTo: price.value.max,
      priceFrom: price.value.min,
      colour: selectedColors,
      size: selectedSizes,
      productName: searchProduct,
    };
    const query = new URLSearchParams(data);
    console.log(searchProduct);
    console.log(searchToggle);
    console.log(toggle);
    try {
      if (searchProduct && searchToggle) {
        const response = await services.searchProdcut.SEARCH_PRODCUT(
          searchProduct
        );
        if (response) {
          setProdcut(response?.data?.data?.rows);
        }
      } else {
        const response = await services.product.GET_FILTER_PRODUCT(query);
        console.log(response);
        if (response && toggle) {
          const data = response?.data?.data;
          setTimeout(async () => {
            if (
              new URLSearchParams(window.location.search).get("product") &&
              data.length == 0
            ) {
              const response = await services.searchProdcut.SEARCH_PRODCUT(
                searchProduct
              );
              if (response) {
                setProdcut(response?.data?.data?.rows);
              }
            } else {
              if (data.length <= 12) {
                setProdcut(data);
                setCurrentPage(1);
              } else {
                setProdcut(data);
              }
            }
          }, 0);
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
  const handleChange = (selectedValue) => {
    switch (selectedValue) {
      case "0":
        setProdcutType("0");
        break;
      case "1":
        setProdcutType("1");
        break;
      case "2":
        setProdcutType("2");
        break;
      case "LowToHigh":
        setProdcutPrice("asc");
        setSeachToggle(false);
        setTimeout(() => {
          setSeachToggle(true);
        }, [1000]);
        // setProdcutType("");
        break;
      case "HighToLow":
        setSeachToggle(false);
        setTimeout(() => {
          setSeachToggle(true);
        }, [1000]);
        // setProdcutType("");
        setProdcutPrice("desc");

        break;

      case "Default":
        if (new URLSearchParams(window.location.search).get("product")) {
          break;
        } else {
          prodcutFilters();
          setProdcutType("");
          setProdcutPrice("");
          break;
        }

      default:
        break;
    }
  };

  const handleCheckboxChange = (value) => {
    const updatedBrands = selectedColors.includes(value)
      ? selectedColors.filter((brand) => brand !== value)
      : [...selectedColors, value];

    setSelectedColors(updatedBrands);
  };

  const [activeCategory, setActiveCategory] = useState([0, 0, 0]);
  const toggleCategory = (categoryIndex) => {
    setActiveCategory(activeCategory === categoryIndex ? null : categoryIndex);
  };
  const getallProdcut = async () => {
    try {
      const response = await services.product.GET_PRODUCT();
      if (response) {
        const uniqueData = {
          color: new Set(),
          DuplicateKeyFound: new Set(),
        };

        response?.data?.data?.forEach((item) => {
          const key = `${item.colour}`;
          if (!uniqueData.DuplicateKeyFound.has(key)) {
            uniqueData.color.add(item.colour);
          }
        });
        setcolor(Array.from(uniqueData.color));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const colorArrays = color.map((color) => JSON.parse(color));

  useEffect(() => {
    cratePagination();
    getallProdcut();
    getCategroy();
    setTimeout(() => {
      prodcutFilters();
    }, 100);
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
  useEffect(() => {
    setTimeout(() => {
      if (new URLSearchParams(window.location.search).get("subsubcategoryId"))
        setSelectedSubSubCategories([
          new URLSearchParams(window.location.search).get("subsubcategoryId"),
        ]);
      prodcutFilters();
    }, 100);
  }, [
    new URLSearchParams(window.location.search).get("subsubcategoryId"),
    new URLSearchParams(window.location.search).get("subcategoryId"),
  ]);

  useEffect(() => {
    handleChange(new URLSearchParams(window.location.search).get("product"));
  }, [new URLSearchParams(window.location.search).get("product")]);

  return (
    <>
      <Layout
        parent={t("Home")}
        sub={
          categoryId ? (
            <>
              <Link href="/categories" as="/categories">
                {t("Category")}
              </Link>
            </>
          ) : (
            <>
              <Link href="/products">{t("Shop")}</Link>
            </>
          )
        }
        subSub={
          categoryId && (
            <Link href="/categories" as="/categories">
              {categoryName}
            </Link>
          )
        }
        subChild={t("Products")}
      >
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="shop-product-fillter d-lg-none d-block  ">
                <div className="totall-product">
                  <p>
                    {t("We found")}
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
                  {(selectedSubSubCategories.length > 0 ||
                    productType ||
                    selectedColors.length > 0 ||
                    selectedSizes.length > 0 ||
                    price.value.min > 0 ||
                    searchProduct ||
                    price.value.max < 1000000) && (
                    <span
                      className="text-brand fw-bold"
                      onClick={() => clearAllFilter()}
                      style={{ cursor: "pointer" }}
                    >
                      {t("Clear All Filter")}
                    </span>
                  )}

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
                          onChange={(event) => handleChange(event.target.value)}
                        >
                          <option value="Default">{t("Default")}</option>
                          {/* < ion value="2">{t("Best Seller")}</> */}
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
                  className={`${
                    !isFilterVisible ? "hide-on-mobile" : ""
                  } col-lg-3 primary-sidebar sticky-sidebar`}
                >
                  <div className="widget-category p-3 mb-30">
                    {category.length > 0 &&
                      category?.map((Item, index) => {
                        const word3 = Item?.categoryName;
                        const UpperCase = word3
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ");
                        return (
                          <Accordion key={index} activeKey={activeCategory}>
                            <Accordion.Item
                              className="custom-filter"
                              eventKey={index}
                              key={index}
                            >
                              <Accordion.Header
                                onClick={() => toggleCategory(index)}
                              >
                                <h5 className="w-100 section-title style-1 wow fadeIn animated text-break">
                                  {UpperCase}
                                </h5>
                              </Accordion.Header>
                              <Accordion.Body>
                                <Accordion>
                                  {Item?.SubCategories?.map(
                                    (subCategory, subIndex) => {
                                      const word2 =
                                        subCategory?.subCategoryName;
                                      const UpperCase2 = word2
                                        .split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                        )
                                        .join(" ");
                                      return (
                                        <Accordion.Item
                                          className="custom-filter ms-3"
                                          eventKey={subIndex}
                                          key={subCategory.id}
                                        >
                                          <Accordion.Header>
                                            <h5 className="w-100 style-1 wow fadeIn animated">
                                              {UpperCase2}
                                            </h5>
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            {subCategory?.SubSubCategories.map(
                                              (item, itemIndex) => {
                                                const word1 =
                                                  item?.subSubCategoryName;
                                                const UpperCase3 = word1
                                                  .split(" ")
                                                  .map(
                                                    (word) =>
                                                      word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                      word.slice(1)
                                                  )
                                                  .join(" ");
                                                return (
                                                  <div key={item.id}>
                                                    <Form.Check
                                                      type="checkbox"
                                                      id={`default-${item.id}`}
                                                      label={UpperCase3}
                                                      onChange={() => {
                                                        const subSubCategoryId =
                                                          item.id;
                                                        setToggle(true);
                                                        // setSeachToggle(false);
                                                        if (
                                                          selectedSubSubCategories?.includes(
                                                            subSubCategoryId
                                                          )
                                                        ) {
                                                          const updatedSubCategories =
                                                            selectedSubSubCategories?.filter(
                                                              (id) =>
                                                                id !==
                                                                subSubCategoryId
                                                            );
                                                          setSelectedSubSubCategories(
                                                            updatedSubCategories
                                                          );
                                                        } else {
                                                          const updatedSubCategories =
                                                            [
                                                              ...selectedSubSubCategories,
                                                              subSubCategoryId,
                                                            ];
                                                          setSelectedSubSubCategories(
                                                            updatedSubCategories
                                                          );
                                                        }
                                                      }}
                                                      checked={selectedSubSubCategories?.includes(
                                                        item?.id
                                                      )}
                                                    />
                                                  </div>
                                                );
                                              }
                                            )}
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      );
                                    }
                                  )}
                                </Accordion>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        );
                      })}
                  </div>

                  <div className="sidebar-widget price_range range mb-30">
                    <div className="widget-header position-relative mb-20 pb-10">
                      <h5 className="widget-title mb-10">
                        {t("Filter by price")}
                      </h5>
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
                            min={0}
                            max={9000}
                            onChange={(value) => {
                              setToggle(true);
                              // setSeachToggle(false);
                              setPrice({
                                value: { min: value[0], max: value[1] },
                              });
                            }}
                          />

                          <div className="d-flex justify-content-between">
                            <span>Rs. {price?.value?.min}</span>
                            <span>Rs. {price?.value?.max}</span>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>

                    <div className="list-group">
                      <div className="list-group-item mb-10 mt-10">
                        {/* <label className="fw-900">{t("Color")}</label>

                        <>
                          <ul className="categories m-0 p-0" >
                            {colorArrays?.map((colorArray, index) => (

                              <li key={index} className="m-0 p-0">
                                {colorArray?.slice(0, displayedColors).map((color) => (
                                  <
                                    div
                                    className="d-flex p-1"
                                  > <Form.Check
                                      className={color == selectedColors && 'active d-flex '}
                                      key={color}
                                      type="checkbox"
                                      id={`checkbox-${color}`}

                                      onChange={() => {
                                        setToggle(true);
                                        handleCheckboxChange(color);
                                      }}
                                      checked={selectedColors?.includes(color)}


                                    />
                                    <div
                                      className="ms-2"
                                      style={{

                                        display: "flex",
                                        width: "26px",
                                        height: "26px",
                                        borderRadius: "40px",
                                        border: "1px solid black",
                                        backgroundColor: color
                                      }}
                                    >

                                    </div>
                                  </div>

                                ))}
                              </li>
                            ))}
                            {displayedColors < colorArrays.length && (
                              <li>
                                
                                <span
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleShowToggle}
                                >
                                  {showMore ? "Show Less" : "Show More"}
                                </span>

                               
                              </li>
                            )}
                          </ul>
                        </>  */}
                        <label className="fw-900 mt-15">{t("Item Size")}</label>
                        <ul className="list-filter size-filter font-small">
                          {sizes.map((tag, i) => (
                            <li
                              // className={active == i ? "active" : ""}
                              onClick={() => {
                                setToggle(true);
                                // setSeachToggle(false);
                                handleClick(i, tag);
                              }}
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
                        {products?.length > 0 && <> {products?.length}</>}
                      </strong>
                      {t("items for you!")}
                    </p>
                  </div>
                  <div className="sort-by-product-area justify-content-between align-items-center">
                    <div>
                      {selectedSubSubCategories.length > 0 ||
                      productType ||
                      selectedColors.length > 0 ||
                      selectedSizes.length > 0 ||
                      price.value.min > 0 ||
                      categoryId?.length > 0 ||
                      categoryName ||
                      searchProduct ||
                      price.value.max < 1000000 ? (
                        <Link href="/products" as={`/products`}>
                          <span
                            className="text-brand fw-bold"
                            onClick={() => clearAllFilter()}
                            style={{ cursor: "pointer" }}
                          >
                            {t("Clear All Filter")}
                          </span>
                        </Link>
                      ) : (
                        ""
                      )}
                      {/* {categoryId.length > 0 || categoryName ? (
                        <Link href="/products" as={`/products`}>
                          <span
                            className="text-brand fw-bold"
                            onClick={() => clearAllFilter()}
                            style={{ cursor: "pointer" }}
                          >
                            {t("Clear All Filter")}
                          </span>
                        </Link>
                      ) : (
                        ""
                      )} */}
                    </div>

                    <div className="sort-by-cover">
                      <div className="sort-by-product-wrap">
                        <div className="sort-by">
                          <span>
                            <i className="fi-rs-apps-sort"></i>
                            {t("Sort by:")}
                          </span>
                        </div>
                        {/* <div className="sort-by-dropdown-wrap custom-select">
                          <select
                            onChange={(event) =>
                              handleChange(event.target.value)
                            }
                          >
                            <option value="Default">{t("Default")}</option>

                            <option value="LowToHigh">
                              {t("Low To High")}
                            </option>
                            <option value="HighToLow">
                              {t("High To Low")}
                            </option>
                          </select>
                        </div> */}

                        {!SortBaar && (
                          <div className="sort-by-dropdown-wrap custom-select">
                            <select
                              onChange={(event) =>
                                handleChange(event.target.value)
                              }
                            >
                              <option value="Default">{t("Default")}</option>
                              {/* <option value="0">{t("New Product")}</option>
                              <option value="1">{t("Hot Deals")}</option>
                              <option value="2">{t("Best Seller")}</option> */}
                              <option value="LowToHigh">
                                {t("Low To High")}
                              </option>
                              <option value="HighToLow">
                                {t("High To Low")}
                              </option>
                            </select>
                          </div>
                        )}

                        {SortBaar && (
                          <div className="sort-by-dropdown-wrap custom-select">
                            <select
                              onChange={(event) =>
                                handleChange(event.target.value)
                              }
                            >
                              <option value="Default">{t("Default")}</option>
                              {/* <option value="0">{t("New Product")}</option>
                              <option value="1">{t("Hot Deals")}</option>
                              <option value="2">{t("Best Seller")}</option> */}
                              <option value="LowToHigh">
                                {t("Low To High")}
                              </option>
                              <option value="HighToLow">
                                {t("High To Low")}
                              </option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row product-grid-3">
                  {getPaginatedProducts?.length === 0 && (
                    <h3>{t("No Products Found")} </h3>
                  )}

                  {getPaginatedProducts?.map((item, i) => (
                    <div className="col-lg-4 col-md-4 col-12 col-sm-6" key={i}>
                      <SingleProduct product={item} fabricPrice={fabricPrice} />
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
        <QuickView />
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
});

const mapDidpatchToProps = {};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
