import Image from "next/image";
import caligraphy from "../../public/kyle-and-amanda.svg";
import proposal_1 from "../../public/home_image.png";
import hero from "../../public/EB9A5411-Edit.jpg";
import FaqSection from "@/components/FAQ";
import { WeddingInfo } from "@/components/WeddingInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Kyle and Amanda",
};

export default function Home() {
  return (
    <div className="w-full mx-auto lg:w-4/5 xl:w-2/3 2xl:w-1/2">
      <Image
        src={hero}
        alt=""
        className="p-2 bg-primary-light rounded-md border-2 border-primary-dark shadow-md my-8"
      />
      <p className="text-2xl text-center">We&apos;re getting Married!</p>
      <WeddingInfo showMap={false} />
      <FaqSection />
    </div>
  );
}
