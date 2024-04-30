"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function DatePicker(
  field: ControllerRenderProps<FieldValues, "date" | "specificDate">,
) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"input"}
          className={cn(
            "w-full justify-start text-left font-normal lg:w-fit",
            !field.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon
            className={cn(
              "mr-2 h-4 w-4 text-lake-blue",
              !field.value && "text-lake-blue/50",
            )}
          />
          {field.value ? (
            format(field.value, "PPP")
          ) : (
            <span className="text-lake-blue/50">mm/dd/yyyy</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
          disabled={
            field.name === "date"
              ? (date) => date > new Date()
              : field.name === "specificDate"
                ? (date) => date < new Date()
                : undefined
          }
        />
      </PopoverContent>
    </Popover>
  );
}
