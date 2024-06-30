import {
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ReactRouter from "./components/ReactRouter";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./dataManager/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Popup from "./components/Popup";
import { useEffect } from "react";
import { storeCurrentPath } from "./dataManager/slices/pathSlice";
import useDeviceOnline from "./hooks/useDeviceOnline";
import OfflinePage from "./pages/OfflinePage";
import {
  toggleError,
  toggleSuccess,
} from "./dataManager/slices/successErrorSlice";

const RenderLayout = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const showPopup = useSelector((store) => store?.popup?.showPopup);
  const isError = useSelector((store) => store?.successError?.isError);
  const errorMessage = useSelector(
    (store) => store?.successError?.errorMessage
  );
  const isSuccess = useSelector((store) => store?.successError?.isSuccess);
  const successMessage = useSelector(
    (store) => store?.successError?.successMessage
  );

  const popupType = useSelector((store) => store?.popup?.popupData?.type);

  const checkIsOnline = useDeviceOnline();

  useEffect(() => {
    dispatch(storeCurrentPath(path?.pathname));
    if (path?.pathname === "/") {
      navigate("/home");
    }
  }, [path?.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess || isError) {
        dispatch(toggleError(false));
        dispatch(toggleSuccess(false));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess, isError]);

  if (isError) {
    toast(errorMessage, {
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

  if (isSuccess && popupType === "delete") {
    toast(successMessage, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDarkTheme ? "dark" : "light",
      type: "success",
    });
  }

  return (
    <div
      className={`${
        isDarkTheme ? "dark_theme" : "light_theme"
      } h-full inter-font overflow-hidden`}
    >
      {path?.pathname !== "/auth" && <Header />}
      {checkIsOnline ? (
        <div className="p-2 h-[90%] w-full flex flex-col">
          <ToastContainer className={"h-10"} />
          {showPopup && <Popup />}
          <Outlet />
        </div>
      ) : (
        <OfflinePage />
      )}
    </div>
  );
};

function App() {
  const router = ReactRouter({ RenderLayout });
  return (
    <div className="app-container">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
