import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { server } from "../../config/index";
import SingleProduct from "./../ecommerce/SingleProduct";

SwiperCore.use([Navigation]);

const NewArrival = () => {
    const [newArrival, setNewArrival] = useState([]);

    // console.log(newArrival);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // With Category
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();

        const newArrivalProducts = allProducts.sort(function (a, b) {
            return a.created > b.created ? -1 : 1;
        });

        setNewArrival(newArrivalProducts);
    };



    return (
        <>
            <Swiper
            breakpoints={{
                200: {
                  // width: 576,
                  slidesPerView: 1.5,
                  spaceBetween:10,
                },
                768: {
                  // width: 768,
                  slidesPerView: 2.5,
                  spaceBetween:10,
                },
                1024: {
                    // width: 768,
                    slidesPerView: 6,
                    spaceBetween:20,
                  },
              }}
                // slidesPerView={4}
                // spaceBetween={15}
                //loop={false}
                navigation={{
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n",
                }}
                className="carausel-6-columns carausel-arrow-center"
            >
                {newArrival.map((product, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct product={product} />
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

export default NewArrival;
