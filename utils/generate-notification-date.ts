type SpecificDate = {
  type: "at";
  date: Date;
};

type Random = {
  type: "random";
};

type RandomizeDay = {
  type: "randomDay";
  month: number;
  year: number;
};

type RandomizeMonth = {
  type: "randomMonth";
  day: number;
  year: number;
};

type RandomizeYear = {
  type: "randomYear";
  day: number;
  month: number;
};

type GenerateNotificationDateProps =
  | SpecificDate
  | Random
  | RandomizeDay
  | RandomizeMonth
  | RandomizeYear;

/**
 * Generates a notification date based on the provided parameters
 * @param props
 * @param {("at" | "random" | "randomDay" | "randomMonth" | "randomYear")} props.type
 * -- "at" - Expects a Date object as second parameter from 1 day from now to 15 years from now -> Gets the specified date from user's input
 * - "random" - Expects no aditional parameters -> Generates a date between 3 days from now and 15 years from now
 * - "randomDay" - Expects month & year as aditional parameters (month: 01-12, year: current to 15 years from now) -> Generates a date with a random day at least 1 day from now based on user's month and year input // if selected year is current year, month can't be in the past, if both are the same as current date, generated day should be at least 1 day from now
 * - "randomMonth" - Expects day & year as aditional parameters (day: 01-31, year: current to 15 years from now) -> Generates a date with a random month based on user's day and year input // if selected year is current year, generated month should be at least 1 month from now
 * - "randomYear" - Expects day & month as aditional parameters (day: 01-31, month: 01-12) -> Generates a date with a random year based on user's day and month input // if day and month combined are before current date, generated year should be at least 1 year from now
 * @param {Date} props.date - Date received when "at" a specific date is selected
 * @param {number} props.day - Day as a number from 01-31 to be passed if type is either "randomMonth" or "randomYear"
 * @param {number} props.month - Month as a number from 01-12 to be passed if type is either "randomDay" or "randomYear"
 * @param {number} props.year - Year as a number from current year to (current year + 15) (e.g: currentYear = 2024, maxYear = 2024 + 15 = 2039) to be passed if type is either "randomDay" or "randomYear"
 */

export function generateNotificationDate(props: GenerateNotificationDateProps) {
  if (props.type === "at") return props.date;
  if (props.type === "random") {
    return generateRandomFutureDate();
  }
  if (props.type === "randomDay") {
    return generateDateWithRandomDay(props.month, props.year);
  }
  if (props.type === "randomMonth") {
    return generateDateWithRandomMonth(props.day, props.year);
  }
  if (props.type === "randomYear") {
    return generateDateWithRandomYear(props.day, props.month);
  }
}

function generateRandomFutureDate() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const minYear = currentYear;
  const maxYear = currentYear + 15;
  const maxMonth = 11; // months are zero-based index

  // Generate random date within boundaries
  const randomYear =
    Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear; // Always add +1 to make the max inclusive as well as the min

  let randomMonth;

  // to avoid using recursion with Math.random() we'll check for year and month to make sure we don't have to reroll the random number generator if the date is generated in the past
  if (randomYear === currentYear) {
    // we'll randomize a month between the current month and the last month of the year
    // and add 1 to make sure it always falls at least on the next month so we don't have to deal with days
    // (javascript's Date constructor accepts month numbers higher than 11 so we can safely add 1 even if we're in the last month of the year)
    randomMonth =
      Math.floor(Math.random() * (maxMonth - currentMonth + 1)) +
      currentMonth +
      1;
  } else {
    randomMonth = Math.floor(Math.random() * 12) + 1;
  }
  const randomDay = Math.floor(Math.random() * 31) + 1;

  const randomDate = new Date(randomYear, randomMonth, randomDay);
  return randomDate.toUTCString();
}

function generateDateWithRandomDay(month: number, year: number) {
  const randomDay = Math.floor(Math.random() * 31) + 1;
  const dateWithRandomDay = new Date(year, month, randomDay);

  return dateWithRandomDay.toUTCString();
}

function generateDateWithRandomMonth(day: number, year: number) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const maxMonth = 11; // months are zero-based index
  let randomMonth;

  if (year === currentYear) {
    // randomize a month between the current month and the last month of the year
    // if user selects the current year and current day and the randomized month ends up being the current month we'll add 1 month
    // if the current month is the last month of the year we'll accept AND EXPLAIN a notification in the first month of the next year
    randomMonth =
      Math.floor(Math.random() * (maxMonth - currentMonth + 1)) + currentMonth;
    if (randomMonth === currentMonth && day < currentDay) {
      randomMonth + 1;
    }
  } else {
    randomMonth = Math.floor(Math.random() * 12) + 1;
  }

  const dateWithRandomMonth = new Date(year, randomMonth, day);
  return dateWithRandomMonth.toUTCString();
}

function generateDateWithRandomYear(day: number, month: number) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const maxYear = currentYear + 15;

  let randomYear = Math.floor(
    Math.random() * (maxYear - currentYear + 1) + currentYear,
  );

  if (randomYear === currentYear && month === currentMonth) {
    randomYear + 1;
  }

  const dateWithRandomYear = new Date(randomYear, month, day);
  return dateWithRandomYear.toUTCString();
}
