

## Plano: Adicionar logo na header

**Arquivo:** `src/components/HeroSection.tsx`

1. Copiar `user-uploads://LogoCampanhas_4.png` para `src/assets/logo-campanhas-header.png`
2. Importar a nova imagem no componente
3. Adicionar um `motion.img` acima do bloco de texto existente (antes da linha 26), com animação de entrada
4. A largura da imagem deve corresponder à largura da glass bar — a glass bar usa `inline-flex` com `px-6`, então vou definir a imagem com uma largura fixa similar (~`w-[420px]` ou `max-w-xl`) e ajustar responsivamente para alinhar visualmente com a bar abaixo

