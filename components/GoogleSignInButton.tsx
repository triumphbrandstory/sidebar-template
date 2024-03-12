"use client";

import { Button } from "./ui/button";

// import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  // const handleClick = () => signIn("google", { callbackUrl: "/my-lake" });
  const handleClick = () => {};

  return (
    <Button
      onClick={handleClick}
      className="rounded-full border-2 border-lake-blue px-3 py-1 uppercase text-lake-blue hover:bg-lake-blue/75 hover:text-white"
    >
      Continue with Google
    </Button>
  );
}
