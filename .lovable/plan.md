

## Plano: Alternar fotos e vídeos na galeria

O array `gallery` da primeira campanha (Dani Fernandes × CIMPLES) lista 4 imagens seguidas e depois 4 vídeos. Com o layout masonry de 2 colunas, todos os vídeos caem do mesmo lado.

### Alteração em `src/components/CampaignsSection.tsx`

Reordenar o array `gallery` da primeira campanha para intercalar foto e vídeo:

```
gallery: [
  { src: cImg1, type: "image" },
  { src: cVid1, type: "video" },
  { src: cImg2, type: "image" },
  { src: cVid2, type: "video" },
  { src: cImg3, type: "image" },
  { src: cVid3, type: "video" },
  { src: cImg4, type: "image" },
  { src: cVid4, type: "video" },
]
```

Isso distribui as mídias alternadamente entre as duas colunas do masonry.

