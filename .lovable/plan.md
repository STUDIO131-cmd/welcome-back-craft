

## Plano de Ajustes Visuais

### 1. Header — texto branco
**Arquivo:** `src/components/HeroSection.tsx`
- Alterar `text-foreground/80` do parágrafo para `text-white/80` (linha 32).

### 2. Barra Portfolio — fundo #EAEAEA, texto #4A4375
**Arquivo:** `src/components/PortfolioDivider.tsx`
- Substituir `backdrop-blur-xl bg-white/10 border-y border-white/20 shadow-[...]` por `bg-[#EAEAEA]` (remover blur/border/shadow glass).
- Alterar cor do texto de `text-white/90` para `text-[#4A4375]`.
- Remover o `textShadow` neon (não faz sentido em fundo claro).

### 3. Botões de campanha — fundo #EAEAEA, título vermelho com glow
**Arquivo:** `src/components/CampaignsSection.tsx`
- Substituir o fundo glass dos cards (`backdrop-blur-xl bg-white/[0.07] border border-white/[0.15] shadow-[...]`) por `bg-[#EAEAEA]`.
- Alterar o título `h3` de `text-foreground/90` para `text-[#C73C32]` com um `textShadow` sutil vermelho (ex: `0 0 8px rgba(199,60,50,0.4)`).
- Ajustar subtitle/description/tags para cores que contrastem com o fundo claro (ex: `text-gray-600`, `text-gray-500`).

### 4. Seção "Algumas marcas" — liquid bar full-width
**Arquivo:** `src/components/ClientsCarousel.tsx`
- Envolver a seção inteira em uma `div` full-width (`w-full`) com estilo liquid glass: gradiente sutil, `backdrop-blur-xl`, border top/bottom translúcido, e um `box-shadow` difuso para efeito de brilho.
- Remover os `section-divider` atuais.
- O container de conteúdo interno continua com `section-container` para manter alinhamento, mas o fundo da bar extrapola para toda a largura.
- Texto do heading em branco para contraste com a bar translúcida.

### Arquivos alterados (4)
`HeroSection.tsx`, `PortfolioDivider.tsx`, `CampaignsSection.tsx`, `ClientsCarousel.tsx`

