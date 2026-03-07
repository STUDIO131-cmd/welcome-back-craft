

## Entendimento

O problema: CSS Grid de 2 colunas força cada **linha** a ter a mesma altura. Se um vídeo é mais alto que a foto ao lado, sobra espaço vazio abaixo da foto.

A solução: **Duas colunas independentes usando flex-col**, onde cada coluna empilha seus itens verticalmente sem se preocupar com a altura do vizinho.

### Como funciona

1. Pegar o array `gallery` e distribuir manualmente:
   - **Coluna esquerda**: índices 0, 2, 4, 6... (itens pares)
   - **Coluna direita**: índices 1, 3, 5, 7... (itens ímpares)

2. Renderizar como dois `div` com `flex flex-col gap-2` lado a lado dentro de um container `flex gap-2`.

3. Cada item ocupa 100% da largura da sua coluna e mantém sua proporção natural. Como as colunas são independentes, não há espaço vazio forçado.

```text
Coluna A (flex-col)     Coluna B (flex-col)
┌──────────────┐        ┌──────────────┐
│  video1 (0)  │        │  img1 (1)    │
│              │        └──────────────┘
│              │        ┌──────────────┐
└──────────────┘        │  vid2 (3)    │
┌──────────────┐        │              │
│  img2 (2)    │        │              │
└──────────────┘        └──────────────┘
┌──────────────┐        ┌──────────────┐
│  vid3 (4)    │        │  img3 (5)    │
│              │        └──────────────┘
└──────────────┘        ...
```

A **ordem do array original é preservada** (0→esquerda, 1→direita, 2→esquerda, 3→direita...), então o padrão `[video, foto, foto, video, video, foto, foto, video]` se mantém exatamente como definido.

### Alteração

Arquivo: `src/components/CampaignsSection.tsx` — substituir o `grid grid-cols-2` por dois containers `flex-col` lado a lado, com a lógica de split por índice par/ímpar.

