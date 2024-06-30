import EachNavigationLink from "./EachNavigationLink";
import { NAVIGATION_LINKS as navigationLinks } from "../utils/constants";
import ReusableButton from "./ReusableButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavigationLinks = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  return (
    <div className="flex flex-col space-y-1 sm:space-y-0 sm:flex-row sm:space-x-2 cursor-pointer">
      {navigationLinks.map((each) => (
        <EachNavigationLink key={each.nav} navigationDetails={each} />
      ))}
      {!userInfo?.jwtToken && (
        <ReusableButton
          name={"Login"}
          className={`border-none sm:hidden ${
            isDarkTheme ? "hover:bg-gray-900" : "hover:bg-gray-200"
          }`}
          onClick={() => navigate("/auth")}
        />
      )}
    </div>
  );
};

export default NavigationLinks;
