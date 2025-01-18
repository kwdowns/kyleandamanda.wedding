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
export type RsvpInviteModel = {
  id: string;
  guestName: string;
  attendingStatus: AttendingStatus;
  inviteCount: number;
  additionalGuestNames: string[];
  foodPreference: string;
  comments: string;
};
export type SubmitRsvpRequestBody = {
  guestName: string;
  attending: boolean;
  inviteCount: number;
  additionalGuestNames: string[];
  foodPreference: string;
  comments: string;
};

export type SubmitRsvpResponseBody = {
  rsvpCode: string;
};

export type UpdateRsvpRequestBody = SubmitRsvpRequestBody;

export type UpdateRsvpRequest = {
  rsvpCode: string;
  body: UpdateRsvpRequestBody;
};

export type SubmitRsvpRequest = { body: SubmitRsvpRequestBody };

export async function getRsvpInvite(
  rsvpCode: string,
): Promise<RsvpInviteModel | null> {
  const response = await fetch(`${apiBaseUrl}/rsvp/${rsvpCode}`, {
    headers:{
      ...(apiKey ? { [apiKeyHeader]: apiKey } : {}),
    }
  });
  console.log(response);
  if (response.status == 204) {
    return null;
  } else if (response.status != 200) {
    console.warn(`Failed to fetch RSVP invite: ${response.statusText}`);
    return null;
  }

  const rsvpModel: RsvpInviteModel = (await response.json()) as RsvpInviteModel;
  return rsvpModel;
}

export async function submitRsvpInvite(
  request: SubmitRsvpRequest,
): Promise<string> {
  const response = await fetch(`${apiBaseUrl}/rsvp`, {
    body: JSON.stringify(request.body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { [apiKeyHeader]: apiKey } : {}),
    },
  });
  console.log(response);
  if (response.status != 200) {
    throw new Error(`Failed to submit RSVP: ${response.statusText}`);
  }

  const responseBody: SubmitRsvpResponseBody = await response.json();

  return responseBody.rsvpCode;
}

export async function updateRsvpInvite(
  request: UpdateRsvpRequest,
): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/rsvp/${request.rsvpCode}`, {
    body: JSON.stringify(request.body),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { [apiKeyHeader]: apiKey } : {}),
    },
  });
  console.log(response);
  if (response.status != 200) {
    throw new Error(`Failed to update RSVP: ${response.statusText}`);
  }
}
