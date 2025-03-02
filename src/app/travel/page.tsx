import MainContent from "@/components/MainContent";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel | Kyle and Amanda",
};

export default function Travel() {
  return (
    <MainContent>
      <header>
        <h1 className="text-4xl font-semibold">Traveling to Kansas City?</h1>
      </header>
      <article>
        <p className="max-w-1/2 text-pretty my-4 text-lg">
          For those of you traveling to Kansas City for our wedding, we have put
          together a list of hotels, activities, restaurants, bars, and
          transportation options to help you plan your trip.
        </p>
        <HotelSection />
        <ActivitiesSection />
        <RestaurantsSection />
        <BarsSection />
        <TransportationSection />
      </article>
    </MainContent>
  );
}

interface TravelSectionProps {
  heading: string;
  className?: string;
  children: React.ReactNode;
}

function TravelSection({ heading, className, children }: TravelSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-3xl font-semibold underline text-center">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function ExternalLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      className="
        shadow-md
        visited:underline
        bg-tertiary-light
        hover:bg-tertiary-dark
        border
        border-black
        rounded-md
        inline-block
        p-1
        m-1
        min-w-28
        font-semibold
      "
      href={href}
    >
      {text}
    </a>
  );
}

function HotelSection() {
  interface HotelItemProps {
    children: React.ReactNode;
  }

  const HotelItem = ({ children }: HotelItemProps) => {
    return <div className="mb-8 px-2 lg:px-4">{children}</div>;
  };

  return (
    <TravelSection heading="Hotels">
      <div className="p-2 lg:p-4 w-full md:w-7/12 md:mx-auto text-center">
        <HotelItem>
          <h2 className="font-semibold text-xl">
            AC Hotel Kansas City Downtown
          </h2>
          <address>906 Grand Blvd, Kansas City, MO 64106</address>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
            <ExternalLink
              href="https://www.marriott.com/en-us/hotels/mciad-ac-hotel-kansas-city-downtown/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0"
              text="Website"
            />
            <ExternalLink
              href="https://maps.app.goo.gl/y5XJCPgSHVfopspB6"
              text="Google Maps"
            />
          </div>
        </HotelItem>
        <HotelItem>
          <h2 className="font-semibold text-xl">
            Holiday Inn Kansas City - Downtown, an IHG Hotel
          </h2>
          <address>770 Admiral Blvd, Kansas City, MO 64106</address>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
            <ExternalLink
              href="https://www.ihg.com/holidayinn/hotels/us/en/kansas-city/mkcad/hoteldetail?cm_mmc=GoogleMaps-_-HI-_-US-_-MKCAD"
              text="Website"
            />
            <ExternalLink
              href="https://maps.app.goo.gl/vWvcNnBTzinBdke8A"
              text="Google Maps"
            />
          </div>
        </HotelItem>
        <HotelItem>
          <h2 className="font-semibold text-xl">
            Hotel Phillips Kansas City, Curio Collection by Hilton
          </h2>
          <address>106 W 12th Street, Kansas City, MO 64105</address>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
            <ExternalLink
              href="https://www.hilton.com/en/hotels/mkccuqq-hotel-phillips-kansas-city/?SEO_id=GMB-AMER-QQ-MKCCUQQ&y_source=1_NDQ2NjAzMy03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D"
              text="Website"
            />
            <ExternalLink
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Phillips+Kansas+City%2C+Curio+Collection+by+Hilton%2C+106+W+12th+Street+Kansas+City%2C+MO+US"
              text="Google Maps"
            />
          </div>
        </HotelItem>
      </div>
    </TravelSection>
  );
}

function ActivitiesSection() {
  return (
    <>
      <TravelSection
        heading="Activities"
        className="p-2 lg:p-4 w-full md:w-1/2 lg:w-2/3 md:mx-auto text-center text-pretty text-lg hidden"
      >
        <ul>
          <li></li>
        </ul>
      </TravelSection>
    </>
  );
}

function RestaurantsSection() {
  return <></>;
}

function BarsSection() {
  return <></>;
}

function TransportationSection() {
  return <></>;
}
