import { useEffect, useState } from "react";

const useDeviceResize = () => {
  const [size, setSize] = useState({
    height: window.screen.availHeight,
    width: window.screen.availWidth,
  });
  useEffect(() => {
    window.addEventListener("resize", changeDisplayHeightAndWidth);
    return () => {
      window.removeEventListener("resize", changeDisplayHeightAndWidth);
    };
  }, []);

  const changeDisplayHeightAndWidth = () => {
    setSize({
      height: window.screen.availHeight,
      width: window.screen.availWidth,
    });
  };
  return size;
};

export default useDeviceResize;
