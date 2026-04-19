

## Mudanças

### 1. Reduzir capa das campanhas em 50% (`CampaignsSection.tsx`)

Linhas 441 e 447 — alturas mínimas atuais: `min-h-[280px] md:min-h-[420px]`.

Reduzir para metade:
- Mobile: `280px` → `140px`
- Desktop: `420px` → `210px`

Como o card empilha imagem + texto e o texto vem logo abaixo, ele "acompanha" naturalmente — descrição sobe junto com o encolhimento da imagem. Sem outras alterações no bloco de texto (padding, tipografia, tags permanecem).

### 2. Aumentar opacidade do glass bar em 40% (`HeroSection.tsx`)

A "glass bar" é o pill com texto "Lançamentos, Coleções & Datas Estratégicas" (linha 36 do HeroSection):
- Atual: `bg-white/10` (10% opacidade)
- Novo: `bg-white/14` → arredondando para o token Tailwind mais próximo: **`bg-white/15`** (aumento de ~40% relativo: 10 × 1.4 = 14)

Borda permanece `border-white/20` para manter o contorno cristalino.

## Arquivos editados
- `src/components/CampaignsSection.tsx` — linhas 441, 447 (min-h reduzidos)
- `src/components/HeroSection.tsx` — linha 36 (`bg-white/10` → `bg-white/15`)

Sem impacto em: lightbox, modal, lazy loading, layout do card, tipografia.

