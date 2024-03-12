"use client";

import { ScubaIcon } from "@/assets/icons/ScubaIcon";
import { useRouter } from "next/navigation";

export default function SignUpSuccessPage() {
  const { push } = useRouter();

  return (
    <main className="flex h-full flex-col items-center justify-center p-14">
      <div className="border border-lake-blue" id="form">
        <div className="border-b border-lake-blue py-2 pl-2 " id="form-header">
          <h2 className="text-xl uppercase text-lake-blue">sign up</h2>
        </div>
        <div className="flex flex-col items-start gap-4 px-10 py-6">
          <div>
            <h2 className="font-semibold uppercase leading-tight text-lake-blue">you have been</h2>
            <h2 className="font-semibold uppercase leading-tight text-lake-blue"> successfully registered</h2>
          </div>
          <div className="flex flex-col">
            <small className="uppercase leading-tight text-lake-blue">check your inbox</small>
            <small className="uppercase leading-tight text-lake-blue">for a confirmation email and data terms</small>
          </div>
          <button
            onClick={() => push("/my-lake")}
            className="inline-flex gap-1 self-center rounded-full border-2 border-lake-blue px-3 py-1 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
          >
            <ScubaIcon className="h-5 w-5 fill-lake-blue" />
            go to your lake
          </button>
        </div>
      </div>
    </main>
  );
}
