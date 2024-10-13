import React, { useState, useEffect, Suspense } from "react";
import LoadingScreen from "./LoadScreen";

const Loading = ({ children }) => {
  const [isShow, setIsShow] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const showLoadingEffect = JSON.parse(
      localStorage.getItem("showLoadingEffect")
    );
    if (showLoadingEffect) {
      setIsShow(showLoadingEffect);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {isShow && loading ? <LoadingScreen /> : children}
    </Suspense>
  );
};

export default Loading;
