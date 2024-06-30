import { useSelector } from "react-redux";
import {
  CLOUDINARY_PRODUCTS_IMAGE_ACCESS_URL,
  discountPriceCalculator,
} from "../../utils/constants";
import { FaIndianRupeeSign } from "react-icons/fa6";

const EachProduct = ({ productDetails }) => {
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );

  const price = discountPriceCalculator(
    productDetails?.price,
    productDetails?.discount
  );

  return (
    <div
      className={`border p-2 rounded-md flex w-[95%] xs:w-60 mx-2 my-2
    ${isDarkTheme ? "dark_theme border-white" : "light_theme border-black"}`}
    >
      <img
        src={CLOUDINARY_PRODUCTS_IMAGE_ACCESS_URL + productDetails?.image}
        alt={productDetails?.name}
        className="w-20 h-20 rounded-sm"
      />
      <div className="ml-2">
        <p>{productDetails?.name}</p>
        <p className="flex items-center">
          <strike>{productDetails?.price}</strike>
          <span className="ml-1">
            <FaIndianRupeeSign />
          </span>
        </p>
        <p className="flex items-center">
          <span>{price}</span>
          <span className="ml-1">
            <FaIndianRupeeSign />
          </span>
          <span className="ml-2 text-xs xs:text-sm text-green-400 italic">
            {productDetails?.discount + "% off"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EachProduct;
