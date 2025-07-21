export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatTime = (hours: number, startTime: string): string => {
  if (!startTime) return '';
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0, 0);
  
  const endDate = new Date(startDate.getTime() + hours * 60 * 60 * 1000);
  
  return endDate.toTimeString().slice(0, 5);
};

export const calculateEndTime = (startTime: string, hours: number): string => {
  if (!startTime || !hours) return '';
  
  try {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const totalMinutes = startHour * 60 + startMinute + hours * 60;
    
    const endHour = Math.floor(totalMinutes / 60) % 24;
    const endMinute = totalMinutes % 60;
    
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  } catch {
    return '';
  }
};

export const parseNumber = (value: string): number => {
  const cleanValue = value.replace(/,/g, '');
  const num = parseFloat(cleanValue);
  return isNaN(num) ? 0 : num;
};

/**
 * Sanitizes a string for use in filenames by removing invalid characters
 */
const sanitizeForFilename = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .trim();
};

/**
 * Formats a date string to YYYY-MM-DD format
 */
const formatDateForFilename = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
};

/**
 * Generates a PDF filename based on contract data
 * Format: Docs_Blossom_Pixel_YYYY-MM-DD_K-{groom}xK-{bride}_{location}
 */
export const generatePdfFilename = (contractData: {
  services: Array<any>;
  groomName?: string;
  brideName?: string;
}): string => {
  // Get event date and location from the first service that has them
  const serviceWithEventData = contractData.services.find(
    service => service.eventDate && service.location
  );
  
  const eventDate = serviceWithEventData?.eventDate || '';
  const location = serviceWithEventData?.location || '';
  const groomName = contractData.groomName || '';
  const brideName = contractData.brideName || '';
  
  // Build filename parts
  const parts = ['Docs_Blossom_Pixel'];
  
  // Add date if available
  const formattedDate = formatDateForFilename(eventDate);
  if (formattedDate) {
    parts.push(formattedDate);
  }
  
  // Add names if available
  const namesPart = [];
  if (groomName) {
    namesPart.push(`K-${sanitizeForFilename(groomName)}`);
  }
  if (brideName) {
    namesPart.push(`K-${sanitizeForFilename(brideName)}`);
  }
  if (namesPart.length > 0) {
    parts.push(namesPart.join('x'));
  }
  
  // Add location if available
  const sanitizedLocation = sanitizeForFilename(location);
  if (sanitizedLocation) {
    parts.push(sanitizedLocation);
  }
  
  return parts.join('_');
};