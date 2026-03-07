

## Plano: Estilo liquid glass branco + texto #EAEAEA global

### 1. Cor de texto global → #EAEAEA
- Alterar as CSS variables em `src/index.css`:
  - `--foreground` para o equivalente HSL de `#EAEAEA` (~0 0% 92%)
  - `--muted-foreground` para algo como ~0 0% 70% (manter contraste relativo)
  - `--card-foreground`, `--popover-foreground` também atualizados
- Isso propaga automaticamente para todos os componentes que usam `text-foreground`, `text-muted-foreground`, etc.

### 2. Cards da galeria de campanhas → liquid glass branco 80%
- No `CampaignsSection.tsx`, alterar o fundo dos cards de campanha de `bg-[#EAEAEA]` para:
  - `backdrop-blur-xl bg-white/[0.12] border border-white/[0.15]` (liquid glass)
- Textos internos (título, descrição, subtítulo, tags) → todos `text-[#EAEAEA]` ou `text-white/80`
- Tags: fundo `bg-white/10 border-white/20 text-white/70`
- Título vermelho mantido mas com ajuste de legibilidade

### 3. Carrossel de clientes → barra liquid glass branca
- No `ClientsCarousel.tsx`, alterar o container envolvendo as fotos:
  - De gradiente atual para `backdrop-blur-xl bg-white/[0.12] border border-white/[0.15]`
  - Estilo consistente com os cards da galeria
- Texto do título → `text-[#EAEAEA]`

### 4. Ajustes complementares
- `ContactForm.tsx`: seção `bg-card` → trocar para liquid glass (`backdrop-blur-xl bg-white/[0.08]`), inputs e labels em `text-[#EAEAEA]`
- `ValueProposition.tsx`, `CtaSection.tsx`, `DifferentialsSection.tsx`: textos e botões adaptados para #EAEAEA
- `FooterSection.tsx`: texto atualizado
- Botões CTA: manter estilo mas garantir texto claro

### Arquivos editados
- `src/index.css` (CSS variables)
- `src/components/CampaignsSection.tsx`
- `src/components/ClientsCarousel.tsx`
- `src/components/ContactForm.tsx`
- `src/components/ValueProposition.tsx`
- `src/components/CtaSection.tsx`
- `src/components/DifferentialsSection.tsx`
- `src/components/HeroSection.tsx`
- `src/components/FooterSection.tsx`

