// src/app/AppWrapper.tsx (Client Component)
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Lottie from "lottie-react";
import animationData from "../../public/Loading.json";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
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
