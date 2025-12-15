import type { ContractData } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTranslation, translatePhotoSize } from "../../utils/translations";
import blossomLogo from "../../assets/blossom-logo.png";

interface ContractTemplateProps {
  contractData: ContractData;
}

export const ContractTemplate = ({ contractData }: ContractTemplateProps) => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const formatDateDDMMYYYY = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTodayDDMMYYYY = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getPhotoSizeDisplay = (photoSize: string, customPhotoSize?: string) => {
    if (photoSize === "custom" && customPhotoSize) {
      return customPhotoSize;
    }
    return translatePhotoSize(photoSize, language);
  };

  return (
    <div
      className="contract-template bg-white"
      style={{
        width: "210mm",
        height: "fit-content",
        minHeight: "auto",
        padding: "15mm",
        fontSize: "11pt",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.3",
        color: "#000000",
      }}
    >
      {/* Header */}
      <div className="mb-2">
        <div className="flex justify-between items-start mb-3">
          <div>
            <img
              src={blossomLogo}
              alt="Blossom Pixel"
              className="h-18 w-auto"
            />
          </div>
          <div className="text-right">
            <div className="text-xs text-stone-600 leading-tight">
              198/20 หมู่ 8 ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ 10540
              <br />
              โทร 093-429-3226 Tax ID : 1119900400132
            </div>
          </div>
        </div>

        <h1 className="text-center text-lg font-bold mb-3 text-black">
          {t.title}
        </h1>
      </div>

      {/* Customer Info */}
      <div className="mb-3">
        <div className="grid grid-cols-12 gap-2 mb-1">
          <div className="col-span-2 text-sm">{t.customerName}</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {contractData.customerName || ""}
          </div>
          <div className="col-span-2 text-sm">{t.documentDate}</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {getTodayDDMMYYYY()}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mb-1">
          <div className="col-span-2 text-sm">{t.groom}</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {contractData.groomName || ""}
          </div>
          <div className="col-span-2 text-sm">{t.bride}</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {contractData.brideName || ""}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2 text-sm">{t.phone}</div>
          <div className="col-span-10 border-b border-gray-800 pb-1">
            {contractData.customerPhone || ""}
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="border border-gray-800 mb-3">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-gray-800 bg-white">
          <div className="col-span-1 text-center border-r border-gray-800 p-1 font-bold text-xs text-black">
            {t.no}
          </div>
          <div className="col-span-6 border-r border-gray-800 p-1 font-bold text-xs text-black">
            {t.description}
          </div>
          <div className="col-span-1 text-center border-r border-gray-800 p-1 font-bold text-xs text-black">
            {t.quantity}
          </div>
          <div className="col-span-2 text-center border-r border-gray-800 p-1 font-bold text-xs text-black">
            {t.unitPrice}
          </div>
          <div className="col-span-2 text-center p-1 font-bold text-xs text-black">
            {t.amount}
          </div>
        </div>

        {/* Service Rows */}
        {contractData.services.map((service, index) => (
          <div key={index} className="border-b border-gray-800">
            <div className="grid grid-cols-12">
              <div className="col-span-1 text-center border-r border-gray-800 p-1 text-xs text-black">
                {index + 1}
              </div>
              <div className="col-span-6 border-r border-gray-800 p-1">
                <div className="font-bold text-xs mb-0 text-black">
                  {service.serviceName || (service.serviceType === "bundle"
                    ? t.bundleService
                    : service.serviceType === "photobooth"
                    ? t.photobooth
                    : service.serviceType === "360video"
                    ? t.video360
                    : service.serviceType === "blessing"
                    ? t.blessingVideo
                    : service.serviceType === "horoscope"
                    ? t.horoscopeBooth
                    : service.serviceType === "stickerline"
                    ? t.stickerline
                    : service.serviceType === "addon"
                    ? t.addon
                    : t.unknownService)}
                </div>

                {service.serviceType !== "stickerline" &&
                  service.serviceType !== "bundle" &&
                  service.serviceType !== "addon" && (
                    <>
                      <div className="text-xs text-black">
                        {t.hours} {service.hours || ""}
                      </div>
                      <div className="text-xs text-black">
                        {t.location} {service.location || ""}
                      </div>
                      <div className="text-xs text-black">
                        {t.setupLocation} {service.setupLocation || ""}
                      </div>
                      <div className="text-xs text-black">
                        {t.eventDate} {formatDateDDMMYYYY(service.eventDate) || ""}
                      </div>
                      <div className="text-xs text-black">
                        {t.time} {service.startTime || ""} -{" "}
                        {service.endTime || ""}
                      </div>
                    </>
                  )}

                {service.serviceType === "photobooth" && (
                  <div className="text-xs text-black">
                    {t.photoSize}{" "}
                    {getPhotoSizeDisplay(
                      service.photoSize,
                      service.customPhotoSize
                    ) || ""}
                  </div>
                )}

                {service.serviceType === "360video" && (
                  <div className="text-xs text-black">
                    {t.packageType} {service.packageType || ""}
                  </div>
                )}

                {service.serviceType === "stickerline" && (
                  <div className="text-xs text-black">
                    {t.stickerCount} {service.stickerCount || ""}
                  </div>
                )}

                {service.serviceType === "addon" && (
                  <>
                    {service.addon1 && (
                      <div className="text-xs text-black">
                        {t.addon1} {service.addon1}
                        {service.addonPrice1 && service.addonPrice1 > 0 && (
                          <> = {formatCurrency(service.addonPrice1)} {language === 'th' ? 'บาท' : 'THB'}</>
                        )}
                      </div>
                    )}
                    {service.addon2 && (
                      <div className="text-xs text-black">
                        {t.addon2} {service.addon2}
                        {service.addonPrice2 && service.addonPrice2 > 0 && (
                          <> = {formatCurrency(service.addonPrice2)} {language === 'th' ? 'บาท' : 'THB'}</>
                        )}
                      </div>
                    )}
                    {service.addon3 && (
                      <div className="text-xs text-black">
                        {t.addon3} {service.addon3}
                        {service.addonPrice3 && service.addonPrice3 > 0 && (
                          <> = {formatCurrency(service.addonPrice3)} {language === 'th' ? 'บาท' : 'THB'}</>
                        )}
                      </div>
                    )}
                    {service.addon4 && (
                      <div className="text-xs text-black">
                        {t.addon4} {service.addon4}
                        {service.addonPrice4 && service.addonPrice4 > 0 && (
                          <> = {formatCurrency(service.addonPrice4)} {language === 'th' ? 'บาท' : 'THB'}</>
                        )}
                      </div>
                    )}
                  </>
                )}

                {service.serviceType !== "bundle" && service.serviceType !== "addon" && (
                  <div className="text-xs text-black">
                    {t.guestCount} {service.guestCount || ""}
                  </div>
                )}

                {service.notes && (
                  <div className="text-xs text-black">
                    {t.note} {service.notes}
                  </div>
                )}
              </div>
              <div className="col-span-1 text-center border-r border-gray-800 p-1 text-xs text-black">
                1
              </div>
              <div className="col-span-2 text-right border-r border-gray-800 p-1 text-xs text-black">
                {service.serviceType === 'addon'
                  ? formatCurrency((service.addonPrice1 || 0) + (service.addonPrice2 || 0) + (service.addonPrice3 || 0) + (service.addonPrice4 || 0))
                  : service.price > 0 ? formatCurrency(service.price) : ""}
              </div>
              <div className="col-span-2 text-right p-1 text-xs text-black">
                {service.serviceType === 'addon'
                  ? formatCurrency((service.addonPrice1 || 0) + (service.addonPrice2 || 0) + (service.addonPrice3 || 0) + (service.addonPrice4 || 0))
                  : service.price > 0 ? formatCurrency(service.price) : ""}
              </div>
            </div>
          </div>
        ))}

        {/* Travel Fee Row */}
        {contractData.travelFee && contractData.travelFee > 0 && (
          <div className="border-b border-gray-800">
            <div className="grid grid-cols-12">
              <div className="col-span-1 text-center border-r border-gray-800 p-1 text-xs text-black">
                {contractData.services.length + 1}
              </div>
              <div className="col-span-6 border-r border-gray-800 p-1">
                <div className="font-bold text-xs mb-1 text-black">
                  {t.travelFee}
                </div>
              </div>
              <div className="col-span-1 text-center border-r border-gray-800 p-1 text-xs text-black">
                1
              </div>
              <div className="col-span-2 text-right border-r border-gray-800 p-1 text-xs text-black">
                {formatCurrency(contractData.travelFee)}
              </div>
              <div className="col-span-2 text-right p-1 text-xs text-black">
                {formatCurrency(contractData.travelFee)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Terms */}
      <div className="mb-2">
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-8">
            <div className="font-bold text-xs mb-1 text-black">
              {t.paymentTerms}
            </div>
            <div className="text-xs mb-1 text-black">
              {t.deposit}{" "}
              {formatCurrency(contractData.depositAmount || 3000)} {t.depositPaid}
            </div>
            <div className="text-xs border-b border-gray-800 pb-1 text-black">
              {t.finalPayment}{" "}
              {formatCurrency(
                contractData.totalAmount - (contractData.depositAmount || 3000)
              )}{" "}
              {language === 'th' ? 'บาท' : 'THB'}
            </div>
          </div>
          <div className="col-span-4">
            <div className="border border-gray-800 p-2">
              <div className="text-center font-bold text-xs mb-1 text-black">
                {t.totalNet}
              </div>
              <div className="text-center text-sm font-bold text-black">
                {formatCurrency(contractData.totalAmount)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-2">
        <div className="font-bold text-xs mb-1 text-black">{t.notes}</div>
        <div className="text-xs space-y-0 text-black">
          <div>{t.contractTerm1}</div>
          <div>{t.contractTerm2}</div>
          <div>{t.contractTerm3}</div>
          <div>{t.contractTerm4}</div>
        </div>

        {contractData.notes && (
          <div className="mt-2">
            <div className="font-bold text-xs mb-1 text-black">
              {t.additionalNotes}
            </div>
            <div className="text-xs whitespace-pre-wrap text-black">
              {contractData.notes}
            </div>
          </div>
        )}
      </div>

      {/* Signatures */}
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="border-b border-gray-400 mb-1 h-8"></div>
            <div className="text-xs text-black">{t.employer}</div>
          </div>
          <div className="text-center">
            <div className="text-xs mb-1 text-black">Passkamon P.</div>
            <div className="border-b border-gray-400 mb-1 h-3"></div>
            <div className="text-xs text-black">{t.proposer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
