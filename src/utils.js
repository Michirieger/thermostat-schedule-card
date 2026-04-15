// Day name arrays
export const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAY_NAMES_FULL = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];
export const DAY_NAMES_HA = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/** Convert minutes-since-midnight to "HH:MM" */
export function minutesToTimeStr(minutes) {
  const totalMins = Math.max(0, Math.min(1440, minutes));
  const h = Math.floor(totalMins / 60) % 24;
  const m = totalMins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Convert "HH:MM" to minutes-since-midnight (midnight end-of-day = 1440) */
export function timeStrToMinutes(timeStr, endOfDay = false) {
  if (!timeStr) return endOfDay ? 1440 : 0;
  const [h, m] = timeStr.split(':').map(Number);
  const total = (h || 0) * 60 + (m || 0);
  if (total === 0 && endOfDay) return 1440;
  return total;
}

/** Generate a short unique ID */
export function generateId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
}

/** Human-readable group name based on selected days */
export function getGroupName(days) {
  const sorted = [...days].sort((a, b) => a - b);
  if (sorted.length === 7) return 'Every day';
  if (JSON.stringify(sorted) === JSON.stringify([1, 2, 3, 4, 5])) return 'Monday to Friday';
  if (JSON.stringify(sorted) === JSON.stringify([0, 6])) return 'Weekend';
  if (JSON.stringify(sorted) === JSON.stringify([6])) return 'Saturday';
  if (JSON.stringify(sorted) === JSON.stringify([0])) return 'Sunday';
  if (sorted.length === 1) return DAY_NAMES_FULL[sorted[0]];
  return sorted.map((d) => DAY_NAMES_SHORT[d]).join(', ');
}

/**
 * Returns background and text color for a temperature block.
 * Cold temps → gray, warm temps → blue (like HA thermostat UI).
 */
export function getBlockColor(temp, minTemp = 5, maxTemp = 35) {
  const ratio = (temp - minTemp) / (maxTemp - minTemp);
  if (ratio >= 0.4) {
    return { bg: '#5ba4cf', text: '#fff' }; // comfortable – blue
  }
  return { bg: '#9e9e9e', text: '#fff' }; // eco – gray
}

/** Sort blocks by start time, fill gaps to cover full 24h */
export function sortBlocks(blocks) {
  return [...blocks].sort((a, b) => a.startMinutes - b.startMinutes);
}

/** Build a default schedule matching the image (Mon-Fri / Sat / Sun) */
export function getDefaultSchedule() {
  return {
    version: 1,
    groups: [
      {
        id: generateId(),
        days: [1, 2, 3, 4, 5],
        blocks: [
          { id: generateId(), startMinutes: 0, endMinutes: 450, temperature: 18 },
          { id: generateId(), startMinutes: 450, endMinutes: 1080, temperature: 22 },
          { id: generateId(), startMinutes: 1080, endMinutes: 1440, temperature: 18 },
        ],
      },
      {
        id: generateId(),
        days: [6],
        blocks: [
          { id: generateId(), startMinutes: 0, endMinutes: 540, temperature: 18 },
          { id: generateId(), startMinutes: 540, endMinutes: 1200, temperature: 22 },
          { id: generateId(), startMinutes: 1200, endMinutes: 1440, temperature: 18 },
        ],
      },
      {
        id: generateId(),
        days: [0],
        blocks: [
          { id: generateId(), startMinutes: 0, endMinutes: 540, temperature: 18 },
          { id: generateId(), startMinutes: 540, endMinutes: 1080, temperature: 23 },
          { id: generateId(), startMinutes: 1080, endMinutes: 1440, temperature: 18 },
        ],
      },
    ],
  };
}

/**
 * Collect unique time boundary minutes from all blocks in a group,
 * used to render time labels beneath the timeline.
 */
export function getTimeBoundaries(blocks) {
  const minutes = new Set();
  minutes.add(0);
  minutes.add(1440);
  for (const b of blocks) {
    minutes.add(b.startMinutes);
    minutes.add(b.endMinutes);
  }
  return [...minutes].sort((a, b) => a - b);
}
