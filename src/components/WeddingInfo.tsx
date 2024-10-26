"use client";
import { wedding } from "@/constants/wedding";
import { useEffect, useState } from "react";
import AddToCalendar from "./AddToCalendar";

export function WeddingInfo() {
  const [daysUntil, setDaysUntil] = useState(getDaysUntil());
  useEffect(() => {
    const interval = setInterval(() => {
      const newDaysUntil = getDaysUntil();
      if (newDaysUntil !== daysUntil) {
        setDaysUntil(newDaysUntil);
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <div className="flex flex-row items-center justify-evenly text-center">
      <div className="">
        <h2 className="text-2xl">When</h2>
        <div>
          <time dateTime={wedding.date.toISOString()}>
            {wedding.date.toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
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
          <p>{wedding.street}</p>
          <p>
            {wedding.city}, {wedding.state} {wedding.zip}
          </p>
        </address>
      </div>
    </div>
  );
}

function getDaysUntil() {
  const weddingDate = new Date(wedding.date);
  weddingDate.setHours(0, 0, 0, 0); // Set the time to midnight
  const days = Math.ceil(
    (weddingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  return days;
}
