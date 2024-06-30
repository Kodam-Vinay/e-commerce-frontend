import React from "react";
import EachProduct from "./EachProduct";

const PremiumProductsSection = ({ products }) => {
  return (
    <>
      {products?.length > 0 && (
        <div className="flex flex-col items-center sm:items-start justify-center mxs:justify-start mxs:flex-row flex-wrap">
          {products?.map((eachProduct) => (
            <EachProduct productDetails={eachProduct} key={eachProduct?._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default PremiumProductsSection;
