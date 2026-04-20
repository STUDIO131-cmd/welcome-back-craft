

## Diagnóstico — galerias com solo no mobile/tablet

| Galeria | Causa do solo | Item solo |
|---|---|---|
| **Pink Friday** | manualLayout cobre só 12 de 13 índices (0-11); índice 12 (`pfImg9`) fica órfão | pfImg9 — última linha |
| **AuraMia** | 9 itens em auto → mobile faz 4 pares + 1 solo | aImg4 (último) |
| **Nova Trida** | 5 itens em auto → mobile faz 2 pares + 1 solo | ntVid3 (último) |
| **Cravates** | manual L2 declarado como `[2]` solo intencional | crImg3 |

Demais galerias (Cimples, Dani Natal, TNG, Etoiles, La Vie, Velvet Cherry, Adriano) já estão sem solos no mobile/tablet.

## Solução

**Comportamento desejado**: solo permanece em linha própria, mas com largura **~60% do container**, centralizado horizontalmente. Aplicar **somente** em mobile e tablet (<1024px). Desktop intacto.

### 1. `AdaptiveGallery.tsx` — render de linha solo no mobile/tablet

Quando `viewport !== "desktop"` e a sub-row tem 1 único item, embrulhar/centralizar:

```tsx
const isSoloRowMobile = subItemCount === 1 && viewport !== "desktop";

// No <div> da grid:
style={{
  display: "grid",
  gridTemplateColumns: isSoloRowMobile ? "60% " : sub.fractions.map(...).join(" "),
  justifyContent: isSoloRowMobile ? "center" : undefined,
  gap: "8px",
  ...
}}
```

Funciona para solos automáticos (auto engine) e manuais (`indices: [N]`).

### 2. `CampaignsSection.tsx` — Pink Friday

Adicionar a linha faltante ao `manualLayout` para garantir que `pfImg9` (índice 12) entre na galeria como solo:

```ts
manualLayout: [
  { indices: [0, 1] },
  { indices: [2, 3] },
  { indices: [4, 5] },
  { indices: [6, 7] },
  { indices: [8, 9] },
  { indices: [10, 11] },
  { indices: [12] },        // L7: pfImg9 solo (será centralizado pela regra global)
],
```

### 3. AuraMia e Nova Trida — converter de auto para manual viewport-aware

Adicionar `manualLayout` apenas para mobile/tablet (desktop continua usando o engine):

**AuraMia** (9 itens):
```ts
manualLayout: {
  mobile: [
    { indices: [0, 1] }, { indices: [2, 3] },
    { indices: [4, 5] }, { indices: [6, 7] },
    { indices: [8] },     // solo centralizado
  ],
  tablet: [ /* mesmo */ ],
}
```

**Nova Trida** (5 itens):
```ts
manualLayout: {
  mobile: [
    { indices: [0, 1] }, { indices: [2, 3] },
    { indices: [4] },     // solo centralizado
  ],
  tablet: [ /* mesmo */ ],
}
```

### 4. Cravates

Já tem L2 solo (`{ indices: [2] }`) — herda automaticamente o novo comportamento de centralização global. Nenhuma mudança no array.

## Resultado

- **Mobile (390px) / tablet (768px)**: todo solo (Pink Friday L7, AuraMia L5, Nova Trida L3, Cravates L2) renderiza a ~60% da largura, centralizado, com respiro lateral.
- **Desktop (≥1024px)**: zero impacto — engine automático segue intacto e Cravates manual mantém comportamento atual (sem viewport split).
- Nenhuma regressão nas galerias já corrigidas.

