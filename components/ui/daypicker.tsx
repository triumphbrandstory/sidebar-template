import React from "react";

interface DayPickerProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: number[];
}

const DayPicker = React.forwardRef<HTMLSelectElement, DayPickerProps>(
  ({ options, ...props }, ref) => {
    return (
      <select value={props.value} onChange={props.onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  },
);

DayPicker.displayName = "DayPicker";
export { DayPicker };
