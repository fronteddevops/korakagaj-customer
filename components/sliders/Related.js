import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchByCatagory } from "../../redux/action/product";
import SingleProduct from "./../ecommerce/SingleProduct";
import services from "../../services";
SwiperCore.use([Navigation]);

const RelatedSlider = () => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // With Category
    try {
      const allProducts = await services.product.GET_PRODUCT();
      if (allProducts) {
        setRelated(allProducts?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Swiper
        // Set the width to 100% or another value suitable for mobile screens

        breakpoints={{
          200: {
            // width: 576,
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          768: {
            // width: 768,
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          1024: {
            // width: 768,
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        navigation={{
          prevEl: ".custom_prev_n",
          nextEl: ".custom_next_n",
        }}
        className="carausel-6-columns carausel-arrow-center"
      >
        {related?.map((product, i) => (
          <SwiperSlide key={i}>
            <div className="product-card">
              <SingleProduct product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>




      <div
        className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
        id="carausel-6-columns-2-arrows"
      >
        <span className="slider-btn slider-prev slick-arrow custom_prev_n">
          <i className="fi-rs-angle-left"></i>
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_n">
          <i className="fi-rs-angle-right"></i>
        </span>
      </div>
    </>
  );
};

export default RelatedSlider;
