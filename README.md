# Raio-X da conversa — Scrilax × Multiplix

Resumo visual e interativo da reunião de diagnóstico. O conteúdo utiliza somente informações, exemplos e combinados registrados na transcrição. O projeto inclui uma proteção por senha executada no servidor da Vercel.

## Escopo editorial

- Não apresenta proposta comercial.
- Não descreve produto ou escopo de trabalho.
- Não transforma exemplos narrados em promessa de resultado.
- Diferencia fatos da Scrilax, ideias apresentadas e pontos ainda em aberto.

## Proteção de acesso

A senha nunca é enviada no código do site nem armazenada no GitHub. O servidor compara o valor digitado com `CLIENT_PASSWORD` e cria uma sessão assinada em cookie HttpOnly por sete dias.

Variáveis obrigatórias:

- `CLIENT_PASSWORD`: senha compartilhada com o cliente.
- `SESSION_SECRET`: segredo aleatório com no mínimo 32 caracteres.

Se qualquer uma delas estiver ausente, o acesso permanece bloqueado e a tela informa que a configuração ainda não foi concluída.

## Publicar pela integração GitHub → Vercel

1. Na Vercel, escolha **Add New → Project**.
2. Importe o repositório `GabrielFerreiraIA/raiox-escrilex`.
3. Mantenha **Framework Preset: Other** e o diretório raiz como `.`.
4. Em **Environment Variables**, cadastre `CLIENT_PASSWORD` e `SESSION_SECRET` para Production, Preview e Development.
5. Clique em **Deploy**.

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
