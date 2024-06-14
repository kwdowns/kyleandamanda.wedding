import Image from "next/image";
import caligraphy from "../../public/kyle-and-amanda.svg";
import proposal_1 from "../../public/home_image.png";
import FaqSection from "@/components/FAQ";
import { WeddingInfo } from "@/components/WeddingInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home | Kyle and Amanda'
}

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
