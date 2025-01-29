import { Metadata } from "next";
import RSVPView from "./page.view";

export const metadata: Metadata = {
  title: "RSVP | Kyle and Amanda",
};

export default function RSVP() {
  return (
    <RSVPView
      partySize={0}
      attendingStatus={"AwaitingResponse"}
      members={[]}
      comments={""}
      partyCode={null}
    />
  );
}
