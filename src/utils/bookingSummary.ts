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
      case "addon": return "Add-on";
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
    
    if (service.serviceType !== "stickerline" && service.serviceType !== "bundle" && service.serviceType !== "addon") {
      summary += `จำนวนชั่วโมง: ${"hours" in service ? service.hours : ""}\n`;
      summary += `สถานที่: ${"location" in service ? service.location : ""}\n`;
      summary += `จุดตั้ง: ${"setupLocation" in service ? service.setupLocation : ""}\n`;
      summary += `วันที่: ${"eventDate" in service && service.eventDate ? new Date(service.eventDate).toLocaleDateString('th-TH') : ""}\n`;
      summary += `เวลา: ${"startTime" in service ? service.startTime : ""} - ${"endTime" in service ? service.endTime : ""}\n`;

      if (service.serviceType === "photobooth") {
        const photoSize = service.photoSize === "custom" && service.customPhotoSize
          ? service.customPhotoSize
          : service.photoSize;
        summary += `ขนาดรูป: ${photoSize || ""}\n`;
      }

      if (service.serviceType === "360video") {
        summary += `Package type: ${service.packageType || ""}\n`;
      }

      summary += `จำนวนแขก: ${"guestCount" in service ? service.guestCount : ""}\n`;
    }
    
    if (service.serviceType === "stickerline") {
      summary += `จำนวนสติ๊กเกอร์: ${service.stickerCount || ""}\n`;
      summary += `วันที่: ${service.eventDate ? new Date(service.eventDate).toLocaleDateString('th-TH') : ""}\n`;
      summary += `จำนวนแขก: ${service.guestCount || ""}\n`;
    }
    
    if (service.serviceType === "bundle") {
      summary += `ราคารวม: ${service.price?.toLocaleString() || ""} บาท\n`;
    }

    if (service.serviceType === "addon") {
      if (service.addon1) {
        summary += `Add-on (1): ${service.addon1}`;
        if (service.addonPrice1 && service.addonPrice1 > 0) {
          summary += ` - ${service.addonPrice1.toLocaleString()} บาท`;
        }
        summary += "\n";
      }
      if (service.addon2) {
        summary += `Add-on (2): ${service.addon2}`;
        if (service.addonPrice2 && service.addonPrice2 > 0) {
          summary += ` - ${service.addonPrice2.toLocaleString()} บาท`;
        }
        summary += "\n";
      }
      if (service.addon3) {
        summary += `Add-on (3): ${service.addon3}`;
        if (service.addonPrice3 && service.addonPrice3 > 0) {
          summary += ` - ${service.addonPrice3.toLocaleString()} บาท`;
        }
        summary += "\n";
      }
      if (service.addon4) {
        summary += `Add-on (4): ${service.addon4}`;
        if (service.addonPrice4 && service.addonPrice4 > 0) {
          summary += ` - ${service.addonPrice4.toLocaleString()} บาท`;
        }
        summary += "\n";
      }
      const totalAddonPrice = (service.addonPrice1 || 0) + (service.addonPrice2 || 0) + (service.addonPrice3 || 0) + (service.addonPrice4 || 0);
      if (totalAddonPrice > 0) {
        summary += `รวม Add-on: ${totalAddonPrice.toLocaleString()} บาท\n`;
      }
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