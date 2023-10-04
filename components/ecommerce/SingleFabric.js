import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import Loader from './../elements/Loader';
import { useRouter } from 'next/router'


const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

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

                                <a>
                                    <img
                                        className="default-img"
                                        src={product.image}
                                        alt=""
                                    />

                                </a>

                            </div>
                            <div className="product-action-1">
                        <a
                            aria-label="Estimated Final Price will be $200"
                            className="action-btn hover-up"
                            data-bs-toggle="modal"
                            onClick={(e) => console.log(e)}
                        >
                            <i className="fi-rs-eye"></i>
                        </a>
                       
                        
                    </div>

                            <div className="product-badges product-badges-position product-badges-mrg">

                                <span className="new">Max Width: 1.37M</span>

                            </div>
                        </div>
                        <div className="product-content-wrap">
                           
                            <h2>
                              
                                    <a>{product.title}</a>
                          
                            </h2>
                           
                            <div className="product-price">
                                <span>${product.price}/MTR </span>
                               

                            </div>
                           

                            <div className="product-action-1 show">
                           
                                <a
                                    aria-label="Choose me"
                                    className="action-btn hover-up"
                                    onClick={() => router.back()}
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