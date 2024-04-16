"use client";
import Link from "next/link";
import waterDrop from "@/assets/water-drop.svg";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { UserMenuBase } from "../../_components/user-menu-base";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { formatDateToShort } from "@/lib/utils";
import { MyLakeLeftColumn } from "../../_components/my-lake/left-column";

export default function OverviewPage() {
  const { signOut, user } = useClerk();

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />

      <div className="flex h-screen w-full flex-col items-start justify-between">
        <div className="mb-2 mr-12 mt-12 self-end">
          <UserMenuBase />
        </div>
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
              34 mementos in your memory lake
            </h5>
            <span className="col-span-full col-start-2 text-xs uppercase text-lake-gray">
              06 emerged / 28 still to meet you in the future
            </span>
          </div>
          <div
            className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
            id="form-date"
          >
            <h4 className="col-span-1 row-span-1 pl-6 font-semibold uppercase">
              bottles in lake
            </h4>
            <h5 className="col-span-full col-start-2">3/5</h5>
            <span className="col-span-full col-start-1 whitespace-pre-line pl-6 pr-4 text-xs uppercase text-lake-gray">
              you can send up to 5 bottles per month. bottles are automatically
              renewed every first day of the month. if they don&apos;t have a
              memory lake account, the bottle will be sent via email
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
                value=""
                className="peer sr-only"
                checked
                readOnly
              />
              <div className="peer h-6 w-11 rounded-full border-2 border-lake-blue after:absolute after:h-5 after:w-5 after:rounded-full after:bg-lake-blue after:transition-all after:content-[''] peer-checked:bg-lake-blue peer-checked:after:translate-x-full peer-checked:after:bg-white"></div>
            </label>
            <h5 className="col-start-2 row-start-2 uppercase">via e-mail</h5>
            <label className="relative col-start-3 row-start-2 inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
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
            <h5 className="col-start-2 uppercase">
              last changed: june 26th, 2023
            </h5>
            <span className="relative col-start-3 inline-flex cursor-pointer text-xs uppercase text-lake-gray">
              change
            </span>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-between gap-4 px-12 py-8 xl:gap-0">
          <Button asChild>
            <Link href="/my-lake">
              <ChevronLeft className="mr-1 h-5 w-5" />
              back to your lake
            </Link>
          </Button>
          <div className="flex gap-4">
            <Button asChild>
              <Link href={"/my-lake/delete-account"}>delete account</Link>
            </Button>
            <Button variant="primary" onClick={() => signOut()}>
              logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
