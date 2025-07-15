export type ServiceType = 'photobooth' | '360video' | 'blessing' | 'horoscope' | 'stickerline';

export interface BaseServiceData {
  serviceType: ServiceType;
  price: number;
  notes?: string;
}

export interface PhotoboothData extends BaseServiceData {
  serviceType: 'photobooth';
  hours: number;
  photoSize: '2x6' | '4x6' | '4x6-blessing' | '2x6 อวยพร' | 'custom';
  customPhotoSize?: string;
  location: string;
  setupLocation: string;
  guestCount: number;
  eventDate: string;
  startTime: string;
  endTime: string;
}

export interface Video360Data extends BaseServiceData {
  serviceType: '360video';
  hours: number;
  packageType: string;
  location: string;
  setupLocation: string;
  guestCount: number;
  eventDate: string;
  startTime: string;
  endTime: string;
}

export interface BlessingVideoData extends BaseServiceData {
  serviceType: 'blessing';
  hours: number;
  location: string;
  setupLocation: string;
  guestCount: number;
  eventDate: string;
  startTime: string;
  endTime: string;
}

export interface HoroscopeData extends BaseServiceData {
  serviceType: 'horoscope';
  hours: number;
  location: string;
  setupLocation: string;
  guestCount: number;
  eventDate: string;
  startTime: string;
  endTime: string;
}

export interface StickerlineData extends BaseServiceData {
  serviceType: 'stickerline';
  stickerCount: number;
  eventDate: string;
  guestCount: number;
  location: string;
}

export type ServiceData = PhotoboothData | Video360Data | BlessingVideoData | HoroscopeData | StickerlineData;

export interface ContractData {
  services: ServiceData[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  groomName?: string;
  brideName?: string;
  notes?: string;
  depositAmount?: number;
  travelFee?: number;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time' | 'email' | 'tel';
  required: boolean;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface ServiceConfig {
  id: ServiceType;
  name: string;
  description: string;
  basePrice: number;
  defaultValues?: Record<string, unknown>;
  fields: FieldConfig[];
}