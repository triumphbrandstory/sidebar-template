import "../globals.css";
import { Archivo } from "next/font/google";
// import SessionProvider from "@/context/SessionProvider";
import { HomeLeftColumn } from "./_components/home/left-column";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-archivo",
});

export const metadata = {
  title: "Memory Lake",
  description: "Save mementos & share them with youself and your loved ones.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${archivo.variable} font-sans subpixel-antialiased`}>
        {/* <SessionProvider session={session}> */}
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* left column */}
          <HomeLeftColumn />
          {/* right column */}
          {children}
        </main>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
