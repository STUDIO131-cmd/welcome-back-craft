

## Plano: Títulos brancos + novo fundo fixo da página e popup

### Alterações

1. **Copiar imagem** enviada para `src/assets/page-bg.jpg` (substituir o atual) — será usada como fundo fixo da página E do popup da galeria.

2. **`src/components/CampaignsSection.tsx`**:
   - Títulos dos cards (h3, linha 161-164): trocar `color: "#C73C32"` para `color: "#FFFFFF"` e remover/ajustar o textShadow para branco sutil
   - O popup da galeria (linha 191) já usa `galleryBg` — alterar o import para usar o mesmo `page-bg.jpg` ou copiar a imagem também para `gallery-bg.jpg`
   - Simplificação: importar `pageBg` de `@/assets/page-bg.jpg` e usar no popup ao invés de `galleryBg`

3. **`src/assets/page-bg.jpg`**: substituir pelo novo arquivo enviado (a imagem roxa/azul escura)

4. **`src/assets/campaigns/gallery-bg.jpg`**: substituir pelo mesmo arquivo para manter o popup consistente, OU alterar o import no componente para apontar para `page-bg.jpg`

### Abordagem mais limpa
- Copiar o upload para `src/assets/page-bg.jpg` (sobrescreve)
- No `CampaignsSection.tsx`: trocar import de `gallery-bg.jpg` para `page-bg.jpg`
- Trocar cor dos títulos h3 para branco

### Arquivos editados
- `src/assets/page-bg.jpg` (substituído)
- `src/components/CampaignsSection.tsx` (títulos brancos + import do fundo)

