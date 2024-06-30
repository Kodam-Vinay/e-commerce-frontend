import React from "react";

const BuyerEntryPageShimmer = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="font-bold text-lg mb-5 bg-gray-100 h-6 rounded-sm max-w-[100px]">
        {""}
      </h2>
      <div className="h-2/5 sm:h-2/3 w-11/12 mxs:w-3/4 self-center p-3 bg-gray-200 mb-10 rounded-sm"></div>
      <div className="flex items-center flex-wrap justify-center w-full -mt-5">
        {/* categories */}
        {Array(4)
          .fill("")
          .map((each, index) => (
            <div key={index} className="cursor-pointer h-24 p-1 mb-8">
              <div
                className={`h-28 xs:h-20 sm:h-24 w-24 rounded-md bg-gray-100`}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuyerEntryPageShimmer;
