"use client";
import AddToCalendar from "@/components/AddToCalendar";
import { AttendingStatus, RsvpInviteModel } from "../../client/rsvp";
import { useId, useState, useTransition } from "react";
import Link from "next/link";
import * as rsvpApi from "../../client/rsvp";

export interface RsvpFormProps {
  name: string;
  attendingStatus: AttendingStatus;
  foodPreference: string | null;
  guests: string[] | null;
  inviteId: string | null;
  comments: string | null;
  inviteCount: number;
}

type RsvpSteps =
  | "ScanQR"
  | "IsGuestAttending"
  | "GuestAdditionalGuests"
  | "GuestFoodPreference"
  | "GuestComments"
  | "Declined"
  | "Submitted";

export default function RsvpView(rsvp: RsvpFormProps | null) {
  const [isPending, startTransition] = useTransition();
  const [invite, setInvite] = useState<RsvpInviteModel>({
    id: rsvp?.inviteId ?? "",
    attendingStatus: rsvp?.attendingStatus ?? "AwaitingResponse",
    inviteCount: rsvp?.inviteCount ?? 0,
    additionalGuestNames: rsvp?.guests ?? [],
    guestName: rsvp?.name ?? "",
    foodPreference: rsvp?.foodPreference ?? "",
    comments: rsvp?.comments ?? "",
  });
  const [step, setStep] = useState<RsvpSteps>(
    rsvp && rsvp.inviteId ? "IsGuestAttending" : "ScanQR",
  );

  async function submitResponse(
    inviteModel: RsvpInviteModel,
  ): Promise<string | null> {
    if (inviteModel.id) {
      await rsvpApi.updateRsvpInvite({
        rsvpCode: inviteModel.id,
        body: {
          attending: inviteModel.attendingStatus === "Attending",
          additionalGuestNames: inviteModel.additionalGuestNames,
          comments: inviteModel.comments,
          foodPreference: inviteModel.foodPreference,
          guestName: inviteModel.guestName,
          inviteCount: inviteModel.inviteCount,
        },
      });
    } else {
      let rsvpCode = await rsvpApi.submitRsvpInvite({
        body: {
          attending: inviteModel.attendingStatus === "Attending",
          additionalGuestNames: inviteModel.additionalGuestNames,
          comments: inviteModel.comments,
          foodPreference: inviteModel.foodPreference,
          guestName: inviteModel.guestName,
          inviteCount: inviteModel.inviteCount,
        },
      });
      return rsvpCode;
    }
    return null;
  }

  return (
    <>
      <h1 className="text-center mt-8 text-4xl mb-12">RSVP</h1>
      <div className="w-4/5 md:w-3/4 xl:w-1/2 2xl:w-1/3 mx-auto">
        {step === "ScanQR" && (
          <div className="text-center">
            <p>Please scan the QR code on your invitation to RSVP</p>
            <p className="mt-4">
              If you are having trouble, please contact us directly at{" "}
              <a href="mailto:rsvp@kyleandamanda.wedding">
                rsvp@kyleandamanda.wedding
              </a>
            </p>
          </div>
        )}
        {step === "IsGuestAttending" && (
          <IsGuestAttendingStep
            invite={invite}
            onSubmit={(status: AttendingStatus) => {
              console.log("accepting invite", invite);
              if (status === "Declined") {
                startTransition(async () => {
                  setInvite({ ...invite, attendingStatus: status });
                  let resp = submitResponse({
                    ...invite,
                    attendingStatus: status,
                  });
                  setStep("Declined");
                  await resp;
                });
              } else if (status === "Attending") {
                startTransition(() => {
                  setInvite({ ...invite, attendingStatus: status });
                  let hasAdditionalGuests = Math.max(
                    invite.additionalGuestNames.length,
                    invite.inviteCount,
                  );
                  if (hasAdditionalGuests > 0) {
                    setStep("GuestAdditionalGuests");
                  } else {
                    setStep("GuestFoodPreference");
                  }
                });
              }
            }}
          />
        )}
        {step === "GuestAdditionalGuests" && (
          <GuestAdditionalGuestsStep
            invite={invite}
            onSubmit={(guests: string[]) => {
              console.log("submitting additional guests", invite);
              startTransition(() => {
                setInvite({ ...invite, additionalGuestNames: guests });
                setStep("GuestFoodPreference");
              });
            }}
          />
        )}
        {step === "GuestFoodPreference" && (
          <GuestFoodPreferenceStep
            invite={invite}
            onSubmit={(foodPreference: string) => {
              console.log("submitting food preference", invite);
              startTransition(() => {
                setInvite({ ...invite, foodPreference: foodPreference });
                setStep("GuestComments");
              });
            }}
          />
        )}
        {step === "GuestComments" && (
          <GuestCommentsStep
            invite={invite}
            onSubmit={(comments: string) => {
              console.log("submitting comments", invite);
              startTransition(async () => {
                let resp = await submitResponse({
                  ...invite,
                  comments: comments,
                });
                setInvite({
                  ...invite,
                  comments: comments,
                  id: resp ?? invite.id,
                });
                setStep("Submitted");
              });
            }}
          />
        )}
        {step === "Declined" && (
          <div>
            <p>
              Thank you for letting us know you won&apos;t be able to make it.
            </p>
            <p>We hope to see you at the next event!</p>
            <p>
              If you change your mind use this link{" "}
              <Link href={`/rsvp/${invite.id}`} /> to update your RSVP or
              contact us directly before :TODO:rsvp-due-date:.
            </p>

            <Link href="/">Return to the homepage</Link>
          </div>
        )}
        {step === "Submitted" && (
          <div>
            <p>Thank you for your RSVP!</p>
            <p>We can&apos;t wait to see you at the wedding!</p>
            <p>Add a reminder to your calendar:</p>
            <AddToCalendar />
            <p>
              If need to make any changes use this link{" "}
              <Link href={`/rsvp/${invite.id}`}>this link</Link> to update your
              RSVP details or contact us directly before :TODO:rsvp-due-date:.
            </p>
            <Link href="/">Return to the homepage</Link>
          </div>
        )}
      </div>
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
      <div className="flex flex-col">
        <RadioGroup
          label="Will you be attending?"
          value={attending}
          onChange={(e) => setAttending(e.target.value as AttendingStatus)}
          options={[
            { value: "Attending", label: "Joyfully Accepts" },
            { value: "Declined", label: "Regretfully Declines" },
          ]}
        />
        <SubmitButton
          onClick={() => {
            if (attending !== "AwaitingResponse") {
              onSubmit(attending);
            }
          }}
          disabled={attending !== "Attending" && attending !== "Declined"}
        />
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
      (invite.additionalGuestNames
        ? invite.additionalGuestNames[i] ?? ""
        : ""
      ).toString(),
    ),
  );
  console.log(guests);
  return (
    <div className="flex flex-col">
      <p className="text-xl">
        Please enter the name(s) of any additional guests
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: guestCount }).map((_, i) => (
          <TextBox
            key={i}
            label={`Guest ${i + 1}`}
            value={guests ? guests[i] ?? "" : ""}
            onChange={(e) => {
              const newGuests = guests ? [...guests] : [];
              newGuests[i] = e.target.value;
              setGuests(newGuests);
            }}
          />
        ))}
      </div>
      <button
        className="mt-4 bg-secondary text-white px-4 py-2 rounded-md"
        onClick={() => {
          onSubmit(
            guests.filter((g) => (g ?? "").trim() !== "").map((g) => g.trim()),
          );
        }}
      >
        Submit
      </button>
    </div>
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
    <div className="flex flex-col">
      <TextArea
        label={"Do you have any dietary restrictions or food preferences?"}
        value={foodPreference}
        onChange={(e) => setFoodPreference(e.target.value)}
      />
      <SubmitButton
        onClick={() => {
          onSubmit(foodPreference);
        }}
        disabled={false}
      />
    </div>
  );
}

interface IGuestCommentsStepProps {
  invite: RsvpInviteModel;
  onSubmit: (comments: string) => void;
}

function GuestCommentsStep({ invite, onSubmit }: IGuestCommentsStepProps) {
  const [comments, setComments] = useState(invite.comments);
  return (
    <div className="flex flex-col">
      <TextArea
        label="Do you have a message for the bride and groom?"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <SubmitButton
        onClick={() => {
          onSubmit(comments);
        }}
        disabled={false}
      />
    </div>
  );
}

function TextBox({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <label>
      {label}
      <input
        type="text"
        value={currentValue}
        placeholder={placeholder}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          onChange(e);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </label>
  );
}

const SubmitButton = ({
  onClick,
  disabled,
  text,
}: {
  onClick: () => void;
  disabled: boolean;
  text?: string;
}) => (
  <button
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-blue-900 disabled:cursor-not-allowed disabled:text-gray-500"
    disabled={disabled}
    onClick={onClick}
  >
    {text ?? "Submit"}
  </button>
);

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <label>
      {label}
      <textarea
        value={currentValue}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          onChange(e);
        }}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />
    </label>
  );
}

function RadioGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; label: string }[];
}) {
  const [selected, setSelected] = useState(value);
  return (
    <>
      <p className="text-2xl mb-8 text-center">{label}</p>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        {options.map((option) => {
          return (
            <li key={option.label}>
              <RadioButton
                label={option.label}
                value={option.value}
                checked={option.value === selected}
                onChange={(e) => {
                  setSelected(e.target.value);
                  onChange(e);
                }}
              />
              {/* <input
                id={inputId}
                type="radio"
                radioGroup=""
                value={option.value}
                checked={option.value === selected}
                onChange={(e) => {
                  setSelected(e.target.value);
                  onChange(e);
                }}
                className="peer hidden"
              />
              <label
                key={option.value}
                htmlFor={inputId}
                className="inline-flex items-center justify-between w-full p-5 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:bg-tertiary peer-checked:border-white peer-checked:text-white hover:text-gray-800 hover:bg-tertiary-light hover:peer-checked:bg-tertiary-light"
              >
                <div className="block w-full text-lg font-semibold">
                  {option.label}
                </div>
              </label> */}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function RadioButton({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputId = useId();
  return (
    <>
      <input
        id={inputId}
        type="radio"
        radioGroup=""
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <label
        htmlFor={inputId}
        className="inline-flex items-center justify-between w-full p-5 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:bg-tertiary peer-checked:border-white peer-checked:text-white hover:text-gray-800 hover:bg-tertiary-light hover:peer-checked:bg-tertiary-light"
      >
        <div className="block w-full text-lg font-semibold">{label}</div>
      </label>
    </>
  );
}
