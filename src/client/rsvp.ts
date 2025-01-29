'use server';

const apiBaseUrl = process.env.WEDDING_API_BASE_URL;
const apiKey = process.env.WEDDING_API_KEY;
const apiKeyHeader = "X-API-KEY";

if(!apiBaseUrl) {
  throw new Error("WEDDING_API_BASE_URL is not defined");
}

if(!apiKey) {
  throw new Error("WEDDING_API_KEY is not defined");
}

export type AttendingStatus = "AwaitingResponse" | "Declined" | "Attending";
export type Party = {
  partyCode: string;
  attendingStatus: AttendingStatus;
  partySize: number;
  comments: string | null;
  members: PartyMember[];
}
export type PartyMember = {
  firstName: string | null;
  lastName: string | null;
  foodRestrictions: string | null;
}
export type UpdatePartyRequestBody = {
  attending: boolean;
  comments: string | null;
  partyMembers: PartyMember[];
}

export type UpdatePartyRequest = {
  rsvpCode: string;
  body: UpdatePartyRequestBody;
};

export async function getParty(
  rsvpCode: string,
): Promise<Party | null> {
  const response = await fetch(`${apiBaseUrl}/rsvp/${rsvpCode}`, {
    headers:{
      ...(apiKey ? { [apiKeyHeader]: apiKey } : {}),
    }
  });
  if (response.status == 204 || response.status == 404) {
    console.log('unable to find party', rsvpCode);
    return null;
  } else if (response.status != 200) {
    console.warn(`Failed to fetch RSVP invite: ${response.statusText}`);
    return null;
  }

  const party: Party = (await response.json()) as Party;
  console.log('found party', rsvpCode);
  return party;
}

export async function updateParty(
  request: UpdatePartyRequest,
): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/rsvp/${request.rsvpCode}`, {
    body: JSON.stringify(request.body),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { [apiKeyHeader]: apiKey } : {}),
    },
  });
  if (!response.ok) {
    if(response.status == 400)
    {
      const error = await response.json();
      throw new Error(`Failed to update RSVP: ${error.message}`);
    }
    throw new Error(`Failed to update RSVP: ${response.statusText}`);
  }
  console.log('updated party', request.rsvpCode)
}
