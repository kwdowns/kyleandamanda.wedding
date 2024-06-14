# Kyle and Amanda's Wedding Website

This website will be a place to get information about the event and to share pictures with family easily.

It has (or will have) pages for:

- When & where the ceremony is
- Frequently asked questions
- Viewing engagement photos and photos from the wedding
  - Link to google drive folder with full resolution photos
- Travel details for guests coming from out of town as well as some things to do
- Provide links to registry information
- Allow submitting your RSVP online instead of mailing it in
- Save the ceremony as calendar event

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) is used to automatically optimize and load fonts.

[`react-photo-album`](https://github.com/igordanchenko/react-photo-album/) is used for the gallery page's photo layout

[`yet-another-react-lightbox`](https://github.com/igordanchenko/yet-another-react-lightbox) is used for the lightbox feature on the gallery page when viewing the site with a screen wide enough to support it.

## Deployment

This repository is linked to a hobby account on vercel. Commits to `master` will trigger a build and deploy.

### Gallery Images

Any image file placed in `public/gallery` will be available for viewing on the gallery page in the app. The `prebuild.js` file is responsible for creating the `src/data/exports.ts` file containing an array with all the gallery images. The prebuild script will run when running either `npm run dev` or `npm run build`.

## Next JS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
