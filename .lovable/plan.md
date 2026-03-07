

## Plano: Atualizar galeria popup da campanha CIMPLES

### 1. Texto branco + remover icone
Em `src/components/CampaignsSection.tsx`:
- Remover o bloco do icon Camera (linhas 156-161)
- Remover import `Camera` do lucide-react
- Alterar `text-foreground/90` para `text-white` no titulo (linha 164)
- Alterar `text-foreground/70` para `text-white/70` na descricao (linha 169)
- Alterar `text-foreground/70` para `text-white/70` no botao close (linha 150)

### 2. Adicionar midia na galeria do primeiro campaign
- Copiar os 4 arquivos de imagem e 1 video para `src/assets/campaigns/cimples/`
- Importar no componente
- Atualizar o array `gallery` do primeiro campaign com 6 itens (1 existente + 4 imagens + 1 video) em ordem mista, com spans variados para bento grid

### 3. Videos do Google Drive
Os 2 links do Google Drive nao podem ser baixados diretamente pelo sistema. Opcoes:
- Fazer upload dos videos diretamente pelo chat (arrastar os arquivos .mp4)
- Ou fornecer links diretos de download

### Arquivos criados
- `src/assets/campaigns/cimples/img1.jpg` (5D4A7869-2)
- `src/assets/campaigns/cimples/img2.jpg` (5D4A7862)
- `src/assets/campaigns/cimples/img3.jpg` (5D4A7775-2)
- `src/assets/campaigns/cimples/img4.jpg` (5D4A7725-2)
- `src/assets/campaigns/cimples/video1.mp4` (01-2)

### Arquivo editado
- `src/components/CampaignsSection.tsx`

