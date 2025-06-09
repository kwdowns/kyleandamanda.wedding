
import Link from "next/link";
import Image from "next/image";
import siteIcon from "@/../public/icon.png";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export  function NavBarLayout() {
  const rsvpEnabled = false;
  const travelEnabled = true;
  return (
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
  );
}
