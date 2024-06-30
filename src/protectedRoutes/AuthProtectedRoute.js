import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const prevPath = useSelector(
    (store) => store?.persistSliceReducer?.path?.previousPath
  );
  return userInfo?.verified ? (
    <Navigate
      to={prevPath !== "/" && prevPath !== "/verify-otp" ? prevPath : "/"}
    />
  ) : (
    children
  );
};

export default AuthProtectedRoute;
