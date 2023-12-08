import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
const ProductTab = ({ prodcut }) => {
  const { t } = useTranslation("common");
  const [activeIndex, setActiveIndex] = useState(1);

  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  //prodcut addional information
  const htmlData = prodcut?.additionalInformation;

  // Create a temporary element to parse the HTML
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlData;

  // Extract the text content from the element
  const textContent = tempElement.textContent;

  // Now 'textContent' contains the filtered text data
  //color function

  function parseAndFormatColors(colorsJSON) {
    try {
      const colorArray = JSON.parse(colorsJSON);
      if (Array.isArray(colorArray)) {
        return colorArray.join(", ");
      }
    } catch (error) {
      // Handle the JSON parsing error here, or you can ignore it
    }
    return "";
  }

  return (
    <>
      <div className="tab-style3">
        <ul className="nav nav-tabs text-uppercase">
          <li className="nav-item">
            <a
              className={activeIndex === 1 ? "nav-link active" : "nav-link"}
              id="Description-tab"
              data-bs-toggle="tab"
              onClick={() => handleOnClick(1)}
            >
              {t("Description")}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={activeIndex === 2 ? "nav-link active" : "nav-link"}
              id="Additional-info-tab"
              data-bs-toggle="tab"
              onClick={() => handleOnClick(2)}
            >
              {t("Additional info")}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={activeIndex === 3 ? "nav-link active" : "nav-link"}
              id="Reviews-tab"
              data-bs-toggle="tab"
              onClick={() => handleOnClick(3)}
            >
              {t("Reviews ")}
            </a>
          </li>
        </ul>
        <div className="tab-content shop_info_tab entry-main-content">
          <div
            className={
              activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"
            }
            id="Description"
          >
            <div className="">
              <p>{prodcut.description}</p>
            </div>
          </div>
          <div
            className={
              activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"
            }
            id="Additional-info"
          >
            <div />

            <div>
              <ul>
                <li dangerouslySetInnerHTML={{ __html: textContent }} />

                {}
              </ul>
            </div>
            {/* <table className="font-md">
                            <tbody>
                                <tr className="stand-up">
                                    <th>{t("Stand Up")}</th>
                                    <td>
                                        <p>
                                            35″L x 24″W x 37-45″H(front to back
                                            wheel)
                                        </p>
                                    </td>
                                </tr>
                                <tr className="folded-wo-wheels">
                                    <th>{t("Folded")} (w/o wheels)</th>
                                    <td>
                                        <p>32.5″L x 18.5″W x 16.5″H</p>
                                    </td>
                                </tr>
                                <tr className="folded-w-wheels">
                                    <th>{t("Folded")} ({t("w/ wheels")})</th>
                                    <td>
                                        <p>32.5″L x 24″W x 18.5″H</p>
                                    </td>
                                </tr>
                                <tr className="door-pass-through">
                                    <th>{t("Door Pass Through")}</th>
                                    <td>
                                        <p>24</p>
                                    </td>
                                </tr>
                                <tr className="frame">
                                    <th>{t("Frame")}</th>
                                    <td>
                                        <p>{t("Aluminum")}</p>
                                    </td>
                                </tr>
                                <tr className="weight-wo-wheels">
                                    <th>{t("Weight")} {t("w/o wheels")}</th>
                                    <td>
                                        <p>20 LBS</p>
                                    </td>
                                </tr>
                                <tr className="weight-capacity">
                                    <th>{t("Weight Capacity")}</th>
                                    <td>
                                        <p>60 LBS</p>
                                    </td>
                                </tr>
                                <tr className="width">
                                    <th>{t("Length")}  </th>
                                    <td>
                                        <p>{prodcut?.length}</p>
                                    </td>
                                </tr>
                                <tr className="handle-height-ground-to-handle">
                                    <th>{t("Handle height")} {t("ground to handle")}</th>
                                    <td>
                                        <p>37-45″</p>
                                    </td>
                                </tr>
                                <tr className="wheels">
                                    <th>{t("Wheels")}</th>
                                    <td>
                                        <p>{t("12″ air / wide track slick tread")}</p>
                                    </td>
                                </tr>
                                <tr className="wheels">
                                    <th>{t("Name and Address of Importer")}</th>
                                    <td>
                                        <p>{t("adidas India Marketing Private Limited, Office no. 6, 2nd Floor, Sector-B, Pocket no. 7, Plot no. 11, Vasant Kunj, New Delhi - 110070")}</p>
                                    </td>
                                </tr>
                                <tr className="seat-back-height">
                                    <th>{t("Country of Origin")}</th>
                                    <td>
                                        <p>21.5″</p>
                                    </td>
                                </tr>
                                <tr className="seat-back-height">
                                    <th>{t("Gender")}</th>
                                    <td>
                                        <p>21.5″</p>
                                    </td>
                                </tr>
                                <tr className="head-room-inside-canopy">
                                    <th>{t("BrandName")}</th>
                                    <td>
                                        <p>{prodcut?.brandName}</p>
                                    </td>
                                </tr>
                             
                               <tr className="pa_color">
  <th>{t("Color")}</th>
  <td>
    <p className="mb-2">
     {parseAndFormatColors(prodcut?.colour)}
    </p>
  </td>
</tr>

                                <tr className="pa_size">
                                    <th>{t("size")}</th>
                                    <td>
                                    <p className="mb-2">
      {prodcut?.size && JSON?.parse(prodcut?.size).map((size, index) => (
        <span key={index}>
          <span>{index + 1}:</span> {size}&nbsp;
        </span>
      ))}
    </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
          </div>
          <div
            className={
              activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"
            }
            id="Reviews"
          >
            {/* 
<h4 className="mb-30">{t("Customer reviews")}</h4> */}

            {/* <span>
                  <ReactStars
                    value={prodcut.averageRating}
                    count={5}
                    size={20}
                    activeColor="#ffd700"
                    isHalf={true} // Disable half ratings
                    edit={false}   // Disable user rating changes
                  />
                  <span>{prodcut?.ratingScore} </span>
                </span> */}

            <div className="comments-area">
              <div className="row">
                <div className="col-lg-8">
                  <h4 className="mb-30">{t("Customer questions & answers")}</h4>
                  {prodcut?.Ratings?.map((item) => (
                    <>
                      <div className="comment-list">
                        <div className="single-comment justify-content-between d-flex">
                          <div className="user justify-content-between d-flex">
                            <div className="desc">
                              {/* <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        ></div>
                                                    </div> */}
                              <span>
                                <ReactStars
                                  value={item?.ratings}
                                  count={5}
                                  size={20}
                                  activeColor="#ffd700"
                                  isHalf={true} // Disable half ratings
                                  edit={false} // Disable user rating changes
                                />
                                {/* <span>{prodcut?.ratingScore} </span> */}
                              </span>
                              <p>
                                {item?.review}

                                {/* {t("Thank you very fast shipping from Poland only 3days.")} */}
                              </p>

                              <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                  {/* <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm

                                                            </p> */}
                                </div>
                              </div>
                              <h6>
                                <a href="#">
                                  {item?.User?.firstName} &nbsp;&nbsp;
                                  {item?.User?.lastName}
                                </a>
                              </h6>
                            </div>
                          </div>
                        </div>

                        {/* <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    
                                                   
                                                    
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>
                                                        {t("Great low price anD works well.")}
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                            
                                                        </div>
                                                    </div>
                                                    <h6>
                                                        <a href="#">
                                                            Ana Rosie
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                   
                                                   
                                                   
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>
                                                      {t("Authentic and Beautiful,Love these way more than ever expected They are Great earphones")}
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                           
                                                        </div>
                                                    </div>
                                                    <h6>
                                                        <a href="#">
                                                            Ana Rosie
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div> */}
                        <hr />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTab;
