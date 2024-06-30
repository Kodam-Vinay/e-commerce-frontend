import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const HomePageProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  const userTypeRoutes = {
    buyer:
      location?.pathname === "/home" ||
      location?.pathname.startsWith("/home/product"),
    seller: location?.pathname === "/home/seller",
    admin: location?.pathname === "/home/admin",
  };

  const isRouteAllowed = userTypeRoutes[userInfo?.user_type];

  if (!isRouteAllowed) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default HomePageProtectedRoute;
