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

const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
  openQuickView,
    fabricPrice
}) => {
  const [loading, setLoading] = useState(false);
  
  const imageUrl=nextConfig.BASE_URL_UPLOADS
  const basePrice = product?.totalPrice || 0; // Ensure basePrice is a number or set it to 0
  const discountPercentage = product?.discountPercentage || 0; // Ensure discountPercentage is a number or set it to 0
  const discountAmount = (basePrice * discountPercentage) / 100;
  const totalPrice = basePrice - discountAmount;
  
 
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleCart = (product) => {
    addToCart(product);
    toast.success("Add to Cart !");
  };

  const handleCompare = (product) => {
    addToCompare(product);
    toast.success("Add to Compare !");
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast.success("Add to Wishlist !");
  };
  return (
    <>
      {!loading ? (
        <>
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <Link href="/products/[slug]" as={`/products/${product?.id}`}>
                  <a>
                    <img
                      className="default-img"
                      
                      src={imageUrl+product?.featuredImage}
                      crossOrigin="anonymous"
                      alt=""
                    />
                    {/* <img
                      className="hover-img"
                      src={imageUrl+product.image}
                      alt=""
                    /> */}

                    
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
              {product?.productType==1 ? <span className="hot">Hot Deals </span> : null}
       
              {product?.productType==0 ? <span className="hot">New Product </span> : null}
                
                  {product?.productType==2 ? <span className="hot">Best Seller </span> : null}
                  {product?.productType==3 ? <span className="hot">UP  Coming </span> : null}
           
              
              
              </div>
            </div>
            <div className="product-content-wrap">
              <div className="product-category">
                <Link href="/products">
                  <a>{product?.brandName}</a>
                </Link>
              </div>
              <h2>
                <Link href="/products/[slug]" as={`/products/${product?.id}`}>
                  <a>{product?.productName}</a>
                </Link>
              </h2>
              <div className="rating-result" title="90%">
                <span>
                  <span>{product?.ratingScore} </span>
                </span>
              </div>
              <div className="product-price">
        <span> ${totalPrice}</span>
        {discountPercentage > 0 && (
          <span className="old-price"> ${basePrice}</span>
        )}
        <span>{product?.discountPercentage}%</span>
      </div>
              <div className="product-price">
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

