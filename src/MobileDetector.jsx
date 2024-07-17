import React, { useEffect, useState } from "react";

const MobileDetector = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
        navigator.userAgent
      );
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Ứng dụng này chưa hỗ trợ điện thoại
        </h1>
        <p className="text-lg text-gray-600">
          Vui lòng sử dụng máy tính để truy cập ứng dụng này.
        </p>
      </div>
    );
  }

  return children;
};

export default MobileDetector;
