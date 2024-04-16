import Link from "next/link";
import { Button } from "./ui/button";
import { UserMenuBase } from "@/app/(dashboard)/_components/user-menu-base";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function AuthenticateButtons() {
  return (
    <div className="flex gap-6 self-end">
      <SignedIn>
        <UserMenuBase />
      </SignedIn>
      <SignedOut>
        <Button asChild>
          <Link href="/signup">sign up</Link>
        </Button>
        <Button asChild>
          <Link href="/login">login</Link>
        </Button>
      </SignedOut>
    </div>
  );
}
