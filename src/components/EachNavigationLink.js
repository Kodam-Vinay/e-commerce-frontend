import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const EachNavigationLink = ({ navigationDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );

  return (
    <div
      onClick={() => navigate(navigationDetails?.nav)}
      className={`md:mr-2 w-fit ${
        isDarkTheme
          ? "hover:text-slate-300 hover:border-b-2 hover:border-b-slate-300"
          : "hover:text-gray-300 hover:border-b-2 hover:border-b-slate-300"
      }
        ${
          location?.pathname === navigationDetails?.nav
            ? isDarkTheme
              ? "text-gray-500 border-b-2 border-b-gray-500"
              : "text-stone-400 border-b-2 border-b-gray-400"
            : ""
        }
      `}
    >
      {navigationDetails?.name}
    </div>
  );
};

export default EachNavigationLink;
