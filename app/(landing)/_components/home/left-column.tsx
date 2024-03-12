import { Hero } from "@/components/Hero";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function HomeLeftColumn() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-end gap-4 overflow-hidden bg-lake-blue px-16 py-16 md:px-28">
      <Hero />
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
          <ChevronDown size={20} />
          pt
        </Link>
      </div>
    </div>
  );
}
