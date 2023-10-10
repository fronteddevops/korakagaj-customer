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
import Form from "react-bootstrap/Form";
import SingleFabric from "../../components/ecommerce/SingleFabric";
import services from "../../services";

const Products = ({ products, productFilters, fetchProduct }) => {
  const [fabricList, setFabricList] = useState([]);
  const [filterFabric, setFilterFabric] = useState([]);

  const [selectedfabricType, setSelectedfabricType] = useState([]);
  const [selectedprintType, setSelectedprintType] = useState([]);
  const [selectedfabricName, setSelectedfabricName] = useState([]);
  const [selectedproperties, setSelectedproperties] = useState([]);
  const [selectedtransparency, setSelectedtransparency] = useState([]);
  const [selectedreflection, setSelectedreflection] = useState([]);
  const [selectedconstruction, setSelectedconstruction] = useState([]);
  const [selectedhandle, setSelectedhandle] = useState([]);
  const [selectedusage, setSelectedusage] = useState([]);
  const [selectedweight, setSelectedweight] = useState([]);

  //pagination

  let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit = 12,
    showPagination = 4;

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);

  let [isFilterVisible, setIsFilterVisible] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [pages, setPages] = useState(
    Math.ceil(
      filterFabric.length > 0
        ? filterFabric?.length / limit
        : fabricList?.length / limit
    )
  );
  const data = {
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
  const cratePagination = () => {
    // Calculate the number of pages based on the list length and limit
    const totalItems = filterFabric.length > 0 ? filterFabric.length : fabricList.length;
    const totalPages = Math.ceil(totalItems / limit);
  
    // Create an array of page numbers
    const pageNumbers = new Array(totalPages).fill().map((_, idx) => idx + 1);
  
    // Update the state variables
    setPagination(pageNumbers);
    setPages(totalPages);
  };

  useEffect(() => {
    getFbaric();
    getFilterFabric();
    cratePagination();
  }, [
    selectedfabricType,
    selectedfabricName,
    selectedprintType,
    selectedproperties,
    selectedtransparency,
    selectedreflection,
    selectedconstruction,
    selectedhandle,
    selectedusage,
    selectedweight,
  limit,
  filterFabric.length
  ]);

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  const getPaginatedProducts =
    filterFabric.length > 0
      ? filterFabric.slice(startIndex, endIndex)
      : fabricList.slice(startIndex, endIndex);

  let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
  let end = start + showPagination;
  const getPaginationGroup = pagination?.slice(start, end);

  const next = () => {
    setCurrentPage((page) => page + 1);
  };

  const prev = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleActive = (item) => {
    setCurrentPage(item);
  };

  //get fabric data
  const getFbaric = async () => {
    try {
      const response = await services.fabric.GET_FABRIC();
if(response){

  setFabricList(response.data.data.rows);
  cratePagination()
}
     
    } catch (error) {
      console.log(error);
    }
  };
  const getFilterFabric = async () => {
    try {
      const response = await services.fabric.GET_FilTER_FABRIC(data);
if(response){

  setFilterFabric(response?.data?.data?.rows);
  cratePagination()
}
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild="Select Fabric">
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
                    <h5 className="widget-title mb-10">Filter Fabric</h5>
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
                          weight
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.weight) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.weight}
                                onChange={() => {
                                  const weight = item.weight;
                                  const updatedtweight =
                                    selectedweight.includes(weight)
                                      ? selectedweight.filter(
                                          (weight) => weight !== weight
                                        )
                                      : [...selectedweight, weight];

                                  setSelectedweight(updatedtweight);
                                
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedweight.includes(item.weight)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>
                    <br />
                    <Accordion.Item className="custom-filter" eventKey="1">
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          Fabric Type
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {/* <BrandFilter /> */}
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.fabricType) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.fabricType}
                                onChange={() => {
                                  const fabricType = item.fabricType;
                                  const updatedfabricType =
                                    selectedfabricType.includes(fabricType)
                                      ? selectedfabricType.filter(
                                          (fabricType) =>
                                            fabricType !== fabricType
                                        )
                                      : [...selectedfabricType, fabricType];

                                  setSelectedfabricType(updatedfabricType);
                               
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedfabricType.includes(
                                  item.fabricType
                                )}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item>

                    {/* <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="2"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          Fabric Name
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                      
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.fabricType) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.fabricName}
                                onChange={() => {
                                  const fabricName = item.fabricName;
                                  const updatedfabricName =
                                    selectedfabricName.includes(fabricName)
                                      ? selectedfabricName.filter(
                                          (fabricName) => fabricName !== fabricName
                                        )
                                      : [...selectedfabricName, fabricName];

                                  setSelectedfabricName(updatedfabricName);
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedfabricName.includes(item.fabricName)}
                              />
                            ))}
                      </Accordion.Body>
                    </Accordion.Item> */}

                    <Accordion.Item
                      className="custom-filter mt-20"
                      eventKey="3"
                    >
                      <Accordion.Header>
                        {" "}
                        <h5 className="font-size-sm w-100 style-1 wow fadeIn animated">
                          Print Type
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.printType) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.printType}
                                onChange={() => {
                                  const printType = item.printType;
                                  const updatedprintType =
                                    selectedprintType.includes(printType)
                                      ? selectedfabricType.filter(
                                          (printType) => printType !== printType
                                        )
                                      : [...selectedprintType, printType];

                                  setSelectedprintType(updatedprintType);
                                
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedprintType.includes(
                                  item.printType
                                )}
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
                          Usage
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.usage) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.usage}
                                onChange={() => {
                                  const usage = item.usage;
                                  const updatedtusage = selectedusage.includes(
                                    usage
                                  )
                                    ? selectedusage.filter(
                                        (usage) => usage !== usage
                                      )
                                    : [...selectedusage, usage];

                                  setSelectedusage(updatedtusage);
                             
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedusage.includes(item.usage)}
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
                          properties
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.properties) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.properties}
                                onChange={() => {
                                  const properties = item.properties;
                                  const updatedproperties =
                                    selectedproperties.includes(properties)
                                      ? selectedproperties.filter(
                                          (properties) =>
                                            properties !== properties
                                        )
                                      : [...selectedproperties, properties];

                                  setSelectedproperties(updatedproperties);
                             
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedproperties.includes(
                                  item.properties
                                )}
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
                          Handle
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.handle) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.handle}
                                onChange={() => {
                                  const handle = item.handle;
                                  const updatedthandle =
                                    selectedhandle.includes(handle)
                                      ? selectedhandle.filter(
                                          (handle) => handle !== handle
                                        )
                                      : [...selectedhandle, handle];

                                  setSelectedhandle(updatedthandle);
                                
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedhandle.includes(item.handle)}
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
                          Construction
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.construction) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.construction}
                                onChange={() => {
                                  const construction = item.construction;
                                  const updatedtconstruction =
                                    selectedconstruction.includes(construction)
                                      ? selectedconstruction.filter(
                                          (construction) =>
                                            construction !== construction
                                        )
                                      : [...selectedconstruction, construction];

                                  setSelectedconstruction(updatedtconstruction);
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedconstruction.includes(
                                  item.construction
                                )}
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
                          Transparency
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.transparency) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.transparency}
                                onChange={() => {
                                  const transparency = item.transparency;
                                  const updatedtransparency =
                                    selectedtransparency.includes(transparency)
                                      ? selectedtransparency.filter(
                                          (transparency) =>
                                            transparency !== transparency
                                        )
                                      : [...selectedtransparency, transparency];

                                  setSelectedtransparency(updatedtransparency);
                               
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedtransparency.includes(
                                  item.transparency
                                )}
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
                          Reflection
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {fabricList.length > 0 &&
                          fabricList
                            .filter((item) => item.reflection) // Filter out items with blank fabricType
                            .map((item) => (
                              <Form.Check
                                key={item.id}
                                type="checkbox"
                                id={`default-${item.id}`}
                                label={item.reflection}
                                onChange={() => {
                                  const reflection = item.reflection;
                                  const updatedtreflection =
                                    selectedreflection.includes(reflection)
                                      ? selectedreflection.filter(
                                          (reflection) =>
                                            reflection !== reflection
                                        )
                                      : [...selectedreflection, transparency];

                                  setSelectedreflection(updatedtreflection);
                             
                                  // You can optionally call your filter function here if needed
                                }}
                                checked={selectedreflection.includes(
                                  item.reflection
                                )}
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
                    {filterFabric.length > 0 ? (
                      <>
                        {" "}
                        <p>
                          We found
                          <strong className="text-brand">
                            {filterFabric.length}
                          </strong>
                          items for you!
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        We found
                        <strong className="text-brand">
                          {fabricList.length}
                        </strong>
                        items for you!
                      </>
                    )}

                    <span
                      className="text-brand fw-bold"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                      Show Filters
                    </span>
                  </div>
                  {/* <div className="sort-by-product-area">
                    <div className="sort-by-cover">
                      <SortSelect />
                    </div>
                  </div> */}
                </div>
                <div className="row product-grid-3">
                  {fabricList.length === 0 && <h3>No Fabric Found </h3>}

                  {filterFabric && filterFabric.length >    0 ? (
                    <>
                      {getPaginatedProducts?.map((item, i) => (
                        <div
                          className="col-lg-4 col-md-4 col-12 col-sm-6"
                          key={i}
                        >
                          <SingleFabric product={item} />
                          {/* <SingleProductList product={item}/> */}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {getPaginatedProducts?.map((item, i) => (
                        <div
                          className="col-lg-4 col-md-4 col-12 col-sm-6"
                          key={i}
                        >
                          <SingleFabric product={item} />
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
