import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeActiveAuth } from "../dataManager/slices/authSlice";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { Grid } from "react-loader-spinner";
import ReusableButton from "../components/ReusableButton";

const Auth = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );

  const isLoginClicked = useSelector((store) => store?.login?.isLoginClicked);

  const activeAuth = useSelector(
    (store) => store?.persistSliceReducer?.auth?.activeAuth
  );

  return (
    <div
      className={`h-full w-full ${
        isDarkTheme ? "dark_theme" : "light_theme"
      } flex flex-col`}
    >
      <div
        className={`border h-[90%] mt-4 p-1 w-full xs:w-[90%] mxs:w-[70%] sm:w-[60%] md:w-[60%] mdl:w-[50%] lg:w-[40%] self-center rounded-md shadow-md  ${
          isDarkTheme
            ? "border-white shadow-slate-200"
            : "border-black shadow-slate-950"
        }`}
      >
        <div
          className={`w-full flex justify-evenly self-center ${
            isLoginClicked ? "opacity-50" : ""
          }`}
        >
          <ReusableButton
            onClick={() => dispatch(makeActiveAuth("login"))}
            className={`font-bold ${
              activeAuth === "login" && isDarkTheme
                ? "make-white-border-button"
                : activeAuth === "login" && !isDarkTheme
                ? "make-dark-border-button"
                : activeAuth !== "login" && isDarkTheme
                ? "light_text_color"
                : "dark_text_color"
            } border-0 rounded-none w-1/2 hover:rounded-t-md mb-2`}
            name={"Login"}
          />
          <ReusableButton
            onClick={() => dispatch(makeActiveAuth("register"))}
            className={`font-bold ${
              activeAuth === "register" && isDarkTheme
                ? "make-white-border-button"
                : activeAuth === "register" && !isDarkTheme
                ? "make-dark-border-button"
                : activeAuth !== "register" && isDarkTheme
                ? "light_text_color"
                : "dark_text_color"
            } border-0 rounded-none w-1/2 hover:rounded-t-md mb-2`}
            name={"Register"}
          />
        </div>
        <div className={`h-full ${isLoginClicked ? "opacity-50" : ""}`}>
          {activeAuth === "login" ? <Login /> : <Register />}
        </div>
        {isLoginClicked && (
          <div className="flex flex-col items-center justify-center absolute top-0 bottom-0 left-0 right-0">
            <Grid
              visible={true}
              height="80"
              width="80"
              color={isDarkTheme ? "light_text_color" : "dark_text_color"}
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
