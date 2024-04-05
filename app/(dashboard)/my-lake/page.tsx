// "use client";
import Link from "next/link";
import { UserMenuBase } from "../_components/user-menu-base";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Shell1 from "@/assets/shells/shell1.png";
import Shell2 from "@/assets/shells/shell2.png";
import Shell3 from "@/assets/shells/shell3.png";
import Shell4 from "@/assets/shells/shell4.png";
import Shell5 from "@/assets/shells/shell5.png";
import Shell6 from "@/assets/shells/shell6.png";
import { MyLakeLeftColumn } from "../_components/my-lake/left-column";
import { auth, currentUser, useAuth, useUser } from "@clerk/nextjs";

export default function MyLakePage() {
  // TODO: REMOVE USER INFO TESTS

  // SERVER COMPONENTS
  // const { user: authUser, userId } = auth();
  // const user = currentUser();

  // console.log("auth User: ", authUser);
  // console.log("currentUser User: ", user);

  // CLIENT COMPONENTS
  // const { isLoaded: authLoaded, userId, sessionId, getToken } = useAuth();
  // const { isLoaded, isSignedIn, user } = useUser();

  // console.log("useAuth userId: ", userId);
  // console.log("useUser User: ", user);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
      <div className="relative flex h-screen w-full flex-col items-center">
        <div className="absolute mb-2 mr-12 mt-12 self-end">
          <UserMenuBase />
        </div>
        <div className="flex max-h-[90vh] w-full items-center justify-center overflow-y-scroll border-b-2 border-b-lake-blue">
          <div className="grid h-full w-full grid-cols-3 grid-rows-3">
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell1} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell2} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell3} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell4} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell5} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell6} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell1} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell3} alt="shell" className="h-auto w-[200px]" />
            </div>
            <div className="h-full w-full self-end justify-self-end">
              <Image src={Shell2} alt="shell" className="h-auto w-[200px]" />
            </div>
          </div>
        </div>

        <div className="z-10 h-[20vh] w-full self-start border-t-2 border-lake-blue bg-white px-12 py-12">
          <Button asChild>
            <Link href={`/my-lake/memory/2`}>see what emerges</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
