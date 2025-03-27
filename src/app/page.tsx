import Image from "next/image";
import landingImage from "../../public/EB9A5411-Edit.jpg";

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
      <p className="mt-12 px-4 text-lg">
        
      </p>
    </MainContent>
  );
}
