import type { ContractData } from "../types";

export const formatBookingSummary = (contractData: ContractData): string => {
  const { services, customerName, customerPhone, groomName, brideName } = contractData;
  
  let summary = "สรุปการจอง\n";
  summary += `ชื่อลูกค้า: ${customerName || ""} เบอร์โทรศัพท์: ${customerPhone || ""}\n`;
  summary += `เจ้าบ่าวคุณ: ${groomName || ""} เจ้าสาวคุณ: ${brideName || ""}\n`;
  
  // Service names
  const serviceNames = services.map(service => {
    switch (service.serviceType) {
      case "bundle": return "Bundle Service";
      case "photobooth": return "Photobooth";
      case "360video": return "360 Video";
      case "blessing": return "Blessing Video";
      case "horoscope": return "Horoscope Booth";
      case "stickerline": return "Stickerline";
      default: return service.serviceType;
    }
  }).join(", ");
  
  summary += `การจอง: ${serviceNames}\n\n`;
  
  // Service details
  services.forEach((service, index) => {
    if (services.length > 1) {
      summary += `รายละเอียดบริการที่ ${index + 1}:\n`;
    } else {
      summary += "รายละเอียดบริการ:\n";
    }
    
    if (service.serviceType !== "stickerline" && service.serviceType !== "bundle") {
      summary += `จำนวนชั่วโมง: ${service.hours || ""}\n`;
      summary += `สถานที่: ${service.location || ""}\n`;
      summary += `จุดตั้ง: ${service.setupLocation || ""}\n`;
      summary += `วันที่: ${service.eventDate ? new Date(service.eventDate).toLocaleDateString('th-TH') : ""}\n`;
      summary += `เวลา: ${service.startTime || ""} - ${service.endTime || ""}\n`;
      
      if (service.serviceType === "photobooth") {
        const photoSize = service.photoSize === "custom" && service.customPhotoSize 
          ? service.customPhotoSize 
          : service.photoSize;
        summary += `ขนาดรูป: ${photoSize || ""}\n`;
      }
      
      if (service.serviceType === "360video") {
        summary += `Package type: ${service.packageType || ""}\n`;
      }
      
      summary += `จำนวนแขก: ${service.guestCount || ""}\n`;
    }
    
    if (service.serviceType === "stickerline") {
      summary += `จำนวนสติ๊กเกอร์: ${service.stickerCount || ""}\n`;
      summary += `วันที่: ${service.eventDate ? new Date(service.eventDate).toLocaleDateString('th-TH') : ""}\n`;
      summary += `จำนวนแขก: ${service.guestCount || ""}\n`;
    }
    
    if (service.serviceType === "bundle") {
      summary += `ราคารวม: ${service.price?.toLocaleString() || ""} บาท\n`;
    }
    
    if (service.notes) {
      summary += `หมายเหตุ: ${service.notes}\n`;
    }
    
    if (index < services.length - 1) {
      summary += "\n";
    }
  });
  
  return summary;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};