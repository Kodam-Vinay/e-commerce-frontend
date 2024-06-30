import { useDispatch, useSelector } from "react-redux";
import ReusableButton from "./ReusableButton";
import { togglePopup } from "../dataManager/slices/popupSlice";
import { storeUserInfo } from "../dataManager/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { storeImageId } from "../dataManager/slices/cloudinarySlice";
import { toggleLoginRegister } from "../dataManager/slices/loginSlice";
import { API_URL } from "../utils/constants";
import { useState } from "react";
import useGetHeaders from "../hooks/useGetHeaders";
import ReusableInput from "./ReusableInput";
import {
  storeErrorMessage,
  storeSuccessMessage,
  toggleError,
  toggleSuccess,
} from "../dataManager/slices/successErrorSlice";

const Popup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const popupText = useSelector((store) => store?.popup?.popupData?.text);
  const popupType = useSelector((store) => store?.popup?.popupData?.type);
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const authHeaders = useGetHeaders();
  const confirmText = `DELETE ${userInfo?.user_id}`.trim();

  const handleGuestUserLogoutAndDeleteUser = async () => {
    try {
      const apiUrl = API_URL + "users/delete";
      const options = {
        method: "DELETE",
        headers: {
          ...authHeaders,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        dispatch(storeSuccessMessage(data?.message));
        dispatch(storeUserInfo(data?.userDetails));
        navigate("/home");
        dispatch(toggleSuccess(true));
        dispatch(toggleError(false));
      } else {
        dispatch(storeErrorMessage(data?.message));
        dispatch(toggleError(true));
        dispatch(toggleSuccess(false));
      }
    } catch (error) {
      dispatch(storeErrorMessage(error?.message));
      dispatch(toggleError(true));
      dispatch(toggleSuccess(false));
    }
    dispatch(togglePopup(false));
  };

  const handleLogout = () => {
    if (userInfo?.user_type === "guest" || popupType === "delete") {
      if (popupType === "delete") {
        confirmText === input.trim() && handleGuestUserLogoutAndDeleteUser();
      } else {
        handleGuestUserLogoutAndDeleteUser();
      }
    } else {
      dispatch(storeUserInfo({}));
      dispatch(storeImageId({}));
      navigate("/auth");
      dispatch(togglePopup(false));
    }
  };

  const handleCancel = () => {
    dispatch(togglePopup(false));
  };

  const handleGuestLogin = async () => {
    dispatch(toggleLoginRegister(true));
    try {
      const apiUrl = API_URL + "users/guest-login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        dispatch(storeUserInfo(data?.userDetails));
        navigate("/home");
        dispatch(toggleError(false));
      } else {
        dispatch(storeErrorMessage(data?.message));
        dispatch(toggleError(true));
      }
    } catch (error) {
      dispatch(storeErrorMessage(error?.message));
      dispatch(toggleError(true));
    } finally {
      dispatch(toggleLoginRegister(false));
      dispatch(togglePopup(false));
    }
  };

  const handleFoucsOutPopup = () => {
    console.log("hello");
  };

  return (
    <div
      onBlur={handleFoucsOutPopup}
      className={`absolute py-4 flex flex-col top-0 bottom-0 z-10 items-center justify-center w-[90%] mxs:w-[60%] sm:w-[50%] md:w-[42%] lg:w-[30%] xl:w-[25%] p-2 rounded-md self-center ${
        isDarkTheme ? "bg-slate-800" : "bg-gray-200"
      }`}
    >
      <p className="font-bold mxs:text-lg text-center">{popupText}</p>
      {popupType === "delete" && (
        <p className="font-bold mxs:text-lg text-center">
          Enter this
          <span className="text-red-500 italic"> {confirmText} </span>
          inside input field
        </p>
      )}
      {popupType === "delete" && (
        <ReusableInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className={`w-full`}
          placeholder="Please Confirm with above text"
        />
      )}
      <div className="flex items-center justify-between self-center w-[180px] mt-5">
        <ReusableButton
          name={"Ok"}
          className={`min-w-20 flex flex-col items-center justify-center font-bold mt-auto h-8 sm:h-9 hover:bg-green-500`}
          type={"button"}
          onClick={
            popupType === "logout" || popupType === "delete"
              ? handleLogout
              : handleGuestLogin
          }
        />
        <ReusableButton
          name={"Cancel"}
          className={`min-w-20 flex flex-col items-center justify-center font-bold mt-auto h-8 sm:h-9 hover:bg-red-500`}
          type={"button"}
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default Popup;
