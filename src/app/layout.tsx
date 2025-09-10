"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // mounted 되기 전에는 className을 SSR과 맞추기 위해 빈값
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={mounted ? `${geistSans.variable} ${geistMono.variable} antialiased` : "antialiased"} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
