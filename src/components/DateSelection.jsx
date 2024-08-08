import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import css from "./DateSelection.module.css";
import { END_TYPES } from "../utils/constants";
import { getDateWithZero, getMonthName, getWeekday } from "../utils/dateUtils";

import i18n from "../i18n";

function DateSelection(props) {
  const {
    disabled = false,
    styles = {},
    value = {},
    setValue,
    state = {},
    setState,
  } = props;
  const { selectedEndType, startDate, endDate, endCount, countEndDate } = state;
  const [countEndDateText, setCountEndDateText] = useState("");

  useEffect(() => {
    let text = "";
    if (countEndDate) {
      const dateObj = new Date(countEndDate);
      const weekDay = getWeekday(countEndDate);
      const monthName = getMonthName(countEndDate);
      const date = getDateWithZero(countEndDate);
      text = `${weekDay}, ${date} ${monthName} ${dateObj.getFullYear()}`;
    }
    setCountEndDateText(text);
  }, [countEndDate]);

  const handleEndTypeChange = (event) => {
    setValue({ selectedEndType: event?.target?.value });
  };
  const handleStartDateChange = (val) => {
    setValue({ startDate: val });
  };
  const handleEndDateChange = (val) => {
    setValue({ endDate: val });
  };
  const handleEndCountChange = (event) => {
    setValue({ endCount: event?.target?.value });
  };

  return (
    <div className={css.mainContainer} style={styles.dateContainer}>
      <div className={css.startContainer}>
        <label style={styles.startLabel} className={css.startLabel}>
          {i18n.t("Start")}
        </label>
        <DatePicker
          disabled={disabled}
          className={css.startDate}
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className={css.endContainer}>
        <label style={styles.endLabel}> {i18n.t("End")}</label>
        <select
          key="endType"
          disabled={disabled}
          value={selectedEndType}
          className={css.endType}
          style={styles.endType}
          onChange={handleEndTypeChange}
        >
          <option key="NoEnd" value={END_TYPES.NO_END}>
            {i18n.t("no end date")}
          </option>
          <option key="Date" value={END_TYPES.DATE}>
            {i18n.t("on this day")}
          </option>
          <option key="Count" value={END_TYPES.COUNT}>
            {i18n.t("after")}
          </option>
        </select>
        {selectedEndType === END_TYPES.DATE ? (
          <DatePicker
            disabled={disabled}
            className={css.startDate}
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
          />
        ) : selectedEndType === END_TYPES.COUNT ? (
          <>
            <input
              disabled={disabled}
              value={endCount}
              onChange={handleEndCountChange}
              className={css.endCount}
              style={styles.endCount}
              type="number"
              min={1}
            />
            <label style={{ marginLeft: 10 }}>{i18n.t("occurrence")}</label>
          </>
        ) : null}
      </div>
      {selectedEndType === END_TYPES.COUNT && countEndDate && (
        <div className={css.countEndDate}>
          {i18n.t("Ends on ") + `${countEndDateText}`}
        </div>
      )}
    </div>
  );
}

export default DateSelection;
