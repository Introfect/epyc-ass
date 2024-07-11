import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "EPYC IPL",
  description: "A ipl dashboard created for epc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={cn('bg-black', font.className)}>
        {children}
        </body>
    </html>
  );
}
