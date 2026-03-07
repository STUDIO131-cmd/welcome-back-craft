

## Plan: Add purple gradient fade to HeroSection

Add a bottom-to-top gradient overlay on the HeroSection using color `#4a4375`, going from solid at the bottom to transparent at the top.

### Changes to `src/components/HeroSection.tsx`

Add a `div` with absolute positioning covering the full section, using a CSS gradient:
- `background: linear-gradient(to top, #4a4375, transparent)`
- Position the section as `relative` and the gradient div as `absolute inset-0`
- Add `pointer-events-none` so it doesn't block interactions
- Ensure content stays above with `relative z-10`

