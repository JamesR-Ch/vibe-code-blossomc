import { memo } from "react";
import type { ServiceConfig } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface ServiceCardProps {
  service: ServiceConfig;
  isSelected: boolean;
  selectionCount: number;
  onToggle: (serviceId: string) => void;
  onRemove: (serviceId: string) => void;
}

const ServiceCardComponent = ({
  service,
  isSelected,
  selectionCount,
  onToggle,
  onRemove,
}: ServiceCardProps) => {
  return (
    <div
      className={`group relative p-3 sm:p-4 md:p-5 lg:p-6 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01] md:hover:scale-[1.02] active:scale-[0.98] min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] ${
        isSelected
          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl shadow-blue-100/50 ring-1 sm:ring-2 ring-blue-100"
          : "border-gray-200 hover:border-blue-300 hover:shadow-xl hover:shadow-gray-100/50 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
      }`}
      onClick={() => onToggle(service.id)}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div className="flex-1 w-full">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 transition-all duration-300 ${
              isSelected 
                ? "bg-blue-500 shadow-lg shadow-blue-200" 
                : "bg-gray-100 group-hover:bg-blue-100 group-hover:shadow-md"
            }`}>
              <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${
                  isSelected ? "text-white" : "text-gray-600 group-hover:text-blue-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {service.id === 'bundle' ? (
                  // Bundle/Layer icon for bundle service
                  <>
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM4 5v2h12V5H4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M2 8a1 1 0 011-1h14a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1V8zM3 9v2h14V9H3z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M1 12a1 1 0 011-1h16a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1v-3zM2 13v2h16v-2H2z" clipRule="evenodd" />
                  </>
                ) : service.id === 'photobooth' ? (
                  // Camera icon for photobooth
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586l-.707-.707A1 1 0 0013 4H7a1 1 0 00-.707.293L5.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                ) : service.id === '360video' ? (
                  // Video camera icon for 360 video
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                ) : service.id === 'blessing' ? (
                  // Heart/Blessing icon
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                ) : service.id === 'horoscope' ? (
                  // Star/Horoscope icon
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                ) : service.id === 'stickerline' ? (
                  // Sticker/Tag icon
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V3a1 1 0 011-1h7c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                ) : (
                  // Default checkmark for other services
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
            </div>
            <h3 className={`text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300 leading-tight ${
              isSelected ? "text-blue-800" : "text-gray-800 group-hover:text-blue-700"
            }`}>
              {service.name}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed line-clamp-2">{service.description}</p>
          <div className="flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <p className={`text-sm sm:text-base md:text-lg font-bold transition-colors duration-300 ${
              isSelected ? "text-blue-700" : "text-green-600 group-hover:text-green-700"
            }`}>
              {formatCurrency(service.basePrice)} บาท
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-3 md:ml-4 self-start relative">
          {/* Add Button - Optimized for touch */}
          <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 touch-manipulation ${
            isSelected
              ? "border-blue-500 bg-blue-500 shadow-lg shadow-blue-200"
              : "border-gray-300 bg-white group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:shadow-md"
          }`}>
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-300 ${
                isSelected ? "text-white" : "text-gray-400 group-hover:text-blue-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          {/* Selection Count Badge - Responsive sizing */}
          {selectionCount > 0 && (
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200 animate-in zoom-in-50 duration-300">
              <span className="text-white text-xs sm:text-sm font-bold leading-none">
                {selectionCount > 9 ? '9+' : selectionCount}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
        isSelected ? "bg-gradient-to-r from-blue-500/5 to-indigo-500/5" : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/3 to-indigo-500/3"
      }`}></div>

      {/* Remove Button - Bottom Right Corner - Touch Optimized */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(service.id);
          }}
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 md:w-6 md:h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg shadow-red-200 hover:shadow-red-300 animate-in zoom-in-50 touch-manipulation"
          title={`Remove one ${service.name}`}
          aria-label={`Remove one ${service.name}`}
        >
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3 md:h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

// Memoize the component for better performance
export const ServiceCard = memo(ServiceCardComponent);
