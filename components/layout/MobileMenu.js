import { useState, useEffect } from "react";

import Link from "next/link";
import useClickOutside from "../../util/outsideClick";
import Search from "../ecommerce/Search";
import services from "../../services";
import { useTranslation } from "react-i18next";
const MobileMenu = ({ isToggled, toggleClick }) => {
  const { t, i18n } = useTranslation("common");
  const [lang, setLang] = useState("");
  const [categoryList, setCategory] = useState([]);
  const [IconsRemove, setIconsRemove] = useState([]);
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //language change function
  const handleLang = () => {
    if (sessionStorage.getItem("lang") === "Hindi") {
      i18n.changeLanguage("hi");
      const lng = sessionStorage.getItem("lang");
      setLang(lng);
    } else if (sessionStorage.getItem("lang") === "English") {
      i18n.changeLanguage("en");
      const lng = sessionStorage.getItem("lang");

      setLang(lng);
    }
  };

  useEffect(() => {
    const langdata = sessionStorage.getItem("lang");

    setLang(langdata);
    handleLang();
    getProfile();
  }, [lang]);
  const getProfile = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const response = await services.myprofile.GET_MY_PROFILE();
        if (response) {
          setFirstName(response?.data?.data?.firstName);
          setLastName(response?.data?.data?.lastName);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getCategroy();
  }, []);
  const handleToggle = (key) => {
    if (isActive.key === key) {
      getCategroy();
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

  const getCategroy = async () => {
    try {
      const response = await services.category.GET_CATEGORY_ALL();
      if (response) {
        setCategory(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const iconRemove = (data) => {
    setIconsRemove(data.length);
  };

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
                <img src="/assets/imgs/applatus1.jpg" alt="logo" /> 
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
                <Search iconRemove={iconRemove} />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              {/* <div className="main-categori-wrap mobile-header-border">
                <a className="categori-button-active-2">
                  <span className="fi-rs-apps"></span> {t("Browse Categories")}
                </a>

                 <div className="categori-dropdown-wrap categori-dropdown-active-small">
                   <ul></ul>
                 </div>
              </div> */}

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
                    ></span>
                    <Link href="/">{t("Home")}</Link>
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
                      {IconsRemove == 0 && (
                        <i className="fi-rs-angle-small-down"></i>
                      )}
                    </span>

                    <a>{t("Shop")}</a>

                    <ul className={isActive.key == 2 ? "dropdown" : "d-none"}>
                      <li>
                        <Link href="/products">{t("Shop List")}</Link>
                      </li>

                      <li>
                        <Link href="/shop-wishlist">
                          {t("Shop – Wishlist")}
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop-cart" as={`/shop-cart`}>
                          {t("Shop – Cart")}
                        </Link>
                      </li>
                      {/* <li>
                        <Link href="/shop-checkout">
                          {t("Shop – Checkout")}
                        </Link>
                      </li> */}
                    </ul>
                  </li>

                  {/* moblie menu category show in the start  */}
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
                      {IconsRemove == 0 && (
                        <i className="fi-rs-angle-small-down"></i>
                      )}
                    </span>

                    <a>{t("category")}</a>
                    <ul className={isActive.key == 3 ? "dropdown" : "d-none"}>
                      {categoryList &&
                        categoryList?.map((item) => (
                          <li className="menu-item-has-children" key={item.id}>
                            <span className="menu-expand"></span>
                            <Link href="/products">{item?.categoryName}</Link>
                            <ul className="dropdown">
                              {item?.SubCategories?.map(
                                (subCategory, subIndex) => (
                                  <li
                                    className="menu-item-has-children"
                                    key={subCategory?.id}
                                  >
                                    <Link href="/products">
                                      {subCategory?.subCategoryName}
                                    </Link>
                                    {subCategory?.SubSubCategories.map(
                                      (subSubCategory, subSubIndex) => (
                                        <ul
                                          className="dropdown"
                                          key={subSubCategory?.id}
                                        >
                                          <li
                                            className="menu-item-has-children"
                                            key={subSubCategory?.id}
                                          >
                                            <Link href="/products">
                                              {
                                                subSubCategory?.subSubCategoryName
                                              }
                                            </Link>
                                          </li>
                                        </ul>
                                      )
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </li>

                  {/* moblie menu category show in the end  */}

                  {/* <li
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

                    <a>{t("Blog")}</a>

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
                        <Link
                          href="/blog-category-big"
                          as={`/blog-category-big`}
                        >
                          <a>{t("Blog Category Big")}</a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog-category-fullwidth"
                          as={`/blog-category-fullwidth`}
                        >
                          <a>{t("Blog Category Wide")}</a>
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <span className="menu-expand"></span>
                        <a>
                          <a>{t("Single Product Layout")}</a>
                        </a>
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
                  </li> */}
                  {/* <li
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

                    <a>{t("Pages")}</a>

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
                  </li> */}
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
                      {IconsRemove == 0 && (
                        <i className="fi-rs-angle-small-down"></i>
                      )}
                    </span>

                    <a>{t("Language")}</a>

                    <ul className={isActive.key == 6 ? "dropdown" : "d-none"}>
                      <li>
                        <a
                          onClick={() => {
                            i18n.changeLanguage("en");
                            setLang("English");
                            sessionStorage.setItem("lang", "English");
                          }}
                        >
                          English
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            i18n.changeLanguage("hi");
                            setLang("Hindi");
                            sessionStorage.setItem("lang", "Hindi");
                          }}
                        >
                          Hindi
                        </a>
                      </li>
                    </ul>
                  </li>

                  {firstName && lastName && (
                    <li
                      className={
                        isActive.key == 7
                          ? "menu-item-has-children active"
                          : "menu-item-has-children"
                      }
                    >
                      <span
                        className="menu-expand"
                        onClick={() => handleToggle(7)}
                      >
                        <i className="fi-rs-angle-small-down"></i>
                      </span>

                      <a>{t("My Profile")}</a>

                      <ul className={isActive.key == 7 ? "dropdown" : "d-none"}>
                        <li>
                          <Link href="/myprofile?index=5">
                            {t("My Profile")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/myprofile?index=4">
                            {t("My Address")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/myprofile?index=2">
                            {t("My Orders")}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border">
              <div className="single-mobile-header-info">
                {lastName && firstName ? (
                  <div>
                    <b>
                      {" "}
                      {firstName} {lastName}
                    </b>
                  </div>
                ) : (
                  <Link href="/login">
                    <span>
                      {" "}
                      {t("Sign In")}/{t("Sign Up")}
                    </span>
                  </Link>
                )}
                {lastName && firstName && (
                  <>
                    <Link href="/login/" as={`/login/`}>
                      <a
                        onClick={() => {
                          localStorage.removeItem("access_token");
                          localStorage.removeItem("userId");
                          localStorage.setItem("wishListItemsCount", 0);
                          localStorage.setItem("cartItemsCount", 0);
                        }}
                      >
                        {t("SingOut")}
                      </a>
                    </Link>
                  </>
                )}
              </div>
              {/* <div className="single-mobile-header-info">
                <a>
                  <a>(+01) - 2345 - 6789 </a>
                </a>
              </div> */}
            </div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">{t("Follow Us")}</h5>
              <a>
                <img src="/assets/imgs/theme/icons/icon-facebook.svg" alt="" />
              </a>
              <a>
                <img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
              </a>

              <a>
                <img src="/assets/imgs/theme/icons/icon-instagram.svg" alt="" />
              </a>

              <a>
                <img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt="" />
              </a>
              <a>
                <img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
