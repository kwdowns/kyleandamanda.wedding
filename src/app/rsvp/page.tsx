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

export default function Page() {
  return (
    <div>
      <RsvpForm
        name=""
        attending={false}
        food_preference="none"
        guests={null}
        invite_id={null}
      />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1548.0292970908088!2d-94.5770299115985!3d39.10513613530659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0f12465a4e03b%3A0xa5c299be760e5f4d!2sThe%20Jewel%20Event%20Space!5e0!3m2!1sen!2sus!4v1716956238954!5m2!1sen!2sus"
        width={800}
        height={600}
        loading="lazy"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
