import { useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import nextConfig from "../../next.config";
SwiperCore.use([Navigation, Thumbs]);

const ThumbSlider = ({ product }) => {
   
    const imageUrl=nextConfig.BASE_URL_UPLOADS
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    return (
        <div>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                //loop={false}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
            >
               {product?.image?.map((item,i) => (
                    <SwiperSlide key={i}>
                   
                        <img src={ imageUrl+ item} alt="korakagaj" crossOrigin="anonymous"/>
                        {/* <Zoom
                            src={imageUrl+ item}
                            zoomScale={5}
                            width={500}
                            height={500}
                            ransitionTime={0.5}
                        /> */}
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                //loop={false}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper"
            >
                {product?.image?.map((item, i) => (
                    <SwiperSlide key={i}>
                        <img src={ imageUrl+item} alt="korakagaj" crossOrigin="anonymous"/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ThumbSlider;
