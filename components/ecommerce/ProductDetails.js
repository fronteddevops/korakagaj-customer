import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import services from "../../services";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SizeChart from "../elements/SizeChart";
const ProductDetails = ({
  product,
  cartItems,
  addToCompare,
  addToCart,
  addToWishlist,
  increaseQuantity,
  decreaseQuantity,
  quickView,
  fabricPrice,
  fabricName,
  fabricId,
  totalPrice,
}) => {
  const { t } = useTranslation("common");
  const [quantity, setQuantity] = useState(1);
  const [fabricType, setfabricType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    if (totalPrice) {
      let fabriccost = +fabricPrice * product?.length;

      let finalprice = fabriccost + product?.marginAmount;

      //let discount = (finalprice * product?.discountPercentage) / 100
      //   product.finalAmount =finalprice;
      //  product.finalAmount=totalPrice
      product.finalAmount = finalprice;
    }
    if (fabricName) {
      setfabricType(fabricName);
    }
    if (fabricName) {
      product.fabric = fabricName;
    }
    setSelectedColor(color[0]);
    setSelectedSize(size[0]);
  }, [product]);

  const handleWishlist = async (product) => {
    if (localStorage.getItem("access_token")) {
      try {
        // const userID = localStorage.getItem("userId");

        const data = {
          productId: product.id,
          // userId: userID
        };

        if (!product.isWishlisted) {
          const WishlistResponse =
            await services.Wishlist.CREATE_WISHLIST_BY_ID(data);
          //  productDataShow()
          if (WishlistResponse) {
            toast.success("Added to Wishlist!");
          }

          window.location.reload();
        } else {
          const WishlistResponse =
            await services.Wishlist.DELETE_WISHLIST_BY_ID(product.id);
          //  productDataShow()
          toast.success("Removed from Wishlist");
          window.location.reload();
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Please Login!");
    }
  };
  const color = JSON?.parse(product?.colour);
  const size = JSON?.parse(product.size);

  const handleCart = async (product) => {
    product.selectedColor = selectedColor;
    product.selectedSize = selectedSize;
    product.selectedQuantity = selectedQuantity;

    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART();
      let cartDetails = [];
      if (cart?.data?.data?.cartDetail?.cartDetails) {
        cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
      }
      cartDetails?.push(product);
     
      const unique = cartDetails.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.id === value.id &&
              t.selectedSize === value.selectedSize &&
              t.selectedColor === value.selectedColor
          )
      );
      // const unique = [
      //   ...new Map(
      //     cartDetails &&
      //       cartDetails?.length > 0 &&
      //       cartDetails?.map((item) => [item[key], item])
      //   ).values(),
      // ];
      let data = {
        cartDetail: { cartDetails: unique },
      };

      const updateCart = await services.cart.UPDATE_CART(data);

      toast.success("Add to Cart!");
    } else {
      const cart =
        localStorage.getItem("cartDetail") &&
        JSON.parse(localStorage.getItem("cartDetail"));
      let cartDetails = [];
      if (cart) {
        cartDetails = cart.cartDetails;
      }
      cartDetails.push(product);
      const key = "id";
      const unique = cartDetails.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.id === value.id &&
              t.selectedSize === value.selectedSize &&
              t.selectedColor === value.selectedColor
          )
      );
      // const unique = [
      //   ...new Map(cartDetails.map((item) => [item[key], item])).values(),
      // ];
      let data = {
        cartDetail: { cartDetails: unique },
      };
      localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));
      toast.success("Add to Cart!");
    }
  };

  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-12">
              <div className="product-detail accordion-detail">
                <div className="row mb-50">
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-gallery">
                      <span className="zoom-icon">
                        <img width={"80%"} src="/assets/imgs/360.svg" />
                      </span>

                      <div className="product-image-slider">
                        <ThumbSlider product={product} />
                      </div>
                    </div>

                    <div className="social-icons single-share">
                      <ul className="text-grey-5 d-inline-block">
                        <li>
                          <strong className="mr-10">{t("Share this:")}</strong>
                        </li>
                        <li className="social-facebook">
                          <a href="#">
                            <img
                              src="/assets/imgs/theme/icons/icon-facebook.svg"
                              alt=""
                            />
                          </a>
                        </li>
                        <li className="social-twitter">
                          <a href="#">
                            <img
                              src="/assets/imgs/theme/icons/icon-twitter.svg"
                              alt=""
                            />
                          </a>
                        </li>
                        <li className="social-instagram">
                          <a href="#">
                            <img
                              src="/assets/imgs/theme/icons/icon-instagram.svg"
                              alt=""
                            />
                          </a>
                        </li>
                        <li className="social-linkedin">
                          <a href="#">
                            <img
                              src="/assets/imgs/theme/icons/icon-pinterest.svg"
                              alt=""
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-info">
                      <h2 className="title-detail text-capitalize">
                        {product.productName}
                      </h2>
                      <div className="product-detail-rating">
                        <div className="pro-details-brand">
                          <span>
                            {t("Category")} &nbsp;&nbsp;:&nbsp;&nbsp;
                            <Link href="/products">
                              <a className="text-capitalize">
                                {product?.Category?.categoryName}
                              </a>
                            </Link>
                          </span>
                        </div>
                        <div className="product-rate-cover text-end">
                          <span className="font-small ml-5 text-muted">
                            <ReactStars
                              value={product.averageRating}
                              count={5}
                              size={20}
                              activeColor="#ffd700"
                              isHalf={true} // Disable half ratings
                              edit={false} // Disable user rating changes
                            />
                            <span>{product?.ratingScore} </span>
                            {t("Reviews")}
                          </span>
                        </div>
                      </div>
                      {totalPrice && totalPrice ? (
                        <>
                          <div className="clearfix product-price-cover">
                            <div className="product-price primary-color float-left">
                              <ins>
                                <span className="text-brand">
                                  Rs.{product?.finalAmount}
                                </span>
                              </ins>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="clearfix product-price-cover">
                            <div className="product-price primary-color float-left">
                              <ins>
                                <span className="text-brand">
                                  Rs.{product?.finalAmount}
                                </span>
                              </ins>
                              <ins>
                                <span className="old-price font-md ml-15">
                                  Rs.{product.totalPrice}
                                </span>
                              </ins>
                              <span className="save-price  font-md color3 ml-15">
                                {product.discountPercentage}% Off
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {/* <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">

                                                    <ins>
                                                        <span className="text-brand">
                                                            Rs.{product?.finalAmount}
                                                        </span>
                                                    </ins>
                                                    <ins>
                                                        <span className="old-price font-md ml-15">
                                                            Rs.{product.totalPrice}
                                                        </span>
                                                    </ins>
                                                    <span className="save-price  font-md color3 ml-15">
                                                        {
                                                            product.discountPercentage
                                                        }
                                                        % Off
                                                    </span>

                                                </div>
                                            </div> */}
                      <div className="bt-1 border-color-1 mt-15 mb-15"></div>
                      <div className="short-desc mb-30">
                        <p className="text-capitalize">{product.description}</p>
                      </div>
                      <div className="product_sort_info font-xs mb-30">
                        <ul>
                          <li className="mb-10">
                            <i className="fi-rs-crown mr-5"></i>
                            {t("1 Year AL Jazeera Brand Warranty")}
                          </li>
                          <li className="mb-10">
                            <i className="fi-rs-refresh mr-5"></i>
                            {t("30 Day Return Policy")}
                          </li>
                          <li>
                            <i className="fi-rs-credit-card mr-5"></i>
                            {t("Cash on Delivery available")}
                          </li>
                        </ul>
                      </div>
                      <div className="attr-detail attr-color mb-15">
                        <strong className="mr-10">{t("Color")}</strong>
                        <ul className="list-filter color-filter">
                          {color &&
                            color?.map((clr, i) => (
                              <li
                                key={i}
                                onClick={() => setSelectedColor(clr)}
                                className={clr == selectedColor && "active"}
                              >
                                <a href="#">
                                  <span
                                    style={{
                                      border: "1px solid black",
                                      backgroundColor: clr,
                                    }}
                                  ></span>
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="attr-detail attr-size">
                        <strong className="mr-10">{t("size")}</strong>
                        <ul className="list-filter size-filter font-small">
                          {size.map((size, i) => (
                            <li
                              className={size == selectedSize ? "active" : ""}
                              key={i}
                              onClick={() => setSelectedSize(size)}
                            >
                              <a>{size}</a>
                            </li>
                          ))}
                        </ul>
                        <strong className="mr-10">
                          &nbsp;&nbsp; | &nbsp;&nbsp;
                          <span
                            className="text-brand"
                            style={{ cursor: " pointer" }}
                            onClick={() => setShowSizeChart(!showSizeChart)}
                            variant="primary"
                          >
                            {t("Size Chart")} {">"}
                          </span>
                        </strong>
                        {showSizeChart && (
                          <SizeChart
                            showSizeChart={showSizeChart}
                            setShowSizeChart={setShowSizeChart}
                          />
                        )}
                      </div>
                      <div className="attr-detail attr-size mt-20">
                        <strong className="mr-10">{t("Quantity")}</strong>
                        <div className="detail-qty border radius">
                          <a
                            onClick={(e) => {
                              if (selectedQuantity === 1) {
                                return;
                              } else {
                                setSelectedQuantity(selectedQuantity - 1);
                              }
                            }}
                            className="qty-down"
                          >
                            <i className="fi-rs-angle-small-down"></i>
                          </a>
                          <span className="qty-val">{selectedQuantity}</span>
                          <a
                            onClick={() =>
                              setSelectedQuantity(selectedQuantity + 1)
                            }
                            className="qty-up"
                          >
                            <i className="fi-rs-angle-small-up"></i>
                          </a>
                        </div>
                      </div>
                      <div className="attr-detail attr-size mt-20">
                        <strong className="mr-10 text-capitalize ">
                          {t("Fabric")}&nbsp;:&nbsp;{" "}
                          <span className="text-brand">{product?.fabric}</span>
                        </strong>

                        <Link href={`/fabric?id=${product.id}`}>
                          <button className="btn btn-outline btn-sm btn-brand-outline font-weight-bold text-brand bg-white text-hover-white ml-15 border-radius-5 btn-shadow-brand hover-up">
                            {t("Choose Fabric")}
                          </button>
                        </Link>
                      </div>

                      <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                      <div className="detail-extralink">
                        <div className="product-extra-link2">
                          <button
                            onClick={(e) =>
                              handleCart(product)
                            }
                            className="button button-add-to-cart me-3"
                          >
                            {t("Design My Way")}
                          </button>
                          <button
                            onClick={(e) =>
                              handleCart(product)
                            }
                            className="button button-add-to-cart me-3"
                          >
                            {t("Add to cart")}
                          </button>

                          <a
                            aria-label="Add To Wishlist"
                            className="action-btn hover-up"
                            onClick={(e) => handleWishlist(product)}
                          >
                            <i className="fi-rs-heart"></i>
                          </a>
                        </div>
                      </div>
                      <ul className="product-meta font-xs color-grey mt-50">
                        <li className="mb-5 text-capitalize">
                          {t("SKU")}&nbsp;:
                          <a href="#">&nbsp;{product.sku}</a>
                        </li>
                        <li className="mb-5 text-capitalize">
                          {t("Tags")}&nbsp;:
                          <a href="#" rel="tag" className="me-1">
                            &nbsp;
                            {product.tags}
                          </a>
                        </li>
                        <li>
                          {t("Availability")}&nbsp;:
                          <span className="in-stock text-success ml-5">
                            {product.currentStock} Items In Stock
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {quickView ? null : (
                  <>
                    <ProductTab prodcut={product} />
                    <div className="row mt-60">
                      <div className="col-12">
                        <h3 className="section-title style-1 mb-30">
                          {t("Related products")}
                        </h3>
                      </div>
                      <div className="col-12">
                        <div className="row related-products position-relative">
                          <RelatedSlider />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
