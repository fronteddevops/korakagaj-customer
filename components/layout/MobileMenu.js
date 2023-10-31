import { useState, useEffect } from "react";

import Link from "next/link";
import useClickOutside from "../../util/outsideClick";
import Search from "../ecommerce/Search";
import services from "../../services";
import { useTranslation } from "react-i18next";
const MobileMenu = ({ isToggled, toggleClick }) => {
  const { t} = useTranslation("common");

  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const response = await services.myprofile.GET_MY_PROFILE();
      if (response) {
        setFirstName(response?.data?.data?.firstName);
        setLastName(response?.data?.data?.lastName);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  let domNode = useClickOutside(() => {
    setIsActive({
      status: false,
    });
  });

  return (
    <>
      <div
        className={
          isToggled
            ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
            : "mobile-header-active mobile-header-wrapper-style"
        }
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <Link href="/index">
                <a>
                  <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                </a>
              </Link>
            </div>
            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <button
                className="close-style search-close"
                onClick={toggleClick}
              >
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form action="#">
                {/* <input type="text" placeholder="Search for items…" /> */}
                <Search />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <div className="main-categori-wrap mobile-header-border">
                <Link href="#">
                  <a className="categori-button-active-2">
                    <span className="fi-rs-apps"></span>{" "}
                    {t("Browse Categories")}
                  </a>
                </Link>
                <div className="categori-dropdown-wrap categori-dropdown-active-small">
                  <ul>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-dress"></i>
                          {t("Women's Clothing")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-tshirt"></i>
                          {t("Men's Clothing")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-smartphone"></i>{" "}
                          {t("Cellphones")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-desktop"></i>
                          {t("Computer & Office")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-cpu"></i>
                          {t("Consumer Electronics")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-home"></i>
                          {t("Home & Garden")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-high-heels"></i>
                          {t("Shoes")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-teddy-bear"></i>
                          {t("Mother & Kids")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/products">
                        <a>
                          <i className="korakagaj-font-kite"></i>
                          {t("Outdoor fun")}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <nav>
                <ul className="mobile-menu" ref={domNode}>
                  <li
                    className={
                      isActive.key == 1
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(1)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link href="/index">
                      <a>{t("Home")}</a>
                    </Link>
                    <ul className={isActive.key == 1 ? "dropdown" : "d-none"}>
                      <li>
                        <Link href="/index">
                          <a>{t("Home 1")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/index-2">
                          <a>{t("Home 2")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/index-3">
                          <a>{t("Home 3")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/index-4">
                          <a>{t("Home 4")}</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 2
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(2)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link href="/products">
                      <a>{t("shop")}</a>
                    </Link>
                    <ul className={isActive.key == 2 ? "dropdown" : "d-none"}>
                      <li>
                        <Link href="/products">
                          <a>{t("Shop Grid – Right Sidebar")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/products">
                          <a>{t("Shop Grid – Left Sidebar")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-list-right">
                          <a>{t("Shop List – Right Sidebar")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-list-left">
                          <a>{t("Shop List – Left Sidebar")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-fullwidth">
                          <a>{t("Shop - Wide")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop-filter">
                          <a>{t("Shop – Filter")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop-wishlist">
                          <a>{t("Shop – Wishlist")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop-cart">
                          <a>{t("Shop – Cart")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop-checkout">
                          <a>{t("Shop – Checkout")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop-compare">
                          <a>{t("Shop – Compare")}</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 3
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(3)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link href="#">
                      <a>{t("Mega menu")}</a>
                    </Link>
                    <ul className={isActive.key == 3 ? "dropdown" : "d-none"}>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link href="#">
                          <a>{t("Women's Fashion")}</a>
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link href="/products">
                              <a>{t("Dresses")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Blouses & Shirts")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Hoodies & Sweatshirts")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Women's Sets")}</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link href="#">
                          <a>{t("Men's Fashion")}</a>
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link href="/products">
                              <a>{t("Jackets")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Casual Faux Leather")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Genuine Leather")}</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link href="#">
                          <a>{t("Technology")}</a>
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link href="/products">
                              <a>{t("Gaming Laptops")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Ultraslim Laptops")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Tablets")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Laptop Accessories")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>{t("Tablet Accessories")}</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 4
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(4)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link href="/blog-category-fullwidth">
                      <a>{t("Blog")}</a>
                    </Link>
                    <ul className={isActive.key == 4 ? "dropdown" : "d-none"}>
                      <li>
                        <Link href="/blog-category-grid">
                          <a>{t("Blog Category Grid")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-category-list">
                          <a>{t("Blog Category List")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-category-big">
                          <a>{t("Blog Category Big")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-category-fullwidth">
                          <a>{t("Blog Category Wide")}</a>
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <Link href="#">
                          <a>{t("Single Product Layout")}</a>
                        </Link>
                        <ul className="dropdown">
                          <li>
                            <Link href="/blog-post-left">
                              <a>{t("Left Sidebar")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/blog-post-right">
                              <a>{t("Right Sidebar")}</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/blog-post-fullwidth">
                              <a>{t("No Sidebar")}</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 5
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(5)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link href="#">
                      <a>{t("Pages")}</a>
                    </Link>
                    <ul className={isActive.key == 5 ? "dropdown" : "d-none"}>
                      <li>
                        <Link href="/page-about">
                          <a>{t("About Us")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-contact">
                          <a>{t("Contact")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-account">
                          <a>{t("My Account")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/login">
                          <a>{t("Log In / Sign Up")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-purchase-guide">
                          <a>{t("Purchase Guide")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-privacy-policy">
                          <a>{t("Privacy Policy")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-terms">
                          <a>{t("Terms of Service")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-404">
                          <a>{t("404 Page")}</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      isActive.key == 6
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(6)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link href="#">
                      <a>{t("Language")}</a>
                    </Link>
                    <ul className={isActive.key == 6 ? "dropdown" : "d-none"}>
                      <li>
                        <Link href="#">
                          <a>English</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>French</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>German</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>Spanish</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border">
              <div className="single-mobile-header-info mt-30">
                <Link href="/page-contact">
                  <a> {t("Our location")} </a>
                </Link>
              </div>
              <div className="single-mobile-header-info">
                {lastName && firstName ? (
                  <div>
                    {firstName} {lastName}
                  </div>
                ) : (
                  <Link href="/login">
                    <a>{t("Log In / Sign Up")}</a>
                  </Link>
                )}
              </div>
              <div className="single-mobile-header-info">
                <Link href="#">
                  <a>(+01) - 2345 - 6789 </a>
                </Link>
              </div>
            </div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">{t("Follow Us")}</h5>
              <Link href="#">
                <a>
                  <img
                    src="/assets/imgs/theme/icons/icon-facebook.svg"
                    alt=""
                  />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img
                    src="/assets/imgs/theme/icons/icon-instagram.svg"
                    alt=""
                  />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img
                    src="/assets/imgs/theme/icons/icon-pinterest.svg"
                    alt=""
                  />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
