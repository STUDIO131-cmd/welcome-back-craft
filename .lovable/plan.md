

## Plan: Blur edges + faster scroll on clients carousel

### Changes to `src/components/ClientsCarousel.tsx`

1. **Add gradient blur masks** on left and right edges of the carousel container using CSS `mask-image` with a linear gradient (transparent → black → black → transparent), creating a fade-out effect on both sides.

2. **Increase scroll speed** — reduce the animation duration in `src/index.css` for `animate-scroll-right` from `25s` to ~`18s`.

### Implementation details

- On the `section-container overflow-hidden` div, add inline style:
  ```
  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
  ```
- In `src/index.css`, change `.animate-scroll-right` duration from `25s` to `18s`.

Two files edited: `ClientsCarousel.tsx` and `index.css`.

