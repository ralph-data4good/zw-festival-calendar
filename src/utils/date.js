import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Formats a date range with timezone
 * @param {string} start - ISO datetime string
 * @param {string} end - ISO datetime string
 * @param {string} tz - Optional timezone (e.g., 'Asia/Manila')
 * @returns {string} Formatted range like "Jan 15, 14:00 – 16:00 PST"
 */
export function fmtRange(start, end, tz) {
  try {
    const sd = tz ? dayjs(start).tz(tz) : dayjs(start);
    const ed = tz ? dayjs(end).tz(tz) : dayjs(end);

    const sameDay = sd.format('YYYY-MM-DD') === ed.format('YYYY-MM-DD');

    if (sameDay) {
      return `${sd.format('MMM D, HH:mm')} – ${ed.format('HH:mm')} ${tz || ''}`.trim();
    } else {
      return `${sd.format('MMM D, HH:mm')} – ${ed.format('MMM D, HH:mm')} ${tz || ''}`.trim();
    }
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Date formatting error';
  }
}

/**
 * Formats a single date
 * @param {string} date - ISO datetime string
 * @param {string} format - dayjs format string (default: 'MMM D, YYYY')
 * @returns {string} Formatted date
 */
export function fmtDate(date, format = 'MMM D, YYYY') {
  try {
    return dayjs(date).format(format);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

/**
 * Formats time only
 * @param {string} date - ISO datetime string
 * @param {string} tz - Optional timezone
 * @returns {string} Formatted time like "14:00"
 */
export function fmtTime(date, tz) {
  try {
    const d = tz ? dayjs(date).tz(tz) : dayjs(date);
    return d.format('HH:mm');
  } catch (error) {
    console.error('Error formatting time:', error);
    return '--:--';
  }
}

/**
 * Gets the user's local timezone
 * @returns {string} Timezone string like "America/New_York"
 */
export function getUserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error('Error getting timezone:', error);
    return 'UTC';
  }
}
