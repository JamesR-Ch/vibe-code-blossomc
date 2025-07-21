import { useState, useEffect } from "react";

interface FloatingActionButtonProps {
  onViewContract: () => void;
  onBackToForm: () => void;
  showContract: boolean;
  hasServices: boolean;
}

export const FloatingActionButton = ({
  onViewContract,
  onBackToForm,
  showContract,
  hasServices,
}: FloatingActionButtonProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-3">
      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="group w-12 h-12 sm:w-14 sm:h-14 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-300"
          title="กลับด้านบน"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
        </button>
      )}

      {/* Main Action Button */}
      {hasServices && (
        <button
          onClick={showContract ? onBackToForm : onViewContract}
          className={`group relative w-12 h-12 sm:w-14 sm:h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 ${
            showContract
              ? "bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:ring-orange-300"
              : "bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-300"
          }`}
          title={showContract ? "แก้ไขข้อมูล" : "ดูเอกสาร"}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {showContract ? (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
          </div>
          
          {/* Pulse animation when services are selected but no action taken */}
          {!showContract && (
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          )}
        </button>
      )}
    </div>
  );
};