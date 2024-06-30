import { useDispatch, useSelector } from "react-redux";
import ReusableButton from "../components/ReusableButton";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  API_URL,
  CLOUDINARY_IMAGE_ACCESS_URL,
  CLOUDINARY_IMAGE_UPLOAD_URL,
} from "../utils/constants";
import { storeImageId } from "../dataManager/slices/cloudinarySlice";
import { ThreeCircles } from "react-loader-spinner";
import ReusableInput from "../components/ReusableInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useGetHeaders from "../hooks/useGetHeaders";
import { storeUserInfo } from "../dataManager/slices/userSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { storePopupData, togglePopup } from "../dataManager/slices/popupSlice";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("nothing");
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState(userInfo?.name);
  const [userId, setUserId] = useState(userInfo?.user_id);
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setshowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [isResponseSuccess, setResponseSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const headerOptions = useGetHeaders();
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const uploadedImageDetails = useSelector(
    (store) => store?.persistSliceReducer?.cloudinary?.imageDetails
  );
  const previousPath = useSelector(
    (store) => store?.persistSliceReducer?.path?.previousPath
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponseSuccess(false);
      setIsError(false);
    }, [4000]);
    return () => clearTimeout(timer);
  }, [isResponseSuccess]);

  const checkUserEnteredOldAndNewPassword =
    oldPassword.trim().length > 7 && newPassword.trim().length > 7;

  const checkAnyChangesMade =
    name?.trim() !== userInfo?.name?.trim() ||
    userId?.trim() !== userInfo?.user_id?.trim() ||
    (uploadedImageDetails?.imageId?.slice(19).trim() !==
      userInfo?.image?.trim() &&
      uploadedImageDetails?.imageId !== undefined) ||
    checkUserEnteredOldAndNewPassword;

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (imageFile) => {
    if (!imageFile) return;

    setLoading(true);
    if (!imageFile) {
      toast("Please Select A Image!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkTheme ? "dark" : "light",
        type: "error",
      });
      return;
    }
    if (imageFile?.type === "image/png" || imageFile?.type === "image/jpeg") {
      const formData = new FormData();
      formData.append("file", imageFile);

      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );

      try {
        const options = {
          method: "POST",
          body: formData,
        };
        const response = await fetch(CLOUDINARY_IMAGE_UPLOAD_URL, options);

        const res = await response.json();
        const imageDetails = {
          height: res?.height,
          width: res?.width,
          imageId: res?.public_id,
        };
        dispatch(
          storeImageId(res?.public_id ? imageDetails : "DUMMY_PROFILE_LOGO")
        );
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setError("Image Upload Fail, Try Again Later");
        setLoading(false);
      }
    }
  };

  const handleUpdateDetails = async () => {
    if (!name || !userId) {
      return;
    }
    let details = {};
    const isChangingPassword =
      oldPassword?.length > 7 && newPassword?.length > 7;

    if (isChangingPassword) {
      details = {
        name,
        user_id: userId,
        oldPassword,
        newPassword,
        image: uploadedImageDetails?.imageId
          ? uploadedImageDetails?.imageId?.slice(19)
          : userInfo?.image,
      };
    } else {
      details = {
        name,
        user_id: userId,
        image: uploadedImageDetails?.imageId
          ? uploadedImageDetails?.imageId?.slice(19)
          : userInfo?.image,
      };
    }
    const options = {
      method: "PUT",
      headers: {
        ...headerOptions,
      },
      body: JSON.stringify(details),
    };
    try {
      const res = await fetch(API_URL + "users/update-user", options);
      const data = await res.json();
      if (res?.ok) {
        setIsError(false);
        setResponseSuccess(true);
        setSuccessMessage(data?.message);
        dispatch(storeUserInfo(data?.userDetails));
        dispatch(storeImageId({}));
        setOldPassword("");
        setNewPassword("");
      } else {
        setIsError(true);
        setError(data?.message);
        setResponseSuccess(false);
      }
    } catch (error) {
      setIsError(true);
      setError(error?.message);
      setResponseSuccess(false);
    }
  };

  const handleDeleteUser = async () => {
    dispatch(togglePopup(true));
    dispatch(
      storePopupData({
        text: "Are you sure you want to Delete This Account ?",
        type: "delete",
      })
    );
  };

  if (isResponseSuccess) {
    toast(successMessage, {
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
  }

  if (isError) {
    toast(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDarkTheme ? "dark" : "light",
      type: "error",
    });
  }

  return (
    <div
      className={`h-full w-full ${
        isDarkTheme ? "dark_theme" : "light_theme"
      } flex flex-col`}
    >
      <div
        className={`border h-[95%] mt-4 p-1 w-full xs:w-[90%] mxs:w-[70%] sm:w-[60%] md:w-[60%] mdl:w-[50%] lg:w-[40%] self-center rounded-md shadow-md ${
          isDarkTheme
            ? "border-white shadow-slate-200"
            : "border-black shadow-slate-950"
        }`}
      >
        <div className="flex items-center w-full border-b-2 border-b-black">
          <ReusableButton
            className="cursor-pointer w-fit h-fit border-none mb-1"
            name={
              <IoMdArrowRoundBack
                color={isDarkTheme ? "dark_theme" : "light_theme"}
                size={20}
              />
            }
            onClick={() =>
              navigate(previousPath === "/auth" ? "/" : previousPath)
            }
          />

          <p className="font-bold text-center w-full">Profile Settings</p>
        </div>
        <form
          className={`h-[90%] w-full flex flex-col overflow-y-auto`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mt-2 flex flex-col mb-1">
            <label className="ml-1 font-bold">Upload/Update Image</label>
            <div
              className={`mt-4 relative flex flex-col self-center rounded-full h-40 w-40 ${
                isDarkTheme
                  ? "border-white dark_theme"
                  : "border-black light_theme"
              }`}
            >
              <div
                className={`${
                  isDarkTheme
                    ? "border-white dark_theme"
                    : "border-black light_theme"
                }`}
              >
                <ReusableButton
                  className={`absolute ml-6 border w-6 h-6 flex flex-col items-center justify-center rounded-full z-10 ${
                    isDarkTheme
                      ? "border-white dark_theme"
                      : "border-black light_theme"
                  } ${
                    userInfo?.user_type === "guest"
                      ? "opacity-85 hover:bg-transparent cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleClick}
                  disabled={userInfo?.user_type === "guest"}
                  name="+"
                />
                <input
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  className={"w-full hidden"}
                />
              </div>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <ThreeCircles
                    visible={true}
                    height="80"
                    width="80"
                    color={`${isDarkTheme ? "white" : "dark_text_color"} `}
                    ariaLabel="three-circles-loading"
                  />
                </div>
              ) : (
                <img
                  src={
                    uploadedImageDetails?.imageId
                      ? CLOUDINARY_IMAGE_ACCESS_URL +
                        uploadedImageDetails?.imageId.slice(19)
                      : userInfo?.image
                      ? CLOUDINARY_IMAGE_ACCESS_URL + userInfo?.image
                      : CLOUDINARY_IMAGE_ACCESS_URL + "DUMMY_PROFILE_LOGO"
                  }
                  className="rounded-full border h-full w-full self-center mb-4 center-crop"
                  alt="profile"
                />
              )}
            </div>
          </div>

          <>
            <label className="ml-1 font-bold">User Id</label>
            <ReusableInput
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setIsError(false);
              }}
              type="text"
              className={`w-full ${
                userInfo?.user_type === "guest"
                  ? "opacity-85 cursor-not-allowed"
                  : ""
              }`}
              placeholder="Enter/Update Your User Id"
              disabled={userInfo?.user_type === "guest"}
            />
          </>

          <>
            <label className="ml-1 font-bold">Name</label>
            <ReusableInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className={`w-full ${
                userInfo?.user_type === "guest"
                  ? "opacity-85 cursor-not-allowed"
                  : ""
              }`}
              placeholder="Enter/Update Your Name"
              disabled={userInfo?.user_type === "guest"}
            />
          </>

          <>
            <label className="ml-1 font-bold">User Type</label>
            <ReusableInput
              value={userInfo?.user_type}
              type="text"
              className={"w-full opacity-85 cursor-not-allowed"}
              placeholder="Enter/Update Your Name"
              disabled={true}
            />
          </>

          <>
            <label className="ml-1 font-bold">Old Password</label>
            <div
              className={`flex items-center border h-8 sm:h-9 outline-none rounded-md mb-2 w-full ${
                isDarkTheme
                  ? "border-white dark_theme"
                  : "border-black light_theme"
              }`}
            >
              <ReusableInput
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setIsError(false);
                }}
                type={showOldPassword ? "text" : "password"}
                className={`w-11/12 mt-2 border-l-0 border-r-0 rounded-r-none h-5 sm:h-7 ${
                  userInfo?.user_type === "guest"
                    ? "opacity-85 cursor-not-allowed"
                    : ""
                }`}
                placeholder="Please Enter Old Password"
                disabled={userInfo?.user_type === "guest"}
              />
              <ReusableButton
                name={showOldPassword ? <FaEyeSlash /> : <FaEye />}
                className={`w-1/12 flex flex-col items-end justify-center mr-1 mxs:mr-0 border-none h-9 hover:bg-transparent ${
                  userInfo?.user_type === "guest" ? "opacity-85 " : ""
                }`}
                onClick={() => setshowOldPassword(!showOldPassword)}
                disabled={userInfo?.user_type === "guest"}
              />
            </div>
          </>

          <div className="mb-4">
            <label className="ml-1 font-bold">New Password</label>
            <div
              className={`flex items-center border h-8 sm:h-9 outline-none rounded-md w-full ${
                isDarkTheme
                  ? "border-white dark_theme"
                  : "border-black light_theme"
              }`}
            >
              <ReusableInput
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setIsError(false);
                }}
                type={showNewPassword ? "text" : "password"}
                className={`w-11/12 mt-2 border-l-0 border-r-0 rounded-r-none h-5 sm:h-7 ${
                  userInfo?.user_type === "guest"
                    ? "opacity-85 cursor-not-allowed"
                    : ""
                }`}
                placeholder="Set a New Password"
                disabled={userInfo?.user_type === "guest"}
              />
              <ReusableButton
                name={showNewPassword ? <FaEyeSlash /> : <FaEye />}
                className={`w-1/12 flex flex-col items-end justify-center mr-1 mxs:mr-0 border-none h-9 hover:bg-transparent ${
                  userInfo?.user_type === "guest"
                    ? "opacity-85 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => setshowNewPassword(!showNewPassword)}
                disabled={userInfo?.user_type === "guest"}
              />
            </div>
          </div>

          <ReusableButton
            disabled={!checkAnyChangesMade || userInfo?.user_type === "guest"}
            name={"Update Details"}
            className={`w-full flex flex-col items-center justify-center font-bold mt-auto h-8 sm:h-9 ${
              checkAnyChangesMade ? "" : "cursor-not-allowed"
            }`}
            type={"button"}
            onClick={handleUpdateDetails}
          />
          <ReusableButton
            name={"Delete Account"}
            className={`w-full flex mt-2 flex-col items-center justify-center font-bold  h-8 sm:h-9 bg-red-400 hover:bg-red-500`}
            type={"button"}
            onClick={handleDeleteUser}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
