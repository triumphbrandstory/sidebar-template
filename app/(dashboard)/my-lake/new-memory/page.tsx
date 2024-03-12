"use client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UserMenuBase } from "../../_components/user-menu-base";

export default function NewMemoryPage() {
  const [charCount, setCharCount] = useState(0);

  return (
    <main className="flex h-full w-full flex-col items-start justify-between">
      <UserMenuBase className="mx-12 mb-2 mt-12 flex items-center gap-2 self-end" />
      <div className="flex w-full flex-1 flex-col justify-start" id="form">
        <div className="border-b-2 border-b-lake-blue pb-4" id="form-title">
          <h2 className="pl-6 text-7xl uppercase text-lake-blue">new memory</h2>
        </div>
        <div
          className="grid grid-cols-4 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
          id="form-date"
        >
          <h4 className="pl-6 font-semibold">date</h4>
          <h5>nov 12, 2019</h5>
          <h5>10 PM</h5>
        </div>
        <div className="border-b-2 border-b-lake-blue py-4 pb-4 text-lake-blue">
          <input
            type="text"
            name="title"
            id="title"
            className="w-full pl-6 text-4xl uppercase placeholder:text-lake-blue focus:outline-none"
            placeholder="title"
          />
        </div>
        <div className="flex gap-4 border-b-2 border-b-lake-blue py-4 text-lake-blue">
          <span className="tex-sm self-start pl-6 text-lake-gray">
            {charCount}/500
          </span>
          <textarea
            spellCheck={false}
            maxLength={500}
            name="description"
            id="description"
            className="h-[12ch] flex-1 resize-none border-none text-xl placeholder:text-lake-blue focus:outline-none focus:ring-0"
            placeholder="About what happened"
            onChange={(e) => setCharCount(e.target.value.length)}
          />
        </div>
        <div className="flex gap-4 border-b-2 border-b-lake-blue py-4 pb-4 text-lake-blue">
          <h4 className="tex-sm self-start pl-6 font-semibold uppercase text-lake-blue">
            meet this memory{" "}
          </h4>
          <div className="flex-1 uppercase">when time comes</div>
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
              type="email"
              name="email"
              id="email"
              className="mr-9 flex-1 bg-lake-gray-input px-1 text-lake-blue focus:outline-none"
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
        </div>
      </div>
      <div className="flex w-full justify-between px-12 py-8">
        <Link
          href="/my-lake"
          className="flex items-center justify-center gap-1 rounded-full border-2 border-lake-blue px-3 py-1 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
        >
          <MoveLeft />
          back to your lake
        </Link>
        <button className="inline-block rounded-full border-2 border-white bg-lake-blue px-3 py-1 uppercase text-white hover:border-lake-blue hover:bg-white hover:text-lake-blue">
          save
        </button>
      </div>
    </main>
  );
}
