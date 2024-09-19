"use client";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { Button } from "./ui/button";
import type { OAuthStrategy } from "@clerk/types";

export function GoogleSignInOrSignUpButton() {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  if (!signIn || !signUp) return null;

  const signInWith = async (strategy: OAuthStrategy) => {
    return signIn
      .authenticateWithRedirect({
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

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === "complete") {
        setActive({ session: res.createdSessionId });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp.create({ transfer: true });

      if (res.status === "complete") {
        setActive({ session: res.createdSessionId });
      }
    } else {
      // If the user has an account in your application
      // and has an OAuth account connected to it, you can sign them in.
      await signInWith(strategy);
    }
  }

  return (
    <Button
      onClick={async () => await handleSignIn("oauth_google")}
      className="rounded-full border-2 border-lake-blue px-3 py-1 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
    >
      Continue with Google
    </Button>
  );
}
