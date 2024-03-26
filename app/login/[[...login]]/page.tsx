"use client";
import { FormWrapper } from "@/app/(landing)/_components/form-wrapper/form-wrapper";
import { HomeLeftColumn } from "@/app/(landing)/_components/home/left-column";
import { AuthenticateButtons } from "@/components/AuthenticateButtons";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { useSignIn, isClerkAPIResponseError } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LogInClerkPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status !== "complete") {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.log(
          "status !== complete",
          JSON.stringify(completeSignIn, null, 2),
        );
      }

      if (completeSignIn.status === "complete") {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: completeSignIn.createdSessionId });
        // Redirect the user to a post sign-in route
        router.push("/my-lake");
      }
    } catch (err) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      const isClerkError = isClerkAPIResponseError(err);
      console.error("catch block: ", JSON.stringify(err, null, 2));
      if (isClerkError) {
        setError(err.errors[0].message);
      }
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* <UserButton /> */}
      {/* left column */}
      <HomeLeftColumn />
      <div className="flex flex-col items-center justify-between gap-12 overflow-y-scroll bg-white px-12 py-12 md:max-h-screen xl:gap-0">
        <AuthenticateButtons />
        <div className="flex h-full w-full place-items-center justify-center">
          <FormWrapper title="Login">
            <div
              className="flex flex-col items-center gap-4 px-10 py-6"
              id="form-content"
            >
              <GoogleSignInButton />
              <span className="text-lake-blue">or</span>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col items-start space-y-5"
                id="form-inputs"
              >
                <div className="flex w-full gap-2" id="email-input">
                  <label htmlFor="email" className="uppercase text-lake-blue">
                    e-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    className="flex-1 bg-lake-gray-input px-1 text-lake-blue"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex w-full gap-2" id="password-input">
                  <label
                    htmlFor="password"
                    className="uppercase text-lake-blue"
                  >
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-lake-gray-input px-1 text-lake-blue"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isLoaded}
                  className="self-center"
                >
                  {!isLoaded ? "loading" : "done"}
                </Button>
                {error && (
                  <p className="text-xs uppercase text-red-700">{error}</p>
                )}
              </form>
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
