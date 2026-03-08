

## Plano de Ajustes — CampaignsSection

### 1. Atualizar descrições e tags de 5 campanhas

| Campanha | Título atual → Novo | Nova descrição | Novas tags |
|---|---|---|---|
| Cimples | "Dani Fernandes × CIMPLES (by Carolina Ferraz)" → manter | Nova descrição fornecida | Direção criativa da campanha, Ambientação + roteiro de captação, Foto e vídeo |
| The National Gallery | manter título | Nova descrição fornecida | Direção criativa da campanha, Ambientação e produção visual, Foto + vídeo de lançamento |
| Auramia | "Auramia by Beatriz Manganelli" → manter | Nova descrição fornecida | Estudo de público, Calendário de lançamento, Foto + vídeo de campanha |
| Pink Friday | manter título | Nova descrição fornecida | Black Friday, Estratégia de oferta, Calendário de publicações |
| Cravates | "Coleção Cravates by Corpo De Ballet" → manter | Nova descrição fornecida | Produção visual, Fotografia de campanha, Roteiro + captação de vídeo |

### 2. Pop-up da galeria — substituir descrição por tags

Na modal (linhas 475-481), remover o parágrafo de descrição e renderizar as tags no lugar, usando os mesmos chips visuais do card externo.

### 3. Reordenar campanhas no array

Nova ordem do array `campaigns`:
1. Cimples e Dani Fernandes
2. Pink Friday
3. Dani Fernandes Campanha de Natal
4. The National Gallery
5. Etoiles
6. La Vie
7. Velvet Cherry
8. Adriano Martins
9. AuraMia
10. Nova Trida
11. Cravates

### 4. Padronizar altura dos cards

Sobre a sua pergunta: **sim, é possível**. Atualmente o lado da imagem usa `h-48 md:h-full`, o que faz a altura variar conforme o conteúdo de texto. Para padronizar, vou definir uma altura fixa mínima no card (ex: `md:min-h-[280px]`) e forçar a imagem/placeholder a preencher essa altura com `object-cover`. Isso garante que todos os cards tenham o mesmo tamanho visual independente do comprimento da descrição.

### Detalhes técnicos

- Arquivo editado: `src/components/CampaignsSection.tsx`
- Reordenação do array `campaigns[]` (mover objetos, sem alterar dados internos das galerias)
- Substituir `<p>` de descrição no popup por `<div>` com os chips de tags
- Adicionar `md:min-h-[280px]` ao container do card e `min-h-[280px]` ao container da imagem no desktop

