import { wedding, weddingDate, localStartTime } from "@/constants/wedding";
import { useMemo } from "react";
import AddToCalendar from "./AddToCalendar";

export interface WeddingInfoProps {
  date?: Date;
  city?: string;
  state?: string;
  street?: string;
  zip?: string;
}

export function WeddingInfo({
  date = wedding.date,
  city = wedding.city,
  state = wedding.state,
  street = wedding.street,
  zip = wedding.zip,
}: WeddingInfoProps) {
  const daysUntil = useMemo(() => {
    const diffTime = date.getTime() - Date.now();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days;
  }, [date]);
  return (
    <div className="flex flex-row items-center justify-evenly text-center">
      <div className="">
        <h2 className="text-2xl">When</h2>
        <div>
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
            })}
          </time>
          <p>{daysUntil} days to go!</p>
        </div>
        <AddToCalendar />
      </div>
      <div>
        <h2 className="text-2xl">Where</h2>
        <p>The Jewel KC</p>
        <address>
          <p>{street}</p>
          <p>
            {city}, {state} {zip}
          </p>
        </address>
      </div>
    </div>
  );
}
