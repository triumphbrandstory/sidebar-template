import { AuthenticateButtons } from "@/components/AuthenticateButtons";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-between gap-12 overflow-y-scroll bg-white px-16 py-16 md:max-h-screen md:px-28 xl:gap-0">
      <AuthenticateButtons />
      <div className="flex h-full place-items-center text-lake-blue">
        <div className="flex flex-col gap-2">
          <p>We are a creative duo based in Brazil.</p>
        </div>
      </div>
    </main>
  );
}
