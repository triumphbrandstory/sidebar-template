import { FIFTEEN_YEARS_FROM_NOW } from "@/lib/constants";
import React from "react";

interface YearPickerProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: typeof FIFTEEN_YEARS_FROM_NOW;
}

const YearPicker = React.forwardRef<HTMLSelectElement, YearPickerProps>(
  ({ options, ...props }, ref) => {
    return (
      <select value={props.value} onChange={props.onChange} {...props}>
        {options.map((year) => (
          <option key={year} value={year} >
            {year}
          </option>
        ))}
      </select>
    );
  },
);

YearPicker.displayName = "YearPicker";
export { YearPicker };
