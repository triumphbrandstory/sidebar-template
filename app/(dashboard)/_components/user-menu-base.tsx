"use client";
import { ScubaIcon } from "@/assets/icons/ScubaIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useClerk } from "@clerk/nextjs";
import {
  ChevronDownIcon,
  CogIcon,
  LogOutIcon,
  PlusCircleIcon,
  ShellIcon,
} from "lucide-react";
import Link from "next/link";

export function UserMenuBase() {
  const { signOut } = useClerk();

  return (
    <Popover>
      <PopoverTrigger className="group flex items-center gap-2 self-end">
        <ChevronDownIcon
          size={20}
          className="text-lake-blue group-hover:brightness-90 group-data-[state=open]:rotate-180"
        />
        <div className="rounded-full bg-lake-blue p-1.5 outline outline-2 outline-offset-2 outline-lake-blue group-hover:brightness-90">
          <ScubaIcon className="h-5 w-5 fill-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-fit p-0">
        <div className="border border-lake-blue">
          <div className="flex flex-col items-start divide-y divide-lake-blue">
            <Link
              className="inline-flex w-full items-center justify-start gap-2 px-4 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/my-lake/new-memory"
            >
              <PlusCircleIcon size={14} />
              new memory
            </Link>
            <Link
              className="inline-flex w-full items-center justify-start gap-2 px-4 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/my-lake"
            >
              <ShellIcon size={14} /> my lake
            </Link>
            <Link
              className="inline-flex w-full items-center justify-start gap-2 px-4 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/my-lake/overview"
            >
              <CogIcon size={14} /> overview
            </Link>
            <button
              className="inline-flex w-full items-center justify-start gap-2 px-4 py-2 text-right text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              onClick={() => signOut({redirectUrl: '/'})}
            >
              <LogOutIcon size={14} /> logout
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
