## Plano — Ativar EmailJS no formulário de contato

Você criou a conta no EmailJS e me passou as 3 credenciais. Agora vou configurá-las no projeto e melhorar o tratamento de erros.

### Credenciais recebidas
- **Service ID**: `service_l3hskrl`
- **Template ID**: `template_i0glhup`
- **Public Key**: `r2C6rMxegs-BaaEqv`

Essas credenciais são **públicas por design** (o EmailJS expõe a Public Key no client-side e valida via domínio autorizado). Podem ficar tanto em secrets `VITE_*` quanto hard-coded — vou usar secrets para seguir o padrão que já existe no código (`src/components/ContactForm.tsx` já lê de `import.meta.env.VITE_EMAILJS_*`).

---

### O que vou fazer

**1. Adicionar 3 secrets no projeto** (via tool `add_secret`):
- `VITE_EMAILJS_PUBLIC_KEY` = `r2C6rMxegs-BaaEqv`
- `VITE_EMAILJS_SERVICE_ID` = `service_l3hskrl`
- `VITE_EMAILJS_TEMPLATE_ID` = `template_i0glhup`

Como têm prefixo `VITE_`, o Vite expõe automaticamente no bundle do client.

**2. Melhorar o tratamento de erros em `src/components/ContactForm.tsx`**

Hoje qualquer falha mostra a mesma mensagem genérica. Vou diferenciar:
- **Sem configuração** (não deve mais ocorrer, mas fica como guard) → log no console + mensagem genérica
- **Erro do EmailJS** (`error.text` ou `error.status`) → loga detalhe no console (status + texto) e mostra mensagem clara
- **Falha de rede** → mensagem de conexão

Mantém a mensagem amigável atual no UI, mas adiciona `console.error` com detalhes para você conseguir diagnosticar futuramente via DevTools/console logs.

**3. Atualizar memória `mem://features/contact-form`**

Corrigir o destinatário de `igorgagliardi@studio131.com` para `igorgagliardi@studio131.com.br` (memória atual está sem o `.br`) e registrar que os 3 secrets `VITE_EMAILJS_*` estão configurados.

---

### O que VOCÊ precisa fazer (1 passo, ~1 min) — IMPORTANTE para segurança

No painel do EmailJS:
1. Vá em **Account → Security**
2. Em **Allowed Origins** (ou "Allowlist"), adicione:
   - `https://welcome-back-craft.lovable.app` (domínio publicado)
   - `https://id-preview--8ba85e20-543a-4544-8407-582527bc0403.lovable.app` (preview)
   - Se você publicar em domínio próprio depois, adicionar também

Sem isso, qualquer pessoa que pegue sua Public Key no DevTools poderia disparar emails consumindo sua quota de 200/mês. Com a allowlist, só requests vindos dos seus domínios são aceitos.

Também recomendo deixar ligado **"Use reCAPTCHA"** no template (opcional) se você notar abuso futuramente.

---

### Verificação final

Após eu aplicar as mudanças e o build terminar:
1. Você abre `https://welcome-back-craft.lovable.app/#orcamento`
2. Preenche o formulário com dados de teste
3. Clica em **Enviar** → deve aparecer o popup "Obrigado pelas informações :-)"
4. Em até 1 min, o email deve chegar em `igorgagliardi@studio131.com.br` (cheque também a pasta de spam na primeira vez)

Se algo falhar, abro os console logs do preview para diagnosticar (com a melhoria de erros, vamos ver o motivo exato do EmailJS).

---

### Resumo dos arquivos afetados
- **Secrets** (3 novos): `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`
- **Editado**: `src/components/ContactForm.tsx` (apenas bloco `catch` do `handleSubmit` — ~10 linhas)
- **Editado**: `mem://features/contact-form` (correção do email + nota dos secrets)

Aprova?
