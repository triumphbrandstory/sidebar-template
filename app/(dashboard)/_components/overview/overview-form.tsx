"use client";
import { formatDateToShort } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import waterDrop from "@/assets/water-drop.svg";

type OverviewFormProps = {
  memoriesCount: number;
  unseenMemoriesCount: number;
  seenMemoriesCount: number;
  memoriesSharedByUserInLast30DaysCount: number;
  appNotification: boolean | null;
  emailNotification: boolean | null;
};

export function OverviewForm({
  memoriesCount,
  seenMemoriesCount,
  unseenMemoriesCount,
  memoriesSharedByUserInLast30DaysCount,
  appNotification,
  emailNotification,
}: OverviewFormProps) {
  const { user } = useClerk();
  return (
    <div
      className="flex h-full w-full flex-col justify-start overflow-y-visible sm:overflow-y-auto"
      id="form"
    >
      <div className="border-b-2 border-b-lake-blue" id="form-title">
        <h2 className="pb-4 pl-6 text-7xl uppercase text-lake-blue">
          {user?.firstName}&apos;s lake
        </h2>
      </div>
      <div
        className="grid grid-cols-3 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="pl-6 font-semibold">registered in</h4>
        {user?.createdAt && <h5>{formatDateToShort(user?.createdAt)}</h5>}
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold">
          <Image src={waterDrop} alt="water drop icon" />
        </h4>
        <h5 className="col-span-full col-start-2">
          {memoriesCount} mementos in your memory lake
        </h5>
        <span className="col-span-full col-start-2 text-xs uppercase text-lake-gray">
          {seenMemoriesCount} emerged / {unseenMemoriesCount} to meet you in the
          future
        </span>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold uppercase">
          bottles sent
        </h4>
        <h5 className="col-span-full col-start-2">
          {memoriesSharedByUserInLast30DaysCount}/3
        </h5>
        <span className="col-span-full col-start-1 whitespace-pre-line pl-6 pr-4 text-xs uppercase text-lake-gray">
          you can send up to 3 bottles each 30 days. if the person does not have
          a memory lake account, the bottle will be sent via email
        </span>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold uppercase">
          receive memories
        </h4>
        <h5 className="col-start-2 uppercase">via desktop</h5>
        <label className="relative col-start-3 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={appNotification || undefined}
            className="peer sr-only"
            // onChange={async (e) => {
            //   updateUserPreferences(e.target.checked)
            // }
          />
          <div className="peer h-6 w-11 rounded-full border-2 border-lake-blue after:absolute after:h-5 after:w-5 after:rounded-full after:bg-lake-blue after:transition-all after:content-[''] peer-checked:bg-lake-blue peer-checked:after:translate-x-full peer-checked:after:bg-white"></div>
        </label>
        <h5 className="col-start-2 row-start-2 uppercase">via e-mail</h5>
        <label className="relative col-start-3 row-start-2 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={emailNotification || undefined}
            className="peer sr-only"
            onChange={async (e) => {
              // update user preferences
            }}
          />
          <div className="peer h-6 w-11 rounded-full border-2 border-lake-blue after:absolute after:h-5 after:w-5 after:rounded-full after:bg-lake-blue after:transition-all after:content-[''] peer-checked:bg-lake-blue peer-checked:after:translate-x-full peer-checked:after:bg-white"></div>
        </label>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold uppercase">
          email
        </h4>
        {user?.primaryEmailAddress?.emailAddress && (
          <h5 className="col-start-2 uppercase">
            {user.primaryEmailAddress?.emailAddress}
          </h5>
        )}
        <span className="relative col-start-3 inline-flex cursor-pointer text-xs uppercase text-lake-gray">
          change
        </span>
        <h4 className="col-span-1 row-start-2 pl-6 font-semibold uppercase">
          password
        </h4>
        <h5 className="col-start-2 uppercase">last changed: june 26th, 2023</h5>
        <span className="relative col-start-3 inline-flex cursor-pointer text-xs uppercase text-lake-gray">
          change
        </span>
      </div>
    </div>
  );
}
