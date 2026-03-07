

## Plano: Padronizar galerias das campanhas para receber arquivos diferentes

Atualmente, apenas a campanha "CIMPLES" tem uma galeria completa com 8 itens (4 fotos + 4 vídeos). As outras duas campanhas ("The National Gallery" e "PINK Friday") têm apenas 1 item cada, reutilizando a imagem de capa.

### O que fazer

1. **Criar pastas de assets para cada campanha** — assim como existe `src/assets/campaigns/cimples/`, criar:
   - `src/assets/campaigns/gallery/` (para "The National Gallery")
   - `src/assets/campaigns/pink-friday/` (para "PINK Friday")

2. **Adicionar arquivos placeholder** — para cada campanha, adicionar imagens e/ou vídeos nessas pastas. Você precisará enviar os arquivos reais para cada pasta.

3. **Atualizar os imports e arrays `gallery`** em `CampaignsSection.tsx` — importar os novos arquivos e preencher os arrays `gallery` das campanhas 2 e 3 com a mesma estrutura de `GalleryItem[]` que a primeira campanha já usa.

### Estrutura resultante

```text
src/assets/campaigns/
├── cimples/          (já existe — 4 imgs + 4 vídeos)
│   ├── img1.jpg ... img4.jpg
│   └── video1.mp4 ... video4.mp4
├── gallery/          (nova pasta)
│   ├── img1.jpg ... (seus arquivos)
│   └── video1.mp4 ... (seus arquivos)
├── pink-friday/      (nova pasta)
│   ├── img1.jpg ... (seus arquivos)
│   └── video1.mp4 ... (seus arquivos)
```

### Alteração em `CampaignsSection.tsx`

- Adicionar imports dos novos arquivos de cada pasta
- Preencher o array `gallery` de cada campanha com os novos items, seguindo o mesmo padrão `{ src: arquivo, type: "image" | "video" }`

### Próximo passo

Envie os arquivos (fotos e vídeos) que quer usar para cada campanha, e eu monto os imports e arrays automaticamente.

