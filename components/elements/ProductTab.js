import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductTab = ({prodcut}) => {
    const { t} = useTranslation("common");
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    
 



const htmlData =  prodcut?.additionalInformation

// Create a temporary element to parse the HTML
const tempElement = document.createElement('div');
tempElement.innerHTML = htmlData;

// Extract the text content from the element
const textContent = tempElement.textContent;

// Now 'textContent' contains the filtered text data
//color function

function parseAndFormatColors(colorsJSON) {
    try {
      const colorArray = JSON.parse(colorsJSON);
      if (Array.isArray(colorArray)) {
        return colorArray.join(', ');
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
                            className={
                                activeIndex === 1
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            id="Description-tab"
                            data-bs-toggle="tab"
                            onClick={() => handleOnClick(1)}
                        >
                            {t("Description")}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={
                                activeIndex === 2
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            id="Additional-info-tab"
                            data-bs-toggle="tab"
                            onClick={() => handleOnClick(2)}
                        >
                            {t("Additional info")}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={
                                activeIndex === 3
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            id="Reviews-tab"
                            data-bs-toggle="tab"
                            onClick={() => handleOnClick(3)}
                        >
                            {t("Reviews (3)")}
                        </a>
                    </li>
                </ul>
                <div className="tab-content shop_info_tab entry-main-content">
                    <div
                        className={
                            activeIndex === 1
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Description"
                    >
                        <div className="">
                     <p>{prodcut.description}</p>
                            {/* <p>
                                Uninhibited carnally hired played in whimpered
                                dear gorilla koala depending and much yikes off
                                far quetzal goodness and from for grimaced
                                goodness unaccountably and meadowlark near
                                unblushingly crucial scallop tightly neurotic
                                hungrily some and dear furiously this apart.
                            </p>
                            <p>
                                Spluttered narrowly yikes left moth in yikes
                                bowed this that grizzly much hello on spoon-fed
                                that alas rethought much decently richly and wow
                                against the frequent fluidly at formidable
                                acceptably flapped besides and much circa far
                                over the bucolically hey precarious goldfinch
                                mastodon goodness gnashed a jellyfish and one
                                however because.
                            </p>
                            <ul className="product-more-infor mt-30">
                                <li>
                                    <span>Type Of Packing</span> Bottle
                                </li>
                                <li>
                                    <span>Color</span> Green, Pink, Powder Blue,
                                    Purple
                                </li>
                                <li>
                                    <span>Quantity Per Case</span> 100ml
                                </li>
                                <li>
                                    <span>Ethyl Alcohol</span> 70%
                                </li>
                                <li>
                                    <span>Piece In One</span> Carton
                                </li>
                            </ul>
                            <hr className="wp-block-separator is-style-dots" />
                            <p>
                                Laconic overheard dear woodchuck wow this
                                outrageously taut beaver hey hello far
                                meadowlark imitatively egregiously hugged that
                                yikes minimally unanimous pouted flirtatiously
                                as beaver beheld above forward energetic across
                                this jeepers beneficently cockily less a the
                                raucously that magic upheld far so the this
                                where crud then below after jeez enchanting
                                drunkenly more much wow callously irrespective
                                limpet.
                            </p>
                            <h4 className="mt-30">Packaging & Delivery</h4>
                            <hr className="wp-block-separator is-style-wide" />
                            <p>
                                Less lion goodness that euphemistically robin
                                expeditiously bluebird smugly scratched far
                                while thus cackled sheepishly rigid after due
                                one assenting regarding censorious while
                                occasional or this more crane went more as this
                                less much amid overhung anathematic because much
                                held one exuberantly sheep goodness so where rat
                                wry well concomitantly.
                            </p>
                            <p>
                                Scallop or far crud plain remarkably far by thus
                                far iguana lewd precociously and and less
                                rattlesnake contrary caustic wow this near alas
                                and next and pled the yikes articulate about as
                                less cackled dalmatian in much less well jeering
                                for the thanks blindly sentimental whimpered
                                less across objectively fanciful grimaced wildly
                                some wow and rose jeepers outgrew lugubrious
                                luridly irrationally attractively dachshund.
                            </p> */}
                        </div>
                    </div>
                    <div
                        className={
                            activeIndex === 2
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Additional-info"
                    > 
                    <div />
                
                    <div>
       
                    <ul>
  
     <li  dangerouslySetInnerHTML={{ __html: textContent }} />

  {}
</ul>

      </div>
                        <table className="font-md">
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
                        </table>
                    </div>
                    <div
                        className={
                            activeIndex === 3
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Reviews"
                    >
                        <div className="comments-area">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h4 className="mb-30">
                                        {t("Customer questions & answers")}
                                    </h4>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img
                                                        src="/assets/imgs/page/avatar-6.jpg"
                                                        alt=""
                                                    />
                                                    <h6>
                                                        <a href="#">
                                                            Jacky Chan
                                                        </a>
                                                    </h6>
                                                    <p className="font-xxs">
                                                        {t("Since")} 2012
                                                    </p>
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
                                                        {t("Thank you very fast shipping from Poland only 3days.")}
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                            <a
                                                                href="#"
                                                                className="text-brand btn-reply"
                                                            >
                                                                {t("Reply")}
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img
                                                        src="/assets/imgs/page/avatar-7.jpg"
                                                        alt=""
                                                    />
                                                    <h6>
                                                        <a href="#">
                                                            Ana Rosie
                                                        </a>
                                                    </h6>
                                                    <p className="font-xxs">
                                                        {t("Since")} 2008
                                                    </p>
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
                                                        {t("Great low price and works well.")}
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                            <a
                                                                href="#"
                                                                className="text-brand btn-reply"
                                                            >
                                                                {t("Reply")}
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img
                                                        src="/assets/imgs/page/avatar-8.jpg"
                                                        alt=""
                                                    />
                                                    <h6>
                                                        <a href="#">
                                                            Steven Keny
                                                        </a>
                                                    </h6>
                                                    <p className="font-xxs">
                                                        {t("Since")} 2010
                                                    </p>
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
                                                      {t("  Authentic and Beautiful, Love these way more than ever expected They are Great earphones")}
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                            <a
                                                                href="#"
                                                                className="text-brand btn-reply"
                                                            >
                                                                {t("Reply")}
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <h4 className="mb-30">{t("Customer reviews")}</h4>
                                    <div className="d-flex mb-30">
                                        <div className="product-rate d-inline-block mr-15">
                                            <div
                                                className="product-rating"
                                                style={{
                                                    width: "90%",
                                                }}
                                            ></div>
                                        </div>
                                        <h6>4.8 out of 5</h6>
                                    </div>
                                    <div className="progress">
                                        <span>5 {t("star")}</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 50%",
                                            }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            50%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>4 {t("star")}</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 25%",
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            25%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>3 {t("star")}</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 45%",
                                            }}
                                            aria-valuenow="45"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            45%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>2 {t("star")}</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 65%",
                                            }}
                                            aria-valuenow="65"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            65%
                                        </div>
                                    </div>
                                    <div className="progress mb-30">
                                        <span>1 {t("star")}</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 85%",
                                            }}
                                            aria-valuenow="85"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            85%
                                        </div>
                                    </div>
                                    <a href="#" className="font-xs text-muted">
                                        {t("How are ratings calculated?")}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="comment-form">
                            <h4 className="mb-15">{t("Add a review")}</h4>
                            <div className="product-rate d-inline-block mb-30"></div>
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <form
                                        className="form-contact comment_form"
                                        action="#"
                                        id="commentForm"
                                    >
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control w-100"
                                                        name="comment"
                                                        id="comment"
                                                        cols="30"
                                                        rows="9"
                                                        placeholder={t("Write Comment")}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="name"
                                                        id="name"
                                                        type="text"
                                                        placeholder={t("Name")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        placeholder={t("Email")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="website"
                                                        id="website"
                                                        type="text"
                                                        placeholder={t("Website")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="button button-contactForm"
                                            >
                                                {t("Submit Review")}
                                            </button>
                                        </div>
                                    </form>
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
