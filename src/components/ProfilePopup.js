import { useDispatch, useSelector } from "react-redux";
import ReusableButton from "./ReusableButton";
import { useNavigate } from "react-router-dom";
import { storePopupData, togglePopup } from "../dataManager/slices/popupSlice";

const ProfilePopup = () => {
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(togglePopup(true));
    dispatch(
      storePopupData({
        text: "Are you sure you want to Logout ?",
        type: "logout",
      })
    );
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div
      className={`absolute right-0 mr-2 px-4 py-1 mt-28 rounded-md flex flex-col z-10 ${
        isDarkTheme ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      <ReusableButton
        name="Settings"
        className={`border-none ${
          isDarkTheme
            ? "border-white hover:bg-gray-700"
            : "border-black hover:bg-gray-300"
        }`}
        onClick={() => handleSettings()}
      />
      <ReusableButton
        name="Logout"
        className="border-none hover:bg-red-500"
        onClick={() => handleLogout()}
      />
    </div>
  );
};

export default ProfilePopup;
