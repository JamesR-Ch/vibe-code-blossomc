import { FormField } from "../UI/FormField";

interface CustomerFormProps {
  data: any;
  onChange: (data: any) => void;
}

const customerFields = [
  {
    name: "customerName",
    label: "ชื่อลูกค้า",
    type: "text" as const,
    required: true,
    placeholder: "ชื่อลูกค้า ต้องมีคำว่าคุณ",
  },
  {
    name: "customerPhone",
    label: "เบอร์โทรศัพท์",
    type: "text" as const,
    required: true,
    placeholder: "08x-xxx-xxxx",
  },
  {
    name: "groomName",
    label: "เจ้าบ่าวคุณ",
    type: "text" as const,
    required: false,
    placeholder: "ชื่อเจ้าบ่าว ไม่ต้องมีคำว่าคุณ",
  },
  {
    name: "brideName",
    label: "เจ้าสาวคุณ",
    type: "text" as const,
    required: false,
    placeholder: "ชื่อเจ้าสาว ไม่ต้องมีคำว่าคุณ",
  },
];

export const CustomerForm = ({ data, onChange }: CustomerFormProps) => {
  const handleFieldChange = (name: string, value: any) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
        ข้อมูลลูกค้า
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customerFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={data[field.name]}
            onChange={handleFieldChange}
          />
        ))}
      </div>
    </div>
  );
};
