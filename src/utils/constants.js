import i18n from "../i18n";

export const WEEKDAYS = {
  Sunday: i18n.t("Sunday"),
  Monday: i18n.t("Monday"),
  Tuesday: i18n.t("Tuesday"),
  Wednesday: i18n.t("Wednesday"),
  Thursday: i18n.t("Thursday"),
  Friday: i18n.t("Friday"),
  Saturday: i18n.t("Saturday"),
  Day: i18n.t("Day"),
  Weekday: i18n.t("Weekday"),
};

export const WEEKDAYS_MAP = [
  { name: WEEKDAYS.Sunday, value: 0 },
  { name: WEEKDAYS.Monday, value: 1 },
  { name: WEEKDAYS.Tuesday, value: 2 },
  { name: WEEKDAYS.Wednesday, value: 3 },
  { name: WEEKDAYS.Thursday, value: 4 },
  { name: WEEKDAYS.Friday, value: 5 },
  { name: WEEKDAYS.Saturday, value: 6 },
];

export const MONTHS = [
  i18n.t("January"),
  i18n.t("February"),
  i18n.t("March"),
  i18n.t("April"),
  i18n.t("May"),
  i18n.t("June"),
  i18n.t("July"),
  i18n.t("August"),
  i18n.t("September"),
  i18n.t("October"),
  i18n.t("November"),
  i18n.t("December"),
];

export const DAYS_IN_MONTH = [
  31,
  29, // Now this is using only for date selection in monthly dropdown.
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

export const REPEAT_TYPES = {
  WEEKS: "weeks",
  DAYS: "days",
  WORKING_DAYS: "workingDays",
};

export const MONTH_DAY_TYPES = {
  FULL_WEEK: "fullWeek",
  FULL_WORKING_WEEK: "fullWorkingWeek",
  DAY: "day",
  WEEKDAY: "weekday",
  CUSTOM: "custom",
  SELECT_DAYS_MANUALLY: "selectDaysManually",
};

export const ORDERS = {
  FIRST: i18n.t("First"),
  SECOND: i18n.t("Second"),
  THIRD: i18n.t("Third"),
  FOURTH: i18n.t("Fourth"),
  LAST: i18n.t("Last"),
};

export const MONTH_OPTIONS = {
  STANDARD: "standard",
  CUSTOM: "custom",
};

export const END_TYPES = {
  NO_END: "noend",
  DATE: "date",
  COUNT: "count",
};

export const REPEAT_OPTIONS = {
  YEARLY: i18n.t("yearly"),
  MONTHLY: i18n.t("monthly"),
  WEEKLY: i18n.t("weekly"),
  SEMI_ANNUAL: i18n.t("semi-annual"),
  BI_MONTHLY: i18n.t("bi-monthly"),
  QUARTERLY: i18n.t("quarterly"),
  BI_WEEKLY: i18n.t("bi-weekly"),
};
