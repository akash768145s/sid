import Navbar from "@/components/Navbar";
import "./globals.css";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SID",
  description: "Sell IT DUDE",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="mx-auto  text-2xl gap-2 mb-10">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
