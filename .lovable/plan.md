## Plano: Seção intermediária + ajuste no carrossel de marcas

### 1. Novo componente `CampaignCTA.tsx`

Criar componente entre `CampaignsSection` e `ClientsCarousel` com:

- **Texto central**: "A campanha é construída para sustentar a venda naquele momento e não só "marcar presença"."
- **Botão liquid glass animado**: "Quero avaliar uma campanha" — scroll suave até `#orcamento` (id do ContactForm)
  - Estilo: `backdrop-blur-xl bg-white/[0.08] border border-white/[0.15]` com hover glow/scale animation
- **Subtítulo**: "Como funciona a nossa atuação"
- **Barra liquid glass animada** com ícone de relógio (Clock do lucide-react): "Assista ao vídeo 2 min."  
Adicionar um placeholder de vídeo com capa layer blur e um icon de play centralizado

Tudo centralizado, com `section-container`, espaçamento `py-12`.

### 2. Atualizar `Index.tsx`

Importar e inserir `CampaignCTA` entre `CampaignsSection` e `ClientsCarousel`.

### 3. Ajustar background do `ClientsCarousel.tsx`

- Trocar o fundo `rgba(255,255,255,0.12)` por **branco sólido** (`#FFFFFF` / `bg-white`)
- Remover `backdrop-blur-xl`
- Manter o fade lateral com `mask-image` (já existe)
- Atualizar cor do título para escuro (`text-gray-900`)
- Bordas superior e inferior com fade-out sutil para o fundo da página (usar `box-shadow` ou gradientes nas bordas)
- Ícones mantêm grayscale com hover colorido
- A glassbar se mantem "abraçando" todo conteúdo 

### Arquivos

- **Criar**: `src/components/CampaignCTA.tsx`
- **Editar**: `src/pages/Index.tsx` (adicionar import + componente)
- **Editar**: `src/components/ClientsCarousel.tsx` (background branco sólido + fade borders)  
  
  
Confirme seu entendimento antes de executar