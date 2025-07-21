import { useState, useEffect } from "react";
import { ServiceSelection } from "./components/ServiceSelection/ServiceSelection";
import { ServiceForm } from "./components/ContractForm/ServiceForm";
import { CommonForm } from "./components/ContractForm/CommonForm";
import { CustomerForm } from "./components/ContractForm/CustomerForm";
import { ContractTemplate } from "./components/ContractTemplate/ContractTemplate";
import { FloatingActionButton } from "./components/UI/FloatingActionButton";
import { PrintStyles } from "./components/UI/PrintStyles";
import { getServiceConfig } from "./services/serviceConfig";
import { formatBookingSummary, copyToClipboard } from "./utils/bookingSummary";
import { generatePdfFilename } from "./utils/formatters";
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

  const handleServiceRemove = (serviceId: string) => {
    setSelectedServices((prev) => {
      const index = prev.findIndex((id) => id === serviceId);
      if (index > -1) {
        const newServices = [...prev];
        newServices.splice(index, 1);
        return newServices;
      }
      return prev;
    });
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
    // Generate dynamic filename based on contract data
    const filename = generatePdfFilename(contractData);
    
    // Store original title to restore later
    const originalTitle = document.title;
    
    // Set document title to desired filename (this affects the default PDF name)
    document.title = filename;
    
    // Print the document
    window.print();
    
    // Restore original title after a short delay
    // This ensures the print dialog has time to read the new title
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  const handleViewContract = () => {
    setShowContract(true);
  };

  const handleBackToForm = () => {
    setShowContract(false);
  };

  // Scroll to top when contract view changes
  useEffect(() => {
    if (showContract) {
      window.scrollTo(0, 0);
    }
  }, [showContract]);

  const handleCopySummary = async () => {
    const summary = formatBookingSummary(contractData);
    const success = await copyToClipboard(summary);
    
    if (success) {
      alert("คัดลอกข้อมูลสำเร็จ!");
    } else {
      alert("ไม่สามารถคัดลอกข้อมูลได้");
    }
  };

  const contractData = generateContract();

  return (
    <>
      <PrintStyles />

      <div className="min-h-screen bg-gray-50">
        <div className="no-print bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Blossom Service App
              </h1>
              {showContract && (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4 w-full sm:w-auto">
                  <button
                    onClick={handleBackToForm}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg transition duration-200 text-sm sm:text-base font-medium"
                  >
                    แก้ไขข้อมูล
                  </button>
                  <button
                    onClick={handleCopySummary}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg transition duration-200 text-sm sm:text-base font-medium"
                  >
                    คัดลอกสรุป
                  </button>
                  <button
                    onClick={handlePrint}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg transition duration-200 text-sm sm:text-base font-medium"
                  >
                    พิมพ์เอกสาร
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {!showContract ? (
          <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
            <ServiceSelection
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
              onServiceRemove={handleServiceRemove}
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

        {/* Floating Action Button */}
        <FloatingActionButton
          onViewContract={handleViewContract}
          onBackToForm={handleBackToForm}
          showContract={showContract}
          hasServices={selectedServices.length > 0}
        />
      </div>
    </>
  );
}

export default App;
