import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import { isMobile } from "react-device-detect";
import Loader from "./../elements/Loader";
import nextConfig from "../../next.config";
import services from "../../services";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
const SingleProduct = ({
  data1,
  product,
  openQuickView,
  source,
  GetWishlistdata,
}) => {
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(data1?.productId);
  const [UserId, setUserId] = useState(data1?.User?.id);
  const [isProductIsWishListed, setIsProductIsWishListed] = useState();
  const route = useRouter();
  const productDataShow = () => {
    setProductId(data1?.productId);
    setUserId(data1?.User?.id);
  };

  const { t, i18n } = useTranslation("common");

  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const basePrice = product?.totalPrice || 0;
  const discountPercentage = product?.discountPercentage || 0;
  const UpperCase = product?.SubSubCategory?.subSubCategoryName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  let image = [];
  useEffect(() => {
    productDataShow();
    setIsProductIsWishListed(product.isWishlisted);
  }, []);
  const handleCart = async (product) => {
    const color = JSON?.parse(product?.colour);
    const size = JSON?.parse(product.size);
    product.selectedColor = color[0];
    product.selectedSize = size[0];
    product.selectedQuantity = 1;
    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART();
      let cartDetails = [];
      if (cart?.data?.data?.cartDetail?.cartDetails) {
        cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
      }
      cartDetails?.push(product);
      const key = "id";
      const unique = cartDetails.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.id === value.id &&
              t.selectedSize === value.selectedSize &&
              t.selectedColor === value.selectedColor &&
              t.fabric === value.fabric
          )
      );
      let data = {
        cartDetail: { cartDetails: unique },
      };
      localStorage.setItem("cartItemsCount", unique.length);
      const updateCart = await services.cart.UPDATE_CART(data);
      toast.success("Add to Cart !");
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
              t.selectedColor === value.selectedColor &&
              t.fabric === value.fabric
          )
      );

      let data = {
        cartDetail: { cartDetails: unique },
      };
      localStorage.setItem("cartItemsCount", unique.length);
      localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));

      toast.success("Add to Cart !");
    }
  };
  const handleWishlist = async (product) => {
    if (localStorage.getItem("access_token")) {
      try {
        const data = {
          productId: product.id,
        };
        if (!isProductIsWishListed) {
          const WishlistResponse =
            await services.Wishlist.CREATE_WISHLIST_BY_ID(data);

          if (route.pathname != "/shop-wishlist") {
            setIsProductIsWishListed(!isProductIsWishListed);
          }

          productDataShow();
          toast.success("Added to Wishlist!");
        } else {
          const WishlistResponse =
            await services.Wishlist.DELETE_WISHLIST_BY_ID(product.id);
          if (route.pathname != "/shop-wishlist") {
            setIsProductIsWishListed(!isProductIsWishListed);
          }
          productDataShow();
          toast.success("Removed from Wishlist");
        }
        if (source == "wishlist") {
          GetWishlistdata();
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      toast.error("Please Login!");
    }
  };
  return (
    <>
      {!loading ? (
        <>
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div
                className="product-img product-img-zoom"
                style={{ height: "250 px" }}
              >
                {/* <Link
                  href={`/products/${product?.id}_${product?.productName}`}
                  as={`/products/${product?.id}_${product?.productName}`}
                > */}
                <Link
                  href={`/products/${product?.slug}`}
                  as={`/products/${product?.slug}`}
                >
                  <a>
                    <img
                      className="default-img"
                      src={imageUrl + product?.featuredImage}
                      crossOrigin="anonymous"
                      alt=""
                    />
                  </a>
                </Link>
              </div>

              <div
                className="product-action-1"
                style={isMobile ? { marginTop: "-120px" } : {}}
              >
                {/* {!isMobile && (
                  <a
                    aria-label="Quick view"
                    className="action-btn hover-up"
                    data-bs-toggle="modal"
                    onClick={() => {
                      openQuickView(product);
                    }}
                  >
                    <i className="fi-rs-eye"></i>
                  </a>
                )} */}

                {isMobile ? null : (
                  <a
                    aria-label="Quick view"
                    className="action-btn hover-up"
                    data-bs-toggle="modal"
                    onClick={() => {
                      openQuickView(product);
                    }}
                  >
                    <i className="fi-rs-eye"></i>
                  </a>
                )}

                <a
                  aria-label="Add To Wishlist"
                  className="action-btn hover-up"
                  onClick={(e) => handleWishlist(product)}
                >
                  <i className="fi-rs-heart"></i>
                </a>
              </div>

              <div className="product-badges product-badges-position product-badges-mrg">
                {product?.productType == 1 ? (
                  <span className="hot">{t("Hot Deals")} </span>
                ) : null}

                {product?.productType == 0 ? (
                  <span className="hot">{t("New Product")} </span>
                ) : null}

                {product?.productType == 2 ? (
                  <span className="hot">{t("Best Seller")} </span>
                ) : null}
                {product?.productType == 3 ? (
                  <span className="hot">{t("UP  Coming")} </span>
                ) : null}
              </div>
            </div>
            <div className="product-content-wrap">
              <div className="product-category">{UpperCase}</div>
              <h2>
                {/* <Link href="/products/[slug]" as={`/products/${product?.id}`}> */}
                {/* <Link
                  href={`/products/${product?.id}_${product?.productName}`}
                  as={`/products/${product?.id}_${product?.productName}`}
                > */}
                <Link
                  href={`/products/${product?.slug}`}
                  as={`/products/${product?.slug}`}
                >
                  <a className="text-capitalize">{product?.productName}</a>
                </Link>
              </h2>
              <div>
                <span>
                  <ReactStars
                    value={product.averageRating}
                    count={5}
                    size={20}
                    activeColor="#ffd700"
                    isHalf={true} // Disable half ratings
                    edit={false} // Disable user rating changes
                  />
                  <span>{product?.ratingScore} </span>
                </span>
              </div>
              <div className="product-price">
                <span>Rs. {product.finalAmount}</span>
                {discountPercentage > 0 && (
                  <span className="old-price"> Rs. {basePrice}</span>
                )}{" "}
                &nbsp;
                <span>
                  {product?.discountPercentage > 0
                    ? `${product?.discountPercentage}%`
                    : ""}
                </span>
              </div>

              {isMobile ? (
                <div className="product-price text-capitalize product-action-1 show">
                  {/* Designer : &nbsp;{product?.designerName} */}
                  {/* </div> */}
                  {/* <div className="product-action-1 show"> */}
                  <span>
                    <a
                      aria-label="Add To Cart"
                      className="action-btn hover-up"
                      onClick={(e) => handleCart(product)}
                    >
                      <i className="fi-rs-shopping-bag-add"></i>
                    </a>
                  </span>
                  Design : &nbsp;{product?.designerName}
                </div>
              ) : (
                <>
                  <div className="product-price text-capitalize ">
                    Designer : &nbsp;{product?.designerName}
                  </div>

                  <div className="product-action-1 show">
                    <span>
                      <a
                        aria-label="Add To Cart"
                        className="action-btn hover-up"
                        onClick={(e) => handleCart(product)}
                      >
                        <i className="fi-rs-shopping-bag-add"></i>
                      </a>
                    </span>
                  </div>
                </>
              )}

              {/* <div className="product-action-1 show">
                <a
                  aria-label="Add To Cart"
                  className="action-btn hover-up"
                  onClick={(e) => handleCart(product)}
                >
                  <i className="fi-rs-shopping-bag-add"></i>
                </a>
              </div> */}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapDispatchToProps = {
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
