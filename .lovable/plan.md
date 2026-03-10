

# Ajustes Galeria The National Gallery

## 1. Nova capa
Copiar `user-uploads://5.png` para `src/assets/campaigns/tng/cover.png` e usar como imagem da campanha 4.

## 2. Reorganização da galeria

Layout atual (grid 4 colunas):
```text
L1: tngVid1(2) + tngImg1(1) + tngImg2(1)
L2: tngImg3(1) + tngVid2(1) + tngVid3(2)    ← vídeos misturados com foto
L3: tngImg4(1) + tngImg5(3)
L4: tngVid4(2) + tngVid5(2)
L5: tngImg6(1)                                ← órfão
```

Novo layout — vídeos sempre em linhas dedicadas de 2, linha 3 só fotos:
```text
L1: tngVid1(2) + tngImg1(1) + tngImg2(1)     ← mantém (vídeo hero + 2 fotos)
L2: tngVid2(2) + tngVid3(2)                   ← impacto: 2 vídeos
L3: tngImg3(1) + tngImg4(1) + tngImg5(1) + tngImg6(1)  ← 4 fotos
L4: tngVid4(2) + tngVid5(2)                   ← impacto: 2 vídeos
```

## Arquivos
- `src/assets/campaigns/tng/cover.png` (novo)
- `src/components/CampaignsSection.tsx` — import capa + reordenar gallery items

