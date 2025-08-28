import Link from "next/link";
import { UserMenuBase } from "../_components/user-menu-base";
import { Button } from "@/components/ui/button";
import { MyLakeLeftColumn } from "../_components/my-lake/left-column";
import { Shells } from "./shells";
import { data } from "@/app/data";

export default async function MyLakePage() {
  const seeableMemories = await data.memories.query.getSeeableUserMemories();
  const totalMemories = await data.memories.query.getAllUserMemoriesCount();
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />

      {/* right column */}
      <div className="relative flex h-screen w-full flex-col items-center">
        <div className="absolute z-[9999] mb-2 mr-12 mt-12 self-end">
          <UserMenuBase />
        </div>
        <div className="relative grid min-h-[85vh] w-full place-content-center overflow-hidden border-b-2 border-b-lake-blue">
          <h2 className="text-center text-[20vw] font-medium uppercase leading-none text-lake-blue md:text-[100px]">
            Memory
            <br />
            Lake
          </h2>
          <Shells
            seeableMemories={seeableMemories}
            totalMemories={totalMemories}
          />
        </div>
        <div className="h-[10vh] w-full self-start border-t-2 border-lake-blue bg-white px-12 py-12">
          <Button asChild>
            <Link href={`/my-lake/memory/2`}>see what emerges</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
