"use client"
import { EventAttributes, createEvent } from 'ics';
import { useEffect, useState } from 'react';
type Attendee = {
  name: string;
  food_preference: string;

}
interface RsvpFormProps {
  name: string;
  attending: boolean;
  food_preference: string;
}



function RsvpForm() {
  const [input, set] = useState<RsvpFormProps>({name: "", attending: false, food_preference: ""});
  
  return (
    <div>
      <form className="hidden">
        <h2>RSVP</h2>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Attending:
          <input type="checkbox" name="attending" />
        </label>
        <label>
          Food Preference:
          <input type="text" name="food_preference" />
        </label>
      </form>
      <button 
        onClick={() => createCalendarEvent()}
        className="rounded-sm bg-blue-500 text-white p-2 mt-2" 
      >Add To Calendar
      </button>
    </div>
  );
}

async function createCalendarEvent() {
  const event: EventAttributes = {
    start: [2025, 6, 14, 17, 0],
    duration: { hours: 5, minutes: 0 },
    title: "Kyle and Amanda's Wedding",
    description: "Kyle and Amanda are getting married!",
    categories: [ "Wedding" ],
    location: "410 Admiral Boulevard, Kansas City, MO, 64106",
    url: "https://kyleandamanda.wedding",
    geo: { lat: 39.10559152902085, lon: -94.57822280235453 },
    status: "CONFIRMED",
    busyStatus: "BUSY",
    organizer: { name: "Kyle and Amanda", email: "kyleandamdandawedding@gmail.com" }
  };

  const icsFile: File | null = await new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(new File([value], "KyleAndAmandaWedding.ics", { type: "text/calendar" }));
    })
  });

  if(icsFile){
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


export default function Page() {
  return (
    <div>
        <RsvpForm/>
    </div>
  );
}
