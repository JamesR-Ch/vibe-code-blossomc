import { commonFields } from '../../services/serviceConfig';
import { FormField } from '../UI/FormField';

interface CommonFormProps {
  data: any;
  onChange: (data: any) => void;
}

export const CommonForm = ({ data, onChange }: CommonFormProps) => {
  const handleFieldChange = (name: string, value: any) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
        ข้อมูลทั่วไป
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {commonFields.slice(0, 4).map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={data[field.name] || ''}
            onChange={handleFieldChange}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          หมายเหตุ
        </label>
        <textarea
          value={data.notes || ''}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>
    </div>
  );
};