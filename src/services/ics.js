/**
 * Builds an iCalendar (.ics) file content for a single event
 * @param {Object} evt - Event object with id, title, start_datetime, end_datetime, summary, address, venue_name
 * @returns {string} iCalendar formatted string
 */
export function buildICS(evt) {
  const esc = (s) =>
    String(s || '')
      .replace(/\\/g, '\\\\')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;')
      .replace(/"/g, '\\"');

  const toUTC = (iso) => {
    const date = new Date(iso);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const uid = `evt-${evt.id}@zerowaste.asia`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zero Waste Asia//Festival//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toUTC(new Date().toISOString())}`,
    `DTSTART:${toUTC(evt.start_datetime)}`,
    `DTEND:${toUTC(evt.end_datetime)}`,
    `SUMMARY:${esc(evt.title)}`,
    `DESCRIPTION:${esc(evt.summary || '')}`,
    `LOCATION:${esc(evt.address || evt.venue_name || '')}`,
    `URL:https://zerowaste.asia/festival/event/${evt.id}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Triggers download of an .ics file
 * @param {Object} evt - Event object
 * @param {string} filename - Optional filename (defaults to event-{id}.ics)
 */
export function downloadICS(evt, filename) {
  const icsContent = buildICS(evt);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || `event-${evt.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

