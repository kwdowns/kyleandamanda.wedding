"use client";

import { EventAttributes, createEvent } from "ics";
import { useEffect, useState } from "react";
type Attendee = {
  name: string;
  food_preference: string;
};
interface RsvpFormProps {
  name: string;
  attending: boolean;
  food_preference:
    | "none"
    | "vegan"
    | "vegetarian"
    | "gluten-free"
    | "peanut-allergy"
    | "dairy-allergy";
  guests: string | null;
  invite_id: string | null;
}

async function submitForm(props: RsvpFormProps) {
  console.log("received form submission:", props);
  // try {
  //   const response = await fetch('/api/submitForm', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(props),
  //   });
  //   if (response.ok) {
  //     alert('Form submitted successfully!');
  //   } else {
  //     throw new Error('Form submission failed.');
  //   }
  // } catch (error) {
  //   console.error('Error submitting form:', error);
  //   alert('An error occurred while submitting the form. Please try again later.');
  // }
}

function RsvpForm(formProps: RsvpFormProps) {
  const [props, setProps] = useState<RsvpFormProps>(formProps);
  return (
    <form>
      <label>Name:</label>
      <input
        type="text"
        value={props.name}
        onChange={(e) => setProps({ ...props, name: e.target.value })}
      />

      <label>Attending:</label>
      <input
        type="checkbox"
        checked={props.attending}
        onChange={(e) => setProps({ ...props, attending: e.target.checked })}
      />

      <label>Food Preference:</label>
      <select
        value={props.food_preference}
        onChange={(e) =>
          setProps({
            ...props,
            food_preference: e.target.value as RsvpFormProps["food_preference"],
          })
        }
      ></select>

      <label>Guests:</label>
      <input
        type="text"
        onChange={(e) => setProps({ ...props, guests: e.target.value })}
      />

      {props.invite_id && <input type="hidden" value={props.invite_id} />}

      <button onClick={async () => await submitForm(props)}>Submit</button>
    </form>
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

export default function RSVPView() {
  return (
    <>
      <RsvpForm
        name=""
        attending={false}
        food_preference="none"
        guests={null}
        invite_id={null}
      />
    </>
  );
}
