import MainContent from "@/components/MainContent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Events | Kyle and Amanda",
};

export default function Events() {
  return (
    <MainContent>
      <header>
        <h1 className="text-center text-4xl font-semibold">Events</h1>
      </header>
      <article id={"events-timeline"}>
        <p className="max-w-1/2 text-pretty my-4 text-lg"></p>
        
    <div className="relative"></div>
        <div className="absolute left-1/2 h-full w-1 bg-gray-300"></div>
        {weddingEvents.map((event, index) => (
            <div
                key={index}
                className={`mb-8 flex items-center justify-between ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
            >
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto font-semibold text-lg text-white">{event.time}</h1>
                </div>
                <div className="order-1 w-5/12 px-6 py-4 bg-gray-100 rounded-lg shadow-xl">
                    <h3 className="mb-1 text-xl font-semibold">{event.title}</h3>
                    <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                        {event.description}
                    </p>
                </div>
            </div>
        ))}
      </article>
    </MainContent>
  );
}

const weddingEvents: { time: string, title: string, description: string}[] = [
    {
      time: "4:00 PM",
      title: "Doors Open",
      description: "Please arrive early to find parking and get settled."
    },
    {
      time: "5:00 PM",
      title: "Ceremony",
      description: "The ceremony will be indoors on the main floor of the venue."
    },
    {
      time: "5:30 PM",
      title: "Cocktail Hour",
      description: "After the ceremony we will have a cocktail hour on the lower level of the venue in the speakeasy."
    },
    {
      time: "6:30 PM",
      title: "Dinner",
        description: "Dinner will be served on the main floor of the venue."
    },
    {
        time: "7:30 PM",
      title: "Reception",
      description: "Dancing, drinks, and fun!",
    },
    {
        time: "11:00 PM",
       title: "Send Off",
    description: "Send off the bride and groom with sparklers!",
    }
  ];
  