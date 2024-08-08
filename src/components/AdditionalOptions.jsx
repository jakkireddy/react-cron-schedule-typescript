import React from "react";

import css from "./AdditionalOptions.module.css";
import { MONTH_OPTIONS, WEEKDAYS_MAP } from "../utils/constants";
import i18n from "../i18n";

function AdditionalOptions(props) {
  const {
    disabled = false,
    styles = {},
    state = {},
    setState,
    setValue,
  } = props;
  const {
    isAdditionalOptionsActive,
    skipFrom,
    skipTo,
    selectedMonthDate,
    monthOption,
  } = state;

  const handleAdditionalOptionCheckbox = (event) => {
    setState({ isAdditionalOptionsActive: !isAdditionalOptionsActive });
    setValue({
      skipFrom: !isAdditionalOptionsActive ? 5 : undefined,
      skipTo: !isAdditionalOptionsActive ? 1 : undefined,
    });
  };

  const handleSkipFromChange = (event) => {
    setState({ skipFrom: Number(event?.target?.value) });
  };

  const handleSkipToChange = (event) => {
    setState({ skipTo: Number(event?.target?.value) });
  };

  return (
    <div>
      <div>{i18n.t("additionalOptions")}</div>
      <div
        className={css.additionalOptionContainer}
        style={styles.additionalOptionContainer}
      >
        <input
          disabled={disabled}
          value="isAdditionalOptionsActive"
          name="isAdditionalOptionsActive"
          checked={isAdditionalOptionsActive}
          type="checkbox"
          onChange={handleAdditionalOptionCheckbox}
        />
        <label
          className={css.additionalOptionText}
          style={{
            ...styles.additionalOptionText,
            color: `${!isAdditionalOptionsActive || disabled ? "gray" : ""}`,
          }}
        >
          {i18n.t("ifTaskIsOn")}
        </label>
        <select
          key="skipFrom"
          disabled={disabled || !isAdditionalOptionsActive}
          value={skipFrom || 5}
          className={css.additionalOptionWeekDropdown}
          style={styles.additionalOptionWeekDropdown}
          onChange={handleSkipFromChange}
        >
          {WEEKDAYS_MAP.map((item) => (
            <option key={item.name} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <label
          className={css.additionalOptionText}
          style={{
            ...styles.additionalOptionText,
            color: `${!isAdditionalOptionsActive || disabled ? "gray" : ""}`,
          }}
        >
          {i18n.t("pushToNext")}
        </label>
        <select
          key="skipTo"
          disabled={disabled || !isAdditionalOptionsActive}
          value={skipTo || 1}
          className={css.additionalOptionWeekDropdown}
          style={styles.additionalOptionWeekDropdown}
          onChange={handleSkipToChange}
        >
          {WEEKDAYS_MAP.map((item) => (
            <option key={item.name} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {isAdditionalOptionsActive &&
        skipFrom !== undefined &&
        skipTo !== undefined &&
        monthOption === MONTH_OPTIONS.STANDARD &&
        selectedMonthDate > 22 && (
          <div className={css.noteComponent}>
            <span>NOTE: </span>
            <span className={css.noteText}>
              {i18n.t("pushToNext") +
                ` ${WEEKDAYS_MAP.find((x) => x.value === skipTo)?.name} ` +
                i18n.t(
                  "falls in the following month, the task will be created on",
                ) +
                ` ${WEEKDAYS_MAP.find((x) => x.value === skipFrom)?.name} ` +
                i18n.t("instead") +
                `.`}
            </span>
          </div>
        )}
    </div>
  );
}

export default AdditionalOptions;
