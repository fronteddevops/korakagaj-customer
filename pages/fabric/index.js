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
import Form from "react-bootstrap/Form";
import SingleFabric from "../../components/ecommerce/SingleFabric";
import services from "../../services";
import { closeQuickView } from "../../redux/action/quickViewAction";
import { useTranslation } from "react-i18next";

const Products = ({ products, productFilters, closeQuickView }) => {
  const { t } = useTranslation("common");
  const [fabricType, setFabricList] = useState([]);
  const [filterFabric, setFilterFabric] = useState([]);
  const [printType, setPrintType] = useState([]);
  const [usage, setUsage] = useState([]);
  const [handle, setHandle] = useState([]);
  const [construction, setConstruction] = useState([]);
  const [properties, setProperties] = useState([]);
  const [reflection, setReflection] = useState([]);
  const [transparency, setTransparency] = useState([]);
  const [weight, setWeight] = useState([]);
  const [selectedfabricType, setSelectedfabricType] = useState([]);
  const [selectedprintType, setSelectedprintType] = useState([]);

  const [selectedproperties, setSelectedproperties] = useState([]);
  const [selectedtransparency, setSelectedtransparency] = useState([]);
  const [selectedreflection, setSelectedreflection] = useState([]);
  const [selectedconstruction, setSelectedconstruction] = useState([]);
  const [selectedhandle, setSelectedhandle] = useState([]);
  const [selectedusage, setSelectedusage] = useState([]);
  const [selectedweight, setSelectedweight] = useState([]);
  const [fabric, setFabric] = useState("");
  const [prodcutData, setprodcutData] = useState({
    newlength: "",
    discountPercentage: "",
    productName: "",
    productId: "",
    marginAmount: "",
  });
  //pagination

  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;

  const { id } = Router.query;

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);

  let [isFilterVisible, setIsFilterVisible] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [pages, setPages] = useState(Math.ceil(filterFabric?.length / limit));

  //filter fabric state send qu..
  const filterFabricState = {
    // fabricName:selectedfabricName,
    fabricType: selectedfabricType,
    printType: selectedprintType,
    usage: selectedusage,
    properties: selectedproperties,
    handle: selectedhandle,
    construction: selectedconstruction,
    transparency: selectedtransparency,
    reflection: selectedreflection,
    weight: selectedweight,
  };
  const query = new URLSearchParams(filterFabricState);
  const cratePagination = () => {
    // Calculate the number of pages based on the list length and limit

    const totalItems = filterFabric.length;
    const totalPages = Math.ceil(totalItems / limit);

    // Create an array of page numbers
    const pageNumbers = new Array(totalPages).fill().map((_, idx) => idx + 1);

    // Update the state variables
    setPagination(pageNumbers);
    setPages(totalPages);
  };
  //fabric data

  const getFabric = async () => {
    try {
      const response = await services.fabric.GET_FABRIC();
      if (response) {
        const uniqueData = {
          fabricType: new Set(),
          printType: new Set(),
          usage: new Set(),
          construction: new Set(),
          handle: new Set(),
          properties: new Set(),
          reflection: new Set(),
          transparency: new Set(),
          weight: new Set(),
          DuplicateKeyFound: new Set(),
        };

        response?.data?.data?.rows?.forEach((item) => {
          const key = `${item.fabricType}-${item.printType}-${item.usage}-${item.construction}-${item.handle}-${item.properties}-${item.reflection}-${item.transparency}-${item.weight}`;

          // Check if the key already exists in the set and add it if not
          if (!uniqueData.DuplicateKeyFound.has(key)) {
            uniqueData.fabricType.add(item.fabricType);
            uniqueData.printType.add(item.printType);
            uniqueData.usage.add(item.usage);
            uniqueData.construction.add(item.construction);
            uniqueData.handle.add(item.handle);
            uniqueData.properties.add(item.properties); // Use the key for uniqueness
            uniqueData.reflection.add(item.reflection);
            uniqueData.transparency.add(item.transparency);
            uniqueData.weight.add(item.weight);
          }
        });

        // Convert sets to arrays and set state variables
        setFabricList(Array.from(uniqueData.fabricType));
        setPrintType(Array.from(uniqueData.printType));
        setUsage(Array.from(uniqueData.usage));
        setConstruction(Array.from(uniqueData.construction));
        setHandle(Array.from(uniqueData.handle));
        setProperties(Array.from(uniqueData.properties));
        setReflection(Array.from(uniqueData.reflection));
        setTransparency(Array.from(uniqueData.transparency));
        setWeight(Array.from(uniqueData.weight));
      }
    } catch (error) {
      // Handle the error here
      console.log(error);
    }
  };

  const getProdcut = async () => {
    try {
      const response = await services.product.GET_PRODUCT_BY_ID(id);

      if (response) {
        setprodcutData({
          newlength: response?.data?.data[0]?.length,
          discountPercentage: response?.data?.data[0]?.discountPercentage,
          productName: response?.data?.data[0]?.productName,
          productId: response?.data?.data[0]?.id,
          marginAmount: response?.data?.data[0]?.marginAmount,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    closeQuickView();
    getFabric();
    getFilterFabric();
    getProdcut();
    cratePagination();
  }, [
    selectedfabricType,

    selectedprintType,
    selectedproperties,
    selectedtransparency,
    selectedreflection,
    selectedconstruction,
    selectedhandle,
    selectedusage,
    selectedweight,
    limit,
    filterFabric.length,
  ]);

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  const getPaginatedProducts = filterFabric.slice(startIndex, endIndex);

  let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
  let end = start + showPagination;
  const getPaginationGroup = pagination?.slice(start, end);

  const next = () => {
    setCurrentPage((page) => page + 1);
  };

  const prev = () => {
    setCurrentPage((pages) => pages - 1);
  };

  const handleActive = (item) => {
    setCurrentPage(item);
  };

  //get fabric data

  const getFilterFabric = async () => {
    try {
      const response = await services.fabric.GET_FilTER_FABRIC(query);
      const data = response?.data?.data?.rows;
      if (data.length <= 12) {
        setFilterFabric(data);

        setCurrentPage(1);
      } else {
        setFilterFabric(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout
        parent={t("Home")}
        sub={
          <>
            <Link href="/products" as={`/products`}>
              {t("Product")}
            </Link>
          </>
        }
        subSub={
          <>
            <Link href="/products/[slug]" as={`/products/${id}`}>
              <a>{prodcutData?.productName}</a>
            </Link>
            <span></span>
          </>
        }
        subChild={t("Select Fabric")}
      >
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div
                className={`${
                  !isFilterVisible ? "hide-on-mobile" : ""
                } col-lg-3 primary-sidebar sticky-sidebar`}
              >
                <div className="sidebar-widget price_range range mb-30">
                  <div className="widget-header position-relative mb-20 pb-10">
                    <h5 className="widget-title mb-10">{t("Filter Fabric")}</h5>
                    <div className="bt-1 border-color-1"></div>
                  </div>

                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="0"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Weight")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {weight.length > 0 &&
                          weight
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                onChange={() => {
                                  const weight = item;
                                  const updatedweight = selectedweight.includes(
                                    weight
                                  )
                                    ? selectedweight.filter(
                                        (selectedType) =>
                                          selectedType !== weight
                                      )
                                    : [...selectedweight, weight];

                                  setSelectedweight(updatedweight);
                                }}
                                checked={selectedweight.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>
                    <br />
                    <Accordion.Item className="custom-filter" eventKey="1">
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Fabric Type")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricType.length > 0 &&
                          fabricType
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const fabricType = item;
                                  const updatedFabricType =
                                    selectedfabricType.includes(fabricType)
                                      ? selectedfabricType.filter(
                                          (selectedType) =>
                                            selectedType !== fabricType
                                        )
                                      : [...selectedfabricType, fabricType];

                                  setSelectedfabricType(updatedFabricType);
                                }}
                                checked={selectedfabricType.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="3"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Print Type")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {printType.length > 0 &&
                          printType
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const printType = item;
                                  const updatedprintType =
                                    selectedprintType.includes(printType)
                                      ? selectedprintType.filter(
                                          (selectedType) =>
                                            selectedType !== printType
                                        )
                                      : [...selectedprintType, printType];

                                  setSelectedprintType(updatedprintType);
                                }}
                                checked={selectedprintType.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="4"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Usage")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {usage.length > 0 &&
                          usage
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const usage = item;
                                  const updatedusage = selectedusage.includes(
                                    usage
                                  )
                                    ? selectedusage.filter(
                                        (selectedType) => selectedType !== usage
                                      )
                                    : [...selectedusage, usage];

                                  setSelectedusage(updatedusage);
                                }}
                                checked={selectedusage.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="5"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Properties")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {properties.length > 0 &&
                          properties
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const properties = item;
                                  const updatedproperties =
                                    selectedproperties.includes(properties)
                                      ? selectedproperties.filter(
                                          (selectedType) =>
                                            selectedType !== properties
                                        )
                                      : [...selectedproperties, properties];

                                  setSelectedproperties(updatedproperties);
                                }}
                                checked={selectedproperties.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="6"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Handle")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {handle.length > 0 &&
                          handle
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const handle = item;
                                  const updatedhandle = selectedhandle.includes(
                                    handle
                                  )
                                    ? selectedhandle.filter(
                                        (selectedType) =>
                                          selectedType !== handle
                                      )
                                    : [...selectedhandle, handle];

                                  setSelectedhandle(updatedhandle);
                                }}
                                checked={selectedhandle.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="7"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Construction")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {construction.length > 0 &&
                          construction
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const construction = item;
                                  const updatedconstruction =
                                    selectedconstruction.includes(construction)
                                      ? selectedconstruction.filter(
                                          (selectedType) =>
                                            selectedType !== construction
                                        )
                                      : [...selectedconstruction, construction];

                                  setSelectedconstruction(updatedconstruction);
                                }}
                                checked={selectedconstruction.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="8"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Transparency")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {transparency.length > 0 &&
                          transparency
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const fabricType = item;
                                  const updatedFabricType =
                                    selectedtransparency.includes(fabricType)
                                      ? selectedtransparency.filter(
                                          (selectedType) =>
                                            selectedType !== fabricType
                                        )
                                      : [...selectedtransparency, fabricType];

                                  setSelectedtransparency(updatedFabricType);
                                }}
                                checked={selectedtransparency.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="9"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          {t("Reflection")}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {reflection.length > 0 &&
                          reflection
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
                                style={{ textTransform: "capitalize" }}
                                onChange={() => {
                                  const reflection = item;
                                  const updatedhandle =
                                    selectedreflection.includes(reflection)
                                      ? selectedreflection.filter(
                                          (selectedType) =>
                                            selectedType !== reflection
                                        )
                                      : [...selectedreflection, reflection];

                                  setSelectedreflection(updatedhandle);
                                }}
                                checked={selectedreflection.includes(item)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="shop-product-fillter">
                  <div className="totall-product">
                    {t("We found")}
                    <strong className="text-brand">
                      {filterFabric.length}
                    </strong>
                    {t("items for you!")} &nbsp;&nbsp;
                    <a
                      className="text-brand fw-bold"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                      style={{ cursor: "pointer" }}
                    >
                      {t("Show Filters")}
                    </a>
                  </div>
                </div>
                <div className="row product-grid-3">
                  {filterFabric.length === 0 && (
                    <h3>
                      {" "}
                      <strong className="text-brand">
                        {t("No Fabric Found")}{" "}
                      </strong>
                    </h3>
                  )}

                  {getPaginatedProducts.length > 0 &&
                    getPaginatedProducts?.map((item, i) => (
                      <div
                        className="col-lg-4 col-md-4 col-12 col-sm-6"
                        key={i}
                      >
                        {/* {console.log(prodcutData)}
                        {console.log(item)} */}
                        <SingleFabric
                          product={item}
                          length={prodcutData?.newlength}
                          id={id}
                          discountPercentage={prodcutData?.discountPercentage}
                          marginAmount={prodcutData?.marginAmount}
                        />
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
  quickView: state.quickView,
});

export default connect(mapStateToProps, { closeQuickView })(Products);
//export default connect(mapStateToProps, mapDidpatchToProps)(Products);
