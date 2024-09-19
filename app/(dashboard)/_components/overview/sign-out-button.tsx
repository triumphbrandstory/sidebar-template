"use client";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export function SignOutButton() {
  const { signOut } = useClerk();
  return (
    <Button variant="primary" onClick={() => signOut()}>
      logout
    </Button>
  );
}
