/**
 * Bộ hàm tiện ích dùng chung (Helper / Utilities) cho toàn bộ ứng dụng
 */

// ============================================================================
// 1. DATE & TIME FORMATTERS
// ============================================================================

/**
 * Format ngày thành chuỗi tiếng Việt chi tiết: "Thứ Hai, 25 tháng 8, 2026"
 */
export const formatDateFullVN = (date: Date | string | number | null | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const months = [
    'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
    'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
};

/**
 * Format ngày thành chuỗi chuẩn: "DD/MM/YYYY"
 */
export const formatDate = (date: Date | string | number | null | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Format giờ: "HH:mm" (ví dụ: "16:20")
 */
export const formatTime = (date: Date | string | number | null | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Format đầy đủ cả ngày và giờ: "HH:mm DD/MM/YYYY" (ví dụ: "16:20 25/08/2026")
 */
export const formatDateTime = (date: Date | string | number | null | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  return `${formatTime(d)} ${formatDate(d)}`;
};

/**
 * Lời chào theo khung giờ trong ngày
 */
export const getGreeting = (date: Date = new Date()): string => {
  const hour = date.getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  if (hour < 22) return 'Chào buổi tối';
  return 'Chào buổi đêm';
};

/**
 * Lấy múi giờ hiện tại của thiết bị (ví dụ: "Asia/Ho_Chi_Minh (UTC +7)")
 */
export const getTimezone = (): string => {
  try {
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = -new Date().getTimezoneOffset();
    const offsetHours = offsetMinutes / 60;
    const formattedOffset = offsetHours >= 0 ? `+${offsetHours}` : `${offsetHours}`;
    return `${timeZoneName} (UTC ${formattedOffset})`;
  } catch (e) {
    return 'Asia/Ho_Chi_Minh (UTC +7)';
  }
};


// ============================================================================
// 2. CURRENCY & NUMBER FORMATTERS
// ============================================================================

/**
 * Format số thành tiền tệ VND (ví dụ: 1500000 -> "1.500.000 đ" hoặc "1.500.000 VND")
 */
export const formatCurrencyVND = (
  amount: number | string | null | undefined,
  currencySymbol: string = 'đ'
): string => {
  if (amount === null || amount === undefined || amount === '') return '0 ' + currencySymbol;
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0 ' + currencySymbol;

  return `${num.toLocaleString('vi-VN')} ${currencySymbol}`.trim();
};

/**
 * Format số có dấu phân cách hàng nghìn (ví dụ: 1234567.89 -> "1.234.567,89")
 */
export const formatNumber = (
  value: number | string | null | undefined,
  decimals: number = 0
): string => {
  if (value === null || value === undefined || value === '') return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';

  return num.toLocaleString('vi-VN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Chuyển chuỗi số có dấu phân cách về dạng number (ví dụ: "1.500.000" -> 1500000)
 */
export const parseFormattedNumber = (value: string | null | undefined): number => {
  if (!value) return 0;
  // Loại bỏ các ký tự không phải số trừ dấu phẩy thập phân
  const cleanValue = value.toString().replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(cleanValue);
  return isNaN(num) ? 0 : num;
};


// ============================================================================
// 3. STRING & TEXT FORMATTERS
// ============================================================================

/**
 * Rút gọn chuỗi có thêm dấu ba chấm "..." nếu vượt quá maxLength
 */
export const truncateText = (text: string | null | undefined, maxLength: number = 50): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format số điện thoại (ví dụ: "0968206844" -> "0968 206 844" hoặc "0968.206.844")
 */
export const formatPhoneNumber = (phone: string | null | undefined, separator: string = ' '): string => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return [match[1], match[2], match[3]].join(separator);
  }
  return phone;
};

/**
 * Chuyển chuỗi tiếng Việt có dấu thành không dấu (dùng tìm kiếm filter không dấu)
 */
export const removeVietnameseTones = (str: string | null | undefined): string => {
  if (!str) return '';
  let result = str.toLowerCase();
  result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result.replace(/đ/g, 'd');
  // Combine accents
  result = result.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  result = result.replace(/\u02C6|\u0306|\u031B/g, '');
  return result;
};

/**
 * Viết hoa chữ cái đầu mỗi từ (Capitalize)
 */
export const capitalizeWords = (str: string | null | undefined): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export * from './businessCategory';

export default {
  formatDateFullVN,
  formatDate,
  formatTime,
  formatDateTime,
  getGreeting,
  getTimezone,
  formatCurrencyVND,
  formatNumber,
  parseFormattedNumber,
  truncateText,
  formatPhoneNumber,
  removeVietnameseTones,
  capitalizeWords,
};
