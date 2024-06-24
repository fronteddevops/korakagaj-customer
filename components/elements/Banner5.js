import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Banner5 = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="banner-img wow fadeIn animated">
          <img src="/assets/imgs/banner/banner-1.png" alt="" />
          <div className="banner-text">
            <span>{t("New Product")}</span>
            <h4>
              {t("Save 20% on")} <br />
              {t("Woman Bag")}
            </h4>
            <Link href="/products?product=0">
              <a>
                {t("Shop Now")} <i className="fi-rs-arrow-right"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="banner-img wow fadeIn animated">
          <img src="/assets/imgs/banner/banner-2.png" alt="" />
          <div className="banner-text">
            <span>{t("Hot Deals")}</span>
            <h4>
              {t("Great Summer")} <br />
              {t("Collection")}
            </h4>
            <Link href="/products?product=1">
              <a>
                {t("Shop Now")} <i className="fi-rs-arrow-right"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-4 d-md-none d-lg-flex">
        <div className="banner-img wow fadeIn animated  mb-sm-0">
          <img src="/assets/imgs/banner/banner-3.png" alt="" />
          <div className="banner-text">
            <span>{t("Best Seller")}</span>
            <h4>
              {t("Shop Today’s")} <br />
              {t("Deals & Offers")}
            </h4>
            <Link href="/products?product=2">
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

export default Banner5;
