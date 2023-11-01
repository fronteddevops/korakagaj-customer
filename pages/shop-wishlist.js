import { connect } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import nextConfig from "../next.config";
import SingleProduct from "../components/ecommerce/SingleProduct";

import {
  clearWishlist,
  closeWishlistModal,
  deleteFromWishlist
} from "../redux/action/wishlistAction";
import services from "../services";
import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { useTranslation } from "react-i18next";

const Wishlist = ({
  
  handleWishlistLength,
  wishlist,
  clearWishlist,
  closeWishlistModal,
  deleteFromWishlist,
  addToCart,
}) => {
  const { t } = useTranslation("common");
  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const [WishlistData, setWishlistdata] = useState()
  const [WishlistLength, setWishlistLength] = useState()




  const GetWishlistdata = async (wishlist) => {
    if (localStorage.getItem("access_token")) {
      try {
        const WishlistResponse = await services.Wishlist.GET_WISHLIST_DATA();
        setWishlistdata(WishlistResponse?.data?.data)
        setWishlistLength(WishlistResponse?.data?.data?.length)

      } catch (error) {
        console.error("An error occurred:", error);
      }

      return;
    } else {
   //  addToWishlist(product);
     // toast.success("Add to Wishlist !");
    }

  }

  useEffect((wishlist) => {
    GetWishlistdata(wishlist);
    <Header lengthData={WishlistLength} />
  }, [wishlist]);

  const handleCart = (product) => {
    addToCart(product);
    toast.success("Add to Cart !");
  };
  const calculateTotalPrice = (product) => {
    let itemTotalPrice = 0; // Initialize totalPrice to 0

    const basePrice = product.totalPrice || 0; // Ensure basePrice is a number or set it to 0
    const discountPercentage = product.discountPercentage || 0; // Ensure discountPercentage is a number or set it to 0
    const discountAmount = (basePrice * discountPercentage) / 100;
    itemTotalPrice = basePrice - discountAmount;
    return itemTotalPrice; // Return the calculated total price
  };


  return (
    <>
      <Layout parent={t("Home")} sub={<><a href="/products"> {t("Product")}</a></>} subChild={t("Wishlist")}>
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row product-grid-3">

              {WishlistData?.map((item, i) => (
                <div
                  className="col-lg-3 col-md-3 col-6 col-sm-6"
                  key={i}
                >

                  <SingleProduct
                    data1={item}
                    product={item?.Product}
                  />

                </div>
              ))}

            </div>

          </div>
        </section>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  wishlist: state.wishlist,

});

const mapDispatchToProps = {
  closeWishlistModal,
  deleteFromWishlist,
  clearWishlist,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
