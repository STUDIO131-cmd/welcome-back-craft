

## Problema

`object-contain` respeita proporções mas cria espaços vazios feios dentro das células do grid (barras pretas/escuras ao redor das mídias). As células têm altura fixa de 180px e as mídias não preenchem o espaço.

## Solução

Voltar para `object-cover` — é o padrão usado em todo bento grid profissional. O corte é mínimo e controlado quando os spans são bem escolhidos. A diferença é que agora os spans já estão curados manualmente, então o corte será sutil e não agressivo como antes.

### Mudanças

1. **BentoGallery**: trocar `object-contain` por `object-cover` nas imagens e vídeos
2. **VideoPlayer**: trocar `object-contain` por `object-cover` no elemento `<video>`

São apenas 2 linhas de CSS — `object-contain` → `object-cover` no componente `BentoGallery` (img) e no `VideoPlayer` (video).

