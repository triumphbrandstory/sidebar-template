import { MyLakeLeftColumn } from "../../_components/my-lake/left-column";
import { NewMemoryForm } from "../../_components/new-memory/new-memory-form";
import { data } from "@/app/data";

export default async function NewMemoryPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
      {/* right column */}
      <NewMemoryForm createMemory={data.memories.mutation.createMemory} />
    </div>
  );
}
