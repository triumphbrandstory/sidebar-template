"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserMenuBase } from "@/app/(dashboard)/_components/user-menu-base";
import { useUser } from "@clerk/nextjs";

export function AuthenticateButtons() {
  const { user } = useUser();

  return (
    <div className="flex gap-6 self-end">
      {user ? (
        <UserMenuBase />
      ) : (
        <>
          <Button asChild>
            <Link href="/signup">sign up</Link>
          </Button>
          <Button asChild>
            <Link href="/login">login</Link>
          </Button>
        </>
      )}
    </div>
  );
}
