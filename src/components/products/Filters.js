import ReusableButton from "../ReusableButton";
import { FaSortAmountUp, FaFilter } from "react-icons/fa";

const Filters = ({
  setFilterClicked,
  setSortClicked,
  isSortClicked,
  isFilterClicked,
}) => {
  return (
    <div className="absolute px-1 w-[96%] self-center bottom-0 flex items-center justify-around mxs:max-w-[70%] sm:max-w-[50%] pb-2 z-20">
      <ReusableButton
        name={
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <span>Sort</span>
            <FaSortAmountUp />
          </div>
        }
        className="w-full rounded-r-none"
        onClick={() => {
          setSortClicked(!isSortClicked);
          setFilterClicked(false);
        }}
      />
      <ReusableButton
        name={
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <span>Filter</span>
            <FaFilter />
          </div>
        }
        className="w-full rounded-l-none"
        onClick={() => {
          setFilterClicked(!isFilterClicked);
          setSortClicked(false);
        }}
      />
    </div>
  );
};

export default Filters;
