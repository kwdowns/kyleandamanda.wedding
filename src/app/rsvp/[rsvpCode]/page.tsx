"use server";
import { useSearchParams } from 'next/navigation';
import * as rsvpApi from '../../client/rsvp'
import RsvpForm from '../page.view'

export default async function RsvpCode() {
    const router = useSearchParams();
    const rsvpCode = router.get("rsvpCode");
    console.log(router);
    if(rsvpCode){
        console.log('found rsvp code')
        const rsvp = await rsvpApi.getRsvpInvite(rsvpCode as string)
        if(rsvp){
            return(
                <>
                <p>{rsvpCode}</p>
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
            )
        }
    }
}