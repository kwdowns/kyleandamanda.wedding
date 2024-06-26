import { wedding } from "@/constants/wedding";
import { useMemo } from "react";
import { MapView } from "./MapView";

export interface WeddingInfoProps {
  date?: Date;
  city?: string;
  state?: string;
  street?: string;
  zip?: string;
  showMap?: boolean;
}

export function WeddingInfo({
  date = wedding.date,
  city = wedding.city,
  state = wedding.state,
  street = wedding.street,
  zip = wedding.zip,
  showMap = true
}: WeddingInfoProps) {
  const daysUntil = useMemo(() => {
    const diffTime = date.getTime() - Date.now();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days;
  }, [])
  return (
    <div className="grid grid-rows-1 gap-4 text-xl text-center">
      <div className="flex flex-row items-center justify-evenly">
        <span>{date.toDateString()}</span>
        <span>{daysUntil} days</span>
      </div>
      <div>
        <p>{street}</p>
        <p>
          {city}, {state} {zip}
        </p>
      </div>
      {showMap && (<MapView/>)}
    </div>
  );
}


