

# Alterar thumbnail do vídeo 2 (última linha) — The National Gallery

## Contexto
A galeria TNG tem na última linha `tngVid4` + `tngVid5`. O vídeo 2 dessa linha é `tngVid5` (TNG-07.mp4). A imagem enviada mostra o frame desejado (produto Monet sendo manuseado).

## Alteração
Adicionar `posterTime` ao item `tngVid5` na linha 194 de `CampaignsSection.tsx` para que o componente `VideoPlayer` busque automaticamente o frame correto como thumbnail. Valor inicial: `posterTime: 3` (ajustável se necessário).

### Arquivo
- `src/components/CampaignsSection.tsx` — linha 194: adicionar `posterTime: 3` ao item `tngVid5`

```text
Antes:  { src: tngVid5, type: "video", colSpan: 2 },
Depois: { src: tngVid5, type: "video", colSpan: 2, posterTime: 3 },
```

O botão play permanece inalterado — é renderizado pelo componente `VideoPlayer` independentemente do posterTime.

