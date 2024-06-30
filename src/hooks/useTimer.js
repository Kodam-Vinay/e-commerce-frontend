import { useEffect, useState } from "react";

const useTimer = ({ isOtpSent }) => {
  const time = JSON.parse(sessionStorage.getItem("timer"));
  const secondsCount = JSON.parse(sessionStorage.getItem("seconds"));
  const [timer, setTimer] = useState(
    time ? time : { minutes: "05", seconds: "00" }
  );

  useEffect(() => {
    if (isOtpSent) {
      let timeInSeconds = secondsCount ? secondsCount : 300;

      const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        setTimer({
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });

        if (timeInSeconds > 0) {
          timeInSeconds--;
        }

        if (timeInSeconds < 0) {
          clearInterval(timerInterval);
        }
        sessionStorage.setItem("seconds", JSON.stringify(timeInSeconds));
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [isOtpSent]);

  sessionStorage.setItem("timer", JSON.stringify(timer));
  return timer;
};

export default useTimer;
