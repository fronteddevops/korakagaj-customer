import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import services from "../../services";
import { useEffect } from "react";
const ProductDetails = ({
    product,
    cartItems,
    addToCompare,
    addToCart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    quickView,
    fabricPrice
}) => {

    const [quantity, setQuantity] = useState(1);
    const [fabricType, setfabricType] = useState("");
    const calculateTotalPrice = (product) => {
        let itemTotalPrice = 0; // Initialize totalPrice to 0

        const basePrice = product.totalPrice || 0; // Ensure basePrice is a number or set it to 0
        const discountPercentage = product.discountPercentage || 0; // Ensure discountPercentage is a number or set it to 0
        const discountAmount = (basePrice * discountPercentage) / 100;
        itemTotalPrice = basePrice - discountAmount;
        return itemTotalPrice; // Return the calculated total price
    };

    //fabric apt call
    const GET_Fabric_Data = async (prodcut) => {
        const response = await services.fabric.GET_FABRIC();
        const selectedFabric = response.data.data.rows.find(
            (fabric) => fabric?.id == prodcut.fabric
        );
        //     <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36" fill="#E74C26"><path d="M440-181 240-296q-19-11-29.5-29T200-365v-230q0-22 10.5-40t29.5-29l200-115q19-11 40-11t40 11l200 115q19 11 29.5 29t10.5 40v230q0 22-10.5 40T720-296L520-181q-19 11-40 11t-40-11Zm0-92v-184l-160-93v185l160 92Zm80 0 160-92v-185l-160 93v184ZM80-680v-120q0-33 23.5-56.5T160-880h120v80H160v120H80ZM280-80H160q-33 0-56.5-23.5T80-160v-120h80v120h120v80Zm400 0v-80h120v-120h80v120q0 33-23.5 56.5T800-80H680Zm120-600v-120H680v-80h120q33 0 56.5 23.5T880-800v120h-80ZM480-526l158-93-158-91-158 91 158 93Zm0 45Zm0-45Zm40 69Zm-80 0Z" /></svg>
        // </span>

        if (selectedFabric) {
            setfabricType(selectedFabric.fabricType);
        }
    };
    useEffect(() => {
        GET_Fabric_Data(product);
    }, [product]);
    const handleWishlist = async (product) => {


        if (localStorage.getItem("access_token")) {


            try {

                const userID = localStorage.getItem("userId");

                const data = {
                    productId: product.id,
                    userId: userID
                }

                if (product.isWishlisted === false) {


                    const WishlistResponse = await services.Wishlist.CREATE_WISHLIST_BY_ID(data);
                    productDataShow()
                    toast.success("Add to Wishlist !");
                } else if (product.isWishlisted === true) {

                    const WishlistResponse = await services.Wishlist.DELETE_WISHLIST_BY_ID(product.id);
                    productDataShow()
                    toast.success("Remove to Wishlist !");
                }

            } catch (error) {

                console.error("An error occurred:", error);
            }

        } else {

            toast.error("Please Login!");
        }

    };
    const color = JSON?.parse(product?.colour)
    const size = JSON.parse(product.size)

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
                cartDetail: { cartDetails: unique }
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
                cartDetail: { cartDetails: unique }
            }
            console.log(data)
            localStorage.setItem('cartDetail', JSON.stringify(data.cartDetail))
        }
    };
    return (
        <>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-12">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50">
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-gallery">
                                            <span className="zoom-icon">
                                                <img width={'80%'} src="/assets/imgs/360.svg" />
                                            </span>

                                            <div className="product-image-slider">
                                                <ThumbSlider
                                                    product={product}
                                                />
                                            </div>
                                        </div>

                                        <div className="social-icons single-share">
                                            <ul className="text-grey-5 d-inline-block">
                                                <li>
                                                    <strong className="mr-10">
                                                        Share this:
                                                    </strong>
                                                </li>
                                                <li className="social-facebook">
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/icons/icon-facebook.svg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </li>
                                                <li className="social-twitter">
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/icons/icon-twitter.svg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </li>
                                                <li className="social-instagram">
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/icons/icon-instagram.svg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </li>
                                                <li className="social-linkedin">
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/icons/icon-pinterest.svg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-info">
                                            <h2 className="title-detail text-capitalize">
                                                {product.productName}
                                            </h2>
                                            <div className="product-detail-rating">
                                                <div className="pro-details-brand">
                                                    <span>
                                                        Category &nbsp;&nbsp;:&nbsp;&nbsp;
                                                        <Link href="/products">
                                                            <a className="text-capitalize">
                                                                {product?.Category?.categoryName}
                                                            </a>
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className="product-rate-cover text-end">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="font-small ml-5 text-muted">
                                                        (25 reviews)
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    {fabricPrice ? (<>
                                                        <ins>
                                                            <span className="text-brand">
                                                                {fabricPrice}
                                                            </span>
                                                        </ins>
                                                    </>) : (<>
                                                        <ins>
                                                            <span className="text-brand">
                                                                Rs.{calculateTotalPrice(product)}
                                                            </span>
                                                        </ins>
                                                        <ins>
                                                            <span className="old-price font-md ml-15">
                                                                Rs.{product.totalPrice}
                                                            </span>
                                                        </ins>
                                                        <span className="save-price  font-md color3 ml-15">
                                                            {
                                                                product.discountPercentage
                                                            }
                                                            % Off
                                                        </span>
                                                    </>)

                                                    }

                                                </div>
                                            </div>
                                            <div className="bt-1 border-color-1 mt-15 mb-15"></div>
                                            <div className="short-desc mb-30">
                                                <p className="text-capitalize">{product.description}</p>
                                            </div>
                                            <div className="product_sort_info font-xs mb-30">
                                                <ul>
                                                    <li className="mb-10">
                                                        <i className="fi-rs-crown mr-5"></i>
                                                        1 Year AL Jazeera Brand
                                                        Warranty
                                                    </li>
                                                    <li className="mb-10">
                                                        <i className="fi-rs-refresh mr-5"></i>
                                                        30 Day Return Policy
                                                    </li>
                                                    <li>
                                                        <i className="fi-rs-credit-card mr-5"></i>
                                                        Cash on Delivery
                                                        available
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-color mb-15">
                                                <strong className="mr-10">
                                                    Color
                                                </strong>
                                                <ul className="list-filter color-filter">
                                                    {color && color?.map((clr, i) =>

                                                        <li key={i}>
                                                            <a href="#">
                                                                <span
                                                                    className={`product-color-${clr}`}
                                                                >
                                                                </span>
                                                            </a>
                                                        </li>

                                                    )}
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-size">
                                                <strong className="mr-10">
                                                    Size
                                                </strong>
                                                <ul className="list-filter size-filter font-small">
                                                    {size.map(
                                                        (size, i) => (
                                                            <li key={i}>
                                                                <a href="#">
                                                                    {size}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}


                                                </ul>
                                                <strong className="mr-10">&nbsp;&nbsp; | &nbsp;&nbsp;
                                                    <span className="text-brand">Size Chart {'>'}</span>
                                                </strong>
                                            </div>
                                            <div className="attr-detail attr-size mt-20">
                                                <strong className="mr-10">
                                                    Quantity
                                                </strong>
                                                <div className="detail-qty border radius">
                                                    <a
                                                        onClick={(e) =>
                                                            setQuantity(1)
                                                        }
                                                        className="qty-down"
                                                    >
                                                        <i className="fi-rs-angle-small-down"></i>
                                                    </a>
                                                    <span className="qty-val">
                                                        {quantity}
                                                    </span>
                                                    <a
                                                        onClick={() =>
                                                            setQuantity(1)
                                                        }
                                                        className="qty-up"
                                                    >
                                                        <i className="fi-rs-angle-small-up"></i>
                                                    </a>
                                                </div>

                                            </div>
                                            <div className="attr-detail attr-size mt-20">
                                                <strong className="mr-10 text-capitalize ">
                                                    Fabric&nbsp;:&nbsp; <span className="text-brand">{fabricType}</span>
                                                </strong>

                                                <Link href={`/fabric?&newlength=${product?.length}&id=${product.id}&basePrice=${product?.basePrice}&discountPercentage=${product?.discountPercentage}&prodcutName=${product?.productName}`}>
                                                    <button className="btn btn-outline btn-sm btn-brand-outline font-weight-bold text-brand bg-white text-hover-white ml-15 border-radius-5 btn-shadow-brand hover-up"
                                                    >
                                                        Choose Fabric
                                                    </button></Link>
                                            </div>

                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div className="detail-extralink">

                                                <div className="product-extra-link2">
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...product,
                                                                quantity:
                                                                    quantity ||
                                                                    1,
                                                            })
                                                        }
                                                        className="button button-add-to-cart me-3"
                                                    >
                                                        Design My Way
                                                    </button>
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...product,
                                                                quantity:
                                                                    quantity ||
                                                                    1,
                                                            })
                                                        }
                                                        className="button button-add-to-cart me-3"
                                                    >
                                                        Add to cart
                                                    </button>

                                                    <a
                                                        aria-label="Add To Wishlist"
                                                        className="action-btn hover-up"
                                                        onClick={(e) =>
                                                            handleWishlist(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        <i className="fi-rs-heart"></i>
                                                    </a>

                                                </div>
                                            </div>
                                            <ul className="product-meta font-xs color-grey mt-50">
                                                <li className="mb-5 text-capitalize">
                                                    SKU&nbsp;:
                                                    <a href="#">&nbsp;{product.sku}</a>
                                                </li>
                                                <li className="mb-5 text-capitalize">
                                                    Tags&nbsp;:
                                                    <a href="#" rel="tag" className="me-1">&nbsp;
                                                        {product.tags}
                                                    </a>
                                                </li>
                                                <li>
                                                    Availability&nbsp;:
                                                    <span className="in-stock text-success ml-5" >



                                                        {product.currentStock} Items In Stock
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {quickView ? null : (
                                    <>
                                        <ProductTab />
                                        <div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">
                                                    Related products
                                                </h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider />
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};





export default ProductDetails;
