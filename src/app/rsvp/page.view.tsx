"use client";
import {
  AttendingStatus,
  RsvpInviteModel,
  SubmitRsvpRequestBody,
  UpdateRsvpRequestBody,
} from "../../client/rsvp";
import { useRef, useState, useTransition } from "react";
import { WeddingInfo } from "@/components/WeddingInfo";

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

  async function submitRsvpInvite(
    request: SubmitRsvpRequestBody,
  ): Promise<string> {
    const response = await fetch(`/api/rsvp`, {
      body: JSON.stringify(request),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status != 200) {
      throw new Error(`Failed to submit RSVP: ${response.statusText}`);
    }

    const responseBody = await response.json();

    return responseBody.rsvpCode;
  }

  async function updateRsvpInvite(request: {
    rsvpCode: string;
    body: UpdateRsvpRequestBody;
  }) {
    const response = await fetch(`/api/rsvp/${request.rsvpCode}`, {
      body: JSON.stringify(request.body),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status != 200) {
      throw new Error(`Failed to update RSVP: ${response.statusText}`);
    }
  }

  async function submitRsvp() {
    if (rsvpCode) {
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
        },
      });
    } else {
      console.log("updating rsvp");
      const newRsvpCode = await submitRsvpInvite({
        guestName: name,
        attending: attendingStatus === "Attending",
        inviteCount: guestCount,
        additionalGuestNames: guests ?? [],
        foodPreference: foodPreference ?? "",
        comments: comments ?? "",
      });
      setRsvpCode(newRsvpCode);
    }
  }

  const inputClassName = "m-2 p-1";

  return (
    <>
      {/* {rsvpCode && attendingStatus === "AwaitingResponse" && <p>rsvp not yet submitted</p>}
    {rsvpCode && attendingStatus !== "AwaitingResponse" && <p>rsvp previously submitted, editing</p>} */}

      <div className={"mx-auto mt-8 p-2 bg-accent rounded-xl text-center"}>
        <div className={inputClassName}>
          <label>Name:</label>
          <input
            type="text"
            className="rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={inputClassName}>
          <label>Attending:</label>
          <input
            type="checkbox"
            checked={attendingStatus == "Attending"}
            onChange={(e) =>
              setAttendingStatus(e.target.checked ? "Attending" : "Declined")
            }
          />
        </div>

        <div className={inputClassName}>
          <label>Dietary restrictions:</label>
          <input
            type="text"
            value={foodPreference ?? ""}
            onChange={(e) => setFoodPreference(e.target.value)}
          />
        </div>

        {guestCount > 0 && (
          <div className={inputClassName}>
            <p>Additional Guests</p>
            {Array.from({ length: guestCount }).map((_, i) => (
              <input
                key={i}
                type="text"
                value={guests?.[i] ?? ""}
                onChange={(e) => {
                  const newGuests = guests ? [...guests] : [];
                  newGuests[i] = e.target.value;
                  setGuests(newGuests);
                }}
              />
            ))}
          </div>
        )}

        <div className={inputClassName}>
          <label>Comments</label>
          <input
            type="text"
            value={comments ?? ""}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {rsvpCode && <input type="hidden" value={rsvpCode} />}

        <div
          className={"bg-tertiary text-white p-2 rounded w-fit"}
          onClick={submitRsvp}
        >
          Submit
        </div>
      </div>
    </>
  );
}

type RsvpSteps =
  | "IsGuestAttending"
  | "GuestAdditionalGuests"
  | "GuestFoodPreference"
  | "GuestComments"
  | "Declined"
  | "Submitted";

export default function RsvpView(rsvp: RsvpFormProps) {
  const [isPending, startTransition] = useTransition();
  const [invite, setInvite] = useState<RsvpInviteModel>({
    id: rsvp.inviteId ?? "",
    attendingStatus: rsvp.attendingStatus,
    inviteCount: rsvp.inviteCount,
    additionalGuestNames: rsvp.guests ?? [],
    guestName: rsvp.name,
    foodPreference: rsvp.foodPreference ?? "",
    comments: rsvp.comments ?? "",
  });
  const [step, setStep] = useState<RsvpSteps>("IsGuestAttending");

  return (
    <>
      <h1 className="text-center mt-8 text-4xl">RSVP</h1>
      <div>
        {step === "IsGuestAttending" && (
          <IsGuestAttendingStep
            invite={invite}
            onSubmit={(status: AttendingStatus) => {
              console.log("accepting invite", invite);
              setInvite({ ...invite, attendingStatus: status });
              if (status === "Declined") {
                startTransition(() => setStep("Declined"));
              } else if (status === "Attending") {
                startTransition(() => setStep("GuestAdditionalGuests"));
              }
            }}
          />
        )}
        {step === "GuestAdditionalGuests" && (
          <GuestAdditionalGuestsStep
            invite={invite}
            onSubmit={(guests: string[]) => {
              console.log("submitting additional guests", invite);
              setInvite({ ...invite, additionalGuestNames: guests });
              startTransition(() => setStep("GuestFoodPreference"));
            }}
          />
        )}
        {step === "GuestFoodPreference" && (
          <GuestFoodPreferenceStep
            invite={invite}
            onSubmit={(foodPreference: string) => {
              console.log("submitting food preference", invite);
              setInvite({ ...invite, foodPreference: foodPreference });
              startTransition(() => setStep("GuestComments"));
            }}
          />
        )}
        {step === "GuestComments" && (
          <GuestCommentsStep
            invite={invite}
            onSubmit={(comments: string) => {
              console.log("submitting comments", invite);
              setInvite({ ...invite, comments: comments });
              startTransition(() => setStep("Submitted"));
            }}
          />
        )}
        {step === "Declined" && (
          <div>
            <p>
              Thank you for letting us know you won&apos;t be able to make it.
            </p>
            <p>We hope to see you at the next event!</p>
          </div>
        )}
        {step === "Submitted" && (
          <div>
            <p>Thank you for your RSVP!</p>
          </div>
        )}
      </div>
      {/* <div className="w-11/12 lg:w-3/4 mx-auto">
        <RsvpForm {...rsvp} />
      </div>       */}
    </>
  );
}

interface IsGuestAttendingStepProps {
  invite: RsvpInviteModel;
  onSubmit: (status: AttendingStatus) => void;
}

function IsGuestAttendingStep({ invite, onSubmit }: IsGuestAttendingStepProps) {
  const [attending, setAttending] = useState(invite.attendingStatus);
  return (
    <>
      <p>Will you be attending?</p>
      <div>
        <input
          type="radio"
          radioGroup="attending"
          value="Attending"
          checked={attending === "Attending"}
          onChange={() => setAttending("Attending")}
        />
        Joyfully Accepts
        <input
          type="radio"
          radioGroup="attending"
          value="Declined"
          checked={attending === "Declined"}
          onChange={() => setAttending("Declined")}
        />
        Regretfully Declines
        <button
          disabled={attending === "AwaitingResponse"}
          onClick={() => {
            if (attending !== "AwaitingResponse") {
              onSubmit(attending);
            }
          }}
        >
          {attending === "Attending" ? "Next" : "Submit"}
        </button>
      </div>
    </>
  );
}

interface IGuestAdditionalGuestsStepProps {
  invite: RsvpInviteModel;
  onSubmit: (additionalGuestNames: string[]) => void;
}

function GuestAdditionalGuestsStep({
  invite,
  onSubmit,
}: IGuestAdditionalGuestsStepProps) {
  const guestCount = Math.max(
    invite.inviteCount,
    invite.additionalGuestNames.filter((g) => (g ?? "").trim() !== "").length,
  );

  const [guests, setGuests] = useState<string[]>(
    Array.from({ length: guestCount }).map((_, i) =>
      (invite.additionalGuestNames ? [i] ?? "" : "").toString(),
    ),
  );

  return (
    <>
      <p>Additional Guests</p>
      {Array.from({ length: guestCount }).map((_, i) => (
        <input
          key={i}
          type="text"
          value={guests[i] ?? ""}
          onChange={(e) => {
            const newGuests = guests ? [...guests] : [];
            newGuests[i] = e.target.value;
            setGuests(newGuests);
          }}
        />
      ))}
      <button
        onClick={() => {
          onSubmit(
            guests.filter((g) => (g ?? "").trim() !== "").map((g) => g.trim()),
          );
        }}
      >
        Submit
      </button>
    </>
  );
}

interface IGuestFoodPreferenceStepProps {
  invite: RsvpInviteModel;
  onSubmit: (foodPrefrence: string) => void;
}

function GuestFoodPreferenceStep({
  invite,
  onSubmit,
}: IGuestFoodPreferenceStepProps) {
  const [foodPreference, setFoodPreference] = useState(invite.foodPreference);
  return (
    <>
      <p>Do you have any dietary restrictions?</p>
      <input
        type="text"
        value={foodPreference}
        onChange={(e) => setFoodPreference(e.target.value)}
      />
      <button
        onClick={() => {
          onSubmit(foodPreference);
        }}
      >
        Submit
      </button>
    </>
  );
}

interface IGuestCommentsStepProps {
  invite: RsvpInviteModel;
  onSubmit: (comments: string) => void;
}

function GuestCommentsStep({ invite, onSubmit }: IGuestCommentsStepProps) {
  const [comments, setComments] = useState(invite.comments);
  return (
    <>
      <p>Do you have any comments?</p>
      <input
        type="text"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <button
        onClick={() => {
          onSubmit(comments);
        }}
      >
        Submit
      </button>
    </>
  );
}
