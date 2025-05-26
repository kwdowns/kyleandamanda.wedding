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

  if (daysUntil === 0) {
    return renderWeddingToday();
  }

  if (daysUntil > 0) {
    return renderUpcomingWedding();
  }

  return renderWeddingPassed();

  function renderUpcomingWedding() {
    return (
      <>
      <h2 className="text-2xl text-center py-8">We&apos;re getting Married!</h2>
      <div className="flex flex-row items-center justify-evenly text-center">
        <div className="">
          <h2 className="text-2xl">When</h2>
          <div>
            <time dateTime={wedding.date.toISOString()}>
              {wedding.date.toLocaleString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
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
      <p className="mt-12 px-4 text-lg">
        We&apos;re so excited to celebrate with you!
      </p>
      </>
    );
  }

  function renderWeddingToday() {
    return (
      <>
      <h2 className="text-2xl text-center py-8">We&apos;re getting Married!</h2>
      <div className="flex flex-row items-center justify-evenly text-center">
        <div className="">
          <h2 className="text-2xl">Today</h2>
          <div>
            <DisplayDate date={wedding.date} />
            <p>See you this evening!</p>
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
      <p className="mt-12 px-4 text-lg">
        We&apos;re so excited to celebrate with you!
      </p>
      </>
    );
  }

  function renderWeddingPassed() {
    return (
      <div className="flex flex-row items-center justify-evenly text-center">
        <div className="">
          <h2 className="text-2xl">When</h2>
          <div>
            <DisplayDate date={wedding.date} />
            <p>We were married {Math.abs(daysUntil)} days ago!</p>
          </div>
        </div>
      </div>
    );
  }

  function getDaysUntil() {
    const weddingDate = new Date(wedding.date);
    weddingDate.setHours(0, 0, 0, 0); // Set the time to midnight
    let now = new Date(Date.now());
    now.setHours(0, 0, 0, 0);
    const days = Math.ceil(
      (weddingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    return days;
  }

  interface DisplayDateProps {
    date: Date;
  }
  function DisplayDate({ date }: DisplayDateProps) {
    return (
      <time dateTime={date.toISOString()}>
        {date.toLocaleString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </time>
    );
  }
}
