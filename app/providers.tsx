"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { initializeSocket } from "@/socket";
export default function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        initializeSocket();
    }, []);
    return (
        <NextUIProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" themes={["light", "dark"]}>
                {children}
            </ThemeProvider>

        </NextUIProvider>
    );
}