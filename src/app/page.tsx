import Image from "next/image";
import caligraphy from "../../public/kyle-and-amanda.svg";
import proposal_1 from "../../public/home_image.png";
import FaqSection from "@/components/FAQ";
import * as faqData from "@/data/faq";

export default function Home() {
  return (
    <div className="text-center w-full">
      <div className="w-3/4 md:w-1/2 max-h-3/4 mx-auto">
        <Image
          src={caligraphy}
          alt="Kyle and Amanda"
          className=""
        />
        <Image src={proposal_1} alt="" className="" />
      </div>
      <div>
        <p className="mt-4 text-2xl">We&apos;re getting Married!</p>
        <p className="mt-4 text-2xl">June 14, 2025</p>
        <p className="mt-2 text-xl">Kansas City, Missouri</p>
        <p>In {getDaysUntilWedding()} days</p>
      </div>
      <div>
        <FaqSection 
          faqs={faqData.faqs}
        />
      </div>
    </div>
  );
}

const weddingDate = new Date("2025-06-14T20:00:00Z");

function getDaysUntilWedding() {
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

interface IWeddingProps {
  date: Date;
  city: string;
  state: string;
  street: string;
  zip: string;
}

function WeddingInfo({ date, city, state, street, zip }: IWeddingProps) {
  return (
    <div>
      <p className="mt-4 text-2xl">{date.toDateString()}</p>
      <p>{city}, {state} {zip}</p>
      <p>{street}</p>
    </div>
  );
}