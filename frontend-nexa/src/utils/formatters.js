// src/utils/formatters.js
// Various helper functions to format numbers, dates and durations. These
// functions centralize locale specific formatting making it easy to keep
// consistency throughout the UI.

/**
 * Format a number with thousands separators using Indonesian locale.
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}

/**
 * Format a Date or ISO string into a readable date string for Indonesia.
 * @param {Date|string|number} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * Format a duration in seconds into mm:ss format.
 * @param {number} seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default {
  formatNumber,
  formatDate,
  formatDuration,
}