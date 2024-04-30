export const ABBREVIATE_MONTHS = [
  { name: "jan", index: 0 },
  { name: "feb", index: 1 },
  { name: "mar", index: 2 },
  { name: "apr", index: 3 },
  { name: "may", index: 4 },
  { name: "jun", index: 5 },
  { name: "jul", index: 6 },
  { name: "aug", index: 7 },
  { name: "sep", index: 8 },
  { name: "oct", index: 9 },
  { name: "nov", index: 10 },
  { name: "dec", index: 11 },
]

export const FIFTEEN_YEARS_FROM_NOW = Array.from(
  { length: 15 },
  (_, index) => new Date().getFullYear() + index,
);
