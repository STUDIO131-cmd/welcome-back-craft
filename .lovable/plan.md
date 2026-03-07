

## Plan: Add TNG Gallery Files

### Files to create
Move the 8 uploaded files to `src/assets/campaigns/tng/`:
- `TNG-Campaing01.mp4`, `TNG-Campaing03.mp4`, `TNG-01.mp4` (3 videos)
- `5D4A5594.jpg`, `5D4A5611.jpg`, `5D4A5623.jpg`, `5D4A5613_1.jpg`, `5D4A6454.jpg` (5 images)

### Gallery order (2-column masonry, idx % 2)

The layout distributes items by index: even indexes go to **Column 0 (left)**, odd indexes go to **Column 1 (right)**.

With your requested pattern **Video-Foto / Foto-Video / Video-Foto**, the array order and resulting columns:

```text
Index  | Type  | Column
-------|-------|-------
0      | Video | Left    ← TNG-Campaing01.mp4
1      | Image | Right   ← 5D4A5594.jpg
2      | Image | Left    ← 5D4A5611.jpg
3      | Video | Right   ← TNG-Campaing03.mp4
4      | Video | Left    ← TNG-01.mp4
5      | Image | Right   ← 5D4A5623.jpg
6      | Image | Left    ← 5D4A5613_1.jpg (spare)
7      | Image | Right   ← 5D4A6454.jpg (spare)
```

Visual result per row:
```text
Left (Col 0)       | Right (Col 1)
--------------------|--------------------
Video (Campaing01)  | Foto (5594)
Foto (5611)         | Video (Campaing03)
Video (TNG-01)      | Foto (5623)
Foto (5613_1)       | Foto (6454)
```

### Changes to `CampaignsSection.tsx`
1. Add 8 new imports for the TNG assets
2. Replace the TNG campaign gallery array (currently just `daniGallery`) with the 8-item array above

No other files or logic changes needed — the existing 2-column masonry and VideoPlayer component handle everything.

