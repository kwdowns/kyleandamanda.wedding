import Image from "next/image";
import caligraphy from "../../public/kyle-and-amanda.svg";
import proposal_1 from "../../public/home_image.png";
import FaqSection from "@/components/FAQ";
import { WeddingInfo } from "@/components/WeddingInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Kyle and Amanda",
};

export default function Home() {
  return (
    <div className="text-center w-full">
      <div className="w-4/5 md:w-3/4 lg:w-1/2 max-h-3/4 mx-auto relative">
        <Image
          src={caligraphy}
          alt="Kyle and Amanda"
          className="absolute top-6"
        />
        <Image src={proposal_1} alt="" className="static rounded-md" />
      </div>
      <WeddingInfo />
      <FaqSection />
    </div>
  );
}
