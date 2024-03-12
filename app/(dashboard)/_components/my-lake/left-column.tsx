import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export function MyLakeLeftColumn() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-between overflow-hidden border-r border-black bg-lake-blue px-28 py-16">
      <div className="flex h-full max-w-[420px] flex-1 items-center justify-center">
        <Link
          href="/my-lake/new-memory"
          className="inline-block rounded-full border-2 border-lake-blue bg-white px-3 py-1 uppercase text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
        >
          new memory
        </Link>
      </div>
      <div className="flex gap-6 self-start">
        <Link
          href="/about"
          className="inline-block rounded-full border-2 border-lake-blue bg-white px-3 py-1 uppercase text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
        >
          about us
        </Link>
        <Link
          href="/en"
          className="flex items-center justify-center gap-1 rounded-full border-2 border-lake-blue bg-white px-3 py-1 uppercase text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
        >
          <ChevronDownIcon size={20} />
          pt
        </Link>
      </div>
    </div>
  );
}
