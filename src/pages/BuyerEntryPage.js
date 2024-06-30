import { useDispatch, useSelector } from "react-redux";
import {
  buyerPageCategoriesList,
  filterDiscountProducts,
  filterProductImages,
} from "../utils/constants";
import ProductsCarousel from "../components/products/ProductsCarousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { storeCategoryType } from "../dataManager/slices/searchSlice";
import { useNavigate } from "react-router-dom";
import BuyerEntryPageShimmer from "../shimmer/BuyerEntryPageShimmer";

const BuyerEntryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const premiumProducts = useSelector(
    (store) => store?.products?.products?.premiumProducts
  );
  const normalProducts = useSelector(
    (store) => store?.products?.products?.allProducts
  );
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const searchInput = useSelector((store) => store?.search?.searchInput);
  const isLoading = useSelector((store) => store?.products?.isLoading);
  const premiumSlides = filterProductImages(premiumProducts);
  const normalSlides = filterProductImages(normalProducts);
  const newProducts =
    premiumSlides?.length > 0 && normalSlides?.length > 0
      ? [...premiumSlides, ...normalSlides].slice(0, 4)
      : premiumSlides?.length > 0
      ? [...premiumSlides].slice(0, 4)
      : normalSlides?.length > 0
      ? [...normalSlides].slice(0, 4)
      : [];
  const premiumDiscountProducts = filterDiscountProducts(premiumProducts);
  const normalDiscountProducts = filterDiscountProducts(normalProducts);
  const discountSlides =
    premiumDiscountProducts?.length > 0 && normalDiscountProducts?.length > 0
      ? [...premiumDiscountProducts, ...normalDiscountProducts].slice(0, 4)
      : premiumDiscountProducts?.length > 0
      ? [...premiumDiscountProducts].slice(0, 4)
      : normalDiscountProducts?.length > 0
      ? [...normalDiscountProducts].slice(0, 4)
      : [];

  const slides = [...newProducts, ...discountSlides];

  const handleCategory = (category) => {
    navigate(
      `/home/products?search_q=${searchInput}&category=${category?.type}`
    );
    dispatch(storeCategoryType(category?.type));
  };

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col h-full">
          <h2 className="font-bold text-lg mb-10">Hello, {userInfo?.name}</h2>
          <div className="h-2/5 sm:h-2/3 w-11/12 mxs:w-3/4 self-center p-3">
            <ProductsCarousel products={slides?.length > 0 ? slides : []} />
          </div>
          <div className="flex items-center flex-wrap justify-center w-full -mt-5">
            {/* categories */}
            {buyerPageCategoriesList?.map((each, index) => (
              <div
                className="cursor-pointer h-24 p-1 mb-8"
                key={each?.type + index}
                onClick={() => handleCategory(each)}
              >
                <LazyLoadImage
                  src={isDarkTheme ? each?.image[1] : each?.image[0]}
                  alt={each?.text}
                  className={`h-28 xs:h-20 sm:h-24 w-24 rounded-md`}
                  effect="opacity"
                />

                <p className="text-center">{each?.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <BuyerEntryPageShimmer />
      )}
    </>
  );
};

export default BuyerEntryPage;
