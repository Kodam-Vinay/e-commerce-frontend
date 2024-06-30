import { useDispatch, useSelector } from "react-redux";
import ReusableButton from "../ReusableButton";
import { useEffect, useRef, useState } from "react";
import useTimer from "../../hooks/useTimer";
import { API_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { storeUserInfo } from "../../dataManager/slices/userSlice";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isDarkTheme = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkTheme
  );
  const userInfo = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  const checkOtpStatus = JSON.parse(localStorage.getItem("otpStatus"));

  const [isOtpSent, setOtpSent] = useState(
    checkOtpStatus ? checkOtpStatus : true
  );
  const inputRefs = useRef([null, null, null, null]);
  const time = useTimer({ isOtpSent });

  const handleOtp = (event, index) => {
    const { value } = event.target;

    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOtp(newOTP);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const joinOtp = otp.join("");

  useEffect(() => {
    localStorage.setItem("otpStatus", JSON.stringify(isOtpSent));
  }, [isOtpSent]);

  useEffect(() => {
    if (time?.minutes === "00" && time?.seconds === "00") {
      setOtpSent(false);
    }
  }, [time?.minutes === "00", time?.seconds === "00"]);

  const handleSubmit = async () => {
    try {
      if (joinOtp?.length < 4) {
        return;
      }
      const details = {
        user: userInfo?.id,
        otp: joinOtp,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };
      const res = await fetch(API_URL + "users/verify-otp", options);
      const data = await res.json();
      if (res?.ok) {
        setIsError(false);
        navigate("/home");
        dispatch(storeUserInfo(data?.userDetails));
        sessionStorage.setItem("seconds", JSON.stringify(300));
        sessionStorage.setItem(
          "timer",
          JSON.stringify({ minutes: "05", seconds: "00" })
        );
      } else {
        setIsError(true);
        setErrorMessage(data?.message);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  const handleSendOtp = async () => {
    try {
      const details = {
        user: userInfo?.id,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };
      const res = await fetch(API_URL + "users/send-otp", options);
      const data = await res.json();
      if (res?.ok) {
        setIsError(false);
        setOtpSent(true);
        toast(data?.message, {
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
      } else {
        setIsError(true);
        setErrorMessage(data?.message);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className={`h-full w-full ${
        isDarkTheme ? "dark_theme" : "light_theme"
      } flex flex-col`}
    >
      <div
        className={`border h-[85%] mt-4 p-1 w-full xs:w-[80%] mxs:w-[60%] sm:w-[50%] md:w-[40%] mdl:w-[50%] lg:w-[30%] self-center rounded-md shadow-md ${
          isDarkTheme
            ? "border-white shadow-slate-200"
            : "border-black shadow-slate-950"
        }`}
      >
        <p className="font-bold text-center">Otp Verification</p>
        <form
          className={`h-[90%] flex flex-col`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex w-full items-center justify-center mt-auto">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="tel"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleOtp(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className={`border outline-none w-7 h-7 mr-3 p-2 ${
                  isDarkTheme
                    ? "border-white shadow-slate-200 dark_theme"
                    : "border-black shadow-slate-950 light_theme"
                } rounded-md`}
              />
            ))}
          </div>
          <div className="mt-auto w-full flex flex-col">
            <>
              {(time?.minutes === "00" && time?.seconds === "00") ||
              !isOtpSent ? (
                <ReusableButton
                  name="Send Otp"
                  onClick={handleSendOtp}
                  className={
                    "flex flex-col items-center justify-center font-bold h-8 sm:h-9 w-fit self-center mb-2"
                  }
                  type={"button"}
                />
              ) : (
                <p className="text-center text-xs mb-5 text-red-200">
                  your otp will expire in {time?.minutes}:{time?.seconds}
                </p>
              )}
            </>
            <ReusableButton
              name="Verify Otp"
              onClick={handleSubmit}
              className={
                "w-full flex flex-col items-center justify-center font-bold h-8 sm:h-9"
              }
              type={"submit"}
            />
          </div>
          {isError && (
            <label className="ml-1 text-xs sm:text-sm text-red-500">
              *{errorMessage}
            </label>
          )}
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
