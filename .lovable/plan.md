

## Plano: Galeria estilo bento grid sem barras — imagens preenchem os blocos

### Problema
As fotos e vídeos usam `object-contain` que mostra barras laterais. Precisam usar `object-cover` para preencher cada célula, como na referência (bento grid com imagens cortadas para preencher).

### Alterações em `src/components/CampaignsSection.tsx`

1. **Trocar `object-contain` por `object-cover`** nas imagens e vídeos da galeria (linhas 188 e 194) — remove as barras laterais
2. **Remover `bg-black/20`** — não precisa mais de fundo pois a mídia preenche tudo
3. **Aumentar o tamanho do grid** — mudar `auto-rows-[150px]` para `auto-rows-[200px]` e o modal de `max-w-4xl` para `max-w-5xl` para itens maiores
4. **Aumentar o gap** de `gap-3` para `gap-2` (mais junto, como na referência)

### Resultado esperado
Grid estilo bento como na imagem de referência: fotos preenchendo cada célula inteira sem barras, com tamanhos variados via spans.

