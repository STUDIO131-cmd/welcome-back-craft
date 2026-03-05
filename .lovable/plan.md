

## Plan: Static grid layout for clients section

**Goal:** Remove the scrolling animation from `ClientsCarousel` and display the 10 client logos in a static grid (2-3 rows) constrained to the same `max-w-5xl` width used by other sections (like CampaignsSection).

**Changes:**

### `src/components/ClientsCarousel.tsx`
- Remove the `overflow-hidden`, `animate-scroll-left`, `width: max-content`, and logo duplication (`[...clients, ...clients]`)
- Wrap content in `section-container` (which applies `max-w-5xl mx-auto px-6`)
- Use a `flex flex-wrap justify-center gap-6` layout so logos naturally wrap into 2-3 rows depending on screen size
- Keep grayscale hover effect and rounded-full styling
- Slightly reduce logo sizes to fit ~5 per row on desktop (e.g. `w-32 h-32 md:w-36 md:h-36`)

No other files need changes.

