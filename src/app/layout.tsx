import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Image, { StaticImageData } from "next/image";
import { VercelToolbar } from '@vercel/toolbar/next';
import { images } from "@/data/galleryImages";
import Link from "next/link";
import siteIcon from "@/../public/icon.png";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"]
});
const ebGaramond = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kyle and Amanda",
  description:
    "Kyle and Amanda's wedding will be on June 14, 2025 in Kansas City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development';
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#879A96" />
        <meta name="msapplication-TileColor" content="#879A96" />
        <meta name="rant" content="we write semantic html in this house" />
      </head>
      <body className={`${ebGaramond.className} `}>
        <div className="bg-linear-to-t from-secondary from-0% to-transparent to-20% vh-max bg-primary min-h-svh relative pb-80">
          <HeaderLayout />
          <main>{children}</main>
          <footer className="pb-36 mx-auto w-full absolute bottom-0 inset-x-0">
            <KandAFooter />
          </footer>
          <Analytics />
        </div>
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  );

  function HeaderLayout() {
    const rsvpEnabled = false;
    const travelEnabled = true;
    return (
      <header className="bg-accent px-auto py-5">
        <nav
          className={`flex justify-around ${inter.className} text-black items-center`}
        >
          <Link href="/">
            <Image src={siteIcon} alt="" width={40} />
          </Link>
          {rsvpEnabled && <Link href="/rsvp">RSVP</Link>}
          {travelEnabled && <Link href="/travel">Travel</Link>}
          {travelEnabled && <Link href="/registry">Registry</Link>}
          {travelEnabled && <Link href="/faq">FAQ</Link>}
          <Link href="/gallery">Gallery</Link>
        </nav>
      </header>
    );
  }

  function KandAFooter() {
    return (
      <div className="text-center mx-auto my-4 w-fit text-black">
        <div className="text-4xl">K & A</div>
        <div className="text-xl border-t-2 border-t-black">6 . 14 . 2025</div>
      </div>
    );
  }
}
