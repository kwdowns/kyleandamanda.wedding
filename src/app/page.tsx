import Image from "next/image";
import landingImage from "../../public/EB9A5411-Edit.jpg";
import parkingImage from "../../public/parking.jpg";
import { WeddingInfo } from "@/components/WeddingInfo";
import { Metadata } from "next";
import MainContent from "@/components/MainContent";

export const metadata: Metadata = {
  title: "Home | Kyle and Amanda",
};

export default function Home() {
  return (
    <MainContent>
      <Image
        src={landingImage}
        alt=""
        className="p-2 mt-4 bg-primary-light rounded-md border-2 border-primary-dark shadow-md"
        priority={true}
      />
      <h1 className="text-center text-4xl font-light py-8">Kyle & Amanda</h1>
      <h2 className="text-2xl text-center py-8">We&apos;re getting Married!</h2>
      <WeddingInfo />
      <p className="mt-12 px-4 text-lg text-pretty">
        We are so excited to celebrate our wedding with you! We&apos;ll be
        updating this site with more information as we get closer to the big
        day.
      </p>
      <div className="px-4">
        <h2 className="text-2xl text-center py-8">Parking</h2>
        <Image alt="Parking Map" className="w-full" src={parkingImage} />
        <p className="mt-12 text-pretty text-lg">
          We want your visit to The Jewel KC to be as smooth as
          possible—starting with parking! Here&apos;s where you can park when
          you arrive:
        </p>
        <ul className="text-pretty text-lg">
          <li>
            <strong>On-Street Parking</strong> - Available around the venue on
            the surrounding block.
          </li>
          <li>
            <strong>Main Parking Lot</strong> - Located at 6th & Page, directly
            across from the venue, with approximately 65 spaces.
          </li>
          <li>
            <strong>Overflow Parking</strong> - Located off Admiral & Superior
            Street, offering an additional 50 spaces.
          </li>
        </ul>
      </div>
    </MainContent>
  );
}
