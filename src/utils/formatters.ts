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