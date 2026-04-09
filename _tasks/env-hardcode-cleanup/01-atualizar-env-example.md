# Task 1: Atualizar `.env.example` com Todos os Valores Reais

## Objetivo
Tornar o `.env.example` a **fonte única de verdade** para todas as credenciais OAuth e configurações. Todos os valores que hoje estão hardcoded no código devem ter seus valores reais definidos aqui, ativados (não comentados).

## Contexto
Hoje o `.env.example` já tem alguns valores (ANTIGRAVITY, GEMINI, QODER secrets), mas faltam todos os Client IDs e outros secrets. O código em `oauth.ts` usa fallbacks `|| "valor"` que devem ser eliminados depois que o `.env.example` tiver tudo.

## Arquivo Alvo
`/home/diegosouzapw/dev/proxys/9router/.env.example`

## Mudanças Necessárias

### 1. Reorganizar a seção de OAuth Credentials

Substituir a seção atual de OAuth (linhas ~96-134) por uma seção unificada e completa:

```env
# ═══════════════════════════════════════════════════
#   OAUTH PROVIDER CREDENTIALS
# ═══════════════════════════════════════════════════
# These are the built-in default credentials that work for localhost setups.
# For remote/VPS deployments, register your own credentials at each provider.
# The sync-env script will auto-populate these in your .env if missing.

# ── Claude Code (Anthropic) ──
CLAUDE_OAUTH_CLIENT_ID=9d1c250a-e61b-44d9-88ed-5944d1962f5e

# ── Codex / OpenAI ──
CODEX_OAUTH_CLIENT_ID=app_EMoamEEZ73f0CkXaXp7hrann

# ── Gemini (Google) ──
GEMINI_OAUTH_CLIENT_ID=681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=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

# ── Gemini CLI (Google) ──
GEMINI_CLI_OAUTH_CLIENT_ID=681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com
GEMINI_CLI_OAUTH_CLIENT_SECRET=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

# ── Qwen (Alibaba) ──
QWEN_OAUTH_CLIENT_ID=f0304373b74a44d2b584a3fb70ca9e56

# ── Kimi Coding (Moonshot) ──
KIMI_CODING_OAUTH_CLIENT_ID=17e5f671-d194-4dfb-9706-5516cb48c098

# ── Antigravity (Google Cloud Code) ──
ANTIGRAVITY_OAUTH_CLIENT_ID=1071006060591-tmhssin2h21lcre235vtolojh4g403ep.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=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

# ── GitHub Copilot ──
GITHUB_OAUTH_CLIENT_ID=Iv1.b507a08c87ecfe98

# ── Qoder ──
QODER_OAUTH_CLIENT_SECRET=4Z3YjXycVsQvyGF1etiNlIBB4RsqSDtW

# ── Qoder (URLs — set these to enable Qoder OAuth login) ──
# QODER_OAUTH_AUTHORIZE_URL=
# QODER_OAUTH_TOKEN_URL=
# QODER_OAUTH_USERINFO_URL=
# QODER_OAUTH_CLIENT_ID=
```

### 2. Remover linhas duplicadas/comentadas

Remover as linhas que hoje estão como comentários `# ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret` etc., pois agora os valores reais estão ativos.

### 3. Manter seção de instrução para servidor remoto

Manter (e melhorar) o bloco de comentários que explica que para VPS o usuário deve criar suas próprias credenciais Google:

```env
# ─────────────────────────────────────────────────────────────────────────────
# ⚠️  GOOGLE OAUTH (Antigravity, Gemini CLI) — IMPORTANT FOR REMOTE SERVERS
# ─────────────────────────────────────────────────────────────────────────────
# The credentials above ONLY work when OmniRoute runs on localhost.
# If you are hosting OmniRoute on a remote server, register your own:
#   1. Go to https://console.cloud.google.com/apis/credentials
#   2. Create an OAuth 2.0 Client ID (type: "Web application")
#   3. Add your server URL as Authorized redirect URI
#   4. Replace the values above with your credentials.
# ─────────────────────────────────────────────────────────────────────────────
```

## Critérios de Aceite
- [ ] Todas as 12 credenciais do inventário estão no `.env.example` com valores reais
- [ ] Nenhum valor está comentado (todos ativos com `KEY=value`)
- [ ] Seção organizada por provider com comentários claros
- [ ] Instrução de servidor remoto mantida
- [ ] Formato consistente: `KEY=valor` sem aspas, sem espaços
