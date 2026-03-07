

## Plano: Corrigir proporções, play centralizado e adicionar 3 vídeos

### 1. Corrigir proporções das mídias
O problema é `auto-rows-[200px]` com `object-cover` — força altura fixa e corta as imagens. Solução:
- Trocar grid de `auto-rows-[200px]` para layout baseado em **masonry/columns** ou usar `auto-rows-auto` com `object-contain` + fundo escuro
- Melhor abordagem: usar **columns CSS** (estilo Pinterest/masonry) onde cada item mantém sua proporção natural
- Remover `h-full` dos elementos de mídia para respeitar aspect ratio

### 2. Botão de play centralizado nos vídeos
- Renderizar vídeos sem `controls` e sem `autoPlay`
- Adicionar overlay com ícone Play (lucide `Play`) centralizado
- Ao clicar: iniciar vídeo com som (`muted=false`), esconder overlay, mostrar controls nativos
- Usar `useRef` por vídeo ou estado para controlar qual vídeo está tocando

### 3. Adicionar 3 novos vídeos
- Copiar os 3 uploads para `src/assets/campaigns/cimples/`:
  - `video2.mp4` (Video_2_-_Lancamento.mp4)
  - `video3.mp4` (07.mp4)
  - `video4.mp4` (06.mp4)
- Importar no componente
- Atualizar array `gallery` do primeiro campaign com ordem mista (intercalar fotos e vídeos):
  ```
  cImg1, cVid1, cImg3, video2, cImg2, video3, cImg4, video4, daniCimples
  ```

### 4. Layout da galeria (columns CSS)
```css
columns: 2 (mobile) / 3 (desktop)
cada item: width 100%, height auto, margin-bottom gap
```
Isso mantém a proporção natural de cada foto/vídeo.

### Arquivos
- **Criados:** `src/assets/campaigns/cimples/video2.mp4`, `video3.mp4`, `video4.mp4`
- **Editado:** `src/components/CampaignsSection.tsx`

