import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

type LanguageMenuProps = {
  lang: "pt" | "en";
};

export function LanguageMenu({ lang }: LanguageMenuProps) {
  // const { data: session } = useSession();

  return (
    <Popover>
      <Button variant="secondary" asChild>
        <PopoverTrigger className="group">
          <ChevronDownIcon
            size={20}
            className="mr-1 uppercase text-lake-blue group-hover:text-white group-data-[state=open]:rotate-180"
          />
          {lang}
        </PopoverTrigger>
      </Button>
      <PopoverContent sideOffset={8} className="w-fit p-0">
        <div className="border border-lake-blue">
          <div className="flex flex-col items-start divide-y divide-lake-blue">
            <Link
              className="w-full px-4 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/pt"
            >
              PT
            </Link>
            <Link
              className="w-full px-4 py-2 text-sm uppercase text-lake-blue hover:bg-lake-blue hover:text-white"
              href="/"
            >
              EN
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
