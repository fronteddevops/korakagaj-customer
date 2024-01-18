import { connect } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import nextConfig from "../next.config";
import SingleProduct from "../components/ecommerce/SingleProduct";
import "font-awesome/css/font-awesome.min.css";

import QuickView from "../components/ecommerce/QuickView";
import { useRouter } from "next/router";
import {
  clearWishlist,
  closeWishlistModal,
  deleteFromWishlist,
} from "../redux/action/wishlistAction";
import services from "../services";
import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { isMobile } from "react-device-detect";

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
  const [WishlistData, setWishlistdata] = useState();
  const [WishlistLength, setWishlistLength] = useState();
  const [activeIndex, setActiveIndex] = useState(3);
  const [breadCrumb, setBreadCrumb] = useState(t(""));
  const route = useRouter();

  const GetWishlistdata = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const WishlistResponse = await services.Wishlist.GET_WISHLIST_DATA();
        if (
          WishlistResponse?.data?.data &&
          WishlistResponse?.data?.data.length > 0
        ) {
          let data = WishlistResponse?.data?.data.map((item) => {
            item.Product.isWishlisted = true;
            return item;
          });

          setWishlistdata(data);
          setWishlistLength(WishlistResponse?.data?.data?.length);
        } else {
          setWishlistdata([]);
          setWishlistLength(0);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }

      return;
    }
  };

  useEffect(() => {
    GetWishlistdata();
  }, []);

  return (
    <>
      <Layout
        parent={t("Home")}
        sub={
          <>
            <Link href="/products" as={`/products`}>
              {t("Product")}
            </Link>
          </>
        }
        subChild={t("Wishlist")}
      >
        <section className="pt-20 pb-50">
          <div className="container">
            <div className="row">
              <div
                className={
                  activeIndex === 4
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="address"
                role="tabpanel"
                aria-labelledby="address-tab"
              >
                {/* <div className="col-lg-12 text-end mb-2">
                  <button
                    className="btn btn-fill-out"
                    style={{ width: "150px", padding: "1rem" }}
                    onClick={handleaddaddress}
                  >
                    <i class="fa fa-plus fs-6 me-2"></i>
                    {t("Add Address")}
                  </button>
                </div> */}
              </div>

              <div className="col-lg-12 m-auto">
                <div className="row">
                  <div className="col-md-2">
                    <div className="dashboard-menu">
                      <ul className="nav flex-column" role="tablist">
                        <li
                          className="nav-item"
                          onClick={() => {
                            route.push("/myprofile/?index=1");
                          }}
                        >
                          <a
                            className={
                              activeIndex === 1 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-settings-sliders mr-10"></i>
                            {t("Dashboard")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            route.push("/myprofile/?index=2");
                          }}
                        >
                          <a
                            className={
                              activeIndex === 2 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-shopping-bag mr-10"></i>
                            {t("Orders")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => route.push("/shop-wishlist")}
                        >
                          <a
                            className={
                              activeIndex === 3 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-heart"></i>
                            &nbsp; Wishlist
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            route.push("/myprofile/?index=4");
                          }}
                        >
                          <a
                            className={
                              activeIndex === 4 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-marker mr-10"></i>
                            {t("My Address")}
                          </a>
                        </li>

                        <li
                          className="nav-item"
                          onClick={() => {
                            route.push("myprofile/?Address=1");
                          }}
                        >
                          <a
                            className={
                              activeIndex === 8 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i class="fa fa-plus fs-6 me-2"></i> &nbsp;
                            {t("Add Address")}
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            route.push("/myprofile/?index=5");
                          }}
                        >
                          <a
                            className={
                              activeIndex === 5 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i className="fi-rs-user mr-10"></i>
                            {t("Account details")}
                          </a>
                        </li>
                        <li
                          style={{ whiteSpace: "nowrap" }}
                          className="nav-item"
                          onClick={() => {
                            route.push("/myprofile/?index=6");
                          }}
                        >
                          <a
                            className={
                              activeIndex === 6 ? "nav-link active" : "nav-link"
                            }
                          >
                            <i class="fa fa-key mr-10"></i>
                            {t("Change password")}
                          </a>
                        </li>
                        <li className="nav-item">
                          <Link href="/login">
                            <a className="nav-link">
                              <i className="fi-rs-sign-out mr-10"></i>
                              {t("SingOut")}
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <section className={isMobile ? "mt-50 mb-50" : " mb-50"}>
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
                                isWishlisted={item.isWishlisted}
                                source={"wishlist"}
                                GetWishlistdata={GetWishlistdata}
                                
                              />
                              
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <QuickView source={"wishlist"} GetWishlistdata={GetWishlistdata} />
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
