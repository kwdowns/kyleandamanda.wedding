"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import siteIcon from "@/../public/icon.png";
import { Inter } from "next/font/google";
import { wedding } from "@/constants/wedding";

const inter = Inter({ subsets: ["latin"] });

export function NavBarLayout() {
  const [daysUntil, setDaysUntil] = useState(getDaysUntil());
  useEffect(() => {
    const interval = setInterval(() => {
      const newDaysUntil = getDaysUntil();
      if (newDaysUntil !== daysUntil) {
        setDaysUntil(newDaysUntil);
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <nav
      className={`flex justify-around ${inter.className} text-black items-center`}
    >
      <Link href="/">
        <Image src={siteIcon} alt="" width={40} />
      </Link>
      {((daysUntil > 25 || window.localStorage.getItem("rsvp") !== null) && daysUntil > 0) && <Link href="/rsvp">RSVP</Link>}
      {daysUntil > -7 && (
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

function getDaysUntil() {
  const weddingDate = new Date(wedding.date);
  weddingDate.setHours(0, 0, 0, 0); // Set the time to midnight
  let now = new Date(Date.now());
  now.setHours(0, 0, 0, 0);
  const days = Math.ceil(
    (weddingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return days;
}
