import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import siteIcon from "@/../public/icon.png";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
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
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#879A96" />
      </head>
      <body className={`${ebGaramond.className} `}>
        <div className="bg-gradient-to-t from-secondary from-0% to-transparent to-20% vh-max bg-primary min-h-svh relative pb-80">
          <HeaderLayout />
          <main>{children}</main>
          <footer className="pb-36 mx-auto w-full absolute bottom-0 inset-x-0">
            <KandAFooter />
            <SpeedInsights />
          </footer>
        </div>
      </body>
    </html>
  );
}

const NavBarLayout = () => {
  return (
    <nav
      className={`flex justify-around ${inter.className} text-black items-center`}
    >
      <Link href="/">
        <Image
          src={siteIcon}
          alt=""
          className=""
          width={40}
          height={40}
          sizes={"calc("}
        />
      </Link>
      <Link href="/faq">FAQ</Link>
      <Link href="/gallery">Gallery</Link>
      <Link href="/registry">Registry</Link>
      <Link href="/rsvp" className="hidden">
        RSVP
      </Link>
    </nav>
  );
};

const HeaderLayout = () => {
  return (
    <header className="bg-accent px-auto py-5">
      <NavBarLayout />
    </header>
  );
};

const KandAFooter = () => {
  return (
    <div className="text-center mx-auto my-4 w-fit text-black">
      <div className="text-4xl">K & A</div>
      <div className="text-xl border-t-2 border-t-black">6 . 14 . 2025</div>
    </div>
  );
};
