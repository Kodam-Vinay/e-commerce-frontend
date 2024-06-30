import { useSelector } from "react-redux";
import NoProductsSection from "../components/products/NoProductsSection";
import PremiumProductsSection from "../components/products/PremiumProductsSection";
import AllProductsSection from "../components/products/AllProductsSection";

const BuyerPage = () => {
  // const isDarkTheme = useSelector(
  //   (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  // );

  const products = useSelector((store) => store?.products?.filteredProducts);
  const isLoading = useSelector((store) => store?.products?.isLoading);

  return (
    <div className="flex flex-col w-full pb-4 p-1 overflow-y-auto h-[90%] cursor-pointer">
      {!isLoading &&
      (products?.allProducts?.length > 0 ||
        products?.premiumProducts?.length > 0) ? (
        <div className="flex flex-col">
          <h3 className="px-2 font-bold text-lg">Premium Products</h3>
          {products?.premiumProducts?.length > 0 && (
            <PremiumProductsSection products={products?.premiumProducts} />
          )}
          <h3 className="px-2 font-bold text-lg">All Products</h3>
          {products?.allProducts?.length > 0 && (
            <AllProductsSection products={products?.allProducts} />
          )}
        </div>
      ) : isLoading ? (
        <span>Loading ....</span>
      ) : (
        <NoProductsSection />
      )}
    </div>
  );
};

export default BuyerPage;
