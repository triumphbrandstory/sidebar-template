import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";
import { AuthenticateButtons } from "@/components/AuthenticateButtons";
import { FormWrapper } from "../_components/form-wrapper/form-wrapper";

export default async function LoginPage() {
  // const session = await getServerSession(authOptions);

  // if (session) return redirect("/my-lake");

  return (
    <main className="flex flex-col items-center justify-between gap-12 overflow-y-scroll bg-white px-16 py-16 md:max-h-screen md:px-28 xl:gap-0">
      <AuthenticateButtons />
      <div className="flex h-full place-items-center">
        <FormWrapper title="Login">
          <LoginForm />
        </FormWrapper>
      </div>
    </main>
  );
}
