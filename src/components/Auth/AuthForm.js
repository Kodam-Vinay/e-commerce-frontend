import { useState } from "react";
import ReusableInput from "../ReusableInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReusableButton from "../ReusableButton";
import { useSelector } from "react-redux";

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  name,
  setName,
  condtionsChecked,
  setConditionsChecked,
  isError,
  errorMessage,
  handleSubmit,
  setIsError,
  handleLoginAsGuest,
}) => {
  const activeAuth = useSelector(
    (store) => store?.persistSliceReducer?.auth?.activeAuth
  );
  const registerActiveAuth = useSelector(
    (store) => store?.persistSliceReducer?.auth?.registerActiveAuth
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  return (
    <form
      className={`h-[90%] w-full flex flex-col ${
        activeAuth === "login" ? "pb-1" : "pb-4"
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      {activeAuth === "register" && (
        <div className="mt-4">
          <label className="ml-1 font-bold">
            {registerActiveAuth === "seller" ? "Enter Shop Name" : "Name"}
          </label>
          <ReusableInput
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsError(false);
            }}
            type="text"
            className={"w-full"}
            placeholder={registerActiveAuth === "seller" ? "Shop Name" : "Name"}
          />
        </div>
      )}

      <div className={` ${activeAuth === "login" ? "mt-4" : ""}`}>
        <label className="ml-1 font-bold">
          {activeAuth === "register" ? "Email" : "Email Or User ID"}
        </label>
        <ReusableInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsError(false);
          }}
          type={activeAuth === "register" ? "email" : "text"}
          className="w-full"
          placeholder={activeAuth === "register" ? "Email" : "Email Or User ID"}
        />
      </div>

      <>
        <label className="ml-1 font-bold">Password</label>
        <div
          className={`flex items-center border h-8 sm:h-9 outline-none rounded-md mb-2 w-full ${
            isDarkTheme ? "border-white dark_theme" : "border-black light_theme"
          }`}
        >
          <ReusableInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsError(false);
            }}
            type={showPassword ? "text" : "password"}
            className={
              "w-11/12 mt-2 border-l-0 border-r-0 rounded-r-none h-5 sm:h-7"
            }
            placeholder="Password"
          />
          <ReusableButton
            name={showPassword ? <FaEyeSlash /> : <FaEye />}
            className={
              "w-1/12 flex flex-col items-end justify-center mr-1 mxs:mr-0 border-none h-9 hover:bg-transparent"
            }
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
      </>

      {activeAuth === "register" && (
        <>
          <label className="ml-1 font-bold">Confirm Password</label>
          <div
            className={`flex items-center border h-8 sm:h-9 outline-none rounded-md mb-2 w-full ${
              isDarkTheme
                ? "border-white dark_theme"
                : "border-black light_theme"
            }`}
          >
            <ReusableInput
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsError(false);
              }}
              type={showConfirmPassword ? "text" : "password"}
              className={
                "w-11/12 mt-2 border-l-0 border-r-0 rounded-r-none h-5 sm:h-7"
              }
              placeholder="Confirm Password"
            />
            <ReusableButton
              name={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              className={
                "w-1/12 flex flex-col items-end justify-center mr-1 mxs:mr-0 border-none h-9 hover:bg-transparent"
              }
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </>
      )}

      {activeAuth === "register" && (
        <div className="flex items-center h-6 mb-2">
          <ReusableInput
            type="checkbox"
            className={"h-4 mt-2"}
            onChange={() => {
              setConditionsChecked(!condtionsChecked);
              setIsError(false);
            }}
            checked={condtionsChecked}
          />
          <label className="ml-1 font-bold text-xs">
            Accept Terms & Conditions
          </label>
        </div>
      )}

      <ReusableButton
        name={activeAuth === "register" ? "Register" : "Login"}
        onClick={handleSubmit}
        className={`w-full flex flex-col items-center justify-center font-bold h-8 sm:h-9 ${
          activeAuth === "register" ? "mt-10 sm:mt-6 lg:mt-20" : "mt-auto"
        }`}
        type={"submit"}
      />
      {activeAuth === "login" && (
        <ReusableButton
          name={"Login As Guest"}
          onClick={handleLoginAsGuest}
          className={
            "w-full flex flex-col items-center justify-center font-bold mt-2 h-8 sm:h-9"
          }
          type={"submit"}
        />
      )}
      {isError && (
        <label className="ml-1 text-xs sm:text-sm text-red-500 mt-1">
          *{errorMessage}
        </label>
      )}
    </form>
  );
};

export default AuthForm;
