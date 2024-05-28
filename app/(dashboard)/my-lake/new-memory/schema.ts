import { z } from "zod";

export type ReminderType =
  | "at"
  | "random"
  | "randomDay"
  | "randomMonth"
  | "randomYear";

export type CreateMemoryType = {
  date: Date;
  time?: string;
  title: string;
  description: string;
  reminderType: ReminderType;
  day?: number;
  month?: number;
  year?: number;
  specificDate?: Date;
  sharedWith?: string;
};

export const createMemorySchema = z
  .object({
    date: z
      .date({ message: "A date is required" })
      .transform((value) => value.toUTCString()),
    time: z.string().min(1, {message: 'Please provide a time for your memory'}).optional(),
    title: z
      .string({ message: "Please provide a title for your memory" })
      .min(1, { message: "Please provide a title for your memory" }).max(500, {message: "The title is limited to 500 characters maximum"}),
    description: z
      .string({ message: "Please provide a description for your memory" })
      .min(1, { message: "Please provide a description for your memory" })
      .max(500, {
        message: "The description is limited to 500 characters maximum",
      }),
    reminderType: z.enum([
      "at",
      "random",
      "randomDay",
      "randomMonth",
      "randomYear",
    ]),
    day: z.coerce.number().optional(),
    month: z.coerce.number().optional(),
    year: z.coerce.number().optional(),
    specificDate: z
      .date()
      .transform((value) => value.toUTCString())
      .optional(),
    sharedWith: z.string().email().optional(),
  })
  .superRefine((data, context) => {
    if (data.reminderType === "at" && !data.specificDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A specific date is required",
        path: ["specificDate"],
      });
    }
    if (data.reminderType === "randomDay" && (!data.month || !data.year)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Month and year are required",
        path: ["month"],
      });
    }
    if (data.reminderType === "randomMonth" && (!data.day || !data.year)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Day and year are required",
        path: ["day"],
      });
    }
    if (data.reminderType === "randomYear" && (!data.day || !data.month)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Day and month are required",
        path: ["day"],
      });
    }
  });
