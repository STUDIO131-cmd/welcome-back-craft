

## Diagnóstico

O problema atual: o grid usa apenas **2 colunas** com `col-span-1` ou `col-span-2`. Vídeos `full` ocupam 100% da largura e ficam enormes. Não há variação de tamanhos — o layout é monótono e não se parece com um bento grid real.

Os exemplos de referência que você enviou mostram o padrão bento: blocos de **tamanhos variados** em grids de 3-4 colunas, onde cada item pode ocupar 1, 2 ou 3 colunas e 1 ou 2 linhas, criando composições orgânicas e visualmente interessantes.

## Proposta

Trocar o grid de 2 colunas por um **grid de 3 colunas** com alturas fixas por linha, onde cada item tem um `colSpan` (1, 2 ou 3) e `rowSpan` (1 ou 2) definidos manualmente por campanha.

### Novo tipo de dados

```typescript
type GalleryItem = {
  src: string;
  type: "image" | "video";
  cols: 1 | 2 | 3;  // quantas colunas ocupa
  rows?: 1 | 2;     // quantas linhas ocupa (default 1)
};
```

### Grid CSS

```
grid grid-cols-3 auto-rows-[200px] gap-2
```

- Base de 3 colunas
- Cada linha tem ~200px de altura
- Items com `rows: 2` ficam com ~400px (destaque visual)
- Items com `cols: 2` ou `cols: 3` ganham largura proporcional

### Layout por campanha

Cada campanha terá seu grid curado manualmente. Exemplo para um álbum de 8 itens (1 vídeo + 7 fotos):

```text
┌──────────┬─────┐
│ Video    │ Img │
│ (2x2)    │ 1x1 │
│          ├─────┤
│          │ Img │
├────┬─────┴─────┤
│Img │  Img (2x1)│
├────┴──┬────────┤
│Img    │  Img   │
│(2x1)  │ (1x1)  │
└───────┴────────┘
```

Vídeos ocuparão no máximo `2x2` ou `2x1` — nunca a largura total de 3 colunas — para não ficarem gigantes. Fotos horizontais podem ser `2x1`. Fotos verticais/portrait ficam `1x2`. Cada álbum será ajustado individualmente para que a composição fique harmoniosa e sem gaps.

### Tratamento de mídia

- Todas as mídias recebem `object-cover` + `w-full h-full` para preencher suas células sem distorção
- `rounded-xl` para bordas consistentes
- O container do grid continua `max-w-2xl` centralizado

### Escopo

- Refatorar o tipo `GalleryItem` e o componente de renderização do grid
- Revisar e atribuir `cols`/`rows` individuais para cada item nos 6 álbuns existentes
- Ajustar o `VideoPlayer` para aceitar `h-full` e preencher a célula do grid

