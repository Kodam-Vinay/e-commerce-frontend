import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeUserInfo } from "../../dataManager/slices/userSlice";
import { toggleLoginRegister } from "../../dataManager/slices/loginSlice";
import {
  storePopupData,
  togglePopup,
} from "../../dataManager/slices/popupSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const prevPath = useSelector(
    (store) => store?.persistSliceReducer?.path?.previousPath
  );

  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }
    dispatch(toggleLoginRegister(true));
    const userDetails = {
      email,
      password,
    };
    try {
      const apiUrl = API_URL + "users/login";
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
        dispatch(storeUserInfo(data?.userDetails));
        if (data?.userDetails?.verified) {
          if (prevPath !== "/" && prevPath !== "/verify-otp") {
            navigate(prevPath);
          } else {
            navigate("/home");
          }
        } else {
          navigate("/verify-otp");
        }
      } else {
        setIsError(true);
        setErrorMessage(data?.message);
      }
      dispatch(toggleLoginRegister(false));
    } catch (error) {
      dispatch(toggleLoginRegister(false));
      setIsError(true);
      setErrorMessage(error?.message);
    }
  };

  const handleLoginAsGuest = async () => {
    dispatch(togglePopup(true));
    dispatch(
      storePopupData({
        text: "Are you sure you want to Login As Guest ?",
        type: "guest_login",
      })
    );
  };

  return (
    <div className="h-full w-full">
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setIsError={setIsError}
        setErrorMessage={setErrorMessage}
        handleSubmit={handleSubmit}
        isError={isError}
        errorMessage={errorMessage}
        handleLoginAsGuest={handleLoginAsGuest}
      />
    </div>
  );
};

export default Login;
