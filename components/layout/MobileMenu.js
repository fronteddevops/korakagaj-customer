import { useState, useEffect } from "react";

import Link from "next/link";
import useClickOutside from "../../util/outsideClick";
import Search from "../ecommerce/Search";
import services from "../../services";
const MobileMenu = ({ isToggled, toggleClick }) => {


    const [categoryList, setCategory] = useState([]);
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    useEffect(() => {
        getProfile()
    }, [])
    const getProfile = async () => {
        try {
            const response = await services.myprofile.GET_MY_PROFILE()
            if (response) {
                setFirstName(response?.data?.data?.firstName)
                setLastName(response?.data?.data?.lastName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleToggle = (key) => {
        if (isActive.key === key) {
            getCategroy()
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
    //category list 

    //get category list

    //gt sub category list
    // Get sub category list


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

    return (
        <>
            <div className={isToggled ? "mobile-header-active mobile-header-wrapper-style sidebar-visible" : "mobile-header-active mobile-header-wrapper-style"}>
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
                            <button className="close-style search-close" onClick={toggleClick}>
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

                                <a className="categori-button-active-2">
                                    <span className="fi-rs-apps" ></span> Browse Categories
                                </a>

                                <div className="categori-dropdown-wrap categori-dropdown-active-small">
                                    <ul>


                                    </ul>
                                </div>
                            </div>

                            <nav>
                                <ul className="mobile-menu" ref={domNode}>
                                    <li className={isActive.key == 1 ? "menu-item-has-children active" : "menu-item-has-children"}>
                                        <span className="menu-expand" onClick={() => handleToggle(1)}>

                                        </span>
                                        <Link href="/">
                                            <a>Home</a>
                                        </Link>

                                    </li>
                                    <li className={isActive.key == 2 ? "menu-item-has-children active" : "menu-item-has-children"}>
                                        <span className="menu-expand" onClick={() => handleToggle(2)}>
                                            <i className="fi-rs-angle-small-down"></i>
                                        </span>
                                      
                                            <a>shop</a>
                                   
                                        <ul className={isActive.key == 2 ? "dropdown" : "d-none"}>
                                          
                                            <li>
                                                <Link href="/products">
                                                    <a>Shop List</a>
                                                </Link>
                                            </li>
                                           
                                           
                                            <li>
                                                <Link href="/shop-wishlist">
                                                    <a>Shop – Wishlist</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/shop-cart">
                                                    <a>Shop – Cart</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/shop-checkout">
                                                    <a>Shop – Checkout</a>
                                                </Link>
                                            </li>
                                          
                                        </ul>
                                    </li>

                                {/* moblie menu category show in the start  */}
                                    <li className={isActive.key == 3 ? "menu-item-has-children active" : "menu-item-has-children"}>
                                        <span className="menu-expand" onClick={() => handleToggle(3)}>
                                            <i className="fi-rs-angle-small-down"></i>
                                        </span>
                                      
                                            <a>Mega menu</a>
                                     
                                        <ul className={isActive.key == 3 ? "dropdown" : "d-none"}>
  {categoryList &&
    categoryList?.map((item) => (
      <li className="menu-item-has-children" key={item.id}>
        <span className="menu-expand"></span>
        <Link href="/products">
          <a>{item?.categoryName}</a>
        </Link>
        <ul className="dropdown">
          {item?.SubCategories?.map((subCategory, subIndex) => (
            <li className="menu-item-has-children" key={subCategory?.id}>
              <Link href="/products">
                <a>{subCategory?.subCategoryName}</a>
              </Link>
              {subCategory?.SubSubCategories.map((subSubCategory, subSubIndex) => (
                <ul className="dropdown" key={subSubCategory?.id}>
                  <li className="menu-item-has-children" key={subSubCategory?.id}>
                    <Link href="/products">
                      <a>{subSubCategory?.subSubCategoryName}</a>
                    </Link>
                  </li>
                </ul>
              ))}
            </li>
          ))}
        </ul>
      </li>
    ))}
</ul>


                                    </li>


                                {/* moblie menu category show in the end  */}


                                    <li className={isActive.key == 4 ? "menu-item-has-children active" : "menu-item-has-children"}>
                                        <span className="menu-expand" onClick={() => handleToggle(4)}>
                                            <i className="fi-rs-angle-small-down"></i>
                                        </span>
                                     
                                            <a>Blog</a>
                                      
                                        <ul className={isActive.key == 4 ? "dropdown" : "d-none"}>
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
                                            <li className="menu-item-has-children">
                                                <span className="menu-expand"></span>
                                                <Link href="#">
                                                    <a>Single Product Layout</a>
                                                </Link>
                                                <ul className="dropdown">
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
                                    <li className={isActive.key == 5 ? "menu-item-has-children active" : "menu-item-has-children"}>
                                        <span className="menu-expand" onClick={() => handleToggle(5)}>
                                            <i className="fi-rs-angle-small-down"></i>
                                        </span>
                                       
                                            <a>Pages</a>
                                     
                                        <ul className={isActive.key == 5 ? "dropdown" : "d-none"}>
                                            <li>
                                                <Link href="/page-about">
                                                    <a>About Us</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page-contact">
                                                    <a>Contact</a>
                                                </Link>
                                            </li>
                                            
                                            <li>
                                                <Link href="/page-purchase-guide">
                                                    <a>Purchase Guide</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page-privacy-policy">
                                                    <a>Privacy Policy</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page-terms">
                                                    <a>Terms of Service</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page-404">
                                                    <a>404 Page</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={isActive.key == 6 ? "menu-item-has-children active" : "menu-item-has-children"}>
                                        <span className="menu-expand" onClick={() => handleToggle(6)}>
                                            <i className="fi-rs-angle-small-down"></i>
                                        </span>
                                      
                                            <a>Language</a>
                                      
                                        <ul className={isActive.key == 6 ? "dropdown" : "d-none"}>
                                            <li>
                                                <Link href="#">
                                                    <a>English</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#">
                                                    <a>Hindi</a>
                                                </Link>
                                            </li>
                                           
                                        </ul>
                                    </li>

                                    {firstName&&lastName &&
                                    <li className={isActive.key == 7 ? "menu-item-has-children active" : "menu-item-has-children"}>
                                        <span className="menu-expand" onClick={() => handleToggle(7)}>
                                            <i className="fi-rs-angle-small-down"></i>
                                        </span>
                                      
                                            <a>My Profile</a>
                                      
                                        <ul className={isActive.key == 7 ? "dropdown" : "d-none"}>
                                        <li>
                                                <Link href="/myprofile?index=5">
                                                    <a>My Profile</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/myprofile?index=4">
                                                    <a>My Address</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/myprofile?index=2">
                                                    <a>My Orders</a>
                                                </Link>
                                            </li>
                                          
                                           
                                        </ul>
                                    </li>
}
                                </ul>
                            </nav>
                        </div>
                        <div className="mobile-header-info-wrap mobile-header-border">
                           
                            <div className="single-mobile-header-info">
                                {lastName && firstName ? (
                                    <div>
                                      <b>  {firstName} {lastName}</b>  
                                    </div>
                                ) : (
                                    <Link href="/login">
                                        <a>Log In / Sign Up</a>
                                    </Link>
                                )
                                }
                                {lastName&&firstName  && <><a href="/"  onClick={()=>localStorage.clear()}>Logout</a></>}
                            </div>
                            <div className="single-mobile-header-info">
                                <Link href="#">
                                    <a>(+01) - 2345 - 6789 </a>
                                </Link>
                            </div>
                        </div>
                        <div className="mobile-social-icon">
                            <h5 className="mb-15 text-grey-4">Follow Us</h5>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-facebook.svg" alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-instagram.svg" alt="" />
                                </a>
                            </Link>
                            <Link href="#">
                                <a>
                                    <img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt="" />
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
