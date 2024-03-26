import { AuthenticateButtons } from "@/components/AuthenticateButtons";
import { HomeLeftColumn } from "../_components/home/left-column";

export default function AboutPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <HomeLeftColumn />
      <div className="flex h-screen w-full flex-col items-start justify-between px-12 py-12">
        <AuthenticateButtons />
        <div className="flex h-full w-full items-center justify-center text-lake-blue">
          <p>We are a creative duo based in Brazil.</p>
        </div>
      </div>
    </div>
  );
}
