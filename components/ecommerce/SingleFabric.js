import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import Loader from './../elements/Loader';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import nextConfig from "../../next.config";
import { useTranslation } from "react-i18next";


const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,

    length,
    id,
    discountPercentage,
    basePrice

}) => {
    const [loading, setLoading] = useState(false);
    const imageUrl = nextConfig.BASE_URL_UPLOADS
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const { t } = useTranslation("common");
    const fabricPrice = length * (parseFloat(product?.price) || 0);
    const newbasePrice = fabricPrice + +basePrice;
    const discountAmount = discountPercentage === null || discountPercentage === 0 ? discountPercentage : 0;
    const newTotalPrice = parseFloat(newbasePrice - (newbasePrice * discountAmount) / 100);

    // Check if newTotalPrice is NaN and set a default value if it is
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{t("Estimated Price")}</Popover.Header>
            <Popover.Body>
                {t("Your product's estimated final price will be")} <strong className="text-brand">Rs :{newTotalPrice


                }</strong>.
            </Popover.Body>
        </Popover>
    );




    return (
        <>

            {!loading ? (
                <>
                    <div className="product-cart-wrap fabric mb-30">
                        <div className="product-img-action-wrap">
                            <div className="product-img product-img-zoom">

                                <a>
                                    <img
                                        className="default-img"
                                        src={imageUrl + product.image}
                                        alt=""
                                        crossOrigin="anynomus"
                                    />


                                </a>

                            </div>
                            <div className="product-action-1">
                                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                                    <a className="action-btn "><i className="fi-rs-eye"></i></a></OverlayTrigger>


                            </div>

                            <div className="product-badges product-badges-position product-badges-mrg">

                                <span className="new">Max Width: {product.maxWidth}M</span>

                            </div>
                        </div>
                        <div className="product-content-wrap">

                            <h2>

                                <a>{product?.fabricType}</a>

                            </h2>

                            <div className="product-price">
                                <span>Rs.{product?.price}/MTR </span>


                            </div>


                            <div className="product-action-1 show">


                                <Link
                                    href={{
                                        pathname: '/products/[slug]',
                                        query: { fabricPrice: newTotalPrice, productId: id },
                                    }}
                                    as={`/products/${id}`}
                                >
                                    <a className="action-btn hover-up">
                                        <i className="fi-rs-shopping-bag-add"></i>
                                    </a>
                                </Link>


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
