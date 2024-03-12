"use client";
import { ScubaIcon } from "@/assets/icons/ScubaIcon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, MoveRight } from "lucide-react";
import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";

export function UserMenuExtended({
  className,
}: {
  className?: string | undefined;
}) {
  // const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger className={`${className} group`}>
        <ChevronDownIcon
          size={20}
          className="text-lake-blue group-hover:brightness-90 group-data-[state=open]:rotate-180"
        />
        <div className="rounded-full bg-lake-blue p-1.5 outline outline-1 outline-offset-2 outline-lake-blue group-hover:brightness-90">
          <ScubaIcon className="h-5 w-5 fill-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={8}>
        <div className="border border-lake-blue">
          <div
            className="border-b border-lake-blue py-2 pl-2 "
            id="popover-header"
          >
            <h2 className="uppercase text-lake-blue">
              {/* {session?.user?.name} */}
              Conceição Evaristo
            </h2>
          </div>
          <div className="flex flex-col items-start pb-6">
            <Link
              className="flex w-full items-center justify-between border-b border-lake-blue p-2 text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/my-lake/overview"
            >
              <h2 className="text-sm uppercase">overview</h2>
              <MoveRight />
            </Link>
            <Link
              className="flex w-full items-center justify-between border-b border-lake-blue p-2 text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/my-lake/"
            >
              <h2 className="text-sm uppercase">logout</h2>
              <MoveRight />
            </Link>

            <div className="mt-2 flex flex-col px-2">
              <small className="uppercase leading-tight text-lake-blue">
                check your inbox
              </small>
              <small className="uppercase leading-tight text-lake-blue">
                for a confirmation email and data terms
              </small>
            </div>
            <Button
              onClick={
                () => {}
                // signOut()
              }
            >
              logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
