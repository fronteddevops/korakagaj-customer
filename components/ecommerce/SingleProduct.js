import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import Loader from './../elements/Loader';
import nextConfig from "../../next.config";
import services from "../../services";


const SingleProduct = ({
  product,
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
  fabricPrice
}) => {
  const [loading, setLoading] = useState(false);


  const imageUrl = nextConfig.BASE_URL_UPLOADS
  const basePrice = product?.totalPrice || 0; // Ensure basePrice is a number or set it to 0
  const discountPercentage = product?.discountPercentage || 0; // Ensure discountPercentage is a number or set it to 0
  const discountAmount = (basePrice * discountPercentage) / 100;
  const totalPrice = basePrice - discountAmount;




  const handleCart = async (product) => {
    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART()
      let cartDetails = []
      if (cart.data.data[0].cartDetail) {
        cartDetails = cart.data.data[0].cartDetail.cartDetails
      }
      cartDetails.push(product)
      const key = 'id';
      const unique = [...new Map(cartDetails.map(item =>
        [item[key], item])).values()];
      let data = {
        cartDetail: {cartDetails: unique}
      }
      console.log(data)
      const updateCart = await services.cart.UPDATE_CART(data)
      console.log(updateCart)
      toast.success("Add to Cart !");
      
    } else {
      const cart = localStorage.getItem('cartDetail') && JSON.parse(localStorage.getItem('cartDetail')) 
      let cartDetails = []
      if (cart) {
        cartDetails = cart.cartDetails
      }
      cartDetails.push(product)
      const key = 'id';
      const unique = [...new Map(cartDetails.map(item =>
        [item[key], item])).values()];
      let data = {
        cartDetail: {cartDetails: unique}
      }
      console.log(data)
     localStorage.setItem('cartDetail', JSON.stringify(data.cartDetail))
    }
  };





  const handleWishlist = async (product) => {
    const productstatus = localStorage.getItem("productstatus")
    // console.log("kkkkkkkkkkkkkkkkkkkk",productstatus)

    if (localStorage.getItem("access_token")) {
      if (!localStorage.getItem("productstatus")) {
        services.NewWishlist([product])
        toast.success("Add to Wishlist !");

        return;
      } else if (localStorage.getItem("productstatus")) {
        services.NewWishlist([product])
        toast.success("Remove to Wishlist !");
      }


    } else {
      addToWishlist(product);
      toast.success("Add to Wishlist !");
    }

  };
  return (
    <>
      {!loading ? (
        <>
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom" style={{ backgroundColor: '#f2f2f2', width: '270px', height: '250 px' }}>
                <Link href="/products/[slug]" as={`/products/${product?.id}`}>
                  <a>
                    <img
                      className="default-img"
                      src={imageUrl + product?.featuredImage}
                      crossOrigin="anonymous"
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </a>
                </Link>
              </div>

              <div className="product-action-1">
                <a
                  aria-label="Quick view"
                  className="action-btn hover-up"
                  data-bs-toggle="modal"
                  onClick={(e) => openQuickView(product)}
                >
                  <i className="fi-rs-eye"></i>
                </a>
                <a
                  aria-label="Add To Wishlist"
                  className="action-btn hover-up"
                  onClick={(e) => handleWishlist(product)}
                >
                  <i className="fi-rs-heart"></i>
                </a>

              </div>

              <div className="product-badges product-badges-position product-badges-mrg">
                {product?.productType == 1 ? <span className="hot">Hot Deals </span> : null}

                {product?.productType == 0 ? <span className="hot">New Product </span> : null}

                {product?.productType == 2 ? <span className="hot">Best Seller </span> : null}
                {product?.productType == 3 ? <span className="hot">UP  Coming </span> : null}



              </div>
            </div>
            <div className="product-content-wrap">
              <div className="product-category">
                <Link href="/products">
                  <a className="text-capitalize">{product?.SubSubCategory?.subSubCategoryName}</a>
                </Link>
              </div>
              <h2>
                <Link href="/products/[slug]" as={`/products/${product?.id}`}>
                  <a className="text-capitalize">{product?.productName}</a>
                </Link>
              </h2>
              <div className="rating-result" title="90%">
                <span>
                  <span>{product?.ratingScore} </span>
                </span>
              </div>
              <div className="product-price">
                <span>${totalPrice}</span>
                {discountPercentage > 0 && (
                  <span className="old-price"> ${basePrice}</span>
                )}
                <span>
                  {product?.discountPercentage > 0
                    ? `${product?.discountPercentage}%`
                    : ''}
                </span>
              </div>
              <div className="product-price text-capitalize ">
                Designer : &nbsp;{product?.designerName}
              </div>

              <div className="product-action-1 show">
                <a
                  aria-label="Add To Cart"
                  className="action-btn hover-up"
                  onClick={(e) => handleCart(product)}
                >
                  <i className="fi-rs-shopping-bag-add"></i>
                </a>
              </div>
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

