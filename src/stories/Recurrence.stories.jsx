import { Recurrence } from "../components/Recurrence";

export default {
  title: "Example/Recurrence",
  render: (args) => <Recurrence {...args} />,
};

const commonArgs = {
  value: {
    frequency: 6,
    // startDate: "2024-07-14T18:30:00.000Z",
    endCount: 10,
    repeat: "monthly",
    cronExpression: ["0 0 1 * ?"],
    timezone: "Asia/Kolkata",
    skipFrom: 0,
    skipTo: 1,
  },
  disabled: false,
  showCronExpression: false,
  showOnlyBottomBorder: true,
  onChange: (val) => {
    console.log("===> onChange: ", val);
  },
  styles: {
    root: {},
    frequencyContainer: {},
    repeatLabel: {},
    everyLabel: {},
    selectedRepeatlLabel: {}, // week(s) or month(s)
    // repeatDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
    // frequencyInput: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

    weekContainer: { marginBottom: 20, marginTop: 15 },
    weekdayBtnContainer: {},
    weekdayBtn: {},
    selectedWeekdayBtn: { backgroundColor: "green" },
    weekdayFullTextLabel: {}, // in mobile view only
    selectedWeekdayFullTextLabel: {}, // in mobile view only

    monthContainer: { marginBottom: 30, marginTop: 30 },
    onLabel: {},
    dayLabel: {},
    orLabel: {},
    // dayDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
    // orderDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
    // monthWeekdayDropdown: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

    dateContainer: { marginBottom: 30 },
    startLabel: {},
    endLabel: {},
    // startDate: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
    // endDate: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
    // endType: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},
    // endCount: {border: '0px', borderBottom: '1px solid', paddingBottom: 3},

    cronExpression: {},
    recurrenceText: { color: "orange" },
  },
};

export const Primary = {
  args: commonArgs,
};
