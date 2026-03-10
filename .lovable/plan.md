

## Problema

A linha 1 da Cravates tem `height: "500px"` fixo, o que força o vídeo e a foto a esticarem além da proporção natural, gerando espaçamento/crop excessivo. O `aspect-ratio` calculado nos containers individuais também não reflete a proporção real das mídias.

## Solução

Remover o `height` fixo e, em vez disso, usar a proporção natural das mídias para calcular a altura da linha automaticamente. A abordagem: quando uma linha manual tem múltiplos itens, cada item recebe um `aspect-ratio` baseado no seu ratio real (detectado), e a linha usa apenas `gridAutoRows: 1fr` para que todos fiquem com a mesma altura — determinada naturalmente pelas proporções.

### Mudanças

**1. `src/components/CampaignsSection.tsx`**
- Remover `height: "500px"` da linha 1 do Cravates.

**2. `src/components/AdaptiveGallery.tsx`**
- Corrigir o cálculo do `aspect-ratio` dos containers individuais em modo manual: em vez da fórmula atual (que mistura frações), usar o ratio real de cada item (`item.ratio`). Isso garante que cada item mantenha sua proporção natural.
- Manter `gridAutoRows: "1fr"` para linhas com múltiplos itens, fazendo todos terem a mesma altura (a altura será determinada pelo item mais restritivo).
- Para linhas com 1 item, deixar sem altura fixa — o item define sua própria proporção.

