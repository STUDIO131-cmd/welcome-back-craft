

# Ajustes Campanha de Natal

## Alterações

### 1. Capa (Anexo 1 → imagem)
Copiar `user-uploads://11.png` para `src/assets/campaigns/daninatal/cover.png` e usar como `image` da campanha 3.

### 2. Novo vídeo (Anexo 2)
Copiar `user-uploads://Dani_Fernandes_1_versao_2_1.mp4` para `src/assets/campaigns/daninatal/video4.mp4` e adicionar na galeria.

### 3. Layout da galeria — duas linhas de 2 vídeos
Atualmente: 3 vídeos em layout misto. Com o novo vídeo serão 4 no total.
Nova estrutura:
```text
Linha 1: dnVid1 (col 2) + dnVid4 (col 2)
Linha 2: dnVid2 (col 2) + dnVid3 (col 2)
```

### Arquivos
- `src/assets/campaigns/daninatal/cover.png` (novo)
- `src/assets/campaigns/daninatal/video4.mp4` (novo)
- `src/components/CampaignsSection.tsx` — import capa + vídeo, atualizar campanha 3

