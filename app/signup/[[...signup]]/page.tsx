import { HomeLeftColumn } from "@/app/(landing)/_components/home/left-column";
import { AuthenticateButtons } from "@/components/AuthenticateButtons";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <HomeLeftColumn />
      {/* right column */}
      <div className="flex flex-col items-center justify-between gap-12 bg-white px-12 py-12 md:max-h-screen xl:gap-0">
        <AuthenticateButtons />
        <div className="flex h-full w-full place-items-center justify-center">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
