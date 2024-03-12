import Link from "next/link";
import { UserMenuBase } from "../_components/user-menu-base";
import { Button } from "@/components/ui/button";

export default function MyLakePage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <UserMenuBase />
      <div className="flex w-full flex-1 items-center justify-center border-b-2 border-b-lake-blue">
        <h1 className="pointer-events-none uppercase text-lake-blue">
          all memories
        </h1>
      </div>

      <div className="w-full self-start bg-white px-12 py-12">
        <Button asChild>
          <Link href={`/memory/2`}>see what emerges</Link>
        </Button>
      </div>
    </main>
  );
}
