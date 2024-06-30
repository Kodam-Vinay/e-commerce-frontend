import { useState } from "react";
import Filters from "../components/products/Filters";
import SortFilter from "../components/products/SortFilter";
import AdditionalFilter from "../components/products/AdditionalFilter";
import { Outlet, useSearchParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { API_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Home = () => {
  const [isSortClicked, setSortClicked] = useState(false);
  const [isFilterClicked, setFilterClicked] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const pathName = useSelector(
    (store) => store?.persistSliceReducer?.path?.currentPath
  );

  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("search_q");

  const selectedCategory = useSelector((store) => store?.search?.category);

  const category = categoryQuery ? categoryQuery : selectedCategory;
  const enteredInput = useSelector((store) => store?.search?.searchInput);
  const searchInput = searchQuery ? searchQuery : enteredInput;
  const apiUrl =
    API_URL +
    `products/all?search_q=${searchInput}&category=${
      category ? category : "all"
    }`;
  useGetData({ apiUrl, setError, setIsError, setLoading });

  if (isError) {
    toast(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDarkTheme ? "dark" : "light",
      type: "error",
    });
  }
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col h-full">
        {/* <LanguageFilter /> */}
        {/* seller/buyer/admin page then based on user type show different ui */}
        <Outlet isLoading={isLoading} />
      </div>

      {pathName.includes("/home/products") && (
        <>
          <div className="absolute bottom-10 pb-2 px-2">
            {isSortClicked && <SortFilter />}
            {isFilterClicked && <AdditionalFilter />}
          </div>
          <Filters
            setSortClicked={setSortClicked}
            setFilterClicked={setFilterClicked}
            isSortClicked={isSortClicked}
            isFilterClicked={isFilterClicked}
          />
        </>
      )}
    </div>
  );
};

export default Home;
