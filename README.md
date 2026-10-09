# Raio-X da conversa — Scrilax × Multiplix

Resumo visual e interativo da reunião de diagnóstico. O conteúdo utiliza somente informações, exemplos e combinados registrados na transcrição. O projeto inclui uma proteção simples por senha executada no servidor da Vercel.

## Escopo editorial

- Não apresenta proposta comercial.
- Não descreve produto ou escopo de trabalho.
- Não transforma exemplos narrados em promessa de resultado.
- Diferencia fatos da Scrilax, ideias apresentadas e pontos ainda em aberto.

## Proteção de acesso

A publicação já funciona sem nenhuma configuração adicional.

**Senha padrão:** `scrilax123`

O servidor valida a senha e cria uma sessão em cookie HttpOnly por sete dias. Como a senha padrão está definida em um repositório público, essa proteção deve ser usada somente como uma barreira simples de apresentação, não para informações sensíveis.

Se quiser alterar a senha futuramente, estas variáveis são opcionais:

- `CLIENT_PASSWORD`: nova senha compartilhada com o cliente.
- `SESSION_SECRET`: novo segredo aleatório com no mínimo 32 caracteres.

## Publicar pela integração GitHub → Vercel

1. Na Vercel, escolha **Add New → Project**.
2. Importe o repositório `GabrielFerreiraIA/raiox-escrilex`.
3. Mantenha **Framework Preset: Other** e o diretório raiz como `.`.
4. Clique em **Deploy**. Não é necessário cadastrar variáveis.

Cada novo push para a branch principal gera um novo deploy automaticamente.

## Desenvolvimento e verificação

```bash
npm install
npm test
npx vercel dev
```

O `vercel dev` é necessário para testar localmente o middleware e as funções de login. Um servidor estático comum mostra apenas a interface e não executa a proteção.

## Interações disponíveis

- Modos de leitura Completa e Essencial.
- Navegação guiada entre os seis capítulos.
- Progresso de leitura.
- Pilares expansíveis, com opção de abrir ou recolher todos.
- Mapa interativo que conecta a conversa ao momento da Scrilax.
- Exportação otimizada para PDF.
