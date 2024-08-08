import React, { useCallback } from "react";
import { getDateWithZero, getMonthName, getWeekday } from "../utils/dateUtils";
import {
  MONTHS,
  MONTH_DAY_TYPES,
  MONTH_OPTIONS,
  ORDERS,
  REPEAT_TYPES,
  WEEKDAYS_MAP,
} from "../utils/constants";
import i18n from "../i18n";

function ReccurringText(props) {
  const {
    disabled = false,
    styles = {},
    value = {},
    setValue,
    state = {},
    setState,
  } = props;
  const {
    selectedWeeks,
    monthOption,
    selectedMonthDate,
    selectedMonthDayOrder,
    selectedMonthDay,
    months,
    startDate,
    repeat,
    frequency,
    skipFrom,
    skipTo,
    isAdditionalOptionsActive,
    repeatFor,
    repeatForType,
    isRepeatForDisabled,
  } = state;

  console.log("ReccurringText state=", state);

  const getOccursStartDate = useCallback(() => {
    if (!startDate) return "";
    const dateObj = new Date(startDate);
    const weekDay = getWeekday(startDate);
    const monthName = getMonthName(startDate);
    const date = getDateWithZero(startDate);
    return (
      i18n.t("starting") +
      ` ${weekDay}, ${date} ${monthName} ${dateObj.getFullYear()}`
    );
  }, [startDate]);

  const getAdditionalInfo = useCallback(() => {
    if (
      skipFrom === undefined ||
      skipTo === undefined ||
      !isAdditionalOptionsActive ||
      selectedMonthDayOrder === ORDERS.LAST
    )
      return "";
    const skipFromData = WEEKDAYS_MAP.find((day) => day.value === skipFrom);
    const skipToData = WEEKDAYS_MAP.find((day) => day.value === skipTo);
    const dayText =
      monthOption === MONTH_OPTIONS.STANDARD
        ? i18n.t("starting") + ` ${selectedMonthDate} ` + i18n.t("is")
        : i18n.t("the") +
          ` ${selectedMonthDayOrder?.toLowerCase()} ${selectedMonthDay} ` +
          i18n.t("is");
    return (
      `. ` +
      i18n.t("If") +
      ` ${dayText} ${skipFromData.name} ` +
      i18n.t("then push to next") +
      ` ${skipToData.name}`
    );
  }, [
    isAdditionalOptionsActive,
    skipFrom,
    skipTo,
    monthOption,
    selectedMonthDate,
    selectedMonthDay,
    selectedMonthDayOrder,
  ]);

  const getRepeatForText = useCallback(() => {
    if (
      !repeatFor ||
      !repeatForType ||
      isRepeatForDisabled ||
      selectedMonthDayOrder === ORDERS.LAST
    )
      return "";
    const repeatForTypeText =
      repeatForType === REPEAT_TYPES.WORKING_DAYS
        ? i18n.t("working days")
        : repeatForType;
    return `(` + i18n.t("repeat for") + ` ${repeatFor} ${repeatForTypeText})`;
  }, [repeatFor, repeatForType, isRepeatForDisabled, selectedMonthDayOrder]);

  const getLastRepeatForText = useCallback(() => {
    if (!repeatFor || repeatFor <= 1 || selectedMonthDayOrder !== ORDERS.LAST)
      return "";
    return `${repeatFor}`;
  }, [repeatFor, selectedMonthDayOrder]);

  const getSelectedName = useCallback(() => {
    let selecDays = selectedWeeks;
    if (startDate) {
      const startDateObj = new Date(startDate);
      selecDays = selectedWeeks
        .filter((d) => d >= startDateObj.getDay())
        .concat(selectedWeeks.filter((d) => d < startDateObj.getDay()));
    }
    const name = [];
    selecDays.forEach((d) => {
      const dayData = WEEKDAYS_MAP.find((day) => day.value === d);
      if (dayData.name) {
        name.push(dayData.name);
      }
    });
    if (name.length > 1) {
      const l1 = name.pop();
      const l2 = name.pop();
      name.push(`${l2} ` + i18n.t("and") + ` ${l1}`);
    }
    return name.join(", ");
  }, [startDate, selectedWeeks]);

  const getSelectedMonthDayText = useCallback(() => {
    let text = selectedMonthDay;
    text =
      selectedMonthDay === MONTH_DAY_TYPES.FULL_WEEK
        ? "full week"
        : selectedMonthDay === MONTH_DAY_TYPES.FULL_WORKING_WEEK
          ? "full working week"
          : text;
    if (selectedMonthDay === MONTH_DAY_TYPES.SELECT_DAYS_MANUALLY) {
      const weekDays = selectedWeeks.map((d) => {
        const dayData = WEEKDAYS_MAP.find((day) => day.value === d);
        return dayData?.name;
      });
      if (weekDays?.length === 0) text = "-";
      else if (weekDays?.length === 1) text = weekDays[0];
      else {
        text =
          weekDays.slice(0, -1).join(", ") +
          " " +
          i18n.t("and") +
          " " +
          weekDays[weekDays.length - 1];
      }
    }
    return text;
  }, [selectedMonthDay, selectedWeeks]);

  const joinWithCommasAnd = useCallback(() => {
    if (months.length === 0) {
      return "";
    } else if (months.length === 1) {
      return MONTHS[months[0]];
    } else {
      return (
        months
          .slice(0, -1)
          .map((x) => MONTHS[x])
          .join(", ") +
        " " +
        i18n.t("and") +
        " " +
        MONTHS[months[months.length - 1]]
      );
    }
  }, [months]);

  if (repeat === i18n.t("weekly") && selectedWeeks?.length > 0) {
    return (
      <div style={{ marginTop: 20, ...styles.recurrenceText }}>
        {i18n.t("Occurs")}
        <span style={{ fontWeight: "bold", marginLeft: 5, marginRight: 5 }}>
          {i18n.t("every") + " "}
          {frequency > 1 ? ` ${frequency} ` + i18n.t("weeks on") : ""}{" "}
          {getSelectedName()}
        </span>
        {getOccursStartDate()}
      </div>
    );
  }
  if (repeat === i18n.t("monthly")) {
    const occursEvery =
      monthOption === "standard"
        ? i18n.t("day") + ` ${selectedMonthDate} ${getRepeatForText()}`
        : i18n.t("the") +
          ` ${selectedMonthDayOrder?.toLowerCase()} ${getLastRepeatForText()} ${getSelectedMonthDayText()} ${getRepeatForText()}`;

    return (
      <div style={{ marginTop: 20, ...styles.recurrenceText }}>
        {i18n.t("Occurs")}
        <span style={{ fontWeight: "bold", marginLeft: 5, marginRight: 5 }}>
          {occursEvery} {i18n.t("of every")}{" "}
          {frequency > 1 ? `${frequency} ` + i18n.t("months") : i18n.t("month")}
        </span>
        {getOccursStartDate()}
        {getAdditionalInfo()}
      </div>
    );
  }
  if (repeat === i18n.t("yearly")) {
    const monthName = joinWithCommasAnd();
    const occursEvery =
      monthOption === "standard"
        ? i18n.t("every") +
          ` ${selectedMonthDate} ${getRepeatForText()} ` +
          i18n.t("of") +
          ` ${monthName}`
        : i18n.t("the") +
          ` ${selectedMonthDayOrder?.toLowerCase()} ${getLastRepeatForText()} ${getSelectedMonthDayText()} ${getRepeatForText()} ` +
          i18n.t("of") +
          ` ${monthName}`;

    return (
      <div style={{ marginTop: 20, ...styles.recurrenceText }}>
        {i18n.t("Occurs")}
        <span style={{ fontWeight: "bold", marginLeft: 5, marginRight: 5 }}>
          {occursEvery}
        </span>
        {getOccursStartDate()}
        {getAdditionalInfo()}
      </div>
    );
  }

  return <></>;
}

export default ReccurringText;
