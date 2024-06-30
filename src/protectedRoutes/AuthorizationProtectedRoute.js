import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthorizationProtectedRoute = ({ children }) => {
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  return userInfo?.verified ? children : <Navigate to="/auth" />;
};

export default AuthorizationProtectedRoute;
