

## Problem

The screenshot shows the video in Row 1 has black bars (letterboxing) because the `VideoPlayer` component uses `object-contain`, which preserves the video's native aspect ratio but leaves empty space. The user also wants Row 1 (video + photo) to be larger and more prominent.

## Plan

### 1. Fix video black bars — `src/components/AdaptiveGallery.tsx`

In the `VideoPlayer` component, change `object-contain` to `object-cover` on both the `<video>` element and the poster `<img>`. This will crop to fill the container, eliminating bars.

- Line ~458: `object-contain` → `object-cover` (poster img)
- Line ~462: `object-contain` → `object-cover` (video element)

### 2. Make Row 1 taller — `src/components/AdaptiveGallery.tsx`

Add a `rowHeight` option to `ManualRow` type, or simply set a `minHeight` on the first row. The simplest approach: allow `ManualRow` to accept an optional `height` (CSS value like `"500px"`) that gets applied to the grid row.

### 3. Update Cravates layout — `src/components/CampaignsSection.tsx`

Set a height on Row 1 (e.g., `height: "500px"`) to make the video and photo more prominent.

**Two files changed**: `AdaptiveGallery.tsx` (object-cover + optional row height support), `CampaignsSection.tsx` (row height on L1).

