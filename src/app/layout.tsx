"use client";

import "./globals.css";
import "@uploadthing/react/styles.css";
import { Oswald } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Lottie from "lottie-react"; // Import the Lottie component
import animationData from "../../public/Loading.json"; // Replace with your actual Lottie file path

const inter = Oswald({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AppWrapper>{children}</AppWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/sign-in") {
      router.push("/sign-in");
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: 300, height: 300 }}
        />
      </div>
    );
  }

  if (status === "unauthenticated" && pathname !== "/sign-in") {
    return null;
  }

  return <div className="mx-auto text-2xl gap-2 mb-10">{children}</div>;
}
