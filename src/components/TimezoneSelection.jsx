import React from "react";
import Select from "react-select";

function TimezoneSelection(props) {
  const {
    disabled = false,
    styles = {},
    value = "Москва (UTC+3)",
    setValue,
    state = {},
  } = props;
  const { timezone } = state;

  const handleTimezoneChange = (event) => {
    setValue({ timezone: event?.value });
  };

  return (
    <Select
      value={{ vale: timezone, label: timezone }}
      onChange={handleTimezoneChange}
      name="timezone"
      isDisabled={disabled}
      options={TIMEZONES.map((i) => ({ value: i, label: i }))}
      required
      closeMenuOnSelect={true}
      isClearable={false}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          maxWidth: 200,
          border: "none",
          borderBottom: "1px dotted",
          borderRadius: 0,
          marginTop: -10,
          marginBottom: 20,
        }),
      }}
    />
  );
}

export default TimezoneSelection;

export const TIMEZONES = [
  "Калининград (UTC+2)",
  "Москва (UTC+3)",
  "Самара (UTC+4)",
  "Екатеринбург (UTC+5)",
  "Омск (UTC+6)",
  "Красноярск (UTC+7)",
  "Иркутск (UTC+8)",
  "Якутск (UTC+9)",
  "Владивосток (UTC+10)",
  "Магадан (UTC+11)",
  "Сахалин (UTC+11)",
  "Камчатка (UTC+12)",
];
