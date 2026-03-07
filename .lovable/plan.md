

## Problema

`object-cover` com `auto-rows-[180px]` corta as mídias. `object-contain` com altura fixa cria espaços vazios. O conflito é: **altura fixa de linha não respeita proporções variadas**.

## Solução: Abandonar altura fixa, usar layout de colunas (Masonry)

Trocar o CSS Grid com `auto-rows-[180px]` por um layout de **3 colunas flexbox** (masonry vertical), onde cada mídia mantém sua proporção natural.

### Como funciona

- 3 colunas lado a lado via `flex` ou `columns-3`
- Cada mídia usa sua proporção real (`w-full h-auto`)
- Sem `object-cover` nem `object-contain` — a imagem/vídeo simplesmente renderiza em tamanho natural proporcional à coluna
- Gap pequeno entre itens (`gap-2`)

### Mudanças no `GalleryItem`

Remover `cols` e `rows` — não são mais necessários. A distribuição será feita dividindo o array de itens em 3 colunas de forma balanceada (round-robin ou por contagem).

```typescript
type GalleryItem = {
  src: string;
  type: "image" | "video";
};
```

### Componente `BentoGallery`

```tsx
// Divide items into 3 columns
const columns = [[], [], []];
items.forEach((item, i) => columns[i % 3].push(item));

return (
  <div className="flex gap-2">
    {columns.map((col, ci) => (
      <div key={ci} className="flex-1 flex flex-col gap-2">
        {col.map((item, idx) => (
          // img/video com w-full h-auto — proporção natural
        ))}
      </div>
    ))}
  </div>
);
```

### Mídia

- Imagens: `w-full h-auto rounded-xl`
- Vídeos: `w-full h-auto rounded-xl` (aspect ratio natural do vídeo)
- Sem `object-cover`, sem `object-contain`, sem altura fixa

### Escopo

1. Simplificar `GalleryItem` (remover `cols`/`rows`)
2. Simplificar todos os 6 arrays de galeria (apenas `src` e `type`)
3. Reescrever `BentoGallery` com layout masonry de 3 colunas
4. Ajustar `VideoPlayer` para `h-auto` ao invés de `h-full`

