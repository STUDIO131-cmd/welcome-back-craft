

## Plan: Liquid Glass Carousel Redesign

### Changes to `src/components/ClientsCarousel.tsx`

1. **Remove solid white background with radial mask** (lines 41-49) — delete entirely

2. **Remove horizontal fade mask** from the carousel container (lines 53-56)

3. **Wrap carousel content in a liquid glass bar** — apply the project's existing "white liquid glass" style:
   - `backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl`
   - Add horizontal padding (`px-6 md:px-10`) for floating effect (icons don't touch edges)
   - Add vertical padding (`py-6`) to breathe around the circular icons

4. **Remove grayscale filter** — change `grayscale hover:grayscale-0` to just keep images colorful (remove both classes from line 23)

5. **Keep** the infinite scroll animation and existing icon sizes unchanged

### Result
- Glass bar with blur/translucency wraps the two rows of circular client logos
- Lateral padding creates the floating effect inside the glass container
- All logos display in full color permanently

