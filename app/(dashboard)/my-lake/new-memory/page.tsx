
import { MyLakeLeftColumn } from "../../_components/my-lake/left-column";

import { NewMemoryForm } from "../../_components/new-memory/new-memory-form";

export default function NewMemoryPage() {
  

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
      {/* right column */}
      <NewMemoryForm/>
    </div>
  );
}
