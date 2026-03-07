

## Plano: Ajustar grid de mídia do popup para largura do parágrafo com espaçamento

O parágrafo (`p`) tem `max-w-2xl mx-auto` (~672px). O grid de mídia atual usa `columns-1 sm:columns-2` sem restrição de largura, ocupando todo o `max-w-5xl` (~1024px).

### Alteração em `src/components/CampaignsSection.tsx`

- Envolver o grid de mídia (linha 221) com `max-w-2xl mx-auto` para alinhar com a largura do parágrafo
- Aumentar o `gap` e `mb` dos itens para criar espaçamento visual (ex: `gap-4`, `mb-4`)
- Adicionar `px-2` ou `p-2` no container para margem interna, fazendo as mídias ficarem visualmente menores dentro do espaço

Resultado: mídias mantêm proporção original mas ficam contidas na mesma largura do texto, com espaçamento respirado entre elas.

