import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../dataManager/slices/productsSlice";
import { API_URL } from "../utils/constants";
import useGetHeaders from "./useGetHeaders";
import {
  storeErrorMessage,
  toggleError,
} from "../dataManager/slices/successErrorSlice";

const useGetProductDetails = ({ product_id }) => {
  const dispatch = useDispatch();
  const authHeaders = useGetHeaders();
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    getData();
  }, [product_id]);

  const getData = async () => {
    dispatch(toggleLoading(true));
    try {
      const apiUrl = API_URL + "products/" + product_id;
      const options = {
        method: "GET",
        headers: {
          ...authHeaders,
        },
      };
      const res = await fetch(apiUrl, options);
      const data = await res.json();
      if (res.ok) {
        dispatch(toggleError(false));
        setProductDetails(data?.productDetails);
      } else {
        dispatch(toggleError(true));
        dispatch(storeErrorMessage(data?.message));
      }
      dispatch(toggleLoading(false));
    } catch (error) {
      dispatch(toggleLoading(false));
      dispatch(toggleError(true));
      dispatch(storeErrorMessage(error?.message));
    }
  };
  return productDetails;
};

export default useGetProductDetails;
