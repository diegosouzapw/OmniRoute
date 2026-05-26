---
title: "E2E Dashboard Shakedown — v3.8.0"
---

# E2E Dashboard Shakedown — v3.8.0

**Branch alvo:** `release/v3.8.0`
**Objetivo:** validar manualmente, em modo dev (Turbopack), que toda página renderiza sem erro de runtime ou de backend antes de fechar a versão 3.8.0. Para cada erro encontrado, o operador **corrige na própria página** e segue para a próxima — esse documento é o roteiro vivo da sessão.

> Este é um plano de **smoke test manual operacional**, não uma suíte automatizada. Pareceu didático demais? É proposital: o objetivo é que outro mantenedor consiga retomar do meio se a sessão for interrompida.

---

## 0. Pré-requisitos (rodar uma vez)

### 0.1 Estado do repositório

```bash
git fetch origin
git checkout release/v3.8.0
git pull origin release/v3.8.0 --ff-only
git status                       # working tree limpo
```

### 0.2 Conflito conhecido — diretório `app/` na raiz

O `npm pack` e `npm run build` geram `app/` na raiz (gitignored, mirror de `src/app/`). Se ele existir, **o Next.js dev prefere a raiz e quebra todas as rotas** (Turbopack devolve `PageNotFoundError: Cannot find module for page: route not found /(dashboard)/...`).

```bash
[ -d app ] && mv app /tmp/omniroute-pack-artifact-$(date +%s)
ls -d app 2>/dev/null && echo "STILL THERE — abortar" || echo "ok"
```

### 0.3 Cache do Turbopack

```bash
rm -rf .next/dev
```

### 0.4 Dev server

Em um terminal dedicado:

```bash
npm run dev 2>&1 | tee /tmp/omniroute-dev.log
```

Esperar `Ready` e `Local: http://localhost:20128`. Mantenha o terminal visível durante toda a sessão — é a fonte primária de erros de backend.

### 0.5 Browser

- Chrome com **DevTools aberto** (F12), aba **Console** ativa, **filtro `error|warning`**, e a aba **Network** com "Preserve log" marcado.
- Limpar o console entre páginas (`Ctrl+L`) para isolar o ruído.
- Login com a conta admin antes de começar (algumas páginas só carregam autenticado).

### 0.6 Side-channel — busca por erros no backend

Em outro terminal:

```bash
tail -F /tmp/omniroute-dev.log | grep --line-buffered -iE "error|warn|cannot|undefined|TypeError|PageNotFoundError"
```

Mantenha aberto. Se algo aparecer enquanto você está em uma página, anote na coluna **Erros** da linha correspondente.

---

## 1. O que conta como "passou"

Uma página passa quando **todas** estas condições são atendidas:

1. HTTP final é `200` (não `4xx`/`5xx`). Redirects (`307`/`302`) só são aceitáveis se intencionais (ex.: `/dashboard` → `/home`).
2. Nenhum **error overlay** do Turbopack/React aparece na tela.
3. Nenhum `console.error` no DevTools (warnings são toleráveis, mas anote os novos).
4. Nenhuma stack trace nova no `/tmp/omniroute-dev.log`. Erros pré-existentes recorrentes (refresh de token de provider sem credencial, p.ex.) podem ser ignorados — mas confirme que são os mesmos de antes.
5. Conteúdo principal da página renderiza (não apenas o layout/sidebar vazio).
6. Pelo menos uma interação básica funciona (clique em uma aba, filtro, ou link interno) sem erro.

Se qualquer um falhar → **status `❌`**, descreva o sintoma na coluna **Erros**, corrija, recarregue, marque `✅` quando passar.

---

## 2. Categorias de erro mais comuns e padrão de correção

| Sintoma                                                          | Lugar onde aparece         | Causa típica                                                             | Onde corrigir                                                                        |
| ---------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `PageNotFoundError: route not found /(group)/...`                | Tela vermelha do Turbopack | `app/` na raiz, ou `.next/dev/` stale                                    | Voltar à §0.2/0.3                                                                    |
| `Cannot find module 'X'` em runtime                              | Tela ou log                | Import inexistente, alias quebrado                                       | Corrigir o import; checar `tsconfig.json`                                            |
| `Hydration failed because the server rendered HTML didn't match` | Console                    | Date/Math.random no render server, ou `useEffect` fora de `"use client"` | Mover lógica para `useEffect`, ou marcar a sub-árvore como `dynamic="force-dynamic"` |
| `500` em rota de API chamada pela página                         | Network + log              | Zod parse fail, DB error, validador de input                             | Ver o handler em `src/app/api/.../route.ts` e o módulo em `src/lib/db/`              |
| `Error: Text content does not match server-rendered HTML`        | Console                    | i18n key faltando, ou string diferente entre SSR/CSR                     | `npm run i18n:run -- --files=<arquivo>` ou adicionar a chave                         |
| Skeleton infinito                                                | Tela                       | `useEffect` busca dados de uma API que retorna 401/500                   | Conferir auth/proxy/middleware; testar a rota com `curl -H "cookie:..."`             |
| Sidebar/layout não renderiza                                     | Tela                       | `(dashboard)/layout.tsx` falhando                                        | Olhar o `DashboardLayout` em `src/shared/components/`                                |
| Botão/tab dispara erro ao clicar                                 | Console                    | Provider/context ausente, mock removido                                  | Verificar providers no `(dashboard)/layout.tsx`                                      |

**Regra de ouro:** se a correção exigir mais de ~20 linhas ou cruza módulos do `open-sse/`, anote como `bloqueador` e siga para a próxima página — não trave a release por um refactor.

---

## 3. Checklist de páginas (ordem sugerida)

Marque conforme avança. A ordem segue a sidebar (top → bottom) com as páginas órfãs no final. URLs assumem `http://localhost:20128`.

### 3.1 Auth & público (rodar **deslogado** primeiro, depois logar)

| Status | URL                                                                          | O que validar                                        | Erros |
| ------ | ---------------------------------------------------------------------------- | ---------------------------------------------------- | ----- |
| ☐      | `/`                                                                          | Redireciona para `/login` ou `/home` conforme sessão |       |
| ☐      | `/login`                                                                     | Form aparece, validação de campo vazio funciona      |       |
| ☐      | `/forgot-password`                                                           | Form aparece                                         |       |
| ☐      | `/landing`                                                                   | Renderiza sem CSS quebrado                           |       |
| ☐      | `/docs`                                                                      | Index dos docs carrega                               |       |
| ☐      | `/docs/api-explorer`                                                         | OpenAPI explorer carrega                             |       |
| ☐      | `/docs/quickstart` (ex. slug)                                                | Markdown renderiza                                   |       |
| ☐      | `/status`                                                                    | Status page renderiza                                |       |
| ☐      | `/terms`                                                                     | Texto carrega                                        |       |
| ☐      | `/privacy`                                                                   | Texto carrega                                        |       |
| ☐      | `/maintenance`                                                               | Página estática                                      |       |
| ☐      | `/offline`                                                                   | Página estática                                      |       |
| ☐      | `/forbidden`, `/400`, `/401`, `/403`, `/408`, `/429`, `/500`, `/502`, `/503` | Cada uma renderiza sem erro recursivo                |       |

> Após confirmar o `/login`, autentique e siga.

### 3.2 Sidebar — Home

| Status | URL          | Validação                                           | Erros |
| ------ | ------------ | --------------------------------------------------- | ----- |
| ☐      | `/dashboard` | Redireciona para `/home` (HTTP 307)                 |       |
| ☐      | `/home`      | Cards de overview renderizam, sem skeleton infinito |       |

### 3.3 Sidebar — OmniProxy

| Status | URL                                                       | Validação                                                     | Erros |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------- | ----- |
| ☐      | `/dashboard/endpoint`                                     | Lista de endpoints + tabs                                     |       |
| ☐      | `/dashboard/api-manager`                                  | Lista de API keys, botão "Create" abre modal                  |       |
| ☐      | `/dashboard/providers`                                    | Tabela de providers carrega; filtro de status funciona        |       |
| ☐      | `/dashboard/providers/new`                                | Form de novo provider; campos condicionais respondem          |       |
| ☐      | `/dashboard/providers/anthropic` (qualquer `[id]` válido) | Detalhe do provider; abas "Connections", "Models", "Validate" |       |
| ☐      | `/dashboard/combos`                                       | Lista de combos, drag/drop, modo cost-optimized               |       |
| ☐      | `/dashboard/quota`                                        | Quotas globais por provider/modelo                            |       |

#### 3.3.1 Compressão e Contexto

| Status | URL                          | Validação                                                                                                                  | Erros |
| ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----- |
| ☐      | `/dashboard/context/caveman` | Regras Caveman + preview ao vivo                                                                                           |       |
| ☐      | `/dashboard/context/rtk`     | DSL editor (Monaco) — **atenção:** se Monaco falhar com `vs/nls.messages-loader`, é regressão do fix do `MonacoEditor.tsx` |       |
| ☐      | `/dashboard/context/combos`  | Pipeline RTK→Caveman                                                                                                       |       |

#### 3.3.2 Ferramentas

| Status | URL                       | Validação                                                | Erros |
| ------ | ------------------------- | -------------------------------------------------------- | ----- |
| ☐      | `/dashboard/cli-tools`    | Lista de tools, botão "Generate config" responde sem 500 |       |
| ☐      | `/dashboard/agents`       | Lista de agents                                          |       |
| ☐      | `/dashboard/cloud-agents` | 3 cloud agents listados (codex-cloud, devin, jules)      |       |

#### 3.3.3 Integrações

| Status | URL                        | Validação                         | Erros |
| ------ | -------------------------- | --------------------------------- | ----- |
| ☐      | `/dashboard/api-endpoints` | OpenAPI auto-doc renderiza        |       |
| ☐      | `/dashboard/webhooks`      | Form de webhook + lista de events |       |

#### 3.3.4 Proxy

| Status | URL                            | Validação                           | Erros |
| ------ | ------------------------------ | ----------------------------------- | ----- |
| ☐      | `/dashboard/system/proxy`      | Config de proxy global/per-provider |       |
| ☐      | `/dashboard/system/mitm-proxy` | Cert install button, status         |       |
| ☐      | `/dashboard/system/1proxy`     | UI da feature 1proxy                |       |

### 3.4 Sidebar — Analytics

| Status | URL                                 | Validação                                 | Erros |
| ------ | ----------------------------------- | ----------------------------------------- | ----- |
| ☐      | `/dashboard/analytics`              | Dashboard de uso geral, gráficos carregam |       |
| ☐      | `/dashboard/analytics/combo-health` | Tabela + sparklines por combo             |       |
| ☐      | `/dashboard/analytics/utilization`  | Heatmap                                   |       |
| ☐      | `/dashboard/costs`                  | Custo total + breakdown                   |       |
| ☐      | `/dashboard/cache`                  | Métricas de cache, hit-rate               |       |
| ☐      | `/dashboard/analytics/compression`  | Métricas de RTK/Caveman                   |       |
| ☐      | `/dashboard/analytics/search`       | Métricas de search providers              |       |
| ☐      | `/dashboard/analytics/evals`        | Suítes de eval + run history              |       |

### 3.5 Sidebar — Monitoring

| Status | URL                        | Validação                                                  | Erros |
| ------ | -------------------------- | ---------------------------------------------------------- | ----- |
| ☐      | `/dashboard/logs`          | Hub de logs                                                |       |
| ☐      | `/dashboard/logs/proxy`    | Tail de requisições (live) — confirmar reconexão se houver |       |
| ☐      | `/dashboard/logs/console`  | Console capturado                                          |       |
| ☐      | `/dashboard/logs/activity` | Atividade do usuário                                       |       |
| ☐      | `/dashboard/health`        | Status dos providers (circuit breakers, cooldowns)         |       |
| ☐      | `/dashboard/runtime`       | Métricas runtime + memória/CPU                             |       |

#### 3.5.1 Costs / Parameters

| Status | URL                            | Validação                                | Erros |
| ------ | ------------------------------ | ---------------------------------------- | ----- |
| ☐      | `/dashboard/costs/pricing`     | Tabela pricing por modelo, edição inline |       |
| ☐      | `/dashboard/costs/budget`      | Limites mensais + alertas                |       |
| ☐      | `/dashboard/costs/quota-share` | Preview de quota sharing                 |       |

#### 3.5.2 Audit

| Status | URL                    | Validação                       | Erros |
| ------ | ---------------------- | ------------------------------- | ----- |
| ☐      | `/dashboard/audit`     | Lista de eventos audit, filtros |       |
| ☐      | `/dashboard/audit/mcp` | Audit do MCP server             |       |
| ☐      | `/dashboard/audit/a2a` | Audit do A2A                    |       |

### 3.6 Sidebar — DevTools

| Status | URL                       | Validação                             | Erros |
| ------ | ------------------------- | ------------------------------------- | ----- |
| ☐      | `/dashboard/translator`   | OpenAI ↔ Claude ↔ Gemini side-by-side |       |
| ☐      | `/dashboard/playground`   | Chat playground, streaming funciona   |       |
| ☐      | `/dashboard/search-tools` | Lista de search providers             |       |

### 3.7 Sidebar — Agentic Features

| Status | URL                       | Validação                            | Erros |
| ------ | ------------------------- | ------------------------------------ | ----- |
| ☐      | `/dashboard/mcp`          | MCP server config, 37 tools listadas |       |
| ☐      | `/dashboard/memory`       | Memory store, FTS5 search            |       |
| ☐      | `/dashboard/skills`       | 10 skills publicadas                 |       |
| ☐      | `/dashboard/agent-skills` | Skill assignment per agent           |       |
| ☐      | `/dashboard/a2a`          | A2A registry + 5 skills              |       |

### 3.8 Sidebar — Other Features

| Status | URL                             | Validação                         | Erros |
| ------ | ------------------------------- | --------------------------------- | ----- |
| ☐      | `/dashboard/leaderboard`        | Ranking + filtros                 |       |
| ☐      | `/dashboard/profile`            | Perfil do user, edição básica     |       |
| ☐      | `/dashboard/tokens`             | Tokens & API keys do user         |       |
| ☐      | `/dashboard/gamification/admin` | Admin-only — só logado como admin |       |
| ☐      | `/dashboard/cache/media`        | Cache de mídia (imagens/áudio)    |       |
| ☐      | `/dashboard/batch`              | Batch jobs                        |       |
| ☐      | `/dashboard/batch/files`        | Files API                         |       |

### 3.9 Sidebar — Configuration

| Status | URL                              | Validação                      | Erros |
| ------ | -------------------------------- | ------------------------------ | ----- |
| ☐      | `/dashboard/settings`            | Hub redireciona/exibe sub-tabs |       |
| ☐      | `/dashboard/settings/general`    | Form salva sem 500             |       |
| ☐      | `/dashboard/settings/appearance` | Trocar tema aplica             |       |
| ☐      | `/dashboard/settings/ai`         | Config de AI models            |       |
| ☐      | `/dashboard/settings/routing`    | Estratégias de combo           |       |
| ☐      | `/dashboard/settings/resilience` | Circuit breaker / cooldown     |       |
| ☐      | `/dashboard/settings/advanced`   | Toggles avançados              |       |
| ☐      | `/dashboard/settings/security`   | Auth, sessões, 2FA             |       |
| ☐      | `/dashboard/settings/pricing`    | Settings de pricing (legado)   |       |

### 3.10 Sidebar — Help

| Status | URL                         | Validação                          | Erros |
| ------ | --------------------------- | ---------------------------------- | ----- |
| ☐      | `/docs` (já testado em 3.1) | —                                  |       |
| ☐      | `/dashboard/changelog`      | Renderiza markdown do CHANGELOG.md |       |

### 3.11 Páginas órfãs (existem como rota mas não estão na sidebar)

Testar para garantir que não estão quebradas (alguém pode ter link antigo bookmarkado).

| Status | URL                      | Validação                                                      | Erros                    |
| ------ | ------------------------ | -------------------------------------------------------------- | ------------------------ |
| ☐      | `/dashboard/auto-combo`  | Página de Auto-Combo (9-factor scoring)                        |                          |
| ☐      | `/dashboard/compression` | (legado — pode ter sido absorvido por `analytics/compression`) |                          |
| ☐      | `/dashboard/limits`      | Rate limits                                                    |                          |
| ☐      | `/dashboard/onboarding`  | Wizard de primeiro setup                                       |                          |
| ☐      | `/dashboard/usage`       | Stats de uso (legado)                                          |                          |
| ☐      | `/auth/callback`         | OAuth callback — só funciona via flow real                     | (não testar manualmente) |
| ☐      | `/callback`              | Mesmo do anterior                                              | (não testar manualmente) |

---

## 4. Procedimento por página

Para cada linha do checklist:

1. **Limpar console do DevTools** (`Ctrl+L`).
2. **Navegar** clicando na sidebar (preferível a digitar URL — testa também a navegação).
3. **Esperar carregar** (até o spinner sumir e o conteúdo principal aparecer; timeout subjetivo: 10s).
4. **Olhar o DevTools Console**: qualquer `error` vermelho conta.
5. **Olhar o terminal do `tail -F /tmp/omniroute-dev.log`**: stack trace nova = falha.
6. **Interagir** com o elemento óbvio da página (1 clique em filtro/aba/CTA). Se o clique disparar erro, falha.
7. **Marcar `✅`** se ok, **`❌` + nota** se falhar.
8. **Se falhar**:
   a. Categorizar pela tabela §2.
   b. Corrigir.
   c. Salvar; aguardar Turbopack recompilar (~2-5s; olhar o terminal do dev server).
   d. Recarregar a página; refazer §1–6.
   e. Quando passar, atualizar a coluna **Erros** desta linha com "Fix: <resumo do que mudou>" e marcar `✅`.
9. **Próxima linha.**

---

## 5. Commits durante a sessão

Não acumular commits enormes. **Um fix por página**, com escopo claro:

```bash
# exemplo
git add src/app/\(dashboard\)/dashboard/<página>/page.tsx
git commit -m "fix(<area>): <descrição curta>

E2E shakedown v3.8.0: <página> quebrava com <sintoma>.
<o que mudou e por quê>"
```

Não usar `Co-Authored-By` (hard rule #16). Não rodar `--no-verify`.

Ao final da sessão, **push único** com todos os fixes:

```bash
git push origin release/v3.8.0
```

---

## 6. Encerramento da sessão

Quando todas as linhas tiverem `✅`:

1. Rodar a suíte rápida de sanidade:
   ```bash
   npm run lint
   npm run typecheck:core
   npm run test:unit
   ```
2. Anexar este arquivo (preenchido) ao PR de release ou ao tag `v3.8.0` como evidência.
3. Atualizar `CHANGELOG.md` com a linha:
   > E2E dashboard shakedown completed — see `docs/ops/E2E_DASHBOARD_SHAKEDOWN_v3.8.0.md`.
4. Subir para `main` e disparar o release.

---

## 7. Tabela "página → ajuste aplicado" (preencher na sessão)

| Página                          | Sintoma                             | Causa-raiz            | Correção                    | Commit   |
| ------------------------------- | ----------------------------------- | --------------------- | --------------------------- | -------- |
| _exemplo: /dashboard/cli-tools_ | _500 no POST /api/cli-tools/config_ | _Zod schema faltando_ | _Adicionado `.safeParse()`_ | _abc123_ |
|                                 |                                     |                       |                             |          |
|                                 |                                     |                       |                             |          |

Mantenha a tabela crescendo conforme corrige. Esse é o trail de auditoria do shakedown.
