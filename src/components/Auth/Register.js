import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUserInfo } from "../../dataManager/slices/userSlice";
import { toast } from "react-toastify";
import { toggleLoginRegister } from "../../dataManager/slices/loginSlice";
import { toggleRegisterActiveAuth } from "../../dataManager/slices/authSlice";
import ReusableButton from "../ReusableButton";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [condtionsChecked, setConditionsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const registerActiveAuth = useSelector(
    (store) => store?.persistSliceReducer?.auth?.registerActiveAuth
  );
  const isLoginClicked = useSelector((store) => store?.login?.isLoginClicked);

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !registerActiveAuth
    ) {
      return;
    }

    if (!condtionsChecked) {
      setErrorMessage("Please Accept Terms & Conditions");
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }
    dispatch(toggleLoginRegister(true));

    // register api call
    const userDetails = {
      name,
      email,
      password,
      confirm_password: confirmPassword,
      user_type: registerActiveAuth,
    };
    try {
      const apiUrl = API_URL + "users/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        setIsError(false);
        navigate("/verify-otp");
        dispatch(storeUserInfo(data?.userDetails));
        toast(data?.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: isDarkTheme ? "dark" : "light",
          type: "success",
        });
      } else {
        setIsError(true);
        setErrorMessage(data?.message);
      }
      dispatch(toggleLoginRegister(false));
    } catch (error) {
      dispatch(toggleLoginRegister(false));
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="h-full">
      <div
        className={`w-full flex justify-evenly self-center ${
          isLoginClicked ? "opacity-50" : ""
        }`}
      >
        <ReusableButton
          onClick={() => dispatch(toggleRegisterActiveAuth("buyer"))}
          className={`font-bold ${
            registerActiveAuth === "buyer" && isDarkTheme
              ? "make-white-border-button"
              : registerActiveAuth === "buyer" && !isDarkTheme
              ? "make-dark-border-button"
              : registerActiveAuth !== "buyer" && isDarkTheme
              ? "light_text_color"
              : "dark_text_color"
          } border-0 rounded-none w-1/2 hover:rounded-t-md mb-2`}
          name={"Buyer"}
        />
        <ReusableButton
          onClick={() => dispatch(toggleRegisterActiveAuth("seller"))}
          className={`font-bold ${
            registerActiveAuth === "seller" && isDarkTheme
              ? "make-white-border-button"
              : registerActiveAuth === "seller" && !isDarkTheme
              ? "make-dark-border-button"
              : registerActiveAuth !== "seller" && isDarkTheme
              ? "light_text_color"
              : "dark_text_color"
          } border-0 rounded-none w-1/2 hover:rounded-t-md mb-2`}
          name={"Seller"}
        />
      </div>
      <AuthForm
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        condtionsChecked={condtionsChecked}
        isError={isError}
        errorMessage={errorMessage}
        setEmail={setEmail}
        setName={setName}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setConditionsChecked={setConditionsChecked}
        handleSubmit={handleSubmit}
        setIsError={setIsError}
      />
    </div>
  );
};

export default Register;
