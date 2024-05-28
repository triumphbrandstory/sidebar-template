"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { UserMenuBase } from "../../_components/user-menu-base";
import { Button } from "@/components/ui/button";
import { MyLakeLeftColumn } from "../../_components/my-lake/left-column";
import { DatePicker } from "@/components/ui/datepicker";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { ABBREVIATE_MONTHS, FIFTEEN_YEARS_FROM_NOW } from "@/lib/constants";
import { YearPicker } from "@/components/ui/yearpicker";
import { ReminderTypePicker } from "@/components/ui/reminder-type-picker";
import { MonthPicker } from "@/components/ui/monthpicker";
import { CreateMemoryType, createMemorySchema } from "./schema";
import { DayPicker } from "@/components/ui/daypicker";

export default function NewMemoryPage() {
  const form = useForm<CreateMemoryType>({
    resolver: zodResolver(createMemorySchema),
    defaultValues: {
      title: "",
      time: "",
      reminderType: "random",
      specificDate: undefined,
      day: undefined,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    shouldUnregister: true,
  });

  const filteredMonths =
    form.watch("year") == new Date().getFullYear()
      ? ABBREVIATE_MONTHS.filter((month) => month.index > new Date().getMonth())
      : ABBREVIATE_MONTHS;

  const daysInAMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const onSubmit: SubmitHandler<CreateMemoryType> = (data) => console.log(data);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
      {/* right column */}
      <div className="flex flex-col">
        <div className="mb-2 mr-12 mt-12 self-end">
          <UserMenuBase />
        </div>
        <Form {...form}>
          <form
            className="flex h-full w-full flex-col justify-between"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-1 flex-col justify-start">
              <div
                className="border-b-2 border-b-lake-blue pb-4 pl-6"
                id="form-title"
              >
                <h2 className="text-7xl uppercase text-lake-blue">
                  new memory
                </h2>
              </div>
              <div
                className="flex flex-col items-center gap-4 border-b-2 border-b-lake-blue py-4 pb-4 pl-6 uppercase text-lake-blue lg:grid lg:grid-cols-4"
                id="form-date"
              >
                <h4 className="font-semibold">date</h4>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <DatePicker {...field} />
                      <FormMessage className="text-center lg:text-left" />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <input
                        {...field}
                        type="time"
                        className="h-9 w-full bg-lake-gray-input px-4 text-center outline-0 lg:w-fit"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <div className="border-b-2 border-b-lake-blue py-4 pb-4 pl-6 uppercase text-lake-blue">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <input
                        {...field}
                        type="text"
                        className="w-full text-4xl uppercase placeholder:text-lake-blue focus:outline-none"
                        placeholder="title"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <div className="flex gap-4 border-b-2 border-b-lake-blue py-4 pl-6 text-lake-blue">
                <span className="w-[12ch] text-sm text-lake-gray">
                  {form.watch("description")
                    ? form.watch("description").length
                    : 0}
                  /500
                </span>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <div className="flex h-[12ch] w-full flex-col">
                      <textarea
                        {...field}
                        maxLength={500}
                        className="flex-1 resize-none border-none text-xl placeholder:text-lake-blue focus:outline-none focus:ring-0"
                        placeholder="About what happened"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <div className="flex items-center gap-4 border-b-2 border-b-lake-blue py-4 pb-4 pl-6 text-lake-blue">
                <h4 className="tex-sm font-semibold uppercase text-lake-blue">
                  meet this memory{" "}
                </h4>
                <FormField
                  control={form.control}
                  name="reminderType"
                  render={({ field }) => (
                    <span className="flex flex-col">
                      <ReminderTypePicker {...field} />
                      <FormMessage />
                    </span>
                  )}
                />

                {form.watch("reminderType") === "random" && (
                  <span className="text-xs uppercase text-lake-gray">
                    we&apos;ll pick a date between <br /> now and 15 years from
                    now
                  </span>
                )}

                {form.watch("reminderType") === "at" && (
                  <FormField
                    control={form.control}
                    name="specificDate"
                    render={({ field }) => (
                      <span className="flex flex-col">
                        <DatePicker {...field} />
                        <FormMessage />
                      </span>
                    )}
                  />
                )}

                {form.watch("reminderType") === "randomDay" && (
                  <>
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <>
                          <MonthPicker options={filteredMonths} {...field} />
                          <FormMessage />
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <>
                          <YearPicker
                            options={FIFTEEN_YEARS_FROM_NOW}
                            {...field}
                          />
                          <FormMessage />
                        </>
                      )}
                    />
                  </>
                )}

                {form.watch("reminderType") === "randomMonth" && (
                  <>
                    <FormField
                      control={form.control}
                      name="day"
                      render={({ field }) => (
                        <>
                          <DayPicker options={daysInAMonth} {...field} />
                          <FormMessage />
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <>
                          <YearPicker
                            options={FIFTEEN_YEARS_FROM_NOW}
                            {...field}
                          />
                          <FormMessage />
                        </>
                      )}
                    />
                  </>
                )}

                {form.watch("reminderType") === "randomYear" && (
                  <>
                    <FormField
                      control={form.control}
                      name="day"
                      render={({ field }) => (
                        <>
                          <DayPicker options={daysInAMonth} {...field} />
                          <FormMessage />
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <>
                          <MonthPicker options={filteredMonths} {...field} />
                          <FormMessage />
                        </>
                      )}
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col gap-4 border-b-2 border-b-lake-blue py-4 text-lake-blue">
                <div
                  className="flex items-center gap-2 pl-6 pr-4"
                  id="email-input"
                >
                  <label
                    htmlFor="email"
                    className="tex-sm font-semibold uppercase text-lake-blue"
                  >
                    send in a bottle to
                  </label>
                  <input
                    {...form.register("sharedWith")}
                    type="email"
                    className="mr-9 h-9 flex-1 bg-lake-gray-input px-1 text-lake-blue focus:outline-none"
                  />
                </div>
                <div className="flex gap-6 pl-6">
                  <span className="text-xs uppercase text-lake-gray">
                    this memory will meet you both at the same time.
                  </span>
                  <span className="text-xs uppercase text-lake-gray">
                    1/5 memories sent
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between px-12 py-8">
              <Button asChild>
                <Link href="/my-lake">
                  <ChevronLeft className="mr-1 h-5 w-5" />
                  back to your lake
                </Link>
              </Button>
              <Button variant="primary" type="submit">
                save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
