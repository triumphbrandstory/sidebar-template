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

export default function NewMemoryPage() {
  const form = useForm<CreateMemoryType>({
    resolver: zodResolver(createMemorySchema),
    defaultValues: {
      time: undefined,
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

  const onSubmit: SubmitHandler<CreateMemoryType> = (data) => console.log(data);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
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
                className="border-b-2 border-b-lake-blue pb-4"
                id="form-title"
              >
                <h2 className="pl-6 text-7xl uppercase text-lake-blue">
                  new memory
                </h2>
              </div>
              <div
                className="flex flex-col gap-4 lg:grid lg:grid-cols-3 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
                id="form-date"
              >
                <h4 className="self-center pl-6 font-semibold">date</h4>
                {/* <h5>nov 12, 2019</h5> */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <DatePicker {...field} />
                      <FormMessage className="text-center" />
                    </div>
                  )}
                />
                {/* <h5>10 PM</h5> */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <input
                        {...field}
                        type="time"
                        className="h-9 w-full text-center lg:w-fit bg-lake-gray-input px-4 outline-0"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <div className="border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <input
                        {...field}
                        type="text"
                        className="w-full pl-6 text-4xl uppercase placeholder:text-lake-blue focus:outline-none"
                        placeholder="title"
                      />
                      <FormMessage className="pl-6" />
                    </div>
                  )}
                />
              </div>
              <div className="flex gap-4 border-b-2 border-b-lake-blue py-4 text-lake-blue">
                <span className="tex-sm self-start pl-6 text-lake-gray">
                  {form.watch("description")
                    ? form.watch("description").length
                    : 0}
                  /500
                </span>
                <textarea
                  {...form.register("description")}
                  spellCheck={false}
                  maxLength={500}
                  className="h-[12ch] flex-1 resize-none border-none text-xl placeholder:text-lake-blue focus:outline-none focus:ring-0"
                  placeholder="About what happened"
                />
              </div>
              <div className="flex gap-4 border-b-2 border-b-lake-blue py-4 pb-4 text-lake-blue">
                <h4 className="tex-sm self-center pl-6 font-semibold uppercase text-lake-blue">
                  meet this memory{" "}
                </h4>
                <FormField
                  control={form.control}
                  name="reminderType"
                  render={({ field }) => (
                    <>
                      <ReminderTypePicker {...field} />
                      <FormMessage />
                    </>
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
                      <>
                        <DatePicker {...field} />
                        <FormMessage />
                      </>
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
                {/* <div className="flex-1 uppercase">when time comes</div> */}
              </div>
              <div className="flex flex-col gap-4 border-b-2 border-b-lake-blue py-4 text-lake-blue">
                <div className="flex gap-2 pr-4" id="email-input">
                  <label
                    htmlFor="email"
                    className="tex-sm self-start pl-6 font-semibold uppercase text-lake-blue"
                  >
                    send in a bottle to
                  </label>
                  <input
                    {...form.register("sharedWith")}
                    type="email"
                    className="mr-9 h-9 flex-1 bg-lake-gray-input px-1 text-lake-blue focus:outline-none"
                  />
                </div>
                <div className="flex gap-6">
                  <span className="pl-6 text-xs uppercase text-lake-gray">
                    this memory will meet you both at the same time.
                  </span>
                  <span className="text-xs uppercase text-lake-gray">
                    1/5 memories sent
                  </span>
                </div>
                {/* TODO: remove error logs */}
                {Object.keys(form.formState.errors).length > 0 && (
                  <span className="text-xs text-destructive">
                    {JSON.stringify(form.formState.errors, null, 2)}
                  </span>
                )}
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
