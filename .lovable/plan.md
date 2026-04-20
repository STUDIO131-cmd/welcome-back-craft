

## Problema

Linha 426 de `src/components/CampaignsSection.tsx`:
```
className="... w-[48%] mx-auto"
```

Cada card de campanha (banner de capa + descrição) está fixado em **48% da largura do container em todos os breakpoints**. No mobile (390px CSS) isso resulta em ~187px de largura útil — daí o aspecto "espremido" do banner e do texto.

A intenção original parece ter sido criar um efeito de 2 colunas no desktop, mas:
1. O container pai (`<div className="space-y-8 md:space-y-12">`) não é grid — é stack vertical. Então o `48%` apenas encolhe cada card centralizado, sem aproveitar 2 colunas.
2. No mobile/tablet o efeito é puramente prejudicial: banner pequeno, texto comprimido, tags quebrando.

## Solução proposta

Tornar a largura **responsiva**:

- **Mobile (`<768px`)**: `w-full` — banner ocupa toda a largura disponível do container (com o padding lateral já dado pelo `section-container`).
- **Tablet (`md:` ≥768px)**: `md:w-[85%]` — leve recuo lateral para respiro editorial.
- **Desktop (`lg:` ≥1024px)**: `lg:w-[60%]` — preserva a proporção editorial atual em telas grandes (perto dos 48% originais, mas um pouco maior para não ficar tímido).

Mantém-se `mx-auto` para centralização vertical da pilha.

### Mudança exata

**Linha 426** — substituir:
```
... shadow-md transition-all duration-500 hover:shadow-lg w-[48%] mx-auto
```
por:
```
... shadow-md transition-all duration-500 hover:shadow-lg w-full md:w-[85%] lg:w-[60%] mx-auto
```

Nenhum outro arquivo é afetado. As galerias internas (`AdaptiveGallery`) já receberam tratamento responsivo no turno anterior — esta correção é apenas no card-banner da home.

## Resultado esperado

- Mobile 390px: banner ocupa ~358px (full width menos padding) em vez de ~187px → fim do efeito "espremido".
- Tablet 768px: ~653px com leve respiro lateral.
- Desktop 1280px+: ~768px, mantendo o padrão editorial premium.

