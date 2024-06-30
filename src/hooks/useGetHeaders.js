import { useSelector } from "react-redux";
const useGetHeaders = () => {
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo?.jwtToken}`,
  };
};

export default useGetHeaders;
