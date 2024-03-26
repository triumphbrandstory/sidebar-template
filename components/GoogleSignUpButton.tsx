"use client";
import { isClerkAPIResponseError, useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { OAuthStrategy } from "@clerk/nextjs/server";

export function GoogleSignUpButton() {
  const { signUp } = useSignUp();
  const signUpWith = (strategy: OAuthStrategy) => {
    return signUp
      ?.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/my-lake",
      })
      .catch((error) => {
        if (isClerkAPIResponseError(error)) {
          throw new Error(error.errors[0].message);
        }
      });
  };

  return (
    <Button
      onClick={() => signUpWith("oauth_google")}
      className="rounded-full border-2 border-lake-blue px-3 py-1 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
    >
      Continue with Google
    </Button>
  );
}
