

## Plan: Cards Section Redesign + Contact Form Overhaul

### A — Cards Section (DifferentialsSection + CtaSection)

**Files:** `DifferentialsSection.tsx`, `CtaSection.tsx`

1. **DifferentialsSection.tsx** — full rewrite:
   - Title → "Como funciona na prática:"
   - Remove subtitle "2 min | Assista a este conteúdo"
   - Remove CRM card (index 0), keep 3 remaining cards with updated content for card 3 (studio)
   - Layout: single column (`flex flex-col`), one card per row, full width, centered (`max-w-3xl mx-auto`)
   - Card style: `bg-black` background, white text, rounded corners
   - Images: `object-contain` with natural aspect ratio (no cropping, no fixed height)

2. **CtaSection.tsx** — rewrite:
   - Remove the "Nossa régua é simples..." paragraph entirely
   - Replace button with liquid glass style: `backdrop-blur-xl bg-white/[0.08] border border-white/[0.15]`
   - Label: "QUERO AVALIAR UMA CAMPANHA"
   - `href="#orcamento"` for smooth scroll to contact form

### B — Contact Form

**File:** `ContactForm.tsx`

Requires email sending, which needs **Lovable Cloud** enabled + a transactional email edge function.

1. **Form state** — replace all fields with new schema:
   - `firstName`, `lastName` (required), `company` (optional), `whatsapp` (required), `instagram` (required), `revenue` (required radio), `timing` (required radio), `campaignDate` (optional text), `hasIdea` (required radio Sim/Não), `ideaDescription` (conditional textarea, required if hasIdea=Sim)

2. **Remove** fields: `isTargetArea`, `niche`, `hasTeam` and the "Limitamos a 10 clientes..." text

3. **Conditional field**: when `hasIdea === "Sim"`, show textarea "Descreva brevemente sua ideia sobre a campanha:"

4. **On submit**: send email via edge function to `igorgagliardi@studio131.com.br` with subject "Nova Entrada STUDIO 131: Campanhas". Show success dialog/toast with the specified message.

5. **Email infrastructure**: will need to enable Lovable Cloud and scaffold a transactional email edge function.

### Technical Notes

- The email sending requires Lovable Cloud to be enabled first, then a `send-campaign-inquiry` edge function will be created
- The success popup will use a dialog or sonner toast
- All existing responsive patterns (py-12/py-20, max-w-full buttons) will be maintained

