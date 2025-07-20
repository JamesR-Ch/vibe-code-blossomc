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
    travelFee: 0,
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
    // Check if bundle service is selected
    const hasBundleService = selectedServices.some(serviceId => serviceId === "bundle");
    
    const services: ServiceData[] = selectedServices.map((serviceId, index) => {
      const serviceConfig = getServiceConfig(serviceId);
      const serviceKey = `${serviceId}_${index}`;
      const serviceData = servicesData[serviceKey] || {};

      // If bundle service is present, set price to 0 for non-bundle services
      const shouldSetPriceToZero = hasBundleService && serviceId !== "bundle";
      const finalPrice = shouldSetPriceToZero 
        ? 0 
        : (serviceData.price as number) ?? serviceConfig?.basePrice ?? 0;

      return {
        serviceType: serviceId as ServiceData["serviceType"],
        ...serviceData,
        // Only spread specific fields from commonData for non-bundle services
        ...(serviceId !== "bundle" && {
          eventDate: commonData.eventDate,
          guestCount: commonData.guestCount,
          location: commonData.location,
        }),
        price: finalPrice,
        // Keep service-specific notes separate from common notes
        notes: (serviceData.notes as string) || undefined,
      } as ServiceData;
    }).sort((a, b) => {
      // Sort bundle services first
      if (a.serviceType === "bundle" && b.serviceType !== "bundle") return -1;
      if (a.serviceType !== "bundle" && b.serviceType === "bundle") return 1;
      return 0;
    });

    const totalAmount = services.reduce(
      (sum, service) => sum + (service.price > 0 ? service.price : 0),
      0
    ) + ((commonData.travelFee as number) || 0);

    const travelFee = (commonData.travelFee as number) || 0;
    
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
      ...(travelFee > 0 && { travelFee }),
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
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body * {
            visibility: hidden;
          }
          
          .contract-template, .contract-template * {
            visibility: visible;
          }
          
          .contract-template {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: auto !important;
            margin: 0 !important;
            padding: 15mm !important;
            font-size: 11pt !important;
            font-family: Arial, sans-serif !important;
            line-height: 1.3 !important;
            color: #000000 !important;
            background: white !important;
            overflow: visible !important;
            transform: none !important;
            zoom: 1 !important;
          }
          
          .contract-template .grid {
            display: grid !important;
            width: 100% !important;
          }
          
          .contract-template .grid-cols-12 {
            grid-template-columns: repeat(12, 1fr) !important;
          }
          
          .contract-template .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .contract-template .col-span-1 { grid-column: span 1 !important; }
          .contract-template .col-span-2 { grid-column: span 2 !important; }
          .contract-template .col-span-4 { grid-column: span 4 !important; }
          .contract-template .col-span-6 { grid-column: span 6 !important; }
          .contract-template .col-span-8 { grid-column: span 8 !important; }
          .contract-template .col-span-10 { grid-column: span 10 !important; }
          
          .contract-template .border {
            border: 1px solid #000 !important;
          }
          
          .contract-template .border-b {
            border-bottom: 1px solid #000 !important;
          }
          
          .contract-template .border-r {
            border-right: 1px solid #000 !important;
          }
          
          .contract-template .border-gray-800 {
            border-color: #000 !important;
          }
          
          .contract-template .border-gray-400 {
            border-color: #666 !important;
          }
          
          .contract-template .text-xs {
            font-size: 9pt !important;
          }
          
          .contract-template .text-sm {
            font-size: 10pt !important;
          }
          
          .contract-template .text-lg {
            font-size: 14pt !important;
          }
          
          .contract-template .font-bold {
            font-weight: bold !important;
          }
          
          .contract-template .text-center {
            text-align: center !important;
          }
          
          .contract-template .text-right {
            text-align: right !important;
          }
          
          .contract-template .p-1 {
            padding: 2pt !important;
          }
          
          .contract-template .p-2 {
            padding: 4pt !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          @page {
            size: A4 portrait;
            margin: 0;
            padding: 0;
          }
        }
        
        /* Mobile-specific print fix - reduce signature margin only */
        @media print and (max-width: 768px) {
          .contract-template .mt-8 {
            margin-top: 16pt !important;
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
                  const hasBundleService = selectedServices.some(id => id === 'bundle');

                  return (
                    <div key={serviceKey} className="relative">
                      <ServiceForm
                        service={serviceConfig}
                        data={servicesData[serviceKey] || {}}
                        onChange={(_, data) =>
                          handleServiceDataChange(serviceKey, data)
                        }
                        commonData={commonData}
                        hasBundleService={hasBundleService}
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
