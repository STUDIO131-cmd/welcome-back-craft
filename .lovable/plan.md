

## Objetivo

Apenas no **mobile e tablet** (<1024px), reorganizar a galeria Cimples para que:
- **L5 = tríade fotográfica** `[cImg5, cImg6, cImg7]`
- **L6 = fechamento full-width** `[cImg8]`
- **L4 = tríade** `[cImg4, cVid4, cVid5]` (acomoda o cVid5 deslocado)
- L1–L3: pares como hoje no mobile auto

Desktop (≥1024px) permanece com o engine editorial automático intacto.

## Layout final mobile/tablet (Cimples)

```text
L1: [cVid1, cImg1]                  ← par
L2: [cImg2, cVid2]                  ← par
L3: [cVid3, cImg3]                  ← par
L4: [cImg4, cVid4, cVid5]           ← TRÍADE (foto + 2 vídeos)
L5: [cImg5, cImg6, cImg7]           ← TRÍADE fotográfica (objetivo)
L6: [cImg8]                         ← full-width final (objetivo)
```

Total: 6 linhas no mobile/tablet (atualmente são 7 com pares forçados).

## Mudanças técnicas

### 1. `src/components/AdaptiveGallery.tsx`

Tornar `manualLayout` viewport-aware. Aceitar duas formas:

```ts
manualLayout?: ManualRow[] | { mobile?: ManualRow[]; tablet?: ManualRow[]; desktop?: ManualRow[] }
```

No componente, resolver qual conjunto usar conforme `viewport`:
- Se for `ManualRow[]` simples → usa em todos os breakpoints (compatível com Pink Friday atual).
- Se for objeto → escolhe `mobile`/`tablet`/`desktop`. Se o breakpoint atual não tiver layout definido, cai no engine automático.

Também: como o `manualLayout` fará override pré-chunking, a função `chunkRow` continua dividindo no mobile, mas se a linha já estiver dentro do limite (≤2 mobile, ≤3 tablet) ela passa intacta. **Importante**: vamos permitir tríades no mobile via manualLayout — para isso, quando `isManual` for `true`, **pular o `chunkRow`** (a linha manual é literal, não é dividida).

### 2. `src/components/CampaignsSection.tsx`

Adicionar `manualLayout` à campanha Cimples (linhas 152-175):

```ts
manualLayout: {
  mobile: [
    { indices: [0, 1] },
    { indices: [2, 3] },
    { indices: [4, 5] },
    { indices: [6, 7, 8] },
    { indices: [9, 10, 11] },
    { indices: [12] },
  ],
  tablet: [
    { indices: [0, 1] },
    { indices: [2, 3] },
    { indices: [4, 5] },
    { indices: [6, 7, 8] },
    { indices: [9, 10, 11] },
    { indices: [12] },
  ],
  // desktop: undefined → mantém engine automático
},
```

Pink Friday continua usando o formato antigo (`ManualRow[]` direto) — compatibilidade preservada.

### 3. Tipo da prop `manualLayout` na campanha

Atualizar a interface no array `campaigns` para aceitar a forma estendida.

## Resultado esperado

- **Mobile (390px)** e **tablet (768px)**: L4 e L5 viram tríades; L6 fecha com cImg8 full-width. Visual mais editorial, menos repetitivo.
- **Desktop (≥1024px)**: nenhum impacto — engine automático continua decidindo.
- **Pink Friday e demais campanhas**: nenhuma regressão.

