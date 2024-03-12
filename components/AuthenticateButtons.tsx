import Link from "next/link";
import scuba from "@/assets/scuba.svg";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { UserMenuBase } from "@/app/(dashboard)/_components/user-menu-base";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export async function AuthenticateButtons() {
  // const session = await getServerSession(authOptions);
  const session = false;

  return (
    <div className="flex gap-6 self-end">
      {session ? (
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
