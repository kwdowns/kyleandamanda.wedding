import * as rsvpApi from "../../../client/rsvp";
import { SubmitRsvpRequestBody } from "../../../client/rsvp";

export async function POST(request: Request) {
  const requestBody = (await request.json()) as SubmitRsvpRequestBody;
  // is body of type SubmitRsvpRequest?
  if (requestBody) {
    const rsvpCode = await rsvpApi.submitRsvpInvite({ body: requestBody });
    return Response.json({ rsvpCode }, { status: 200 });
  }

  return Response.json({ error: "Invalid request body" }, { status: 400 });
}
