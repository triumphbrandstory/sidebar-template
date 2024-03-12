import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import "../globals.css";
import { Archivo } from "next/font/google";
import scuba from "@/assets/scuba.svg";
import Image from "next/image";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import SessionProvider from "@/context/SessionProvider";
import { redirect } from "next/navigation";
import { ScubaIcon } from "@/assets/icons/ScubaIcon";
import { UserMenuExtended } from "./_components/user-menu-extended";
import { UserMenuBase } from "./_components/user-menu-base";
import bg from "@/assets/all-memories-temp-bg.png";
import { MyLakeLeftColumn } from "./_components/my-lake/left-column";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-archivo",
});

export const metadata = {
  title: "Memory Lake | Memories",
  description: "Save mementos & share them with youself and your loved ones.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body className={`${archivo.variable} font-sans subpixel-antialiased`}>
        {/* <SessionProvider session={session}> */}
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* left column */}
          <MyLakeLeftColumn />
          {/* right column */}
          {children}
        </main>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
