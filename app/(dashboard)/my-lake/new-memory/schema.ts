import { z } from "zod";

export type ReminderType =
  | "at"
  | "random"
  | "randomDay"
  | "randomMonth"
  | "randomYear";

export type CreateMemoryType = {
  date: Date;
  time: string;
  title: string;
  description: string;
  reminderType: ReminderType;
  day?: number;
  month?: number;
  year?: number;
  specificDate?: Date;
  sharedWith: string;
};

export const createMemorySchema = z.object({
  date: z.date().transform((value) => value.toUTCString()),
  time: z.string(),
  title: z.string(),
  description: z.string(),
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
  sharedWith: z.string().optional(),
});