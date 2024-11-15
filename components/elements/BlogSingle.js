import React from "react";
import Link from "next/link"
import { useTranslation } from "react-i18next";

const BlogSingle = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <div className="single-page pl-30">
                <div className="single-header style-2">
                    <h1 className="mb-30">
                        {t("Best smartwatch 2021: the top wearables you can buy today")}
                    </h1>
                    <div className="single-header-meta">
                        <div className="entry-meta meta-1 font-xs mt-15 mb-15">
                            <span className="post-by">
                                {t("By")} <a>{t("Jonh")}</a>
                            </span>
                            <span className="post-on has-dot">{t("9 April 2021")}</span>
                            <span className="time-reading has-dot">
                                {t("8 mins read")}
                            </span>
                            <span className="hit-count  has-dot">29k {t("Views")}</span>
                        </div>
                        <div className="social-icons single-share">
                            <ul className="text-grey-5 d-inline-block">
                                <li>
                                    <strong className="mr-10">{t("Share this:")}</strong>
                                </li>
                                <li className="social-facebook">
                                    <a >
                                        <img
                                            src="assets/imgs/theme/icons/icon-facebook.svg"
                                            alt=""
                                        />
                                    </a>
                                </li>
                                <li className="social-twitter">
                                    
                                    <a>
                                        <img
                                            src="assets/imgs/theme/icons/icon-twitter.svg"
                                            alt=""
                                        />
                                    </a>
                                </li>
                                <li className="social-instagram">
                                    <a>
                                        <img
                                            src="assets/imgs/theme/icons/icon-instagram.svg"
                                            alt=""
                                        />
                                    </a>
                                </li>
                                <li className="social-linkedin">
                                    <a>
                                        <img
                                            src="assets/imgs/theme/icons/icon-pinterest.svg"
                                            alt=""
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <figure className="single-thumbnail">
                    <img src="assets/imgs/blog/blog-6.jpg" alt="" />
                </figure>
                <div className="single-content">
                    <p>
                        {t("The best smartwatch needs to be able to monitor your health, track your location when exercising, offer a variety of other apps that you wouldn't normally see on your smartphone, sport good battery life and, perhaps most importantly, have an affordable price.")}
                    </p>
                    <p>
                        {t("We've reviewed and ranked all of the best smartwatches on the market right now, and we've made a definitive list of the top 10 offer you can buy today. One of the 10 picks below may just be your perfect next smartwatch.")}
                    </p>
                    <p>
                        {t("Those top-end wearables span from the Apple Watch to Fitbits, Garmin watches to Tizen-sporting Samsung watches. There's also Wear OS which is Google's own wearable operating system in the vein of Apple's watchOS - you’ll see it show up in a lot of these offer.")}
                    </p>
                    <p>
                        {t("Throughout our review process, we look at the design, features, battery life, spec, price and more for each smartwatch, rank it against the competition and enter it into the list you'll find below.")}
                    </p>
                    <h4>{t("1. Apple Watch SE")}</h4>
                    <ul className="mb-20">
                        <li>{t("Updated content on a regular basis")}</li>
                        <li>{t("Secure & hassle-free payment")}</li>
                        <li>{t("1-click checkout")}</li>
                        <li>{t("Easy access & smart user dashboard")}</li>
                    </ul>
                    <h4>{t("2. Samsung Galaxy Watch 3")}</h4>
                    <p>
                    {t("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque esse eos minima. Eius quo autem impedit quibusdam maiores, voluptatum quae sunt sit nisi voluptatem sed, esse quisquam labore, at est!")}
                    </p>
                    <table className="font-md">
                        <tbody>
                            <tr className="stand-up">
                                <th>{t("Stand Up")}</th>
                                <td>
                                    <p>
                                        {t("35″L x 24″W x 37-45″H(front to back wheel)")}
                                    </p>
                                </td>
                            </tr>
                            <tr className="folded-wo-wheels">
                                <th>{t("Folded (w/o wheels)")}</th>
                                <td>
                                    <p>{t("32.5″L x 18.5″W x 16.5″H")}</p>
                                </td>
                            </tr>
                            <tr className="folded-w-wheels">
                                <th>{t("Folded (w/ wheels)")}</th>
                                <td>
                                <p>{t("32.5″L x 18.5″W x 16.5″H")}</p>
                                </td>
                            </tr>
                            <tr className="door-pass-through">
                                <th>{t("Door Pass Through")}</th>
                                <td>
                                    <p>24</p>
                                </td>
                            </tr>
                            <tr className="frame">
                                <th>{t("Frame")}</th>
                                <td>
                                    <p>{t("Aluminum")}</p>
                                </td>
                            </tr>
                            <tr className="weight-wo-wheels">
                                <th>{t("Weight (w/o wheels)")}</th>
                                <td>
                                    <p>20 {t("LBS")}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>{t("3. Apple Watch 6")}</h4>
                    <p>
                    {t("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque esse eos minima. Eius quo autem impedit quibusdam maiores, voluptatum quae sunt sit nisi voluptatem sed, esse quisquam labore, at est!")}
                    </p>
                    <ul className="product-more-infor mb-30">
                        <li>
                            <span>{t("Type Of Packing")}</span> {t("Bottle")}
                        </li>
                        <li>
                            <span>{t("Color")}</span> {t("Green, Pink, Powder Blue, Purple")}
                        </li>
                        <li>
                            <span>{t("Quantity Per Case")}</span> {t("100ml")}
                        </li>
                        <li>
                            <span>{t("Ethyl Alcohol")}</span> 70%
                        </li>
                        <li>
                            <span>{t("Piece In One")}</span> {t("Carton")}
                        </li>
                    </ul>
                    <h4>{t("4. Fitbit Versa 3")}</h4>
                    <p>
                    {t("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque esse eos minima. Eius quo autem impedit quibusdam maiores, voluptatum quae sunt sit nisi voluptatem sed, esse quisquam labore, at est!")}
                    </p>
                    <div className="banner-img banner-big wow fadeIn f-none  mb-30  animated">
                        <img
                            className="border-radius-10"
                            src="assets/imgs/banner/banner-4.png"
                            alt=""
                        />
                        <div className="banner-text">
                            <h6 className="mb-15 mt-40">{t("Repair Services")}</h6>
                            <h5 className="fw-600 mb-20">
                                {t("We're an Apple")} <br />
                                {t("Authorised Service Provider")}
                           
                            </h5>
                        </div>
                    </div>
                    <br></br>
                    <h4>{t("5. Samsung Galaxy Watch Active 2")}</h4>
                    <p>
                    {t("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque esse eos minima. Eius quo autem impedit quibusdam maiores, voluptatum quae sunt sit nisi voluptatem sed, esse quisquam labore, at est!")}
                    </p>
                    <ul className="product-more-infor mb-30">
                        <li>
                            <span>{t("Type Of Packing")}</span> {t("Bottle")}
                        </li>
                        <li>
                            <span>{t("Color")}</span> {t("Green, Pink, Powder Blue, Purple")}
                        </li>
                        <li>
                            <span>{t("Quantity Per Case")}</span> {t("100ml")}
                        </li>
                        <li>
                            <span>{t("Ethyl Alcohol")}</span> 70%
                        </li>
                        <li>
                            <span>{t("Piece In One")}</span> {t("Carton")}
                        </li>
                    </ul>
                </div>
                <div
                    className="entry-bottom mt-50 mb-30 wow fadeIn  animated"
                    style={{"visibility":"visible","animationName":"fadeIn"}}
                >
                    <div className="tags w-50 w-sm-100">
                        <Link href="/blog-category-big" as={`/blog-category-big`} ><Link
                          
                            rel="tag"
                            className="hover-up btn btn-sm btn-rounded mr-10"
                        >
                            {t("deer")}
                        </Link> 
                        </Link>
                        <Link href="/blog-category-big" as="/blog-category-big"><Link
                            
                            rel="tag"
                            className="hover-up btn btn-sm btn-rounded mr-10"
                        >
                            {t("nature")}
                        </Link>
                        </Link>
                    </div>
                    <div className="social-icons single-share">
                        <ul className="text-grey-5 d-inline-block">
                            <li>
                                <strong className="mr-10">{t("Share this:")}</strong>
                            </li>
                            <li className="social-facebook">
                                <a>
                                    <img
                                        src="assets/imgs/theme/icons/icon-facebook.svg"
                                        alt=""
                                    />
                                </a>
                            </li>
                            <li className="social-twitter">
                                
                                <a>
                                    <img
                                        src="assets/imgs/theme/icons/icon-twitter.svg"
                                        alt=""
                                    />
                                </a>
                            </li>
                            <li className="social-instagram">
                                <a>
                                    <img
                                        src="assets/imgs/theme/icons/icon-instagram.svg"
                                        alt=""
                                    />
                                </a>
                            </li>
                            <li className="social-linkedin">
                                <a>
                                    <img
                                        src="assets/imgs/theme/icons/icon-pinterest.svg"
                                        alt=""
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="comments-area">
                    <div className="row">
                        <div className="col-lg-8">
                            <h4 className="mb-30">{t("Comments")}</h4>
                            <div className="comment-list">
                                <div className="single-comment justify-content-between d-flex">
                                    <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                            <img
                                                src="assets/imgs/page/avatar-6.jpg"
                                                alt=""
                                            />
                                            <h6>
                                                <a>{t("Jacky Chan")}</a>
                                            </h6>
                                            <p className="font-xxs">{t("Since 2012")}</p>
                                        </div>
                                        <div className="desc">
                                            <div className="product-rate d-inline-block">
                                                <div
                                                    className="product-rating"
                                                    style={{"width":"90%"}}
                                                ></div>
                                            </div>
                                            <p>
                                                {t("Lorem ipsum dolor sit amet consectetur adipisicing elit.")}
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <p className="font-xs mr-30">
                                                        {t("December 4, 2020 at 3:12pm")}
                                                    </p>
                                                    <a
                                                        className="text-brand btn-reply"
                                                    >
                                                        {t("Reply")}
                                                        <i className="fi-rs-arrow-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--single-comment --> */}
                                <div className="single-comment justify-content-between d-flex">
                                    <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                            <img
                                                src="assets/imgs/page/avatar-7.jpg"
                                                alt=""
                                            />
                                            <h6>
                                                <a>{t("Ana Rosie")}</a>
                                            </h6>
                                            <p className="font-xxs">{t("Since")} 2008</p>
                                        </div>
                                        <div className="desc">
                                            <div className="product-rate d-inline-block">
                                                <div
                                                    className="product-rating"
                                                    style={{"width":"90%"}}
                                                ></div>
                                            </div>
                                            <p>
                                                {t("Lorem ipsum dolor sit amet consectetur adipisicing elit.")}
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <p className="font-xs mr-30">
                                                        {t("December 4, 2020 at 3:12pm")}
                                                    </p>
                                                    <a
                                                        className="text-brand btn-reply"
                                                    >
                                                        {t("Reply")}
                                                        <i className="fi-rs-arrow-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--single-comment --> */}
                                <div className="single-comment justify-content-between d-flex">
                                    <div className="user justify-content-between d-flex">
                                        <div className="thumb text-center">
                                            <img
                                                src="assets/imgs/page/avatar-8.jpg"
                                                alt=""
                                            />
                                            <h6>
                                                <a>{t("Steven Keny")}</a>
                                            </h6>
                                            <p className="font-xxs">{t("Since")} 2010</p>
                                        </div>
                                        <div className="desc">
                                            <div className="product-rate d-inline-block">
                                                <div
                                                    className="product-rating"
                                                    style={{"width":"90%"}}
                                                ></div>
                                            </div>
                                            <p>
                                                {t("Authentic and Beautiful, Love these way more than ever expected They are Great earphones")}
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <p className="font-xs mr-30">
                                                        {t("December 4, 2020 at 3:12pm")}
                                                    </p>
                                                    <a
                                                        className="text-brand btn-reply"
                                                    >
                                                        {t("Reply")}
                                                        <i className="fi-rs-arrow-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--single-comment --> */}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <h4 className="mb-30">{t("Customer reviews")}</h4>
                            <div className="d-flex mb-30">
                                <div className="product-rate d-inline-block mr-15">
                                    <div
                                        className="product-rating"
                                        style={{"width":"90%"}}
                                    ></div>
                                </div>
                                <h6>{t("4.8 out of 5")}</h6>
                            </div>
                            <a className="font-xs text-muted">
                                {t("How are ratings calculated?")}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="comment-form">
                    <h4 className="mb-15">{t("Leave a Comment")}</h4>
                    <div className="product-rate d-inline-block mb-30"></div>
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <form
                                className="form-contact comment_form"
                                action="#"
                                id="commentForm"
                            >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea
                                                className="form-control w-100"
                                                name="comment"
                                                id="comment"
                                                cols="30"
                                                rows="9"
                                                placeholder={t("Write Comment")}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                name="name"
                                                id="name"
                                                type="text"
                                                placeholder={t("Name")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                name="email"
                                                id="email"
                                                type="email"
                                                placeholder={t("Email")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                name="website"
                                                id="website"
                                                type="text"
                                                placeholder={t("Website")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="button button-contactForm"
                                    >
                                        {t("Post Comment")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogSingle;
