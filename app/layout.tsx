import { Metadata } from "next";
import "./globals.css";
// import { archivo } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { Archivo } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL('https://memorylake.cc'),
  title: { template: "Memory Lake | %s", default: "Memory Lake" },
  description: "Save mementos & share them with youself and your loved ones.",
  keywords: ["Memories", "Water", "Blue"],
  applicationName: "Memory Lake",
  formatDetection: { email: false, address: false, telephone: false },
  appleWebApp: true,
  authors: [
    { name: "Laura Papa", url: "https://laurapapa.com" },
    { name: "Pedro Menezes", url: "https://pdrmenezes.com" },
  ],
  openGraph:{
    title:"Memory Lake",
    description:"Save mementos & share them with youself and your loved ones.",
    url: "https://memorylake.cc",
    siteName: "Memory Lake",
    authors: ["Laura Papa", "Pedro Menezes"]
  }
};

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["sans-serif"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${archivo.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
