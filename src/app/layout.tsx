import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import { ReactNode } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kyle and Amanda",
  description: "Kyle and Amanda's wedding will be on June 14, 2025 in Kansas City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarLayout />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

interface NavBarLayoutProps {
  children: ReactNode;
}

const NavBarLayout = () => {
  return (
    <header>
      <nav className="bg-gray-200 p-4 flex justify-around">
        <Link href="/" className="text-gray-700">Home</Link>
        <Link href="/ceremony" className="text-gray-700">Ceremony</Link>
        <Link href="/gallery" className="text-gray-700">Gallery</Link>
        <Link href="/registry" className="text-gray-700">Registry</Link>
        <Link href="/rsvp" className="text-gray-700">RSVP</Link>
      </nav>
    </header>
  );
};
