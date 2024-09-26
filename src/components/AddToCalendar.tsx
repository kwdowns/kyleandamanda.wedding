"use client";
import { EventAttributes, createEvent } from "ics";
export default function AddToCalendar() {
  return (
    <button
      className="bg-tertiary-light text-gray-100 p-2 rounded w-fit"
      onClick={createCalendarEvent}
    >
      Add to Calendar
    </button>
  );
}

async function createCalendarEvent() {
  const event: EventAttributes = {
    start: [2025, 6, 14, 17, 0],
    duration: { hours: 5, minutes: 0 },
    title: "Kyle and Amanda's Wedding",
    description: "Kyle and Amanda are getting married!",
    categories: ["Wedding"],
    location: "410 Admiral Boulevard, Kansas City, MO, 64106",
    url: "https://kyleandamanda.wedding",
    geo: { lat: 39.10559152902085, lon: -94.57822280235453 },
    status: "CONFIRMED",
    busyStatus: "BUSY",
    organizer: {
      name: "Kyle and Amanda",
      email: "kyleandamdandawedding@gmail.com",
    },
  };

  const icsFile: File | null = await new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(
        new File([value], "KyleAndAmandaWedding.ics", {
          type: "text/calendar",
        }),
      );
    });
  });

  if (icsFile) {
    const url = URL.createObjectURL(icsFile);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "KyleAndAmandaWedding.ics";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
}
