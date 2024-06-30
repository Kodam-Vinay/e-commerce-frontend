import React from "react";
import { useSelector } from "react-redux";

const ReusableInput = ({
  onChange,
  value,
  disabled,
  type,
  checked,
  className,
  placeholder,
  accept,
  id,
  ref,
  onKeyDown,
}) => {
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  return (
    <input
      onChange={onChange}
      value={value}
      disabled={disabled}
      className={`h-8 sm:h-9 border outline-none px-2 py-1 rounded-md mb-2 ${className} ${
        isDarkTheme ? "border-white dark_theme" : "border-black light_theme"
      }`}
      type={type}
      accept={accept}
      checked={checked}
      placeholder={placeholder}
      id={id}
      ref={ref}
      onKeyDown={onKeyDown}
    />
  );
};

export default ReusableInput;
