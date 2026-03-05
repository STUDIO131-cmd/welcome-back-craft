

## Plan: Two-row clients carousel with opposite scroll directions

**What changes:**
Edit `src/components/ClientsCarousel.tsx` to render two rows of client logos:
- **Row 1**: Scrolls left-to-right, larger images (~w-44 h-44 on desktop)
- **Row 2**: Scrolls right-to-left, smaller images (~w-28 h-28 on desktop)

Split the 10 client images into two groups (5 each), duplicate each for infinite scroll effect.

**Tailwind animation changes in `src/index.css` or `tailwind.config.ts`:**
- Keep existing `scroll-left` animation
- Add a `scroll-right` animation (same keyframes but reversed direction)

**Structure:**
```text
<section>
  <h2>Algumas marcas que já atendemos:</h2>
  <div class="overflow-hidden">  <!-- Row 1: large, scroll left -->
    <div class="flex animate-scroll-left">
      {largeDuplicatedLogos}
    </div>
  </div>
  <div class="overflow-hidden mt-6">  <!-- Row 2: small, scroll right -->
    <div class="flex animate-scroll-right">
      {smallDuplicatedLogos}
    </div>
  </div>
</section>
```

Files to edit:
1. **`tailwind.config.ts`** — Add `scroll-right` keyframes and animation (reverse of scroll-left)
2. **`src/components/ClientsCarousel.tsx`** — Two rows, split clients, different sizes, opposite animations

