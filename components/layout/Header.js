import i18n from "next-i18next";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../ecommerce/Search";
import service from "../../services";
import NavDropdown from "react-bootstrap/NavDropdown";
import ShopWishlist from "../../pages/shop-wishlist";
import services from "../../services";
import { useTranslation } from "react-i18next";
import nextConfig from "../../next.config";
import i18next from "i18next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Header = ({ toggleClick, headerStyle }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const { t, i18n } = useTranslation("common");

  const router = useRouter();
  const [lang, setLang] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [HoveredSabCategoryId, setHoveredSabCategoryId] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [url, seturl] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState();
  const [totalWishlistItems, setTotalWishlistItems] = useState();
  const [SubCate, setSubCate] = useState(false);
  const GetWishlistdata = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const WishlistResponse = await services.Wishlist.GET_WISHLIST_DATA();

        setTotalWishlistItems(WishlistResponse?.data?.data?.length);
      } catch (error) {
        // Handle errors here
        console.error("An error occurred:", error);
      }

      return;
    }
  };
  const hindi = "";
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
    GetWishlistdata();
    cheklogin();
    handleCart();
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
    getProfile();
  }, [lang, totalWishlistItems]);
  const getProfile = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const response = await service.myprofile.GET_MY_PROFILE();
        localStorage.setItem("profile", JSON.stringify(response?.data?.data));
        if (response) {
          setFirstName(response?.data?.data?.firstName);
          setLastName(response?.data?.data?.lastName);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggle = () => {
    CategoryList();
    setToggled(!isToggled);
  };
  //get category list
  const CategoryList = async () => {
    // const response = await service.category.GET_CATEGORY();
    // setCategoryList(response?.data?.data?.rows);
    const respo = await services.category.GET_CATEGORY_ALL();
    setCategoryList(respo.data.data);
  };
  // Get sub category list
  const subCategoryList = async (id) => {
    setSubCate(false);
    const response = await service.subCategory.GET_ALL_SUB_CATEGORY(id);
    setSubCategory(response.data.data.rows);
    const subSubCategoriesArray = [];
    for (const subCategoryItem of response.data.data.rows) {
      const subSubCategoryResponse =
        await service.subSubCategory.GET_SUB_SUB_CATEGORYALL(
          subCategoryItem.id
        );
      subSubCategoriesArray.push(...subSubCategoryResponse.data.data.rows);
    }
    console.log("SubCategory");
  };

  //user name

  const handleCart = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const cart = await service.cart.GET_CART();
        setTotalCartItems(cart?.data?.data?.cartDetail?.cartDetails?.length);
      } catch (error) {
        console.log(error);
      }
    } else {
      const cart =
        localStorage.getItem("cartDetail") &&
        JSON.parse(localStorage.getItem("cartDetail"));
      setTotalCartItems(cart?.cartDetails?.length);
    }
  };
  const cheklogin = () => {
    if (localStorage.getItem("access_token")) {
      seturl(true);
    }
  };

  const navigateOrders = async (productId) => {
    // Example: Navigate to the /products/[slug] page with a specific product ID

    await router.push("/myprofile?index=5");
  };
  const navigateAddress = async (productId) => {
    // Example: Navigate to the /products/[slug] page with a specific product ID

    await router.push("/myprofile?index=4");
  };
  const navigateProfile = async (productId) => {
    // Example: Navigate to the /products/[slug] page with a specific product ID

    await router.push("/myprofile?index=2");
  };

  const subSubCategoryList = async (id) => {
    const subSubCategory = await service.subSubCategory.GET_SUB_SUB_CATEGORYALL(
      id
    );

    setSubSubCategory(subSubCategory?.data?.data?.rows);
    setSubCate(true);
    console.log("Sub Sub Category");
  };
  return (
    <>
      <header className={`header-area ${headerStyle} header-height-2`}>
        <div className="header-top header-top-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-4">
                <div className="header-info">
                  <ul>
                    <li>
                      <i className="fi-rs-smartphone"></i>
                      <a>
                        <a>+91-9791028374</a>
                      </a>
                    </li>
                    <li>
                      <i className="fi-rs-marker"></i>
                      <Link href="/page-contact">
                        <a>{t("Basti, UP, India")}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    <ul>
                      <li>
                        {t("Get great offer up to 50% off")}
                        <Link href="/products">
                          <a> {t("View detail")}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <div className="header-info header-info-right">
                  <ul>
                    <li>
                      <a>
                        <a className="language-dropdown-active">
                          <i className="fi-rs-world"></i>
                          {lang && <span>{lang}</span>}
                          <i className="fi-rs-angle-small-down"></i>
                        </a>
                      </a>
                      <ul className="language-dropdown">
                        <li>
                          <a>
                            <a
                              onClick={() => {
                                i18n.changeLanguage("hi");
                                setLang("Hindi");
                                sessionStorage.setItem("lang", "Hindi");
                              }}
                            >
                              <img
                                src="/assets/imgs/theme/India-flag.png"
                                alt=""
                              />
                              Hindi
                            </a>
                          </a>
                        </li>
                        <li>
                          <a>
                            <a
                              onClick={() => {
                                i18n.changeLanguage("en");
                                setLang("English");
                                sessionStorage.setItem("lang", "English");
                              }}
                            >
                              <img
                                src="/assets/imgs/theme/English-flag.png"
                                height="10px"
                                width="20px"
                              />
                              English
                            </a>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <i className="fi-rs-user"></i>
                      {lastName && firstName ? (
                        <NavDropdown
                          id="nav-dropdown-light-example"
                          title={`${
                            firstName?.length > 15
                              ? firstName?.substring(0, 15) + ".."
                              : firstName
                          } ${
                            lastName?.length > 15
                              ? lastName?.substring(0, 15) + ".."
                              : lastName
                          }`}
                          menuVariant="light"
                          className="profile-dropdown"
                        >
                          <NavDropdown.Item onClick={navigateProfile}>
                            {t("My Orders")}
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={navigateAddress}>
                            {t("My Address")}
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={navigateOrders}>
                            {t("My Profile")}
                          </NavDropdown.Item>
                          <NavDropdown.Divider />

                          {/* <NavDropdown.Item
                            href="/"
                            onClick={() => {
                              localStorage.removeItem("access_token"),
                                localStorage.removeItem("userId");
                            }}
                          >
                            {t("Logout")}
                          </NavDropdown.Item> */}
                          <div style={{ marginLeft: "10px" }}>
                            <Link href="/login/" as={`/login/`}>
                              <a
                                onClick={() => {
                                  localStorage.removeItem("access_token");
                                  localStorage.removeItem("userId");
                                }}
                              >
                                {t("Logout")}
                              </a>
                            </Link>
                          </div>
                        </NavDropdown>
                      ) : (
                        <Link href="/login">
                          <a>
                            {t("Log In")}/{t("Sign Up")}
                          </a>
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <Link href="/">
                  <a>
                    <img
                      className="w-100"
                      src="/assets/imgs/theme/logo.svg"
                      alt="logo"
                    />
                  </a>
                </Link>
              </div>
              <div className="header-right">
                <div className="search-style-2">
                  <Search />
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    {url && (
                      <div className="header-action-icon-2">
                        <Link href={"/shop-wishlist"}>
                          <a>
                            <img
                              className="svgInject"
                              alt="korakagaj"
                              src="/assets/imgs/theme/icons/icon-heart.svg"
                            />
                            <span className="pro-count blue">
                              {totalWishlistItems > 0 ? totalWishlistItems : 0}
                            </span>
                          </a>
                        </Link>
                      </div>
                    )}
                    <div className="header-action-icon-2">
                      <Link href="/shop-cart" as={`/shop-cart`}>
                        <a className="mini-cart-icon">
                          <img
                            alt="korakagaj"
                            src="/assets/imgs/theme/icons/icon-cart.svg"
                          />
                          <span className="pro-count blue">
                            {totalCartItems > 0 ? totalCartItems : 0}
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            scroll
              ? "header-bottom header-bottom-bg-color sticky-bar stick"
              : "header-bottom header-bottom-bg-color sticky-bar"
          }
        >
          <div className="container">
            <div className="header-wrap header-space-between position-relative">
              <div className="logo logo-width-1 d-block d-lg-none">
                <Link href="/">
                  <a>
                    <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className="header-nav d-none d-lg-flex">
                <div className="main-categori-wrap d-none d-lg-block">
                  <a
                    className="categori-button-active text-dark"
                    onClick={handleToggle}
                  >
                    <span className="fi-rs-apps"></span>
                    {t("Browse Categories")}
                  </a>
                  <div
                    className={
                      isToggled
                        ? "categori-dropdown-wrap categori-dropdown-active-large open"
                        : "categori-dropdown-wrap categori-dropdown-active-large"
                    }
                  >
                    <ul>
                      {categoryList &&
                        categoryList.map((item) => (
                          <li className="has-children" key={item.id}>
                            <Link
                              href={`/products?categoryId=${item?.id}&categoryName=${item?.categoryName}`}
                              as={`/products?categoryId=${item?.id}&categoryName=${item?.categoryName}`}
                            >
                              <a
                                onMouseEnter={() => subCategoryList(item.id)}
                                onMouseLeave={() => setHoveredCategoryId(null)}
                              >
                                <img
                                  src={imageUrl + item?.icon}
                                  crossOrigin="anonymous"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: "15px",
                                  }}
                                  className="align-self-center mr-2"
                                  alt="not found"
                                />
                                {item.categoryName}
                              </a>
                            </Link>
                            <div className="dropdown-menu">
                              <ul className="mega-menu d-lg-flex">
                                <li className="mega-menu-col col-lg-7">
                                  <ul className="d-lg-flex">
                                    {subCategory &&
                                      subCategory.length > 0 &&
                                      subCategory.map((subItem) => (
                                        <li
                                          className="mega-menu-col col-lg-6"
                                          key={subItem.id}
                                        >
                                          <ul>
                                            <li>
                                              <a
                                                onMouseEnter={() =>
                                                  subSubCategoryList(subItem.id)
                                                }
                                                onMouseLeave={() =>
                                                  setHoveredSabCategoryId(null)
                                                }
                                              >
                                                <Link
                                                  href={`/products/?subcategoryId=${subItem?.id}&subcategoryName=${subItem?.subCategoryName}`}
                                                  as={`/products/?subcategoryId=${subItem?.id}&subcategoryName=${subItem?.subCategoryName}`}
                                                >
                                                  <span className="submenu-title">
                                                    {subItem.subCategoryName}
                                                  </span>
                                                </Link>
                                              </a>
                                            </li>
                                          </ul>
                                        </li>
                                      ))}
                                  </ul>
                                </li>
                              </ul>
                              <li>
                                <div style={{ marginLeft: "35px" }}>
                                  {SubCate &&
                                    subSubCategory &&
                                    subSubCategory.length > 0 &&
                                    subSubCategory.map((subSubItem) => (
                                      <li key={subSubItem.id}>
                                        <Link
                                          href={`/products/?subsubcategoryId=${subSubItem?.id}&subsubcategoryName=${subSubItem?.subSubCategoryName}`}
                                          as={`/products/?subsubcategoryId=${subSubItem?.id}&subsubcategoryName=${subSubItem?.subSubCategoryName}`}
                                        >
                                          <a className="dropdown-item nav-link nav_item">
                                            {subSubItem.subSubCategoryName}
                                          </a>
                                        </Link>
                                      </li>
                                    ))}
                                </div>
                              </li>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* <div
                    className={
                      isToggled
                        ? "categori-dropdown-wrap categori-dropdown-active-large open"
                        : "categori-dropdown-wrap categori-dropdown-active-large"
                    }
                  >
                    <ul>
                      <li className="has-children">
                        {categoryList &&

                          categoryList.map((item) => (
                            <Link href="/products">

                                <i className="korakagaj-font-dress"></i>
                                {item.categoryName}
                              </a>
                            </Link>
                          ))}
                        <div className="dropdown-menu">
                          <ul className="mega-menu d-lg-flex">
                            <li className="mega-menu-col col-lg-7">
                              <ul className="d-lg-flex">
                                {subCategory &&
                                  subCategory.map((item) => (
                                    <li className="mega-menu-col col-lg-6">
                                      <ul>
                                        <li>
                                          <span className="submenu-title">
                                            {item.subCategoryName}
                                          </span>
                                        </li>

                                        {subSubCategory.map((item) => (
                                          <li>
                                            <LinategoryName}
                                              </a>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div> */}
                </div>
                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                  <nav>
                    <ul>
                      <li>
                        <Link href="/">
                          <a
                            className={router.pathname === "/" ? "active" : ""}
                          >
                            {t("Home")}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-about">
                          <a
                            className={
                              router.pathname === "/page-about" ? "active" : ""
                            }
                          >
                            {t("About")}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products" as={`/products`}>
                          <a
                            className={
                              router.pathname === "/products" ? "active" : ""
                            }
                          >
                            {t("Shop")}
                          </a>
                        </Link>
                      </li>

                      <li>
                        <Link href="/blog-category-grid">
                          <a
                            className={
                              router.pathname === "/blog-category-grid"
                                ? "active"
                                : ""
                            }
                          >
                            {t("Blog")}
                            <i className="fi-rs-angle-down"></i>
                          </a>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link
                              href="/blog-category-grid"
                              as={`/blog-category-grid`}
                            >
                              <a
                                className={
                                  router.pathname === "/blog-category-grid"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("Blog Category Grid")}
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog-category-list"
                              as={`/blog-category-list`}
                            >
                              <a
                                className={
                                  router.pathname === "/blog-category-list"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("Blog Category List")}
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog-category-big"
                              as={`/blog-category-big`}
                            >
                              <a
                                className={
                                  router.pathname === "/blog-category-big"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("Blog Category Big")}
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog-category-fullwidth"
                              as={`/blog-category-fullwidth`}
                            >
                              <a
                                className={
                                  router.pathname === "/blog-category-fullwidth"
                                    ? "active"
                                    : ""
                                }
                              >
                                {t("Blog Category Wide")}
                              </a>
                            </Link>
                          </li>
                          <li>
                            <a>
                              <a
                                className={
                                  router.pathname === "/#" ? "active" : ""
                                }
                              >
                                {t("Single Post")}
                                <i className="fi-rs-angle-right"></i>
                              </a>
                            </a>
                            <ul className="level-menu level-menu-modify">
                              <li>
                                <Link
                                  href="/blog-post-left"
                                  as={`/blog-post-left`}
                                >
                                  <a
                                    className={
                                      router.pathname === "/blog-post-left"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Left Sidebar")}
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/blog-post-right"
                                  as={`/blog-post-right`}
                                >
                                  <a
                                    className={
                                      router.pathname === "/blog-post-right"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("Right Sidebar")}
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/blog-post-fullwidth"
                                  as={`/blog-post-fullwidth`}
                                >
                                  <a
                                    className={
                                      router.pathname === "/blog-post-fullwidth"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {t("No Sidebar")}
                                  </a>
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <Link href="/page-contact">
                          <a
                            className={
                              router.pathname === "/page-contact"
                                ? "active"
                                : ""
                            }
                          >
                            {t("Contact")}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="hotline d-none d-lg-block">
                <p className="text-dark">
                  <i className="fi-rs-headset"></i>
                  <span></span> +91-9791028374
                </p>
              </div>
              {/* <p className="mobile-promotion">
                Happy
                <span className="text-brand">Mother's Day</span>. Big Sale Up to
                40%
              </p> */}
              <div className="header-action-right d-block d-lg-none">
                <div className="header-action-2">
                  <div className="header-action-icon-2">
                    <Link href={"/shop-wishlist"}>
                      <a>
                        <img
                          className="svgInject"
                          alt="korakagaj"
                          src="/assets/imgs/theme/icons/icon-heart.svg"
                        />
                        <span className="pro-count blue">
                          {totalWishlistItems > 0 ? totalWishlistItems : 0}
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="header-action-icon-2">
                    <Link href="/shop-cart" as={`/shop-cart`}>
                      <a className="mini-cart-icon">
                        <img
                          alt="korakagaj"
                          src="/assets/imgs/theme/icons/icon-cart.svg"
                        />
                        <span className="pro-count white">
                          {totalCartItems > 0 ? totalCartItems : 0}
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="header-action-icon-2 d-block d-lg-none">
                    <div
                      className="burger-icon burger-icon-white"
                      onClick={toggleClick}
                    >
                      <span className="burger-icon-top"></span>
                      <span className="burger-icon-mid"></span>
                      <span className="burger-icon-bottom"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
