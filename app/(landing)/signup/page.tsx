import { SignUpForm } from "@/components/SignUpForm/SignUpForm";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FormWrapper } from "../_components/form-wrapper/form-wrapper";
import { AuthenticateButtons } from "@/components/AuthenticateButtons";

export default async function SignUpPage() {
  // const session = await getServerSession(authOptions);

  // if (session) return redirect("/my-lake");
  return (
    <main className="flex flex-col items-center justify-between gap-12 overflow-y-scroll bg-white px-16 py-16 md:max-h-screen md:px-28 xl:gap-0">
      <AuthenticateButtons />
      <div className="flex h-full place-items-center">
        <FormWrapper title="Sign Up">
          <SignUpForm />
        </FormWrapper>
      </div>
    </main>
  );
}
