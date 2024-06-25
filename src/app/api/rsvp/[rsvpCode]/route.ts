import * as rsvpApi from "../../../../client/rsvp";
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
