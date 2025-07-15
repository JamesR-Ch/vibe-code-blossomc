import { useState } from "react";
import { ServiceSelection } from "./components/ServiceSelection/ServiceSelection";
import { ServiceForm } from "./components/ContractForm/ServiceForm";
import { CommonForm } from "./components/ContractForm/CommonForm";
import { CustomerForm } from "./components/ContractForm/CustomerForm";
import { ContractTemplate } from "./components/ContractTemplate/ContractTemplate";
import { getServiceConfig } from "./services/serviceConfig";
import type { ContractData, ServiceData } from "./types";

function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesData, setServicesData] = useState<
    Record<string, Record<string, unknown>>
  >({});
  const [commonData, setCommonData] = useState<Record<string, unknown>>({
    guestCount: 200,
    depositAmount: 3000,
  });
  const [customerData, setCustomerData] = useState<Record<string, unknown>>({});
  const [showContract, setShowContract] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => [...prev, serviceId]);
  };

  const handleRemoveService = (index: number) => {
    setSelectedServices((prev) => prev.filter((_, i) => i !== index));
    setServicesData((prev) => {
      const newData = { ...prev };
      delete newData[`${selectedServices[index]}_${index}`];
      return newData;
    });
  };

  const handleServiceDataChange = (
    serviceId: string,
    data: Record<string, unknown>
  ) => {
    setServicesData((prev) => ({ ...prev, [serviceId]: data }));
  };

  const generateContract = (): ContractData => {
    const services: ServiceData[] = selectedServices.map((serviceId, index) => {
      const serviceConfig = getServiceConfig(serviceId);
      const serviceKey = `${serviceId}_${index}`;
      const serviceData = servicesData[serviceKey] || {};

      return {
        serviceType: serviceId as ServiceData["serviceType"],
        ...serviceData,
        ...commonData,
        price: (serviceData.price as number) || serviceConfig?.basePrice || 0,
      } as ServiceData;
    });

    const totalAmount = services.reduce(
      (sum, service) => sum + (service.price || 0),
      0
    );

    return {
      services,
      totalAmount,
      customerName: (customerData.customerName as string) || "",
      customerPhone: (customerData.customerPhone as string) || "",
      customerEmail: (customerData.customerEmail as string) || "",
      groomName: (customerData.groomName as string) || "",
      brideName: (customerData.brideName as string) || "",
      notes: (commonData.notes as string) || "",
      depositAmount: (commonData.depositAmount as number) || 3000,
    };
  };

  const handlePrint = () => {
    window.print();
  };

  const contractData = generateContract();

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .contract-template, .contract-template * {
            visibility: visible;
          }
          .contract-template {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 20mm !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <div className="no-print bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Blossom Service App
              </h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowContract(!showContract)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition duration-200 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedServices.length === 0}
                >
                  {showContract ? "แก้ไขข้อมูล" : "ดูเอกสาร"}
                </button>
                {showContract && (
                  <button
                    onClick={handlePrint}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg transition duration-200 text-sm sm:text-base font-medium"
                  >
                    พิมพ์เอกสาร
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {!showContract ? (
          <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
            <ServiceSelection
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
            />

            {selectedServices.length > 0 && (
              <>
                <CommonForm data={commonData} onChange={setCommonData} />

                <CustomerForm data={customerData} onChange={setCustomerData} />

                {selectedServices.map((serviceId, index) => {
                  const serviceConfig = getServiceConfig(serviceId);
                  if (!serviceConfig) return null;

                  const serviceKey = `${serviceId}_${index}`;

                  return (
                    <div key={serviceKey} className="relative">
                      <ServiceForm
                        service={serviceConfig}
                        data={servicesData[serviceKey] || {}}
                        onChange={(_, data) =>
                          handleServiceDataChange(serviceKey, data)
                        }
                        commonData={commonData}
                      />
                      <button
                        onClick={() => handleRemoveService(index)}
                        className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors duration-200"
                      >
                        ลบ
                      </button>
                    </div>
                  );
                })}

                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    สรุปยอดรวม
                  </h3>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {contractData.totalAmount.toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    บาท
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="max-w-none mx-auto py-4 sm:py-6 lg:py-8 flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-4xl">
              <ContractTemplate contractData={contractData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
