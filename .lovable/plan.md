

## Plan

The `ValueProposition` component contains only the "Vídeo 2 min | Entenda o Plano na Prática" button and is otherwise empty. It should be removed entirely.

### Changes

1. **Delete `src/components/ValueProposition.tsx`** — the component is now empty content besides the unwanted button.

2. **Update `src/pages/Index.tsx`** — remove the `ValueProposition` import and its usage from the page layout. The section order becomes:
   ```
   HeroSection
   CampaignsSection
   CampaignCTA
   BastidoresSection
   ClientsCarousel
   DifferentialsSection
   CtaSection
   ContactForm
   FooterSection
   ```

All sections already use the standardized `py-12 sm:py-16 md:py-20` spacing from the previous update, so no further spacing adjustments are needed.

