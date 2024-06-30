import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES_LIST, changeLanguage } from "../utils/constants";
import { toggleLanguage } from "../dataManager/slices/languageSlice";

const LanguageFilter = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const activeLanguage = useSelector(
    (store) => store?.language?.activeLanguage
  );

  const data = changeLanguage("hello", "en", "hi");

  return (
    <select
      onChange={(e) => dispatch(toggleLanguage(e.target.value))}
      className={`bg-transparent h-8 border outline-none px-2 py-1 mb-2 rounded-md w-fit self-end mr-4 ${
        isDarkTheme
          ? "border-white hover:bg-gray-700"
          : "border-black hover:bg-gray-200"
      }`}
    >
      {LANGUAGES_LIST?.map((each) => (
        <option key={each?.language} value={each?.language} className="m-2">
          {each?.lan}
        </option>
      ))}
    </select>
  );
};

export default LanguageFilter;
