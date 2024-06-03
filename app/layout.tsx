'use client';
import type { Metadata } from "next";
import { initializeSocket } from "@/socket";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });




export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="h-full">
      {children}
    </NextUIProvider>
  )
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initializeSocket();
  }, []);
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-full bg-background `}>    <Providers>
        {children}
      </Providers></body>
    </html>
  );
}
