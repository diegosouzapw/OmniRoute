# 🔧 Cleanup: Eliminar Hardcoded Credentials + Auto .env + Fix Update

> **Branch:** `release/v3.5.6`
> **Data:** 2026-04-09
> **Impacto:** Segurança, DX, Manutenibilidade

## Resumo

Mover todas as 12 credenciais OAuth hardcoded de `oauth.ts` para `.env.example`, criar script
de auto-sync que garante `.env` completo em toda instalação/atualização, e corrigir o update
pelo painel para instalações via git clone.

## Ordem de Execução

| # | Task | Arquivo Principal | Dependências |
|---|------|------------------|--------------|
| 1 | [Atualizar .env.example](./01-atualizar-env-example.md) | `.env.example` | — |
| 2 | [Remover Hardcoded OAuth](./02-remover-hardcoded-oauth.md) | `oauth.ts` | Task 1, 3 |
| 3 | [Criar sync-env.mjs](./03-criar-sync-env-script.md) | `scripts/sync-env.mjs` | Task 1 |
| 4 | [Integrar no Lifecycle](./04-integrar-lifecycle.md) | `postinstall.mjs`, `package.json` | Task 3 |
| 5 | [Fix Panel Update](./05-fix-panel-update-source.md) | `autoUpdate.ts`, `version/route.ts` | — |
| 6 | [Testes e Validação](./06-testes-validacao-final.md) | — | Tasks 1-5 |

## Ordem Recomendada de Implementação

```
Task 1 (env.example) ──→ Task 3 (sync-env) ──→ Task 4 (lifecycle)
                                                       ↓
Task 5 (panel update) ─────────────────────→ Task 2 (remover hardcoded)
                                                       ↓
                                              Task 6 (testes finais)
```

> **⚠️ IMPORTANTE:** Task 2 deve ser a última a ser implementada, pois remover os fallbacks
> hardcoded antes de ter o sync-env funcionando quebraria o sistema para quem não tem `.env`.

## Inventário Completo

12 credenciais movidas de `src/lib/oauth/constants/oauth.ts` → `.env.example`:

| Provider | Env Var | Tipo |
|----------|---------|------|
| Claude | `CLAUDE_OAUTH_CLIENT_ID` | Client ID |
| Codex/OpenAI | `CODEX_OAUTH_CLIENT_ID` | Client ID |
| Gemini | `GEMINI_OAUTH_CLIENT_ID` | Client ID |
| Gemini | `GEMINI_OAUTH_CLIENT_SECRET` | Client Secret |
| Gemini CLI | `GEMINI_CLI_OAUTH_CLIENT_ID` | Client ID |
| Gemini CLI | `GEMINI_CLI_OAUTH_CLIENT_SECRET` | Client Secret |
| Qwen | `QWEN_OAUTH_CLIENT_ID` | Client ID |
| Kimi | `KIMI_CODING_OAUTH_CLIENT_ID` | Client ID |
| Antigravity | `ANTIGRAVITY_OAUTH_CLIENT_ID` | Client ID |
| Antigravity | `ANTIGRAVITY_OAUTH_CLIENT_SECRET` | Client Secret |
| GitHub | `GITHUB_OAUTH_CLIENT_ID` | Client ID |
| Qoder | `QODER_OAUTH_CLIENT_SECRET` | Client Secret |
