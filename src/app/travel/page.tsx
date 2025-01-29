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
        <h1 className="text-3xl">Traveling to Kansas City?</h1>
      </header>
      <article>
        <p className="max-w-1/2 text-pretty my-4 text-lg">
          For those of you traveling to Kansas City for our wedding, we have put together a list of hotels, activities, restaurants, bars, and transportation options to help you plan your trip.
        </p>
        <HotelSection/>
        <ActivitiesSection/>
        <RestaurantsSection/>
        <BarsSection/>
        <TransportationSection/>
      </article>
    </MainContent>
  );
}

interface TravelSectionProps{
  heading: string,
  children: React.ReactNode
}

function TravelSection({heading, children}: TravelSectionProps){
  return (
    <section>
      <h2 className="text-2xl font-semibold">{heading}</h2>
        {children}
    </section>
  )
}

function ExternalLink({href, text}: {href: string, text: string}){
  return (
    <a className="underline text-blue-700 visited:text-purple-600" href={href}>{text}</a>
  )
}

function HotelSection(){
  return (
    <TravelSection
      heading="Hotels"
    >
       <ul>
        <li>
          <p>The closest hotel to the venue is a holiday inn, it&apos;s about a quarter mile walk away. </p>
          <ExternalLink href="ttps://maps.app.goo.gl/9QaYgVRmyG6Fgawz7" text="Google Maps"/>
        </li>
        <li>
          <p></p>
        </li>
       </ul>
    </TravelSection>
  );
}

function ActivitiesSection(){
  return (<>

    </>)
}

function RestaurantsSection(){
  return (<>

    </>)
}

function BarsSection(){
  return (<>

    </>)
}

function TransportationSection(){
  return (<>

    </>)
}