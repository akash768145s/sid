// src/app/ClientLayout.tsx (Client Component)
"use client";

import { SessionProvider } from "next-auth/react";
import AppWrapper from "./AppWrapper"; // Import the client-side app wrapper

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <AppWrapper>{children}</AppWrapper> {/* Use your client-side wrapper here */}
        </SessionProvider>
    );
}
