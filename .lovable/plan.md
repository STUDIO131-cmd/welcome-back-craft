

## Plan: Two-row infinite scroll carousel

### Changes to `src/components/ClientsCarousel.tsx`

1. **Increase icon sizes by 14px**: `w-[117px] h-[117px]`, `md:w-[153px] md:h-[153px]`, `lg:w-[165px] lg:h-[165px]`
2. **Split into two rows** scrolling in the same direction (right), using `animate-scroll-right` for both
3. **Reduce spacing** between rows: use `gap-2` or small margin between rows
4. **Wrap both rows** in a `section-container` (`max-w-5xl mx-auto px-6`) with `overflow-hidden` to constrain width to match the campaigns section
5. Split clients array: row 1 = first 5, row 2 = last 5, each duplicated for infinite loop

### Structure
```text
<section className="py-16">
  <section-divider />
  <h2>...</h2>
  <div className="section-container overflow-hidden">
    <div className="flex flex-col gap-2">
      <!-- Row 1: clients[0..4] duplicated, animate-scroll-right -->
      <!-- Row 2: clients[5..9] duplicated, animate-scroll-right -->
    </div>
  </div>
  <section-divider />
</section>
```

No other files need changes — `animate-scroll-right` already exists in `index.css`.

