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
   
         filterFabric?.length / limit    
    )
  );
  //fabric aaray
  const fabricType = [
    "Cotton",
    "Silk",
    "Linen",
    "Silk/Cotton",
    "Wool",
    "Viscose",
    "Tencel",
    "Modal",
    "Bemberg",
    "Cashmere",
    "Nylon",
    "Neoprene",
    "Tencel/Cotton/Elastane",
    "Polyester/Elastane",
    "Polyester/Lycra",
    "Cotton/Linen",
    "Viscose/Elastane",
    
    "Polyester/Cotton",
     
  ];
  const weight = ["Light(20-100gsm)", "Medium(101-249gsm)", "Heavy(250-gsm)"];
  const printType = ["Reactive", "pigment", "sublimation"];
  const usage = [
    "Quilting",
    "Furnishing/Upholstery",
    "Cushions/Bedding ",
    "Clothing/Dressmaking",
    "Home/decor/interiors",
    "Crafting",
    "Lining",
    "Scarves",
    "Bridal/Wedding",
    "Cashmere",
    "Cushions",
    "Suit",
    "Trousers",
    "TechnicaL",
    "Cosplay",
    
    "Sports",
    "Swimwear",
    "Tracksuits",
    "Accessories/Bags",
    "Shirting",
    "Outdoor",
  ];
  const properties = [
    "Waterproof",
    "Fire/retardant",
    "Non-Fray",
    "Water/Resistant",
    "Durable",
    "Certified/Organic",
    "Vegan",
    "Stretch",
    "Wicking",
    "Recycled",
  ];
  const handle = ["Soft", "Stiff", "Silky", "Smooth", "Fluffy", "Coarse"];
  const transparency = [
    "Mesh/Net",
    "Opaque",
    "Blackout",
    "Semi-transparent/sheer",
  ];
  const reflection = ["Shiny", "Mat"];
  const construction = [
  "Woven/Stretchy",
    "Woven/Non-stretch",
    "Twill",
    "knitted",
    "Satin",
    "Crepe",
    "Canvas",
    "Velvet",
  ];
  
  
  const data1 = {
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
   
      const totalItems =
      filterFabric.length 
     const totalPages = Math.ceil(totalItems / limit);
 
     // Create an array of page numbers
     const pageNumbers = new Array(totalPages).fill().map((_, idx) => idx + 1);
 
     // Update the state variables
     setPagination(pageNumbers);
     setPages(totalPages);
    
   
  };

  useEffect(() => {
  
    getFilterFabric();
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
  const getPaginatedProducts = filterFabric.slice(startIndex, endIndex)
      
  let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
  let end = start + showPagination;
  const getPaginationGroup = pagination?.slice(start, end);

  const next = () => {
    setCurrentPage((page) => page + 1);
  };

  const prev = () => {
    console.log("========================================?",pages)
    setCurrentPage((pages) => pages - 1);
  };

  const handleActive = (item) => {
    setCurrentPage(item);
  };

  //get fabric data
 
  const getFilterFabric = async () => {
    try {
      const response = await services.fabric.GET_FilTER_FABRIC(data1);
  const data =response?.data?.data?.rows
  if(data.length<12){
    setFilterFabric(data)
    // prev()
    // console.log("++++++++++++++++++++++++++++++++>")
    setCurrentPage(1)
  }
  else{
    setFilterFabric(data)
  }
  
        
        
      
    } catch (error) {
      console.log(error);
    }
  };
console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqq",currentPage)
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
                          Weight
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
                          Fabric Type
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        {/* <BrandFilter /> */}
                        {fabricType.length > 0 &&
                          fabricType
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
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
                        {printType.length > 0 &&
                          printType
                            .filter((item, index) => item) // Filter out items with blank fabricType
                            .map((item, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`default-${index}`}
                                label={item}
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
                          Usage
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
                          Properties
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
                          Handle
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
                                onChange={() => {
                                  const handle = item;
                                  const updatedhandle =
                                    selectedhandle.includes(handle)
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
                          Construction
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
                          Transparency
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
                          Reflection
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
                  
                     
                        We found
                        <strong className="text-brand">
                          {filterFabric.length}
                        </strong>
                        items for you!
            
                 

                    <a href="#"
                      className="text-brand fw-bold"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                      style={{cursor:"pointer"}}
                    >
                      Show Filters
                    </a>
                  </div>
                  {/* <div className="sort-by-product-area">
                    <div className="sort-by-cover">
                      <SortSelect />
                    </div>
                  </div> */}
                </div>
                <div className="row product-grid-3">
                  {filterFabric.length === 0 && <h3 > <strong className="text-brand">  
                       No Fabric Found  </strong></h3>}

                      { getPaginatedProducts.length>0  && getPaginatedProducts?.map((item, i) => (
                        <div
                          className="col-lg-4 col-md-4 col-12 col-sm-6"
                          key={i}
                        >
                          <SingleFabric product={item} />
                          {/* <SingleProductList product={item}/> */}
                        </div>
                      ))}
                   
                </div>
        
                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                  <nav aria-label="Page navigation example">  


                    <Pagination
                      getPaginationGroup={ getPaginationGroup}
                      currentPage={ currentPage}
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
