import * as rsvpApi from "../../../client/rsvp";
import RsvpForm from "../page.view";
import * as RSVP from "../../rsvp/page";

export default async function Page({
  params,
}: {
  params: { rsvpCode: string };
}) {
  const rsvp = await rsvpApi.getRsvpInvite(params.rsvpCode);
  if (rsvp) {
    return (
      <>
        <RsvpForm
          inviteId={rsvp.id}
          name={rsvp.guestName}
          attendingStatus={rsvp.attendingStatus}
          foodPreference={rsvp.foodPreference}
          guests={rsvp.additionalGuestNames}
          comments={rsvp.comments}
          inviteCount={rsvp.inviteCount}
        />
      </>
    );
  } else {
    return <RSVP.default />;
  }
}
