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
      <div className="p-2 lg:p-4 w-full md:w-7/12 md:mx-auto text-center">
        {children}
      </div>
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

interface PlaceProps {
  children: React.ReactNode;
}

const PlaceItem = ({ children }: PlaceProps) => {
  return <div className="mb-8 px-2 lg:px-4">{children}</div>;
};

function HotelSection() {
  return (
    <TravelSection heading="Hotels">
      <PlaceItem>
        <h2 className="font-semibold text-xl">AC Hotel Kansas City Downtown</h2>
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
      </PlaceItem>
      <PlaceItem>
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
      </PlaceItem>
      <PlaceItem>
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
      </PlaceItem>
    </TravelSection>
  );
}

function RestaurantsSection() {
  return (
    <TravelSection heading="Restaurants">
      <p className="text-lg">
        There are a lot of great restaurants in town, and even more not in this
        list, but here are a few of our favorites.
      </p>
      <PlaceItem>
        <h2>KC Taco Company</h2>
        <address>528 Walnut St, Kansas City, MO 64106</address>
        <p>
          Great tacos and burritos. Featured on Diners Drive-ins and Dives. Also
          one of our first few dates was here. It&apos;s not too far from the
          venue either.
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
          <ExternalLink href="https://kctacocompany.com/" text="Website" />
        </div>
      </PlaceItem>
      <PlaceItem>
        <h2>Waldo Thai</h2>
        <address>8431 Wornall Rd, Kansas City, MO 64114</address>
        <p>
          Exquisite Thai food. Their appetizers are fantastic. It&apos;s where
          we went after the proposal.
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
          <ExternalLink href="https://www.waldothai.com/" text="Website" />
        </div>
      </PlaceItem>
      <PlaceItem>
        <h2>Milwaukee Delicatessen</h2>
        <address>101 W 9th St, Kansas City, MO 64105</address>
        <p>
          Sandwiches, pizza, and salads. It&apos;s a great place to grab a quick
          bite to eat for lunch or dinner. Right off the street car line so
          it&apos;s easily accessible from most anywhere downtown.
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
          <ExternalLink
            href="https://https://milwaukeedelikc.com/.com/"
            text="Website"
          />
        </div>
      </PlaceItem>
    </TravelSection>
  );
}

function BarsSection() {
  return (
    <TravelSection heading="Bars">
      <PlaceItem>
        <h2>The Green Lady Lounge</h2>
        <address>1809 Grand Blvd, Kansas City, MO 64108</address>
        <p>
          Features jazz music and a speakeasy vibe. It&apos;s a great place to
          grab a drink and listen to some live music.
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
          <ExternalLink href="https://greenladylounge.com/" text="Website" />
        </div>
      </PlaceItem>
      <PlaceItem>
        <h2>Power & Light</h2>
        <address>50 E 13th St, Kansas City, MO 64106</address>
        <p>
          Power & Light is a district in downtown Kansas City that has a variety
          of bars and restaurants. If you are coming from St. Louis and are
          familiar with Ballpark Village then this has a similar vibe.
        </p>
      </PlaceItem>
      <PlaceItem>
        <h2>Up-Down</h2>
        <address>101 Southwest Blvd, Kansas City, MO 64108</address>
        <p>
          Barcade with a variety of arcade games and pinball machines. It
          get&apos;s busy on weekends fast!
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-12">
          <ExternalLink href="https://www.updownkc.com/" text="Website" />
        </div>
      </PlaceItem>
    </TravelSection>
  );
}

function TransportationSection() {
  return (
    <TravelSection heading="Transportation">
      <p>
        Uber and Lyft will be your best option for getting around without a car.
      </p>
      <p>
        If you are downtown there is also the steetcar, it&apos;s free and runs
        North-South through the center of downtown
      </p>
      <ExternalLink
        href="https://kcstreetcar.org/route/"
        text="Streetcar Route"
      />
    </TravelSection>
  );
}
