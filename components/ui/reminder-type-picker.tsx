import React from "react";

interface ReminderTypePickerProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const ReminderTypePicker = React.forwardRef<
  HTMLSelectElement,
  ReminderTypePickerProps
>(({ ...props }, ref) => {
  return (
    <select value={props.value} onChange={props.onChange} ref={ref}>
      <option value="random">WHEN TIME COMES</option>
      <option value="at">SPECIFIC DATE</option>
      <option value="randomDay">RANDOM DAY</option>
      <option value="randomMonth">RANDOM MONTH</option>
      <option value="randomYear">RANDOM YEAR</option>
    </select>
  );
});

ReminderTypePicker.displayName = "ReminderTypePicker";
export { ReminderTypePicker };
