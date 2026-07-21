# Annie Fei — Portfolio Archive

A local-first portfolio presented as a fixed, tactile A4 ring binder. It is not connected to GitHub or a publishing target.

## Edit content

All editable text, projects, experience, education, skills, archive entries, experiments, and contact details live in `app/content.ts`. Replace the bracketed placeholders while keeping the field names.

## Add images later

Portfolio image areas currently render as labelled empty slots. When your images are ready, place them in `public/images/` and replace the matching `ImageSlot` in `app/components/PortfolioExperience.tsx` with an image using your new path. The project dialog has a separate empty project-image slot.

The photographed binder hardware lives at `public/assets/binder-ring-reference.png`. Keep that asset unless you want to change the ring mechanism itself.

The separate closed-cover sticker is `public/assets/cover-ring-sticker.png`. It is intentionally positioned partly outside the cover and is not used on interior spreads.

The collage spread reads the same `src` field from `app/content.ts` in both places: the small sticker on the spread and the enlarged project dialog. Add or replace the path once; do not duplicate the image.

## Typography

Only two font families are used: Milker for titles and Inter for every other word. Milker is free for personal use; obtain a commercial licence before publishing a commercial portfolio.

## Main files

- `app/content.ts` — editable content
- `app/components/PortfolioExperience.tsx` — binder spreads, page turns, image slots
- `app/components/ProjectDialog.tsx` — project details
- `app/components/ProjectMedia.tsx` — shared image/placeholder renderer used by collage cards and dialogs
- `app/components/LampRig.tsx` — lamp
- `app/globals.css` — A4 sizing, materials, typography, responsive behavior
