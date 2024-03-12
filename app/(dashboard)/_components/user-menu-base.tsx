import { ScubaIcon } from "@/assets/icons/ScubaIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";

export function UserMenuBase() {
  // const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger className="group mx-12 mb-2 mt-12 flex items-center gap-2 self-end">
        <ChevronDownIcon
          size={20}
          className="text-lake-blue group-hover:brightness-90 group-data-[state=open]:rotate-180"
        />
        <div className="rounded-full bg-lake-blue p-1.5 outline outline-1 outline-offset-2 outline-lake-blue group-hover:brightness-90">
          <ScubaIcon className="h-5 w-5 fill-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={8} className="w-fit p-0">
        <div className="border border-lake-blue">
          <div className="flex flex-col items-start divide-y divide-lake-blue">
            <Link
              className="w-full px-4 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/my-lake/overview"
            >
              overview
            </Link>
            <Link
              className="w-full px-4 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/my-lake"
            >
              logout
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
