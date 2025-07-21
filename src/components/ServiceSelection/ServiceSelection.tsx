import { ServiceCard } from "./ServiceCard";
import { serviceConfigs } from "../../services/serviceConfig";

interface ServiceSelectionProps {
  selectedServices: string[];
  onServiceToggle: (serviceId: string) => void;
  onServiceRemove: (serviceId: string) => void;
}

export const ServiceSelection = ({
  selectedServices,
  onServiceToggle,
  onServiceRemove,
}: ServiceSelectionProps) => {
  const getServiceCounts = () => {
    const counts: Record<string, number> = {};
    selectedServices.forEach((serviceId) => {
      counts[serviceId] = (counts[serviceId] || 0) + 1;
    });
    return counts;
  };

  const getServiceName = (serviceId: string) => {
    const service = serviceConfigs.find((s) => s.id === serviceId);
    return service?.name || serviceId;
  };

  const serviceCounts = getServiceCounts();

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 shadow-lg shadow-blue-200">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
          เลือกบริการเพื่อออกเอกสาร
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {serviceConfigs.map((service) => {
          const selectionCount = serviceCounts[service.id] || 0;
          return (
            <ServiceCard
              key={service.id}
              service={service}
              isSelected={selectionCount > 0}
              selectionCount={selectionCount}
              onToggle={onServiceToggle}
              onRemove={onServiceRemove}
            />
          );
        })}
      </div>
      {selectedServices.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 border border-green-200 rounded-xl shadow-lg">
            <h3 className="text-green-800 font-semibold mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center mb-2 sm:mb-0 sm:mr-3 shadow-md shadow-green-200">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm sm:text-base">บริการที่เลือกแล้ว</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {Object.entries(serviceCounts).map(([serviceId, count]) => (
                <div
                  key={serviceId}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-3 sm:p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center mb-2 sm:mb-0">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mr-2 sm:mr-3 shadow-sm group-hover:shadow-md transition-shadow duration-300"></div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium group-hover:text-blue-700 transition-colors duration-300">
                      {getServiceName(serviceId)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                      {count} รายการ
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-200">
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mb-1 sm:mb-0 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm sm:text-base text-green-700 font-semibold text-center">
                  รวมทั้งหมด {selectedServices.length} รายการ
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
