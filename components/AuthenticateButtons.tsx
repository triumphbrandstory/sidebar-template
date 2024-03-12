import Link from "next/link";
import scuba from "@/assets/scuba.svg";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export async function AuthenticateButtons() {
  // const session = await getServerSession(authOptions);
  const session = false;

  return (
    <div className="flex gap-6 self-end">
      {session ? (
        <Link href="/my-lake/overview" className="flex items-center gap-2 self-end px-12 pt-12">
          <ChevronDownIcon size={20} className="text-lake-blue" />
          <Image src={scuba} alt="scuba diver icon" />
        </Link>
      ) : (
        <>
          <Link
            href="/signup"
            className="border-lake-blue text-lake-blue hover:bg-lake-blue/75 inline-block rounded-full border-2 px-3 py-1 uppercase hover:text-white"
          >
            sign up
          </Link>
          <Link
            href="/login"
            className="border-lake-blue text-lake-blue hover:bg-lake-blue/75 inline-block rounded-full border-2 px-3 py-1 uppercase hover:text-white"
          >
            login
          </Link>
        </>
      )}
    </div>
  );
}
