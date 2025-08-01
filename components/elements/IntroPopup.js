import { useState } from "react";

import Link from "next/link";
import Timer from "./Timer";
const IntroPopup = () => {
    const [openClass, setOpenClass] = useState(0);

    const handleRemove = () => {
        setOpenClass(!openClass);
    };
    const fixDate = new Date();
    return (
        <>
            <div
                className={
                    openClass
                        ? "modal fade custom-modal d-none"
                        : "modal fade custom-modal  show d-block"
                }
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleRemove}
                        ></button>
                        <div className="modal-body">
                            <div
                                className="deal"
                                style={{
                                    backgroundImage:
                                        "url('assets/imgs/banner/menu-banner-7.png')",
                                }}
                            >
                                <div className="deal-top">
                                    <h2 className="text-brand">
                                        Deal of the Day
                                    </h2>
                                    <h5>Limited quantities.</h5>
                                </div>
                                <div className="deal-content">
                                    <h6 className="product-title">
                                        <Link href="/products">
                                            <a>
                                                Summer Collection New Morden
                                                Design
                                            </a>
                                        </Link>
                                    </h6>
                                    <div className="product-price">
                                        <span className="new-price">
                                            Rs.139.00
                                        </span>
                                        <span className="old-price">
                                            Rs.160.99
                                        </span>
                                    </div>
                                </div>
                                <div className="deal-bottom">
                                    <p>Hurry Up! Offer End In:</p>
                                    {/* <Timer endDateTime="2023-11-27 00:00:00" /> */}
                                    <Timer
                                        endDateTime={fixDate.setDate(
                                            fixDate.getDate() + 2
                                        )}
                                    />
                                    <Link href="/products">
                        <a className="btn hover-up">
                            Shop Now <i className="fi-rs-arrow-right"></i>
                        </a>
                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={
                    openClass
                        ? "modal-backdrop fade d-none"
                        : "modal-backdrop fade show"
                }
            ></div>
        </>
    );
};

export default IntroPopup;
