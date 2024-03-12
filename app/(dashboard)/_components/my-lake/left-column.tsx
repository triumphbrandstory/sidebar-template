import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LanguageMenu } from "../language-menu";

export function MyLakeLeftColumn() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-between overflow-hidden bg-lake-blue px-28 py-16">
      <div className="flex h-full max-w-[420px] flex-1 items-center justify-center">
        <Button variant="secondary">
          <Link href="/my-lake/new-memory">new memory</Link>
        </Button>
      </div>
      <div className="flex gap-6 self-start">
        <Button variant="secondary" asChild>
          <Link href="/about">about us</Link>
        </Button>
        <LanguageMenu lang="en" />
      </div>
    </div>
  );
}
