import { flag } from 'flags/next';
import { wedding } from './constants/wedding';
export const rsvpFlag = flag({
    key: 'rsvp',
    defaultValue: false,
    description: 'Enable RSVP functionality',
    decide: () => {
        return getDaysUntil() > 25;
    }
})

export const travelFlag = flag({
    key: 'travel',
    defaultValue: false,
    description: 'Enable travel information',
    decide: () => {
        return getDaysUntil() >= -5;
    }
})

function getDaysUntil() {
  const weddingDate = new Date(wedding.date);
  weddingDate.setHours(0, 0, 0, 0); // Set the time to midnight
  let now = new Date(Date.now());
  now.setHours(0, 0, 0, 0);
  const days = Math.ceil(
    (weddingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return days;
}
