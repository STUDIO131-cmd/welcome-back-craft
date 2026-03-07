

## Plano: Reordenar galeria para alternar video-img / img-video

Reordenar o array `gallery` da primeira campanha para que o layout masonry de 2 colunas produza o padrão desejado:

Coluna esquerda recebe itens ímpares (1º, 3º, 5º...), coluna direita recebe pares (2º, 4º, 6º...). Para obter:

```
[video] - [img]
[img]   - [video]
[video] - [img]
[img]   - [video]
```

A ordem sequencial no array deve ser: `video, img, img, video, video, img, img, video`

### Alteração em `src/components/CampaignsSection.tsx`

```
gallery: [
  { src: cVid1, type: "video" },
  { src: cImg1, type: "image" },
  { src: cImg2, type: "image" },
  { src: cVid2, type: "video" },
  { src: cVid3, type: "video" },
  { src: cImg3, type: "image" },
  { src: cImg4, type: "image" },
  { src: cVid4, type: "video" },
]
```

