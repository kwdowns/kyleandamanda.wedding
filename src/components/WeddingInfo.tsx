import { wedding } from "@/constants/wedding";

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
  const diffTime = date.getTime() - Date.now();
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div>
      <p className="mt-4 text-2xl">We&apos;re getting Married!</p>
      <div className="">
        {date.toDateString()} | {days} days
      </div>
      <p>
        {city}, {state} {zip}
      </p>
      <p>{street}</p>
    </div>
  );
}
