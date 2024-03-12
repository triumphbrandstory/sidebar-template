"use client";
// import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  // const handleClick = () => signIn("google", { callbackUrl: "/my-lake" });
  const handleClick = () => {};

  return (
    <button
      onClick={handleClick}
      className="border-lake-blue text-lake-blue hover:bg-lake-blue/75 rounded-full border-2 px-3 py-1 uppercase hover:text-white"
    >
      Continue with Google
    </button>
  );
}
