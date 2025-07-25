import type { ServiceConfig } from "../types";

export const serviceConfigs: ServiceConfig[] = [
  {
    id: "bundle",
    name: "Bundle Service",
    description: "Complete service package",
    basePrice: 0,
    defaultValues: {
      price: 0,
    },
    fields: [
      {
        name: "price",
        label: "ราคารวม (บาท)",
        type: "number",
        required: false,
        min: 0,
      },
      {
        name: "notes",
        label: "Note เพิ่มเติม",
        type: "text",
        required: false,
        placeholder: "Note เพิ่มเติม (ถ้ามี)",
      },
    ],
  },
  {
    id: "photobooth",
    name: "Photobooth",
    description: "Professional photo booth service",
    basePrice: 8900,
    defaultValues: {
      hours: 3,
      photoSize: "4x6 อวยพร",
      setupLocation: "indoor",
      startTime: "18:00",
      endTime: "21:00",
      price: 8900,
    },
    fields: [
      {
        name: "hours",
        label: "จำนวนชั่วโมง",
        type: "number",
        required: true,
        min: 1,
        max: 24,
      },
      {
        name: "photoSize",
        label: "ขนาดรูป",
        type: "select",
        required: true,
        options: ["2x6", "4x6", "4x6 อวยพร", "2x6 อวยพร", "custom"],
      },
      {
        name: "customPhotoSize",
        label: "ขนาดรูปกำหนดเอง",
        type: "text",
        required: false,
        placeholder: "ระบุขนาดรูป",
      },
      {
        name: "setupLocation",
        label: "จุดตั้ง",
        type: "text",
        required: true,
        placeholder: "ระบุจุดตั้งของ Photobooth",
      },
      {
        name: "startTime",
        label: "เวลาเริ่ม",
        type: "time",
        required: true,
      },
      {
        name: "endTime",
        label: "ถึงเวลา",
        type: "time",
        required: true,
      },
      {
        name: "price",
        label: "ราคา (บาท)",
        type: "number",
        required: false,
        min: 0,
      },
      {
        name: "notes",
        label: "Note เพิ่มเติม",
        type: "text",
        required: false,
        placeholder: "Note เพิ่มเติม (ถ้ามี)",
      },
    ],
  },
  {
    id: "360video",
    name: "360 Video",
    description: "360 degree video recording service",
    basePrice: 10900,
    defaultValues: {
      hours: 3,
      packageType: "standard",
      setupLocation: "indoor",
      startTime: "18:00",
      endTime: "21:00",
      price: 10900,
    },
    fields: [
      {
        name: "hours",
        label: "จำนวนชั่วโมง",
        type: "number",
        required: true,
        min: 1,
        max: 24,
      },
      {
        name: "packageType",
        label: "Package Type",
        type: "text",
        required: true,
        placeholder: "ระบุ package type",
      },
      {
        name: "setupLocation",
        label: "จุดตั้ง",
        type: "text",
        required: true,
        placeholder: "ระบุจุดตั้งของ 360 Video",
      },
      {
        name: "startTime",
        label: "เวลาเริ่ม",
        type: "time",
        required: true,
      },
      {
        name: "endTime",
        label: "ถึงเวลา",
        type: "time",
        required: true,
      },
      {
        name: "price",
        label: "ราคา (บาท)",
        type: "number",
        required: false,
        min: 0,
      },
      {
        name: "notes",
        label: "Note เพิ่มเติม",
        type: "text",
        required: false,
        placeholder: "Note เพิ่มเติม (ถ้ามี)",
      },
    ],
  },
  {
    id: "blessing",
    name: "Blessing Video",
    description: "Blessing video recording service",
    basePrice: 4900,
    defaultValues: {
      hours: 2,
      setupLocation: "indoor",
      startTime: "18:00",
      endTime: "20:00",
      price: 4900,
    },
    fields: [
      {
        name: "hours",
        label: "จำนวนชั่วโมง",
        type: "number",
        required: true,
        min: 1,
        max: 24,
      },
      {
        name: "setupLocation",
        label: "จุดตั้ง",
        type: "text",
        required: true,
        placeholder: "ระบุจุดตั้งของ Blessing Video",
      },
      {
        name: "startTime",
        label: "เวลาเริ่ม",
        type: "time",
        required: true,
      },
      {
        name: "endTime",
        label: "ถึงเวลา",
        type: "time",
        required: true,
      },
      {
        name: "price",
        label: "ราคา (บาท)",
        type: "number",
        required: false,
        min: 0,
      },
      {
        name: "notes",
        label: "Note เพิ่มเติม",
        type: "text",
        required: false,
        placeholder: "Note เพิ่มเติม (ถ้ามี)",
      },
    ],
  },
  {
    id: "horoscope",
    name: "Horoscope Booth",
    description: "Interactive horoscope booth service",
    basePrice: 4900,
    defaultValues: {
      hours: 2,
      setupLocation: "indoor",
      startTime: "18:00",
      endTime: "20:00",
      price: 4900,
    },
    fields: [
      {
        name: "hours",
        label: "จำนวนชั่วโมง",
        type: "number",
        required: true,
        min: 1,
        max: 24,
      },
      {
        name: "setupLocation",
        label: "จุดตั้ง",
        type: "text",
        required: true,
        placeholder: "ระบุจุดตั้งของ Horoscope Booth",
      },
      {
        name: "startTime",
        label: "เวลาเริ่ม",
        type: "time",
        required: true,
      },
      {
        name: "endTime",
        label: "ถึงเวลา",
        type: "time",
        required: true,
      },
      {
        name: "price",
        label: "ราคา (บาท)",
        type: "number",
        required: false,
        min: 0,
      },
      {
        name: "notes",
        label: "Note เพิ่มเติม",
        type: "text",
        required: false,
        placeholder: "Note เพิ่มเติม (ถ้ามี)",
      },
    ],
  },
  {
    id: "stickerline",
    name: "Stickerline",
    description: "Custom sticker line service",
    basePrice: 1200,
    defaultValues: {
      stickerCount: 12,
      price: 1200,
    },
    fields: [
      {
        name: "stickerCount",
        label: "จำนวนสติ๊กเกอร์",
        type: "number",
        required: true,
        min: 1,
        placeholder: "จำนวนสติ๊กเกอร์ที่ต้องการ",
      },
      {
        name: "price",
        label: "ราคา (บาท)",
        type: "number",
        required: false,
        min: 0,
      },
      {
        name: "notes",
        label: "Note เพิ่มเติม",
        type: "text",
        required: false,
        placeholder: "Note เพิ่มเติม (ถ้ามี)",
      },
    ],
  },
];

export const commonFields = [
  {
    name: "eventDate",
    label: "วันที่จัดงาน",
    type: "date" as const,
    required: true,
  },
  {
    name: "guestCount",
    label: "จำนวนแขก",
    type: "number" as const,
    required: true,
    min: 1,
    placeholder: "จำนวนแขกโดยประมาณ",
  },
  {
    name: "location",
    label: "สถานที่",
    type: "text" as const,
    required: true,
    placeholder: "สถานที่จัดงาน",
  },
  {
    name: "depositAmount",
    label: "เงินมัดจำ (บาท)",
    type: "number" as const,
    required: true,
    min: 0,
    placeholder: "จำนวนเงินมัดจำ",
  },
  {
    name: "travelFee",
    label: "ค่าเดินทาง (บาท)",
    type: "number" as const,
    required: false,
    min: 0,
    placeholder: "ค่าเดินทาง",
  },
  {
    name: "notes",
    label: "หมายเหตุ",
    type: "text" as const,
    required: false,
    placeholder: "หมายเหตุเพิ่มเติม (ถ้ามี)",
  },
];

export const getServiceConfig = (serviceType: string) => {
  return serviceConfigs.find((config) => config.id === serviceType);
};
