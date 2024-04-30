import { ABBREVIATE_MONTHS, FIFTEEN_YEARS_FROM_NOW } from "@/lib/constants";
import React from "react";

interface MonthPickerProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: typeof ABBREVIATE_MONTHS;
}

const MonthPicker = React.forwardRef<HTMLSelectElement, MonthPickerProps>(
  ({ options, ...props }, ref) => {
    return (
      <select value={props.value} onChange={props.onChange}>
        {options.map((option) => (
          <option key={option.name} value={option.index}>
            {option.name.toLocaleUpperCase()}
          </option>
        ))}
      </select>
    );
  },
);

MonthPicker.displayName = "MonthPicker";
export { MonthPicker };
