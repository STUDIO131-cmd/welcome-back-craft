

## Problema

O layout manual da Cravates tem gaps porque cada item recebe um `aspectRatio` individual baseado no seu ratio real, mas `gridAutoRows: 1fr` força todos os itens da mesma linha a terem a mesma altura. Como os ratios são diferentes (ex: vídeo landscape + foto portrait), o item mais baixo fica com espaço vazio.

## Solução

Mudar a estratégia: em vez de `aspectRatio` por item, calcular um **aspect-ratio único por linha** (no container da row). Os itens simplesmente preenchem a célula com `object-cover`.

### Cálculo do aspect-ratio da linha

Para uma row com fractions `[f0, f1]` e items com ratios `[r0, r1]`:
- Altura natural de cada item (normalizada): `h_i = f_i / r_i`
- Altura da row = `min(h_i)` (usa a menor para evitar gaps, croppando levemente o outro)
- Aspect-ratio da row = `sum(fractions) / (min(h_i) * sum(fractions))` = `1 / min(f_i/r_i)`

Para rows com 1 item: aspect-ratio = ratio do item (já funciona).

### Mudanças em `AdaptiveGallery.tsx`

1. **Remover** `aspectRatio: item.ratio` dos containers individuais (linha ~570)
2. **Remover** `gridAutoRows: "1fr"` condicional (linhas ~559-563)
3. **Adicionar** aspect-ratio calculado no container da row para multi-item manual rows
4. Itens usam `w-full h-full object-cover` para preencher sem gaps

### Mudanças em `CampaignsSection.tsx`

- Corrigir bug: linha 5 usa `indices: [6, 3]` mas index 3 já é usado na linha 3. Trocar para outro índice válido ou remover a duplicata.

