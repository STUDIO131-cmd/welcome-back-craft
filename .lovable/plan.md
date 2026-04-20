

## Ajuste visual — bloco de título/descrição dos cards de campanha

### Mudança

No `src/components/CampaignsSection.tsx`, no bloco que fica abaixo da capa de cada card (título + descrição + tags):

| Elemento | Antes | Depois |
|---|---|---|
| Background do bloco | atual (transparente/glass) | `#EAEAEA` |
| Título da campanha | atual | roxo/wine da paleta (`text-primary` ou `text-wine`, conforme token vigente) |
| Descrição | atual | cinza escuro (`#2B2B2B` — preto da paleta, ou `text-neutral-700`) |
| Tags | mantidas | mantidas (sem alteração) |

### Detalhes técnicos

- Trocar as classes do container do bloco de texto para `bg-[#EAEAEA]` (ou criar token `bg-card-soft` se preferir reaproveitar).
- Título: aplicar `text-primary` (roxo da paleta já definida no `tailwind.config.ts` / `index.css`).
- Descrição: aplicar `text-[#2B2B2B]` (cinza escuro / preto da paleta).
- Manter cantos arredondados e padding atuais.
- Hover do bloco continua **sem** efeito visual (mudança anterior preservada) — só a capa recebe o overlay "VEJA A GALERIA".
- Aplicar de forma uniforme a **todas** as 11 campanhas (o componente é um único template renderizado em loop, então uma alteração propaga para todas).

### Verificação

Antes de finalizar, confirmar no `tailwind.config.ts` qual token corresponde ao roxo da paleta (provavelmente `primary` ou `wine`) para usar a classe semântica em vez de hex direto, mantendo consistência com o design system.

