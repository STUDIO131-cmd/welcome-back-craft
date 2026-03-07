## Plano de Implementação

### 1. Background da página

**Arquivo:** `src/index.css`

- Alterar `--background: 30 5% 90%` para `--background: 0 0% 32%` (equivalente HSL de #515151).

### 2. Reorganização da seção Portfolio

**Arquivo:** `src/pages/Index.tsx`

- Mover `CampaignsSection` para imediatamente após `PortfolioDivider`, sem seções entre eles.
- Ordem final: `HeroSection → PortfolioDivider → CampaignsSection → ClientsCarousel → GalleryScroll → ...`

**Arquivo:** `src/components/CampaignsSection.tsx`

- Remover o heading "Campanhas em Destaque" (o divider Portfolio já cumpre esse papel).
- Reduzir padding da section (`py-16` → `py-8`).

### 3. Ajuste visual dos botões

**Arquivo:** `src/components/CampaignsSection.tsx`

- Adicionar uma glass bar estática no atual texto Veja a galeria: `backdrop-blur-md bg-white/[0.08] border border-white/[0.15]`, com texto "VEJA A GALERIA" em caps lock e neon outer glow branco (`textShadow`).
- A bar fica posicionada ao centro do hover

### 4. Estrutura do pop-up

**Arquivo:** `src/components/CampaignsSection.tsx`

- Reestruturar o modal para exibir na ordem:
  1. Ícone circular centralizado (Lucide `Camera` dentro de um circle glass)
  2. Nome do álbum centralizado
  3. Descrição curta com `line-clamp-4`
  4. Galeria bento grid abaixo

### 5. Galeria bento grid no pop-up

**Arquivo:** `src/components/CampaignsSection.tsx`

- Alterar o tipo de dados da gallery para `{ src: string, type: 'image' | 'video', span?: string }[]`.
- Renderizar com CSS grid usando `grid-template-columns: repeat(4, 1fr)` e items com `col-span` e `row-span` variados para efeito bento.
- Imagens com `object-contain` para preservar proporção original.
- Vídeos renderizados com `<video>` (controls, muted).
- Suporte ilimitado de items por álbum.

### 6. Espaçamentos compactos

**Arquivos:** `HeroSection.tsx`, `GalleryScroll.tsx`, `ValueProposition.tsx`, `DifferentialsSection.tsx`, `CtaSection.tsx`, `ContactForm.tsx`

- Reduzir paddings verticais: `py-20` → `py-10`, `py-16` → `py-8`.
- Reduzir margins: `mb-16` → `mb-8`, `space-y-10` → `space-y-6`.
- Hero: `min-h-[70vh]` → `min-h-[55vh]`, `py-20` → `py-12`.

### Arquivos alterados (7 total)

`src/index.css`, `src/pages/Index.tsx`, `src/components/CampaignsSection.tsx`, `src/components/HeroSection.tsx`, `src/components/GalleryScroll.tsx`, `src/components/ValueProposition.tsx`, `src/components/DifferentialsSection.tsx`, `src/components/CtaSection.tsx`, `src/components/ContactForm.tsx`