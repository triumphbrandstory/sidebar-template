import { data } from "@/app/data";
import { MyLakeLeftColumn } from "../../_components/my-lake/left-column";
import { NewMemoryForm } from "../../_components/new-memory/new-memory-form";

export default async function NewMemoryPage() {
  const createdMemoriesCount =
    await data.memories.query.getCreatedUserMemoriesCount();

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
      {/* right column */}
      <NewMemoryForm
        memoryCount={createdMemoriesCount}
        createMemory={data.memories.mutate.createMemory}
      />
    </div>
  );
}
