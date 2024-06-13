import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
const ebGaramond = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kyle and Amanda",
  description:
    "Kyle and Amanda's wedding will be on June 14, 2025 in Kansas City"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      
      </head>
      <body className={ebGaramond.className}>
        <HeaderLayout />    
        <main>{children}</main>
      </body>
    </html>
  );
}

const NavBarLayout = () => {
  return (
      <nav className={`bg-gray-200 p-4 flex justify-around ${inter.className}`}>
        <Link href="/" className="text-gray-700">
          Home
        </Link>
        <Link href="/ceremony" className="text-gray-700">
          Ceremony
        </Link>
        <Link href="/gallery" className="text-gray-700">
          Gallery
        </Link>
        <Link href="/registry" className="text-gray-700">
          Registry
        </Link>
        <Link href="/rsvp" className="text-gray-700">
          RSVP
        </Link>
      </nav>
  );
};



function HeaderLayout() {
  return (
    <header className="bg-gray-200 p-4">
        <NavBarLayout />
    </header>
  );
}

