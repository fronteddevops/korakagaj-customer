import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Banner3 = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <div className="col-md-6">
                <div className="banner-img banner-1 wow fadeIn animated">
                    <img src="assets/imgs/banner/banner-5.jpg" alt="" />
                    <div className="banner-text">
                        <span>{t("Accessories")}</span>
                        <h4>
                            {t("Save 17% on")} <br />
                            {t("Autumn Hat")}
                        </h4>
                        <Link href="/products">
                            <a>
                                {t("Shop Now")} <i className="fi-rs-arrow-right"></i>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="banner-img mb-15 wow fadeIn animated">
                    <img src="assets/imgs/banner/banner-6.jpg" alt="" />
                    <div className="banner-text">
                        <span>{t("Big Offer")}</span>
                        <h4>
                            {t("Save 20% on")} <br />
                            {t("Women's socks")}
                        </h4>
                        <Link href="/products">
                            <a>
                                {t("Shop Now")} <i className="fi-rs-arrow-right"></i>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="banner-img banner-2 wow fadeIn animated">
                    <img src="assets/imgs/banner/banner-7.jpg" alt="" />
                    <div className="banner-text">
                        <span>{t("Smart Offer")}</span>
                        <h4>
                            {t("Save 20% on")} <br />
                            {t("Eardrop")}
                        </h4>
                        <Link href="/products">
                            <a>
                                {t("Shop Now")} <i className="fi-rs-arrow-right"></i>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner3;
