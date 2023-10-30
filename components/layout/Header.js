import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../ecommerce/Search";
import service from "../../services";
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShopWishlist from "../../pages/shop-wishlist";
import services from "../../services";
const Header = ({
  toggleClick,
  headerStyle,
}) => {

  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [addCartLength, setAddCartLength] = useState()
  const [userName, setUserName] = useState([])
  const [addWishlistLength, setAddWishlistLength] = useState()

  const [totalCartItems, setTotalCartItems] = useState()
  const [totalWishlistItems, setTotalWishlistItems] = useState()

  const GetWishlistdata = async () => {

    if (localStorage.getItem("access_token")) {

      try {

        const WishlistResponse = await services.Wishlist.GET_WISHLIST_DATA();

        setTotalWishlistItems(WishlistResponse?.data?.data?.length)


      } catch (error) {
        // Handle errors here
        console.error("An error occurred:", error);
      }

      return;
    }


  }



  useEffect(() => {
    GetWishlistdata()
    handleCart()
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
    if(  localStorage.getItem("user")&&  localStorage.getItem("user").length>0){
    
      setUserName(JSON.parse(localStorage.getItem("user") ) )
    }
    else{
      setUserName(null)
    }
  
  }, []);

  const handleToggle = () => {
    CategoryList();
    setToggled(!isToggled);
  };
  //get category list
  const CategoryList = async () => {
    const response = await service.category.GET_CATEGORY();

    setCategoryList(response?.data?.data?.rows);
  };

  //gt sub category list
  // Get sub category list
  const subCategoryList = async (id) => {
    const response = await service.subCategory.GET_ALL_SUB_CATEGORY(id);

    setSubCategory(response.data.data.rows);

    // Create an array to accumulate subsubcategories
    const subSubCategoriesArray = [];

    // Iterate through subcategories and fetch subsubcategories for each subcategory
    for (const subCategoryItem of response.data.data.rows) {
      const subSubCategoryResponse =
        await service.subSubCategory.GET_SUB_SUB_CATEGORYALL(
          subCategoryItem.id
        );


      // Add the fetched subsubcategories to the temporary array
      subSubCategoriesArray.push(...subSubCategoryResponse.data.data.rows);
    }

    // Set the subsubcategories state once, after all subsubcategories have been accumulated
    setSubSubCategory(subSubCategoriesArray);
  };

  //gt sub category list
  const subSubCategoryList = async (id) => {
    const response = await service.subSubCategory.GET_SUB_SUB_CATEGORYALL(id);

  };
  //user name

  const handleCart = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const cart = await service.cart.GET_CART()
        setTotalCartItems(cart.data.data[0]?.cartDetail?.cartDetails?.length)
      } catch (error) {
        console.log(error)
      }


    } else {
      const cart = localStorage.getItem('cartDetail') && JSON.parse(localStorage.getItem('cartDetail'))
      setTotalCartItems(cart?.cartDetails?.length)
    }
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
                      <Link href="/#">
                        <a>(+01) - 2345 - 6789</a>
                      </Link>
                    </li>
                    <li>
                      <i className="fi-rs-marker"></i>
                      <Link href="/page-contact">
                        <a>Basti, UP, India</a>
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
                        Get great offer up to 50% off
                        <Link href="/products">
                          <a> View details</a>
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
                      <Link href="/#">
                        <a className="language-dropdown-active">
                          <i className="fi-rs-world"></i>
                          English
                          <i className="fi-rs-angle-small-down"></i>
                        </a>
                      </Link>
                      <ul className="language-dropdown">
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-fr.png"
                                alt=""
                              />
                              Français
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-dt.png"
                                alt=""
                              />
                              Deutsch
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-ru.png"
                                alt=""
                              />
                              Pусский
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <i className="fi-rs-user"></i>
                      {userName ? (<NavDropdown
  id="nav-dropdown-light-example"
  title={`${(userName.firstName?.length > 15 ? userName.firstName?.substring(0, 15) + ".." : userName.firstName)} ${(userName.lastName?.length > 15 ? userName.lastName?.substring(0, 15) + ".." : userName.lastName)}`}
  menuVariant="light"
  className="profile-dropdown"
>
                        <NavDropdown.Item href="/myprofile?index=2">My Orders</NavDropdown.Item>
                        <NavDropdown.Item href="/myprofile?index=4">
                          My Address
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/myprofile?index=5">My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/"
                          onClick={() => {
                            localStorage.clear()
                          }}
                        >
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
              
                        
                      ) : (
                        <Link href="/login">
                          <a>Log In / Sign Up</a>
                        </Link>
                      )
                      }

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
                    <div className="header-action-icon-2">
                      <Link href="/shop-wishlist">
                        <a>
                          <img
                            className="svgInject"
                            alt="korakagaj"
                            src="/assets/imgs/theme/icons/icon-heart.svg"
                          />
                          <span className="pro-count blue">
                            {totalWishlistItems>0?totalWishlistItems:0}
                          </span >
                        </a >
                      </Link >
                    </div >
  <div className="header-action-icon-2">
    <Link href="/shop-cart">
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
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
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
              Browse Categories
            </a>

            <div
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
                      // Remove curly braces around item.categoryName

                      <Link href="/products/shop-grid-right">
                        <a
                          key={item.id}
                          onMouseEnter={() => subCategoryList(item.id)}
                          onMouseLeave={() => setHoveredCategoryId(null)}
                        >
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
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          {item.subSubCategoryName}
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
                <li className="has-children">
                  <Link href="/products/shop-grid-right">
                    <a>
                      <i className="korakagaj-font-tshirt"></i>
                      Men's Clothing
                    </a>
                  </Link>
                  <div className="dropdown-menu">
                    <ul className="mega-menu d-lg-flex">
                      <li className="mega-menu-col col-lg-7">
                        <ul className="d-lg-flex">
                          <li className="mega-menu-col col-lg-6">
                            <ul>
                              <li>
                                <span className="submenu-title">
                                  Jackets & Coats
                                </span>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Down Jackets
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Jackets
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Parkas
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Faux Leather Coats
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Trench
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Wool & Blends
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Vests & Waistcoats
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Leather Coats
                                  </a>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-menu-col col-lg-6">
                            <ul>
                              <li>
                                <span className="submenu-title">
                                  Suits & Blazers
                                </span>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Blazers
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Suit Jackets
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Suit Pants
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Suits
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Vests
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Tailor-made Suits
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/#">
                                  <a className="dropdown-item nav-link nav_item">
                                    Cover-Ups
                                  </a>
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="mega-menu-col col-lg-5">
                        <div className="header-banner2">
                          <img
                            src="/assets/imgs/banner/menu-banner-4.jpg"
                            alt="menu_banner1"
                          />
                          <div className="banne_info">
                            <h6>10% Off</h6>
                            <h4>New Arrival</h4>
                            <Link href="/#">
                              <a>Shop now</a>
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
            <nav>
              <ul>
                <li>
                  <Link href="/">
                    <a className="active">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/page-about">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <a>Shop</a>
                  </Link>
                </li>

                <li>
                  <Link href="/blog-category-grid">
                    <a>
                      Blog
                      <i className="fi-rs-angle-down"></i>
                    </a>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link href="/blog-category-grid">
                        <a>Blog Category Grid</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-category-list">
                        <a>Blog Category List</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-category-big">
                        <a>Blog Category Big</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-category-fullwidth">
                        <a>Blog Category Wide</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/#">
                        <a>
                          Single Post
                          <i className="fi-rs-angle-right"></i>
                        </a>
                      </Link>
                      <ul className="level-menu level-menu-modify">
                        <li>
                          <Link href="/blog-post-left">
                            <a>Left Sidebar</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog-post-right">
                            <a>Right Sidebar</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog-post-fullwidth">
                            <a>No Sidebar</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link href="/page-contact">
                    <a>Our Team</a>
                  </Link>
                </li>

                <li>
                  <Link href="/page-contact">
                    <a>Contact</a>
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
              <Link href="/shop-wishlist">
                <a>
                  <img
                    alt="korakagaj"
                    src="/assets/imgs/theme/icons/icon-heart.svg"
                  />
                  <span className="pro-count white">
                        {totalWishlistItems>0?totalWishlistItems:0}
                        </span >
                      </a >
                    </Link >
                  </div >
                  <div className="header-action-icon-2">
                    <Link href="/shop-cart">
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
                </div >
              </div >
            </div >
          </div >
        </div >
      </header >
    </>
  );
};



export default Header;