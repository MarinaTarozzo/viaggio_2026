# Como publicar o VIAGGIO online — passo a passo

Este guia é para quem não tem experiência técnica.  
Você vai colocar a página no ar em cerca de 20 minutos.

---

## Visão geral do processo

```
1. Criar conta no Supabase  →  2. Configurar o banco de dados
       ↓
3. Copiar as chaves de acesso  →  4. Colar no arquivo .env
       ↓
5. Testar na sua máquina  →  6. Publicar no Vercel (ou Netlify)
```

> **Por que Supabase?**  
> O Supabase é o "banco de dados" da página — é onde ficam salvas as sugestões,
> votos e avaliações das pessoas da família. É gratuito para projetos pequenos
> como este.

---

## Passo 1 — Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com) e clique em **Start for free**.
2. Entre com sua conta do Google ou GitHub (ou crie um e-mail).
3. Clique em **New project**.
4. Preencha:
   - **Name:** `viaggio` (ou qualquer nome)
   - **Database Password:** anote essa senha em algum lugar seguro
   - **Region:** escolha `South America (São Paulo)` para menor latência
5. Clique em **Create new project** e aguarde ~2 minutos.

---

## Passo 2 — Configurar o banco de dados

1. No painel do seu projeto Supabase, clique em **SQL Editor** no menu da esquerda.
2. Clique em **+ New query**.
3. Abra o arquivo `viaggio-supabase.sql` (que está na pasta `viaggio-app/`).
4. Copie **todo o conteúdo** do arquivo.
5. Cole no editor SQL e clique em **Run ▶** (ou pressione Ctrl+Enter).
6. Deve aparecer a mensagem `Success. No rows returned.` — está feito!

---

## Passo 3 — Copiar as chaves de acesso

1. No menu da esquerda do Supabase, clique em **Settings** (ícone de engrenagem).
2. Clique em **API**.
3. Você vai ver duas informações importantes:

   - **Project URL** — parece com:  
     `https://abcdefghijklmnop.supabase.co`

   - **anon / public key** — uma sequência longa começando com `eyJ...`

Copie os dois valores. Vamos usá-los no próximo passo.

---

## Passo 4 — Criar o arquivo .env

Na pasta `viaggio-app/` do seu projeto, crie um arquivo chamado `.env`  
(exatamente assim, com o ponto no início).

Cole o seguinte conteúdo, substituindo pelos seus valores:

```
VITE_SUPABASE_URL=https://SEU-CODIGO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...sua chave aqui
```

> ⚠️ **Importante:** o arquivo `.env` **nunca vai para o GitHub** — ele fica
> só na sua máquina. Quando você publicar no Vercel, vai precisar informar
> essas chaves lá também (veja o Passo 6).

---

## Passo 5 — Testar na sua máquina

Abra o terminal na pasta `viaggio-app/` e rode:

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.  
Você deve ver a tela de login com os nomes da família.  
Escolha um nome, navegue pela página e verifique se tudo funciona.

---

## Passo 6 — Publicar no Vercel (grátis)

O Vercel é o serviço de hospedagem. Ele pega o código do GitHub e publica
automaticamente cada vez que você fizer uma atualização.

### 6a. Enviar o código para o GitHub

1. Crie uma conta em [github.com](https://github.com) se ainda não tiver.
2. Crie um repositório novo (clique em **+** > **New repository**).
3. Siga as instruções para fazer o *push* do código.  
   (Se não souber fazer isso, o GitHub mostra o passo a passo na tela.)

### 6b. Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com) e crie uma conta com o GitHub.
2. Clique em **Add New Project**.
3. Selecione o repositório `viaggio`.
4. Na seção **Build and Output Settings**:
   - **Root Directory:** `viaggio-app`
   - O resto pode ficar como está (Vite é detectado automaticamente).
5. Na seção **Environment Variables**, adicione as duas chaves:
   - `VITE_SUPABASE_URL` → cole o valor do Passo 3
   - `VITE_SUPABASE_ANON_KEY` → cole a chave longa do Passo 3
6. Clique em **Deploy**.

Em ~1 minuto o Vercel vai dar um link como `viaggio-xyz.vercel.app`.  
Esse é o endereço da página da família!

---

## Dicas finais

- **Atualizar a página depois:** basta fazer *push* para o GitHub — o Vercel
  publica automaticamente.
- **Compartilhar com a família:** envie o link do Vercel por WhatsApp.
- **Funciona offline?** A página funciona sem internet, mas votos e sugestões
  só são salvos quando há conexão.
- **Preciso pagar alguma coisa?** Não. Supabase e Vercel têm planos gratuitos
  mais que suficientes para uma família.

---

## Deu algum erro?

Os erros mais comuns:

| Erro | Solução |
|------|---------|
| A página abre mas os votos somem ao recarregar | O arquivo `.env` não foi criado ou tem um erro de digitação |
| Erro "Invalid API key" | A `VITE_SUPABASE_ANON_KEY` foi colada com espaços extras |
| A página não abre no Vercel | Verificar se o **Root Directory** está como `viaggio-app` |
| As sugestões não aparecem | Rodar o script SQL novamente no Supabase |
