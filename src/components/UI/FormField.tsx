import { useState, useEffect } from 'react';
import type { FieldConfig } from '../../types';
import { parseNumber } from '../../utils/formatters';

interface FormFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (name: string, value: any) => void;
}

export const FormField = ({ field, value, onChange }: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (!isFocused && field.type === 'number' && (field.name === 'price' || field.name === 'depositAmount') && value) {
      setDisplayValue(value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    } else if (!isFocused) {
      setDisplayValue(value || '');
    }
  }, [value, isFocused, field.name, field.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let newValue: any = e.target.value;
    
    if (field.type === 'number') {
      if (isFocused) {
        setDisplayValue(newValue);
      }
      newValue = parseNumber(newValue);
    }
    
    onChange(field.name, newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (field.type === 'number' && (field.name === 'price' || field.name === 'depositAmount')) {
      setDisplayValue(value?.toString() || '');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getInputValue = () => {
    if (field.type === 'number' && (field.name === 'price' || field.name === 'depositAmount')) {
      return isFocused ? displayValue : (value ? value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) : '');
    }
    return value || '';
  };

  return (
    <div className="mb-4 sm:mb-5 lg:mb-6">
      <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1.5 sm:mr-2"></div>
        <span className="leading-tight">{field.label}</span>
        {field.required && <span className="text-red-500 ml-1 sm:ml-2 text-sm sm:text-lg">*</span>}
      </label>
      
      {field.type === 'select' ? (
        <div className="relative">
          <select
            value={value || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 pr-8 sm:pr-10 border border-gray-300 rounded-lg sm:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 hover:shadow-md appearance-none cursor-pointer text-sm sm:text-base"
            required={field.required}
          >
            <option value="">เลือก{field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      ) : field.type === 'number' ? (
        <div className="relative">
          <input
            type="text"
            value={getInputValue()}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 pl-8 sm:pl-10 border border-gray-300 rounded-lg sm:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 hover:shadow-md text-sm sm:text-base"
            required={field.required}
            min={field.min}
            max={field.max}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              {field.name === 'hours' ? (
                // Modern clock icon for hour fields
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
              ) : field.name === 'guestCount' ? (
                // People icon for guest count
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              ) : field.name === 'stickerCount' ? (
                // Sticker/Tag icon for sticker count
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V3a1 1 0 011-1h7c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              ) : (
                // Currency icon for other number fields
                <>
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </>
              )}
            </svg>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type={field.type}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 pl-8 sm:pl-10 border border-gray-300 rounded-lg sm:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 hover:shadow-md text-sm sm:text-base"
            required={field.required}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              {field.type === 'email' ? (
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              ) : field.type === 'tel' ? (
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              ) : field.type === 'date' ? (
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              ) : field.type === 'time' ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              )}
            </svg>
          </div>
        </div>
      )}
      
      {field.name === 'customPhotoSize' && (
        <p className="text-xs text-gray-500 mt-1">
          แสดงเมื่อเลือก "custom" ในขนาดรูป
        </p>
      )}
    </div>
  );
};