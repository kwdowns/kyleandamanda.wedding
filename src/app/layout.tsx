import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import Link from "next/link";
import "./globals.css";
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
      <head></head>
      <body className={`${ebGaramond.className} bg-gradient-to-b from-secondary from-0% to-transparent to-20%`}>
        <div className="bg-gradient-to-t from-primary from-0% to-transparent to-20% vh-max">
        <HeaderLayout />
        <main>{children}</main>
        <footer className="py-36">
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
    <nav className={`flex justify-around ${inter.className} text-bold`}>
      <Link href="/" className="">
        Home
      </Link>
      <Link href="/gallery" className="">
        Gallery
      </Link>
      <Link href="/registry" className="">
        Registry
      </Link>
      <Link href="/rsvp" className="">
        RSVP
      </Link>
    </nav>
  );
};

const HeaderLayout = () => {
  return (
    <header className="bg-primary text-secondary px-7 py-6">
      <NavBarLayout />
    </header>
  );
};

const KandAFooter = () => {
  return (
    <div className="text-center mx-auto my-4 w-fit text-accent">
      <div className="text-4xl">K & A</div>
      <div className="text-xl border-t-2 border-t-accent">6 . 14 . 2025</div>
    </div>
  );
};
