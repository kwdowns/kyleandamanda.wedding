import * as rsvpApi from "../../../../client/rsvp";
export const dynamic = "force-dynamic"; // so that this response isn't cached
export async function GET(
  request: Request,
  { params }: { params: { rsvpCode: string } },
) {
  const rsvpResponse = await rsvpApi.getRsvpInvite(params.rsvpCode);
  if (rsvpResponse) {
    console.log("rsvp found for code:", params.rsvpCode);
    return Response.json(rsvpResponse, { status: 200 });
  }
  console.log("no rsvp found for code:", params.rsvpCode);
  return Response.json(null, { status: 204 });
}

export async function PUT(
  request: Request,
  { params }: { params: { rsvpCode: string } },
) {
  console.log("updating rsvp");
  console.log(request);
  const requestBody = (await request.json()) as rsvpApi.UpdateRsvpRequestBody;
  if (requestBody) {
    await rsvpApi.updateRsvpInvite({
      rsvpCode: params.rsvpCode,
      body: requestBody,
    });
    return Response.json({}, { status: 200 });
  }
  return Response.json({ error: "Invalid request body" }, { status: 400 });
}
