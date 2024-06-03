import Providers from "./providers";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-full bg-background `}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
