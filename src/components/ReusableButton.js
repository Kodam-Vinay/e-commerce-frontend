import React from "react";
import { useSelector } from "react-redux";

const ReusableButton = ({ name, disabled, type, className, onClick }) => {
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  return (
    <button
      className={`bg-transparent h-10 border outline-none px-2 py-1 rounded-md ${
        isDarkTheme
          ? "border-white hover:bg-gray-700"
          : "border-black hover:bg-gray-200"
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {name}
    </button>
  );
};

export default ReusableButton;
