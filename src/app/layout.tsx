"use client";

import "./globals.css";
import "@uploadthing/react/styles.css";
import { Oswald } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const inter = Oswald({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/sign-in") {
      router.push("/sign-in");
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" && pathname !== "/sign-in") {
    return null; // Or you can show a loading spinner or a placeholder
  }

  return <div className="mx-auto text-2xl gap-2 mb-10">{children}</div>;
}
