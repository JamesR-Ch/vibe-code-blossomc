import type { ContractData } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import blossomLogo from "../../assets/blossom-logo.png";

interface ContractTemplateProps {
  contractData: ContractData;
}

export const ContractTemplate = ({ contractData }: ContractTemplateProps) => {
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
    return photoSize;
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
          สัญญาจ้างงาน Blossom Pixel
        </h1>
      </div>

      {/* Customer Info */}
      <div className="mb-3">
        <div className="grid grid-cols-12 gap-2 mb-1">
          <div className="col-span-2 text-sm">ชื่อลูกค้า :</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {contractData.customerName || ""}
          </div>
          <div className="col-span-2 text-sm">วันที่ออกเอกสาร :</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {getTodayDDMMYYYY()}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mb-1">
          <div className="col-span-2 text-sm">เจ้าบ่าวคุณ :</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {contractData.groomName || ""}
          </div>
          <div className="col-span-2 text-sm">x เจ้าสาวคุณ</div>
          <div className="col-span-4 border-b border-gray-800 pb-1">
            {contractData.brideName || ""}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2 text-sm">เบอร์โทรศัพท์:</div>
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
            No.
          </div>
          <div className="col-span-6 border-r border-gray-800 p-1 font-bold text-xs text-black">
            Description
          </div>
          <div className="col-span-1 text-center border-r border-gray-800 p-1 font-bold text-xs text-black">
            Quantity
          </div>
          <div className="col-span-2 text-center border-r border-gray-800 p-1 font-bold text-xs text-black">
            Unit Price (THB)
          </div>
          <div className="col-span-2 text-center p-1 font-bold text-xs text-black">
            Amount (THB)
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
                  {service.serviceType === "bundle"
                    ? "Bundle Service"
                    : service.serviceType === "photobooth"
                    ? "Photobooth"
                    : service.serviceType === "360video"
                    ? "360 Video"
                    : service.serviceType === "blessing"
                    ? "Blessing Video"
                    : service.serviceType === "horoscope"
                    ? "Horoscope Booth"
                    : service.serviceType === "stickerline"
                    ? "Stickerline"
                    : "Unknown Service"}
                </div>

                {service.serviceType !== "stickerline" &&
                  service.serviceType !== "bundle" && (
                    <>
                      <div className="text-xs text-black">
                        จำนวนชั่วโมง : {service.hours || ""}
                      </div>
                      <div className="text-xs text-black">
                        สถานที่ : {service.location || ""}
                      </div>
                      <div className="text-xs text-black">
                        จุดตั้ง: {service.setupLocation || ""}
                      </div>
                      <div className="text-xs text-black">
                        วันที่ : {formatDateDDMMYYYY(service.eventDate) || ""}
                      </div>
                      <div className="text-xs text-black">
                        เวลา : {service.startTime || ""} -{" "}
                        {service.endTime || ""}
                      </div>
                    </>
                  )}

                {service.serviceType === "photobooth" && (
                  <div className="text-xs text-black">
                    ขนาดรูป :{" "}
                    {getPhotoSizeDisplay(
                      service.photoSize,
                      service.customPhotoSize
                    ) || ""}
                  </div>
                )}

                {service.serviceType === "360video" && (
                  <div className="text-xs text-black">
                    Package type : {service.packageType || ""}
                  </div>
                )}

                {service.serviceType === "stickerline" && (
                  <div className="text-xs text-black">
                    จำนวนสติ๊กเกอร์ : {service.stickerCount || ""}
                  </div>
                )}

                {service.serviceType !== "bundle" && (
                  <div className="text-xs text-black">
                    จำนวนแขก : {service.guestCount || ""}
                  </div>
                )}

                {service.notes && (
                  <div className="text-xs text-black">
                    Note : {service.notes}
                  </div>
                )}
              </div>
              <div className="col-span-1 text-center border-r border-gray-800 p-1 text-xs text-black">
                1
              </div>
              <div className="col-span-2 text-right border-r border-gray-800 p-1 text-xs text-black">
                {service.price > 0 ? formatCurrency(service.price) : ""}
              </div>
              <div className="col-span-2 text-right p-1 text-xs text-black">
                {service.price > 0 ? formatCurrency(service.price) : ""}
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
                  ค่าเดินทาง
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
              เงื่อนไขการชำระเงิน:
            </div>
            <div className="text-xs mb-1 text-black">
              งวดแรก เงินมัดจำ (จองคิว) ={" "}
              {formatCurrency(contractData.depositAmount || 3000)} บาท
              (ชำระแล้ว)
            </div>
            <div className="text-xs border-b border-gray-800 pb-1 text-black">
              งวดสุดท้าย หลังจบงานทันที ={" "}
              {formatCurrency(
                contractData.totalAmount - (contractData.depositAmount || 3000)
              )}{" "}
              บาท
            </div>
          </div>
          <div className="col-span-4">
            <div className="border border-gray-800 p-2">
              <div className="text-center font-bold text-xs mb-1 text-black">
                ยอดรวมสุทธิ (บาท)
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
        <div className="font-bold text-xs mb-1 text-black">หมายเหตุ</div>
        <div className="text-xs space-y-0 text-black">
          <div>
            1. กรณีที่ลูกค้าขอยกเลิกงาน ลูกค้าจะไม่ได้รับเงินมัดจำคืนทุกกรณี
          </div>
          <div>
            2. กรณีเกิดความเสียหายของอุปกรณ์จากการใช้บริการ
            ทางฝ่ายผู้ว่าจ้างจะเป็นผู้รับผิดชอบค่าเสียหายตามจริง
          </div>
          <div>
            3. หากต้องการเพิ่มชั่วโมง มีค่าใช้จ่ายเพิ่มชั่วโมงละ 1,500 บาท
          </div>
          <div>
            4. ทาง Blossom Pixel
            ขออนุญาตนำภาพและวิดิโอบางส่วนในงานของลูกค้าไปใช้เผยแพร่ในช่องทางต่างๆของบริษัท
            เพื่อการประชาสัมพันธ์
          </div>
        </div>

        {contractData.notes && (
          <div className="mt-2">
            <div className="font-bold text-xs mb-1 text-black">
              หมายเหตุเพิ่มเติม:
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
            <div className="text-xs text-black">ผู้ว่าจ้าง</div>
          </div>
          <div className="text-center">
            <div className="text-xs mb-1 text-black">Passkamon P.</div>
            <div className="border-b border-gray-400 mb-1 h-3"></div>
            <div className="text-xs text-black">ผู้เสนอ</div>
          </div>
        </div>
      </div>
    </div>
  );
};
