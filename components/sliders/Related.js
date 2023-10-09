import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchByCatagory } from "../../redux/action/product";
import SingleProduct from "./../ecommerce/SingleProduct";
import { useRouter } from "next/router";
import services from "../../services";
SwiperCore.use([Navigation]);

const RelatedSlider = () => {
    const [related, setRelated] = useState([]);
    const router = useRouter();
    const id = router.query.slug;
   

    const getProdcut = async () => {
        // Fetch product data here and return it as props
        try {
            const response = await services.product.GET_PRODUCT();
    
        const filteredProducts = response.data.data.rows.filter(
          (product) => product.id == id
        );
    
        if (filteredProducts.length > 0) {
          // Assuming 'setData' is a state-setting function
          setRelated(filteredProducts);
          console.log("Filtered Products:", filteredProducts);
        } else {
          // Handle the case where no products match the criteria
          // For example, set an empty array or show an error message.
          setData([]); // Set an empty array if no products match
          console.log("No products match the criteria.");
        }
        } catch (error) {
     console.log(error)
        }
        
      };
      useEffect(() => {
        getProdcut();
      },[]);


    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                //loop={false}
                navigation={{
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n",
                }}
                className="custom-class"
            >
                {related.map((product, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct product={product[0]} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
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
