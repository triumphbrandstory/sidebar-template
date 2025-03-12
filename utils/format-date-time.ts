/**
 * Takes a date string or number and formats it to a short date string in the format "MMM d, yyyy"
 * @param date - Date to format
 * @param locale - Locale to format the date to
 * @returns Formatted date in the format "MMM d, yyyy"
 */

export function formatDateStringToLocalShort(
  date: string | number,
  locale: string = "en-US",
) {
  const dateToFormat = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(dateToFormat);
}

/**
 * Takes a Date object and formats it to a short date string in the format "MMM d, yyyy"
 * @param date - Date to format
 * @param locale - Locale to format the date to
 * @returns Formatted date in the format "MMM d, yyyy"
 */

export function formatDateToLocalShort(date: Date, locale: string = "en-US") {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}
