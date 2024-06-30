import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const VerificationProtectedRoute = ({ children }) => {
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  return Object.keys(userInfo)?.length > 0 && userInfo?.jwtToken ? (
    <Navigate to="/home" />
  ) : Object.keys(userInfo)?.length > 0 && !userInfo?.jwtToken ? (
    children
  ) : (
    <Navigate to="/auth" />
  );
};

export default VerificationProtectedRoute;
