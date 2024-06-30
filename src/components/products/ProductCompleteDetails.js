import useGetProductDetails from "../../hooks/useGetProductDetails";
import { useParams } from "react-router-dom";
import {
  CLOUDINARY_PRODUCTS_IMAGE_ACCESS_URL,
  discountPriceCalculator,
} from "../../utils/constants";
import { useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import ReusableButton from "../ReusableButton";
import RatingContainer from "./RatingContainer";
import { useState } from "react";

const ProductCompleteDetails = () => {
  const [rating, setRating] = useState(0);
  const params = useParams();
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const data = useGetProductDetails({
    product_id: params?.product_id,
  });
  const isLoading = useSelector((store) => store?.products?.isLoading);
  const discountedPrice = discountPriceCalculator(data?.price, data?.discount);

  const hanldeBuyNowProduct = () => {};
  const handleAddToCartProduct = () => {};
  const handlePostReview = () => {};
  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col overflow-y-auto pb-10 h-full w-full">
          <div className="flex flex-col sm:flex-row ">
            <div className="flex flex-col w-full sm:w-2/5">
              <img
                src={CLOUDINARY_PRODUCTS_IMAGE_ACCESS_URL + data?.image}
                alt={data?.name}
                className="max-h-80 self-center rounded-md border object-cover"
              />
            </div>
            <div className="text-container flex flex-col w-full sm:w-3/5  px-2 mt-2">
              <h3 className="font-bold text-xl sm:text-2xl sm:ml-2">
                {data?.name}
              </h3>
              <div className="price-discount-container">
                <span className="ml-2 text-xs xs:text-sm hidden sm:block text-green-400 italic">
                  {"Flat " + data?.discount + "% off"}
                </span>
                <div className="flex flex-col sm:flex-row">
                  <p className="flex items-center text-md sm:text-lg font-semibold sm:order-1 text-gray-500">
                    <span className="sm:ml-1">
                      <FaIndianRupeeSign />
                    </span>
                    <strike>{data?.price}</strike>
                  </p>
                  <p className="flex items-center text-lg sm:text-2xl font-bold">
                    <span className="sm:ml-1">
                      <FaIndianRupeeSign />
                    </span>
                    <span>{discountedPrice}</span>
                    <span className="ml-2 text-xs xs:text-sm sm:hidden text-green-400 italic">
                      {"Flat " + data?.discount + "% off"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="specifications sm:ml-2  mt-2">
                <h3 className="font-bold text-lg">Specifications</h3>
                <p>{data?.specifications?.join(", ")}</p>
              </div>
              <div className="seller-details sm:ml-2  mt-2">
                <h3 className="font-bold text-lg">Seller Details</h3>
                <p>name: {data?.seller_id}</p>
                <p>address: {data?.seller_id}</p>
              </div>
              <div className="review-container sm:ml-2">
                <h2 className="font-bold text-lg">Reviews</h2>
                <div className="add-review-container flex flex-col max-w-64">
                  <p>Add A Review</p>
                  <RatingContainer rating={rating} setRating={setRating} />
                  {rating > 0 && (
                    <textarea
                      className={`w-full max-w-64 h-20 p-1 border outline-none rounded-md ${
                        isDarkTheme
                          ? "border-white dark_theme"
                          : "border-black light_theme"
                      }`}
                      placeholder="tell us about the product"
                    ></textarea>
                  )}
                  {rating > 0 && (
                    <ReusableButton
                      className="text-xs h-8 w-fit mt-1"
                      name={"Post"}
                      onClick={handlePostReview}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="buy-add-to-cart-button-container flex items-center absolute bottom-0 w-11/12 sm:w-1/2 self-center space-x-2 z-10 pb-2">
            <ReusableButton
              name={"Buy Now"}
              className="w-1/2"
              onClick={hanldeBuyNowProduct}
            />
            <ReusableButton
              name={"Add To Cart"}
              className="w-1/2"
              onClick={handleAddToCartProduct}
            />
          </div>
        </div>
      ) : (
        <p>Loading ....</p>
      )}
    </>
  );
};

export default ProductCompleteDetails;
