

## Remover foto solo da Pink Friday (pfImg9)

### Mudança

Em `src/components/CampaignsSection.tsx`, na campanha **Pink Friday**:

1. Remover o `import` de `pfImg9`.
2. Remover `pfImg9` do array `assets` da campanha.
3. Remover a linha `{ indices: [12] }` do `manualLayout` (a linha solo deixa de existir).

### Resultado

- Pink Friday passa a ter 12 assets (em vez de 13), distribuídos em 6 pares perfeitos no mobile/tablet/desktop.
- Sem solo, sem linha órfã.
- Demais galerias intactas.

