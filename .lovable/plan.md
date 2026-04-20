

## Diagnóstico

A redução do `min-h-[140px] md:min-h-[210px]` **não teve efeito visual** porque:

1. **`min-h` define apenas o piso, não o teto**. A imagem natural (proporção 5:4, 1000×800px) renderiza muito maior que 210px — então `min-h-[210px]` é irrelevante: a imagem já passa disso naturalmente.
2. A classe atual `w-full h-full min-h-[140px] md:min-h-[210px] object-cover` no `<img>` não restringe a altura máxima. O container pai (`<div className="w-full flex-shrink-0 overflow-hidden">`) também não tem altura — então a imagem expande até seu tamanho natural escalado pela largura do card.

Resultado: capa continua "gigante" mesmo com o `min-h` reduzido.

## Solução

Trocar `min-h` por **`aspect-ratio`** (proporção controlada) **ou** por **`max-h` com `h-`** (altura fixa). Recomendo **`aspect-ratio`** porque:
- Mantém a imagem proporcional em qualquer largura
- Não estica nem corta de forma imprevisível
- É responsivo automaticamente

### Mudança técnica

Em `src/components/CampaignsSection.tsx`:

**Container da imagem (linha 436)** — adicionar a proporção no wrapper:
```
<div className="w-full flex-shrink-0 overflow-hidden aspect-[16/7] md:aspect-[21/7]">
```

**`<img>` (linha 441)** — simplificar para preencher o container:
```
className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
```

**Placeholder "Em breve" (linha 447)** — remover `min-h`, herdar do pai:
```
<div className="w-full h-full flex items-center justify-center bg-white/[0.05]">
```

### Proporções escolhidas
- **Mobile `aspect-[16/7]`** → em ~360px de largura ≈ 157px de altura (próximo aos 140px desejados)
- **Desktop `aspect-[21/7]` (3:1)** → em ~900px de largura ≈ 300px de altura

Se preferir ainda mais baixo (faixa editorial bem fina), uso `aspect-[21/6]` ou `aspect-[24/7]`.

## Arquivo editado
- `src/components/CampaignsSection.tsx` — linhas 436, 441, 447

Sem impacto em: lightbox, modal, layout do card, tipografia, hover overlay.

