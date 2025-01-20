"use client";
import AddToCalendar from "@/components/AddToCalendar";
import { AttendingStatus, Party, PartyMember } from "../../client/rsvp";
import { useId, useState, useTransition } from "react";
import Link from "next/link";
import * as rsvpApi from "../../client/rsvp";
import MainContent from "@/components/MainContent";

export interface RsvpFormProps {
  attendingStatus: AttendingStatus;
  members: PartyMember[] | null;
  partyCode: string | null;
  comments: string | null;
  partySize: number;
}

type RsvpSteps =
  | "EnterCode"
  | "IsGuestAttending"
  | "PartyMembers"
  | "Comments"
  | "Declined"
  | "Submitted";

export default function RsvpView(rsvp: RsvpFormProps | null) {
  const [isPending, startTransition] = useTransition();
  const [party, setParty] = useState<Party>({
    partyCode: rsvp?.partyCode ?? "",
    attendingStatus: rsvp?.attendingStatus ?? "AwaitingResponse",
    partySize: rsvp?.partySize ?? 0,
    members: rsvp?.members ?? [],
    comments: rsvp?.comments ?? "",
  });
  const [step, setStep] = useState<RsvpSteps>(
    rsvp && rsvp.partyCode ? "IsGuestAttending" : "EnterCode",
  );

  async function submitResponse(party: Party): Promise<void> {
    await rsvpApi.updateParty({
      rsvpCode: party.partyCode,
      body: {
        attending: party.attendingStatus === "Attending",
        comments: party.comments,
        partyMembers: party.members.map((m) => ({
          firstName: m.firstName,
          lastName: m.lastName,
          foodRestrictions: m.foodRestrictions,
        })),
      },
    });
    return;
  }

  return (
    <MainContent>
      <h1 className="text-center mt-8 text-4xl mb-12">RSVP</h1>
      {step !== "EnterCode" && (
        <button
          className="m-4 text-black text-lg bg-slate-300 rounded-lg p-2 hover:bg-slate-100"
          onClick={() => {
            if (step === "IsGuestAttending") {
              setStep("EnterCode");
            } else if (step === "PartyMembers") {
              setStep("IsGuestAttending");
            } else if (step === "Comments") {
              setStep("PartyMembers");
            }
          }}
        >
          &larr; Back
        </button>
      )}
      {step === "EnterCode" && (
        <div className="text-center">
          <p className="text-xl mb-2">
            Please scan the QR code on your invitation or enter the code listed
            below it to RSVP
          </p>
          <input
            type="text"
            value={party.partyCode}
            placeholder="Enter your code"
            onChange={async (e) => {
              setParty({ ...party, partyCode: e.target.value });
              if (e.target.value.length >= 5) {
                const rsvp = await rsvpApi.getParty(e.target.value);
                if (rsvp !== null) {
                  console.log("found party");
                  setParty({ ...rsvp });
                  setStep("IsGuestAttending");
                  window.history.pushState({}, "", `/rsvp/${e.target.value}`);
                }
              }
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      )}
      {step === "IsGuestAttending" && (
        <IsGuestAttendingStep
          invite={party}
          onSubmit={(status: AttendingStatus) => {
            console.log("accepting invite", party);
            if (status === "Declined") {
              startTransition(async () => {
                setParty({ ...party, attendingStatus: status });
                let resp = submitResponse({
                  ...party,
                  attendingStatus: status,
                });
                setStep("Declined");
                await resp;
              });
            } else if (status === "Attending") {
              startTransition(() => {
                setParty({ ...party, attendingStatus: status });
                if (party.partySize > 1) {
                  setStep("PartyMembers");
                } else {
                  setStep("Comments");
                }
              });
            }
          }}
        />
      )}
      {step === "PartyMembers" && (
        <PartyMembersStep
          invite={party}
          onSubmit={(guests: PartyMember[]) => {
            console.log("submitting additional guests", party);
            startTransition(() => {
              setParty({ ...party, members: guests });
              setStep("Comments");
            });
          }}
        />
      )}
      {step === "Comments" && (
        <GuestCommentsStep
          invite={party}
          onSubmit={(comments: string) => {
            console.log("submitting comments", party);

            startTransition(async () => {
              let resp = await submitResponse({
                ...party,
                comments: comments,
              });
              setParty({
                ...party,
                comments: comments,
              });
              setStep("Submitted");
              await resp;
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
            <Link href={`/rsvp/${party.partyCode}`} /> to update your RSVP or
            contact us directly before :TODO:rsvp-due-date:.
          </p>

          <Link href="/">Return to the homepage</Link>
        </div>
      )}
      {step === "Submitted" && (
        <div className="text-2xl">
          <p>Thank you for your RSVP!</p>
          <p>We can&apos;t wait to see you at the wedding!</p>

          <p>
            If need to make any changes use this link{" "}
            <Link
              href={`/rsvp/${party.partyCode}`}
              className="text-blue-500 hover:underline"
            >
              {window.location.href}
            </Link>{" "}
            to update your RSVP details or contact us directly before May 16th.
          </p>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to the homepage
          </Link>

          <p>Add a reminder to your calendar:</p>
          <AddToCalendar />
        </div>
      )}
    </MainContent>
  );
}

interface IsGuestAttendingStepProps {
  invite: Party;
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

interface IPartyMembersStepProps {
  invite: Party;
  onSubmit: (members: PartyMember[]) => void;
}

function PartyMembersStep({ invite, onSubmit }: IPartyMembersStepProps) {
  const [members, setMembers] = useState<PartyMember[]>(invite.members ?? []);
  return (
    <div className="flex flex-col">
      <p className="text-xl text-center">
        Please confirm the names of the guests in your party and any dietary
        restrictions.
      </p>
      <div className="grid gap-6 md:grid-cols-1">
        {members.map((m, i) => (
          <PartyMemberInput
            key={i}
            value={m}
            onChange={(member) => {
              if (member !== null) {
                setMembers([
                  ...members.slice(0, i),
                  member,
                  ...members.slice(i + 1),
                ]);
              } else {
                setMembers([...members.slice(0, i), ...members.slice(i + 1)]);
              }
            }}
          />
        ))}
      </div>
      {members.length < invite.partySize && (
        <button
          className="my-4 bg-secondary text-white px-4 py-2 rounded-md w-1/3 mx-auto"
          onClick={() => {
            setMembers([
              ...members,
              { firstName: null, lastName: null, foodRestrictions: null },
            ]);
          }}
        >
          Add Guest
        </button>
      )}
      <SubmitButton
        disabled={members.length === 0}
        onClick={() => {
          onSubmit(
            members.filter(
              (g) =>
                (g.lastName ?? "").trim() !== "" &&
                (g.firstName ?? "").trim() != "",
            ),
          );
        }}
      />
    </div>
  );
}

interface IGuestCommentsStepProps {
  invite: Party;
  onSubmit: (comments: string) => void;
}

function GuestCommentsStep({ invite, onSubmit }: IGuestCommentsStepProps) {
  const [comments, setComments] = useState(invite.comments ?? "");
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

function PartyMemberInput({
  value,
  onChange,
}: {
  value: PartyMember | null;
  onChange: (member: PartyMember | null) => void;
}) {
  const [member, setCurrentValue] = useState<PartyMember>(
    value ?? { firstName: null, lastName: null, foodRestrictions: null },
  );
  return (
    <div className="flex flex-col my-4 p-4 bg-primary-light rounded-2xl">
      <div className="flex flex-items-center space-x-2">
        <input
          type="text"
          placeholder="First Name"
          value={member.firstName ?? ""}
          onChange={(e) => {
            const updatedMember = { ...member, firstName: e.target.value };
            setCurrentValue(updatedMember);
            onChange(updatedMember);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={member.lastName ?? ""}
          onChange={(e) => {
            const updatedMember = { ...member, lastName: e.target.value };
            setCurrentValue(updatedMember);
            onChange(updatedMember);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="flex flex-row justify-between space-x-2">
        <label>
          Food Restrictions
          <input
            type="checkbox"
            checked={member.foodRestrictions !== null}
            onChange={(e) => {
              const updatedMember = {
                ...member,
                foodRestrictions: e.target.checked ? "" : null,
              };
              setCurrentValue(updatedMember);
              onChange(updatedMember);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        </label>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Remove
        </button>
      </div>
      {member.foodRestrictions !== null && (
        <textarea
          placeholder="Food Restrictions"
          value={member.foodRestrictions ?? ""}
          onChange={(e) => {
            const updatedMember = {
              ...member,
              foodRestrictions: e.target.value,
            };
            setCurrentValue(updatedMember);
            onChange(updatedMember);
          }}
          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      )}
    </div>
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
    <label className="text-center text-2xl my-2 px-4">
      {label}
      <textarea
        value={currentValue}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          onChange(e);
        }}
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
