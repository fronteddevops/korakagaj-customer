import { useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import nextConfig from "../../next.config";
import { useEffect } from "react";
SwiperCore.use([Navigation, Thumbs]);

const ThumbSlider = ({ product }) => {
  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (product) {
      const images = [];
      if (product?.featuredImage) {
        images.push(product.featuredImage);
      }

      if (product.image && Array.isArray(product?.image)) {
        // Assuming product.image is an array
        images.push(...product?.image);
      }
      setImage(images);
    }
  }, [product]);
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
        {image?.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={imageUrl + item}
              alt="korakagaj"
              crossOrigin="anonymous"
            />
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
        {image?.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={imageUrl + item}
              alt="korakagaj"
              crossOrigin="anonymous"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbSlider;
