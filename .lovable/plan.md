

## Diagnóstico do Problema

Analisei a galeria popup ao vivo e identifiquei exatamente os 3 problemas que você mencionou:

1. **Colunas desbalanceadas no final**: O layout atual distribui itens por `idx % 2` (pares na esquerda, ímpares na direita). Quando o número de itens é ímpar, a coluna esquerda fica com 1 item a mais, criando um espaço vazio grande embaixo da coluna direita.

2. **Fotos horizontais ficam pequenas**: Cada coluna ocupa exatamente 50% da largura (`flex-1`). Fotos horizontais (landscape) são espremidas nessa metade, ficando minúsculas e sem impacto visual.

3. **Sem harmonia orgânica**: O grid atual é uma simples divisão par/ímpar sem considerar a proporção das mídias. Não há variação — tudo tem o mesmo peso visual.

## Solução Proposta

Substituir o layout de 2 colunas fixas por um **CSS Grid responsivo** com `grid-template-columns` de 2 colunas, onde:

- **Vídeos e fotos horizontais** ocupam `col-span-2` (largura total), ganhando destaque
- **Fotos verticais/quadradas** ocupam `col-span-1` (metade), lado a lado
- O grid usa `auto-rows` para que as alturas se ajustem naturalmente ao conteúdo

### Lógica de detecção

Adicionar uma propriedade `orientation` a cada `GalleryItem` (`"landscape" | "portrait"`), definida manualmente nos dados de cada campanha. Itens landscape e vídeos recebem `col-span-2`; itens portrait recebem `col-span-1`, emparelhando-se automaticamente.

### Resultado visual esperado

```text
┌─────────────────────────────┐
│      VIDEO (full width)     │
├──────────────┬──────────────┤
│  Foto port.  │  Foto port.  │
├──────────────┴──────────────┤
│   Foto landscape (full)     │
├──────────────┬──────────────┤
│  Foto port.  │  Foto port.  │
└──────────────┴──────────────┘
```

### Alterações técnicas

1. **Tipo `GalleryItem`**: Adicionar campo `span?: "full" | "half"` (default `"half"`)
2. **Dados das campanhas**: Marcar vídeos e fotos horizontais com `span: "full"`
3. **Renderização da galeria**: Substituir o layout `flex` de 2 colunas por:
   ```
   grid grid-cols-2 gap-2
   ```
   Itens com `span: "full"` recebem `col-span-2`, os demais `col-span-1`.
4. **Sem gaps estranhos**: O grid CSS naturalmente elimina espaços vazios no final.

Será necessário revisar os 6 arrays `gallery` existentes para classificar cada item.

