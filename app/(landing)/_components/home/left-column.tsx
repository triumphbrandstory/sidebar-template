// import { LanguageMenu } from "@/app/(dashboard)/_components/language-menu";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HomeLeftColumn() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-end gap-4 overflow-hidden bg-lake-blue px-16 py-16 md:px-28">
      <Hero />
      <div className="flex gap-6 self-start">
        <Button variant="secondary" asChild>
          <Link
            href="/about"
            className="inline-block rounded-full border-2 border-lake-blue bg-white px-3 py-1 uppercase text-lake-blue hover:border-white hover:bg-white/25 hover:text-white"
          >
            about us
          </Link>
        </Button>
        {/* <LanguageMenu /> */}
      </div>
    </div>
  );
}
