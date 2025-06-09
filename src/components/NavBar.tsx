
import Link from "next/link";
import Image from "next/image";
import siteIcon from "@/../public/icon.png";
import { Inter } from "next/font/google";
import { rsvpFlag, travelFlag } from "../flags";

const inter = Inter({ subsets: ["latin"] });

export async function NavBarLayout() {
  const rsvpEnabled = await rsvpFlag();
  const travelEnabled = await travelFlag();
  return (
    <nav
      className={`flex justify-around ${inter.className} text-black items-center`}
    >
      <Link href="/">
        <Image src={siteIcon} alt="" width={40} />
      </Link>
      {rsvpEnabled && <Link href="/rsvp">RSVP</Link>}
      {travelEnabled && (
        <>
          <Link href="/travel">Travel</Link>
          <Link href="/registry">Gift Registry</Link>
          <Link href="/faq">FAQ</Link>
        </>
      )}
      <Link href="/gallery">Gallery</Link>
    </nav>
  );
}
