

## Problema

Em `CampaignsSection.tsx` (linha 460), as descrições têm `line-clamp-5` aplicado, e o layout desktop divide o card em **60% imagem + 40% texto**, sobrando pouca largura para o texto. Resultado: praticamente todas as descrições (que têm 3–6 linhas com quebras) ficam truncadas com "...".

## Opções de solução

### Opção A — Remover o truncamento (mínima mudança)
Tira o `line-clamp-5`. Descrição aparece inteira ao lado da imagem. Cards ficam com alturas variáveis (umas mais altas que outras). Mantém layout horizontal desktop.

### Opção B — Empilhar (sua sugestão)
Imagem em cima, texto embaixo, em **todos os breakpoints**. Texto ocupa largura total do card → cabe tudo confortavelmente em 2–4 linhas. Cards ficam mais "verticais" e padronizados, estilo editorial/portfólio clássico. Visualmente mais limpo e legível.

### Opção C — Híbrido
Mantém lado-a-lado no desktop mas aumenta a coluna de texto (50/50 em vez de 60/40) e remove o `line-clamp`. Compromisso entre o atual e empilhar.

## Recomendação: **Opção B (empilhar)**

Motivos:
- Resolve 100% o corte — texto ganha largura total
- Hierarquia visual mais forte: imagem grande chama atenção, texto abaixo descreve sem competir
- Padroniza altura/proporção dos cards (mais "grid de portfólio")
- Mantém consistência com o resto do site (Bastidores e Differentials já são empilhados)

## Mudanças técnicas (Opção B)

Arquivo único: `src/components/CampaignsSection.tsx`

1. **Linha 434**: trocar `flex flex-col md:flex-row` → `flex flex-col` (sempre coluna)
2. **Linha 436**: remover `md:w-3/5` da imagem (largura total)
3. **Linha 441**: ajustar altura da imagem para uma proporção mais editorial (ex: `aspect-[16/10]` ou `min-h-[280px] md:min-h-[420px]`)
4. **Linha 452**: remover `md:w-2/5`, ajustar padding (ex: `p-6 md:p-8`)
5. **Linha 460**: remover `line-clamp-5` para mostrar descrição completa
6. **Linha 455**: aumentar levemente o título no desktop (`text-base md:text-xl`) já que tem mais espaço
7. **Linha 408**: aumentar gap vertical entre cards (`space-y-8 md:space-y-12`) para respirar
8. Preservar hover overlay "VEJA A GALERIA" e o resto da estrutura intactos

Sem mudança em: modal/galeria expandida, lightbox, lazy loading, animations.

