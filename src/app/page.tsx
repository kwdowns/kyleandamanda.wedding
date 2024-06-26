import Image from "next/image";
import landingImage from "../../public/EB9A5411-Edit.jpg";
import FaqSection from "@/components/FAQ";
import { WeddingInfo } from "@/components/WeddingInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Kyle and Amanda",
};

export default function Home() {
  return (
    <div className="w-full mx-auto lg:w-4/5 xl:w-2/3 2xl:w-1/2">
      <h1 className="text-center text-4xl font-semibold py-8">Kyle & Amanda</h1>
      <Image
        src={landingImage}
        alt=""
        className="p-2 bg-primary-light rounded-md border-2 border-primary-dark shadow-md"
      />
      <p className="text-2xl text-center py-8">We&apos;re getting Married!</p>
      <WeddingInfo />
      <FaqSection />
    </div>
  );
}
