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
import Slider from 'rc-slider';
const Products = ({ products, productFilters, fetchProduct }) => {
  console.log(
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    products
  );
  console.log("data3333333333333333333333333333333333", productFilters);
  const [category, setCategory] = useState([]);
  const [fillter, setFilterProduct] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [price, setPrice] = useState({ value: { min: 0, max: 5000 
  } });
  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);

  let [isFilterVisible, setIsFilterVisible] = useState(false);
  let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
  let [currentPage, setCurrentPage] = useState(1);

  // //filter data
  // //get filter prodcut
  // // const getFilterData = () => {
  // //     if (productFilters && products)      if (productFilters.price !== undefined || productFilters.category) {
  //         // Use the filter function to filter products based on either price or category
  //         const filteredData = products.items.filter((item) => (
  //           // Check if the item meets either the price or category criteria
  // /          (!productFilters.price || item.totalPrice <= productFilters.price.max) ||
  //           (!productFilters.category || productFilters.category.includes(item.Category.categoryName))
  //    }
  //   }//         ));

  //         // Set the filtered products in the state
  //         setFilterProduct(filteredData);
  //        } else {         // No filters applied, display all products         setFilterProduct(products.items);       }
  //   ;

  const getFilterData = async () => {
    if (productFilters && products) {
      const categoryid = productFilters?.category;
      const min = productFilters?.price?.min;
      const max = productFilters?.price?.max;
      const response = await services.product.GET_FILTER_PRODUCT(
        categoryid,
        min,
        max
      );
      console.log(
        "responseaaaaaaaaaaaaaaaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        response.data.data
      );

      setFilterProduct(response?.data?.data?.rows);
    }
  };

  useEffect(() => {
    fetchProduct(searchTerm, productFilters);
    cratePagination();
    getFilterData();
    getCategroy();
    prodcutFilters(selectedCategories);
  }, [productFilters, limit, pages, products.items.length]);

  const cratePagination = () => {
    // set pagination
    let arr = new Array(Math.ceil(products.items.length / limit))
      .fill()
      .map((_, idx) => idx + 1);

    setPagination(arr);
    setPages(Math.ceil(products.items.length / limit));
  };

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  const getPaginatedProducts = products.items.slice(startIndex, endIndex);

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
    setPages(Math.ceil(products.items.length / Number(e.target.value)));
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
//filter category data
  const filterCategory = (categorid) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categorid)) {
        prodcutFilters(
          prevSelectedCategories.filter((category) => category !== categorid)
        );
        return prevSelectedCategories.filter(
          (category) => category !== categorid
        );
      } else {
        prodcutFilters([...prevSelectedCategories, categorid]);
        return [...prevSelectedCategories, categorid];
      }
    });
  };

  //filter prodcut 
  const prodcutFilters = async (selectedCategories) => {
    try {
      const response = await services.product.GET_FILTER_PRODUCT(
        selectedCategories
      );
      if (response) {
        setFilterProduct(response?.data?.data?.rows);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };


//price range \
const PriceRange=(data)=>{
console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa',data)
const min=data.value.min
console.log('min',min)
const max=data.value.min
}

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
                                {/* <Form.Check
      type="checkbox"
      id={`default-all`}
      label={`All`}
      checked={selectAll}
      onChange={toggleSelectAll}
      className="text-brand fw-700"
    /> */}
                                {category &&
                                  category.map((item) => (
                                    <Form.Check
                                      key={item.id}
                                      type="checkbox"
                                      id={`default-${item.id}`}
                                      label={item.categoryName}
                                      onChange={() => filterCategory(item.id)}
                                      checked={selectedCategories.includes(
                                        item.id
                                      )}
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
                          <SubCategory />
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
                          {/* <CategoryProduct /> */}
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
                max={5000}
                // onChange={(value) => console.log(value[0], value[1])} 
                onChange={(value) => {
                      PriceRange({ value: { min: value[0], max: value[1] } })
                    setPrice({ value: { min: value[0], max: value[1] } })}}
            />

            <div className="d-flex justify-content-between">
                <span>
                    {price.value.min}
                </span>
                <span>
                    {price.value.max}
                </span>
            </div>
        </div>
                        <br />
                      </div>
                    </div>

                    <div className="list-group">
                      <div className="list-group-item mb-10 mt-10">
                        <label className="fw-900">Color</label>
                        <BrandFilter />
                        <label className="fw-900 mt-15">Item Condition</label>
                        <SizeFilter />
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
                          <> {products.items.length}</>
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
                      <SortSelect />
                    </div>
                  </div>
                </div>
                <div className="row product-grid-3">
                  {getPaginatedProducts.length === 0 && (
                    <h3>No Products Found </h3>
                  )}

                  {fillter && fillter.length > 0 ? (
                    <>
                      {fillter.map((item, i) => (
                        <div
                          className="col-lg-4 col-md-4 col-12 col-sm-6"
                          key={i}
                        >
                          <SingleProduct product={item} />
                          {/* <SingleProductList product={item}/> */}
                        </div>
                      ))}{" "}
                    </>
                  ) : (
                    <>
                      {getPaginatedProducts.map((item, i) => (
                        <div
                          className="col-lg-4 col-md-4 col-12 col-sm-6"
                          key={i}
                        >
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
  // openCart,
  fetchProduct,
  // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
