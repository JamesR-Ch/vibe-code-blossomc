import { useState, useEffect } from 'react';
import type { ServiceConfig, FieldConfig } from '../../types';
import { FormField } from '../UI/FormField';
import { calculateEndTime } from '../../utils/formatters';

interface ServiceFormProps {
  service: ServiceConfig;
  data: any;
  onChange: (serviceId: string, data: any) => void;
  commonData: any;
}

export const ServiceForm = ({ service, data, onChange, commonData }: ServiceFormProps) => {
  const [formData, setFormData] = useState({
    serviceType: service.id,
    price: service.basePrice,
    ...service.defaultValues,
    ...data
  });

  useEffect(() => {
    if (formData.hours && formData.startTime) {
      const endTime = calculateEndTime(formData.startTime as string, formData.hours as number);
      setFormData((prev: any) => ({ ...prev, endTime }));
    }
  }, [formData.hours, formData.startTime]);

  useEffect(() => {
    // Exclude notes from commonData to prevent overwriting service-specific notes
    const { notes, ...commonDataWithoutNotes } = commonData;
    onChange(service.id, { ...formData, ...commonDataWithoutNotes });
  }, [formData, commonData, service.id, onChange]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const shouldShowField = (field: FieldConfig) => {
    if (field.name === 'customPhotoSize') {
      return formData.photoSize === 'custom';
    }
    return true;
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center">
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-2 sm:mb-0 sm:mr-3 lg:mr-4 shadow-md shadow-blue-200 group-hover:shadow-lg transition-shadow duration-300">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="group-hover:text-blue-700 transition-colors duration-300 leading-tight">{service.name}</span>
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {service.fields.map((field) => 
          shouldShowField(field) ? (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={handleFieldChange}
            />
          ) : null
        )}
      </div>
    </div>
  );
};