"use client";
import Image from "next/image";
import caligraphy from "../../public/kyle-and-amanda.svg";
import proposal_1 from "../../public/home_image.png";
import FaqSection from "@/components/FAQ";

export default function Home() {
  return (
    <div className="text-center w-full">
      <div className="w-3/4 md:w-1/2 max-h-3/4 mx-auto">
        <Image src={caligraphy} alt="Kyle and Amanda" className="" />
        <Image src={proposal_1} alt="" className="" />
      </div>
      <WeddingInfo />
      <FaqSection />
    </div>
  );
}

const weddingDate = new Date("2025-06-14T20:00:00Z");

interface IWeddingProps {
  date: Date;
  city: string;
  state: string;
  street: string;
  zip: string;
}

function WeddingInfo() {
  return (
    <WeddingInfoBase
      date={weddingDate}
      city="Kansas City"
      state="MO"
      street="401 Admiral Blvd"
      zip="64106"
    />
  );
}

function WeddingInfoBase({ date, city, state, street, zip }: IWeddingProps) {
  const diffTime = weddingDate.getTime() - Date.now();
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <div>
      <p className="mt-4 text-2xl">We&apos;re getting Married!</p>
      <div className="">
        {date.toDateString()} | {days} days
      </div>
      <p>
        {city}, {state} {zip}
      </p>
      <p>{street}</p>
    </div>
  );
}
