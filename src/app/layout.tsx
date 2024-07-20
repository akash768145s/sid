// src/app/layout.js
import Navbar from "@/components/Navbar";
import "./globals.css";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SID",
  description: "Sell IT DUDE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div className="mx-auto text-2xl gap-2 mb-10">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
