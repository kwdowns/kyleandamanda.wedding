"use client"
import { EventAttributes, createEvent } from "ics";
import { AttendingStatus, SubmitRsvpRequestBody, UpdateRsvpRequestBody } from "../../client/rsvp";
import { useState } from "react";


export interface RsvpFormProps {
  name: string;
  attendingStatus: AttendingStatus;
  foodPreference: string | null;
  guests: string[] | null;
  inviteId: string | null;
  comments: string | null;
  inviteCount: number;
}

function RsvpForm(props: RsvpFormProps) {
  const [name, setName] = useState(props.name);
  const [attendingStatus, setAttendingStatus] = useState(props.attendingStatus);
  const [foodPreference, setFoodPreference] = useState(props.foodPreference);
  const [guests, setGuests] = useState(props.guests);
  const [comments, setComments] = useState(props.comments);
  const [rsvpCode, setRsvpCode] = useState(props.inviteId);

  const guestCount = Math.max(guests?.length ?? 0, props.inviteCount);

  async function submitRsvpInvite(request: SubmitRsvpRequestBody): Promise<string>{
    const response = await fetch(`/api/rsvp`, {
      body: JSON.stringify(request),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.status != 200){
      throw new Error(`Failed to submit RSVP: ${response.statusText}`);
    }

    const responseBody = await response.json();

    return responseBody.rsvpCode;
  }

  async function updateRsvpInvite(request: { rsvpCode: string, body: UpdateRsvpRequestBody }){
    const response = await fetch(`/api/rsvp/${request.rsvpCode}`, {
      body: JSON.stringify(request.body),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.status != 200){
      throw new Error(`Failed to update RSVP: ${response.statusText}`);
    }
  }

  async function submitRsvp(){
    if(rsvpCode){
      console.log("updating rsvp");
      await updateRsvpInvite({
        rsvpCode: rsvpCode,
        body: {
          guestName: name,
          attending: attendingStatus === "Attending",
          inviteCount: guestCount,
          additionalGuestNames: guests ?? [],
          foodPreference: foodPreference ?? "",
          comments: comments ?? "",
        }
      });
    }
    else{
      console.log("updating rsvp");
      const newRsvpCode = await submitRsvpInvite({
          guestName: name,
          attending: attendingStatus === "Attending",
          inviteCount: guestCount,
          additionalGuestNames: guests ?? [],
          foodPreference: foodPreference ?? "",
          comments: comments ?? "",
        }
      );
      setRsvpCode(newRsvpCode);
    }
  }

  return (
    <>
    <h1> RSVP </h1>
    {rsvpCode && attendingStatus === "AwaitingResponse" && <p>rsvp not yet submitted</p>}
    {rsvpCode && attendingStatus !== "AwaitingResponse" && <p>rsvp previously submitted, editing</p>}
    {!rsvpCode && <p>new rsvp</p>}
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Attending:</label>
      <input
        type="checkbox"
        checked={attendingStatus == "Attending"}
        onChange={(e) => setAttendingStatus(e.target.checked ? "Attending" : "Declined")}
      />

      <label>Food Preference:</label>
      <input
        type="text"
        value={foodPreference ?? ""}
        onChange={(e) => setFoodPreference(e.target.value)}
      ></input>

      <div>
        <p>Additional Guests</p>
        {Array.from({ length: guestCount }).map((_, i) => (
          (<input
            key={i}
            type="text"
            value={guests?.[i] ?? ""}
            onChange={(e) => {
              const newGuests = guests ? [...guests] : [];
              newGuests[i] = e.target.value;
              setGuests(newGuests);
            }}
          />)
        ))}
      </div>
      <input
        type="text"
        value={comments ?? ""}
        onChange={(e) => setComments(e.target.value)}
      />

      {rsvpCode && <input type="hidden" value={rsvpCode} />}

      <div 
        className={"bg-tertiary text-white p-2 rounded w-fit"}
        onClick={submitRsvp}>
        Submit
      </div>
    </div>
    </>
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

export default function RsvpView(rsvp : RsvpFormProps){
  return (
    <>
      <RsvpForm {...rsvp} />
    </>
  )
}