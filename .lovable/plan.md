

## Plano: Editorial Adaptive Grid

### Problema atual
A galeria usa um grid fixo de 3 colunas com `colSpan` manual. Não detecta orientação das mídias, não adapta colunas ao viewport/quantidade, e a última linha pode ficar visualmente quebrada.

### Arquitetura proposta

Criar um novo componente `AdaptiveGallery` que substitui o `CuratedGrid` atual. A lógica será dividida em 3 etapas:

#### Etapa 1 — Classificação de mídias

Uma função `classifyMedia` que, para cada item da galeria, carrega as dimensões reais (via `Image()` para fotos, `<video>` para vídeos) e classifica:

- `landscape`: ratio > 1.15
- `portrait`: ratio < 0.85
- `square`: entre 0.85 e 1.15

O tipo `GalleryItem` será estendido:

```text
type ClassifiedItem = GalleryItem & {
  orientation: 'landscape' | 'portrait' | 'square'
  naturalWidth: number
  naturalHeight: number
}
```

A classificação acontece no `useEffect` do componente, com estado de loading enquanto as dimensões são detectadas.

#### Etapa 2 — Motor de layout (`buildGalleryLayout`)

Função pura que recebe os itens classificados e o número de colunas, e retorna um array de `LayoutItem[]` com `colSpan` calculado:

**Regras de colunas (desktop):**
- Até 3 itens → 2 colunas
- 4–6 itens → 3 colunas
- 7+ itens → 4 colunas
- Mobile: 1 coluna / Tablet: 2 colunas

**Regras de span:**
- `landscape` → `colSpan: 2` (ou full-width se estratégico)
- `portrait` / `square` → `colSpan: 1`
- Landscape no início ou fim → candidato a `full-width` (1 / -1)

**Regras de última linha:**
1. Se sobra 1 item → full-width
2. Se sobram 2 portraits → lado a lado (span 1 + 1, centralizados ou com span ajustado)
3. Se o último item é landscape → full-width
4. Se a combinação final não preenche a linha → redistribuir os últimos 2–3 itens expandindo spans

#### Etapa 3 — Renderização com CSS Grid

```text
.adaptive-gallery {
  display: grid;
  gap: 8px;  /* gap compacto */
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
}
```

Cada item renderiza com `grid-column: span X` dinâmico. Imagens e vídeos usam `width: 100%; height: auto` para respeitar proporção natural (sem crop).

### Mudanças no tipo `GalleryItem`

O campo `colSpan` manual existente será **ignorado** pelo novo componente — o layout é calculado automaticamente. Isso significa zero breaking changes nos dados das campanhas. O `colSpan` antigo fica como fallback se necessário.

### Componentes afetados

| Arquivo | Mudança |
|---|---|
| `src/components/AdaptiveGallery.tsx` | **Novo** — componente com classificação, layout engine e renderização |
| `src/components/CampaignsSection.tsx` | Substituir `<CuratedGrid>` por `<AdaptiveGallery>` no popup. Remover o componente `CuratedGrid` inline |

### Responsividade

O componente usa um `ref` + `ResizeObserver` (ou media queries via Tailwind) para determinar breakpoints:
- `< 640px` → 1 coluna
- `640–1024px` → 2 colunas
- `> 1024px` → regra dinâmica (2–4 baseado na quantidade)

### Detalhes técnicos

- Detecção de dimensões é assíncrona — skeleton/placeholder enquanto carrega
- Vídeos: dimensões detectadas via `loadedmetadata` event
- A ordem original é preservada, exceto quando reorganizar os últimos 2–3 itens melhora o fechamento
- O `VideoPlayer` existente é reutilizado sem alteração
- Gap de 8px (compacto, editorial)

