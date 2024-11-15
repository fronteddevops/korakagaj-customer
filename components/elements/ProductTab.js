import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";

import QuickView from "../../components/ecommerce/QuickView";
import Link from "next/link";
const ProductTab = ({ prodcut }) => {
  const { t } = useTranslation("common");
  const [activeIndex, setActiveIndex] = useState(1);
  const [visibleItems, setVisibleItems] = useState(2);

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

  const handleToggle = () => {
    setVisibleItems((prevVisibleItems) =>
      prevVisibleItems === prodcut?.Ratings?.length
        ? 3
        : prodcut?.Ratings?.length
    );
  };
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
              {t("Reviews")}
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
              <p>{prodcut?.description}</p>
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
          </div>
          <div
            className={
              activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"
            }
            id="Reviews"
          >
            <div className="comments-area">
              <div className="row">
                <div className="col-lg-8 " style={{ marginBottom: "-50px" }}>
                  <h4 className="mb-15">{t("Customer questions & answers")}</h4>

                  <div>
                    {prodcut?.Ratings?.slice(0, visibleItems).map(
                      (item, index) => (
                        <div key={index}>
                          <div >
                            <div className="single-comment justify-content-between d-flex">
                              <div className="user justify-content-between d-flex">
                                <div className="desc">
                                  <span>
                                    <ReactStars
                                      value={item?.ratings}
                                      count={5}
                                      size={20}
                                      activeColor="#ffd700"
                                      isHalf={true}
                                      edit={false}
                                    />
                                  </span>
                                  <p>{item?.review}</p>

                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center"></div>
                                  </div>
                                  <h6>
                                    <a>
                                      {item?.User?.firstName} &nbsp;&nbsp;
                                      {item?.User?.lastName}
                                    </a>
                                  </h6>
                                </div>
                              </div>
                            </div>

                            <br />
                          </div>
                        </div>
                      )
                    )}

                    {prodcut?.Ratings?.length > visibleItems && (
                      <button
                        onClick={handleToggle}
                        className="button button-add-to-cart me-3"
                      >
                        {visibleItems === 2 ? "Show all Reviews" : "Review"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickView />
    </>
  );
};

export default ProductTab;
