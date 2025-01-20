import * as rsvpApi from "../../../client/rsvp";
import RsvpForm from "../page.view";
import * as RSVP from "../../rsvp/page";

export default async function Page({
  params,
}: {
  params: { rsvpCode: string };
}) {
  try {
    const rsvp = await rsvpApi.getParty(params.rsvpCode);
    if (rsvp) {
      return (
        <>
          <RsvpForm
            partyCode={rsvp.partyCode}
            attendingStatus={rsvp.attendingStatus}
            members={rsvp.members}
            comments={rsvp.comments}
            partySize={rsvp.partySize}
          />
        </>
      );
    } else {
      return <RSVP.default />;
    }
  } catch (e) {
    console.error(e);
    return <RSVP.default />;
  }
}
