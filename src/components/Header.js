import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import ReusableButton from "./ReusableButton";
import { useEffect, useState } from "react";
import { CLOUDINARY_IMAGE_ACCESS_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import NavigationLinks from "./NavigationLinks";
import ProfilePopup from "./ProfilePopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDeviceResize from "../hooks/useDeviceResize";
import { toggleTheme } from "../dataManager/slices/themeSlice";
import { CiDark, CiLight } from "react-icons/ci";
import ReusableInput from "./ReusableInput";
import { BiSearch } from "react-icons/bi";
import {
  storeCategoryType,
  storeSearchInput,
} from "../dataManager/slices/searchSlice";
import AppLogo from "../svgs/AppLogo";
import AppLogoDark from "../svgs/AppLogoDark";

const Header = () => {
  const dispatch = useDispatch();
  const [isHamburgerClicked, setHamurgerClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [profileLogoClicked, setProfileLogoClicked] = useState(false);
  const [localSearchInput, setLocalSearchInput] = useState("");
  const navigate = useNavigate();
  const size = useDeviceResize();

  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  const pathName = useSelector(
    (store) => store?.persistSliceReducer?.path?.currentPath
  );

  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const category = useSelector((store) => store?.search?.category);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const initialSearchQuery = searchParams.get("search_q") || "";
    const initialCategory = searchParams.get("category") || "all";
    setLocalSearchInput(initialSearchQuery);
    dispatch(storeSearchInput(initialSearchQuery));
    dispatch(storeCategoryType(initialCategory));
  }, [dispatch, searchParams]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(storeSearchInput(localSearchInput));
      setSearchParams({ search_q: localSearchInput, category: category });
    }
  };

  const handleSearchPress = () => {
    dispatch(storeSearchInput(localSearchInput));
    setSearchParams({ search_q: localSearchInput, category: category });
  };

  useEffect(() => {
    //automatically close hamburger when device width > 640px
    size?.width > 640 && setHamurgerClicked(false);
  }, [size]);

  useEffect(() => {
    //automatically close hamburger and close profile popup changing one route to another route
    setHamurgerClicked(false);
    setProfileLogoClicked(false);
  }, [pathName]);

  const handleProfileLogo = () => {
    setHamurgerClicked(false);
    setProfileLogoClicked(!profileLogoClicked);
  };

  const handleHamburger = () => {
    setIsAnimating(true);
    setProfileLogoClicked(false);
    setHamurgerClicked(!isHamburgerClicked);
  };

  const handelAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div
      className={`w-full flex flex-col ${
        pathName === "/home/products" ? "h-[15vh] md:h-[10vh]" : "h-[10vh]"
      }`}
    >
      {!isHamburgerClicked && !isAnimating && (
        <div className="p-2 px-1 mxs:px-2 sm:px-4 flex items-center justify-between w-full relative">
          <ReusableButton
            name={
              !isDarkTheme ? (
                <AppLogo className="h-8 w-14" />
              ) : (
                <AppLogoDark className="h-8 w-14" />
              )
            }
            onClick={() => navigate("/")}
            className="border-none h-8 hover:bg-transparent"
          />
          {pathName.includes("/home/products") && (
            <div
              className={`items-center border h-8 sm:h-9 outline-none rounded-md hidden md:flex pr-1 flex-grow max-w-sm mdl:max-w-lg lg:max-w-xl ml:10 mdl:ml-14 mdl:mr-4 lg:ml-32 xl:ml-48 ${
                isDarkTheme
                  ? "border-white dark_theme"
                  : "border-black light_theme"
              }`}
            >
              <ReusableInput
                value={localSearchInput}
                onChange={(e) => {
                  setLocalSearchInput(e.target.value);
                }}
                type={"search"}
                className={
                  "mt-2 border-l-0 border-r-0 rounded-r-none h-5 sm:h-7  flex-grow"
                }
                placeholder="Search For Products"
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <ReusableButton
                name={<BiSearch size={20} />}
                className={
                  "flex flex-col items-center justify-center mr-1 mxs:mr-0 border-none h-7 w-8"
                }
                onClick={() => handleSearchPress()}
              />
            </div>
          )}
          <div className="flex items-center">
            <ReusableButton
              name={isDarkTheme ? <CiLight size={25} /> : <CiDark size={25} />}
              className="w-10 h-10 mr-2 sm:mr-4 border-none hover:rounded-[100%]"
              onClick={() => dispatch(toggleTheme())}
            />
            <div className="w-full hidden sm:block">
              <NavigationLinks setHamurgerClicked={setHamurgerClicked} />
            </div>
            {userInfo?.jwtToken && (
              <img
                src={CLOUDINARY_IMAGE_ACCESS_URL + userInfo?.image}
                alt="image_logo"
                className={`rounded-[100%] h-8 w-8 sm:w-12 border cursor-pointer ${
                  isDarkTheme ? "border-white" : "border-black"
                }`}
                onClick={handleProfileLogo}
              />
            )}
            {profileLogoClicked && <ProfilePopup />}
            <ReusableButton
              name={<RxHamburgerMenu />}
              className="border-none sm:hidden"
              onClick={() => handleHamburger()}
            />
            {!userInfo?.jwtToken && (
              <ReusableButton
                name={"Login"}
                className="border-none hidden sm:block"
                onClick={() => navigate("/auth")}
              />
            )}
          </div>
        </div>
      )}

      {(isHamburgerClicked || isAnimating) && (
        <div
          className={`absolute z-20 w-full flex flex-col p-2 px-1 mxs:px-2 sm:px-4 sm:hidden navbar ${
            isHamburgerClicked ? "opening" : "closing"
          } ${isDarkTheme ? "bg-gray-950" : "bg-gray-100"}`}
          onAnimationEnd={() => handelAnimationEnd()}
        >
          <div className="w-full flex items-center justify-between">
            <ReusableButton
              name={
                !isDarkTheme ? (
                  <AppLogo className="h-8 w-14" />
                ) : (
                  <AppLogoDark className="h-8 w-14" />
                )
              }
              onClick={() => navigate("/")}
              className="border-none h-8 mb-2 hover:bg-transparent"
            />
            <ReusableButton
              name={<RxCross2 />}
              className="border-none"
              onClick={() => handleHamburger()}
            />
          </div>
          <div className="w-full">
            <NavigationLinks setHamurgerClicked={setHamurgerClicked} />
          </div>
        </div>
      )}
      {pathName.includes("/home/products") &&
        !isHamburgerClicked &&
        !isAnimating && (
          <div
            className={`flex items-center border h-8 sm:h-9 outline-none rounded-md mb-2 w-[90%] max-w-md md:hidden self-center ${
              isDarkTheme
                ? "border-white dark_theme"
                : "border-black light_theme"
            }`}
          >
            <ReusableInput
              value={localSearchInput}
              onChange={(e) => {
                setLocalSearchInput(e.target.value);
              }}
              type={"search"}
              className={
                "w-11/12 mt-2 border-l-0 border-r-0 rounded-r-none h-5 sm:h-7"
              }
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Search For Products"
            />
            <ReusableButton
              name={<BiSearch size={20} />}
              className={
                "flex flex-col items-center justify-center mr-1 mxs:mr-0 border-none h-7 w-8"
              }
              onClick={() => handleSearchPress()}
            />
          </div>
        )}
    </div>
  );
};

export default Header;
