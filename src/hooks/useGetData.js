import { useEffect } from "react";
import useGetHeaders from "./useGetHeaders";
import { useDispatch, useSelector } from "react-redux";
import {
  storeFilteredProducts,
  storeProducts,
  toggleLoading,
} from "../dataManager/slices/productsSlice";
import { API_URL } from "../utils/constants";

const useGetData = ({ apiUrl, setError, setIsError }) => {
  const headersOptions = useGetHeaders();
  const dispatch = useDispatch();

  const premiumProducts = useSelector(
    (store) => store?.products?.products?.premiumProducts
  );
  const normalProducts = useSelector(
    (store) => store?.products?.products?.allProducts
  );
  const products = useSelector((store) => store?.products?.products);

  const selectedCategory = useSelector((store) => store?.search?.category);

  useEffect(() => {
    if (!Object.keys(products).length > 0 || apiUrl || selectedCategory) {
      getData();
    }
    !Object.keys(products).length > 0 && getEntryPageData();
  }, [apiUrl, selectedCategory]);

  const getData = async () => {
    try {
      dispatch(toggleLoading(true));
      const options = {
        method: "GET",
        headers: {
          ...headersOptions,
        },
      };

      // for buyer products page
      const resp = await fetch(apiUrl, options);
      const data = await resp.json();
      if (resp?.ok) {
        dispatch(toggleLoading(false));
        setIsError(false);
        dispatch(storeFilteredProducts(data));
      } else {
        dispatch(toggleLoading(false));
        setIsError(true);
        setError(data?.message);
      }
    } catch (error) {
      dispatch(toggleLoading(false));
      setIsError(true);
      setError(error?.message);
    }
  };
  const getEntryPageData = async () => {
    try {
      dispatch(toggleLoading(true));
      const options = {
        method: "GET",
        headers: {
          ...headersOptions,
        },
      };
      const resp = await fetch(API_URL + "products/all", options);
      const data = await resp.json();
      if (resp?.ok) {
        dispatch(toggleLoading(false));
        setIsError(false);
        dispatch(storeProducts(data));
      } else {
        dispatch(toggleLoading(false));
        setIsError(true);
        setError(data?.message);
      }
    } catch (error) {
      dispatch(toggleLoading(false));
      setIsError(true);
      setError(error?.message);
    }
  };
};

export default useGetData;
