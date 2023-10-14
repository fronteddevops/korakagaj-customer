import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import services from "../../services";
import Link from "next/link";
import { useEffect, useState } from "react";
import nextConfig from "../../next.config";

SwiperCore.use([Navigation]);

const CategorySlider = () => {
    const [category,setCategory]=useState([])
   
    const imageUrl=nextConfig. BASE_URL_UPLOADS
    const getCategoryListHandler = async () => {
        try {
            const response = await services.category.GET_CATEGORY()
   
          //  setRowData(response.data)
          setCategory(response.data.data.rows)
        } catch (error) {
            console.log(error)
        }
    }
useEffect(()=>{
    getCategoryListHandler()
},[])
   
    return (
        <>
            <Swiper
                // slidesPerView={6}
                breakpoints={{
                    200: {
                      // width: 576,
                      slidesPerView: 3,
                      spaceBetween:10,
                    },
                    768: {
                      // width: 768,
                      slidesPerView: 5,
                      spaceBetween:10,
                    },
                    1024: {
                        // width: 768,
                        slidesPerView: 6,
                        spaceBetween:20,
                      },
                  }}
                // spaceBetween={20}
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                //loop={false}
                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1",
                }}
                className="custom-class"
            >
                {category.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="card-1">
                            <figure className=" img-hover-scale overflow-hidden">
                               <Link href="/products">
                                    <a>
                                        <img
                                            src={ imageUrl+item.image}
                                            alt=""
                                            crossOrigin="anonymous"
                                        />
                                    </a>
                                </Link>
                            </figure>
                            <h5>
                               <Link href="/products/shop-grid-right">
                                    <a>{item.categoryName}</a>
                                </Link>
                            </h5>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
                id="carausel-6-columns-arrows"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
        </>
    );
};

export default CategorySlider;