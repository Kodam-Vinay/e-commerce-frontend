import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import { CLOUDINARY_PRODUCTS_IMAGE_ACCESS_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export default function ProductsCarousel({ products }) {
  const navigate = useNavigate();
  const handleCarouselProduct = (id) => {
    navigate("/home/product_details/" + id);
  };
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards, Autoplay]}
      className="mySwiper rounded-md shadow-md -mt-10"
    >
      {products?.map((eachProduct, index) => (
        <SwiperSlide
          onClick={() => handleCarouselProduct(eachProduct?.id)}
          key={eachProduct?.id + index}
          className={`flex flex-col p-2 cursor-pointer rounded-md ${
            !isDarkTheme ? "border border-black" : "border border-gray-700"
          }`}
        >
          <p className="absolute pr-2 right-0 top-0 text-red-500 italic font-bold">
            {eachProduct?.discount && eachProduct?.discount > 10
              ? "Flat " + eachProduct?.discount + "%"
              : "New*"}
          </p>
          <img
            src={CLOUDINARY_PRODUCTS_IMAGE_ACCESS_URL + eachProduct?.image}
            alt={eachProduct?.name}
            className="max-w-sm mx-auto rounded-md"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
