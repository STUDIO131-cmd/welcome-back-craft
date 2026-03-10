

# Plano: Ajustes Cimples Gallery

## 1. Nova capa da campanha Cimples
- Copiar `user-uploads://1.png` para `src/assets/campaigns/cimples/cover.png`
- Importar no `CampaignsSection.tsx` e substituir `daniCimples` como imagem da campanha 1

## 2. Botão Play — Liquid Bar + Outer Glow
No `VideoPlayer` dentro de `AdaptiveGallery.tsx`, substituir o botão circular atual por um pill/bar com glass morphism e glow:

```text
┌─────────────────────────────┐
│  ▶  PLAY                    │  ← pill shape, backdrop-blur, bg-white/10
│                             │     border-white/15, outer glow via box-shadow
└─────────────────────────────┘
```

- Shape: `rounded-full px-6 py-3` (pill)
- Glass: `backdrop-blur-md bg-white/[0.08] border border-white/[0.15]`
- Outer glow: `box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15)`
- Ícone Play + texto "PLAY" em tracking wide, text-white/90

## 3. Thumbnails alternativas para vídeos 2 e 3 (cVid2, cVid3)
Como não há poster images, o browser mostra o frame 0. Para selecionar outro "take":
- Adicionar prop `posterTime` ao `VideoPlayer` (tempo em segundos para seek)
- No `onLoadedMetadata`, fazer `video.currentTime = posterTime` para que o browser renderize um frame diferente como thumbnail
- Aplicar `posterTime` nos itens cVid2 e cVid3 da galeria (valores como 2s e 3s para pegar frames mais interessantes)
- Extender o tipo `GalleryItem` com campo opcional `posterTime?: number`

## Arquivos modificados
- `src/assets/campaigns/cimples/cover.png` (novo)
- `src/components/CampaignsSection.tsx` — import nova capa + `posterTime` nos itens cVid2/cVid3
- `src/components/AdaptiveGallery.tsx` — redesign do `VideoPlayer` (liquid bar + glow) + suporte a `posterTime`

