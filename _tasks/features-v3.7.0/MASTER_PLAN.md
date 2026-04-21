# 📋 Master Execution Plan — Features v3.7.0

> **Gerado**: 2026-04-21  
> **Fonte**: Análise comparativa com [decolua/9router](https://github.com/decolua/9router) v0.3.96  
> **Referência local**: `/home/diegosouzapw/dev/proxys/9router/_references/9router/`  
> **Estimativa total**: ~34h

---

## Sumário Executivo

Sincronização do OmniRoute com o repositório de referência `decolua/9router` + issues da comunidade GitHub. Das 13 oportunidades analisadas, **4 foram eliminadas** por já estarem implementadas ou serem irrelevantes. Restam **9 tasks validadas** via deep codebase analysis.

### Tasks Eliminadas

| Task | Motivo |
|---|---|
| iFlow AI Provider | Provider parou de ser gratuito |
| Qwen Executor | Provider parou de ser gratuito |
| GitLab/CodeBuddy/Chutes | Providers nicho obscuros, baixo ROI |
| Model Catalog Sync | Já implementado (`claude-opus-4-7`, `gpt-5.4`, `gemini-3.1`, `grok-4` em `providerRegistry.ts`) |
| OAuth Headers Update | Já atualizado (GitHub `0.38.0`, Cursor `3.1.0`, Qwen DashScope em `providerHeaderProfiles.ts`) |
| OmniCode Go (#1448) | **Já implementado!** `opencode-go` existe em `providerRegistry.ts` L625-643 com GLM-5, Kimi K2.5, MiniMax M2.7/M2.5 + executor em `executors/index.ts` L32 |

---

## Diagrama de Execução

```
  ┌─────────────────────────────────────────────────────────┐
  │                    FASE 1 — BUG FIXES                   │
  │                    (Providers Quebrados)                 │
  │                                                         │
  │  T20 Fix Gemini CLI ──→ T19 Fix Antigravity             │
  │       (~1h)                   (~4h)                     │
  └───────────────────────────┬─────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────┐
  │                  FASE 2 — FEATURES ALTAS                │
  │                  (Solicitação do Usuário)                │
  │                                                         │
  │  T18 Tailscale Tunnel Integration (~6h)                 │
  └───────────────────────────┬─────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────┐
  │                  FASE 3 — EXPANSÃO                      │
  │                  (Novos Providers + Refactor)            │
  │                                                         │
  │  T21 Azure OpenAI ──→ T23 GLM-CN/Vertex Partner         │
  │       (~3h)                (~2h)                        │
  └───────────────────────────┬─────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────┐
  │                  FASE 4 — QUALIDADE                     │
  │                  (Infra + Robustez)                     │
  │                                                         │
  │  T22 Error Handling ──→ T24 Strip Lists                 │
  │       (~4h)                (~2h)                        │
  └───────────────────────────┬─────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────┐
  │                  FASE 5 — COMMUNITY                     │
  │                  (GitHub Issues)                        │
  │                                                         │
  │  T25 Extra Usage ──→ T26 Running Queries                │
  │       (~3h)                (~3h)                        │
  │         │                                               │
  │         └──→ T27 Stream ──→ T28 Vision ──→ T29 Hermes   │
  │               (~1h)          (~4h)          (~1h)       │
  └─────────────────────────────────────────────────────────┘
```

---

## Tasks Detalhadas

### FASE 1 — Bug Fixes (5h) 🔴

| # | Task | Est. | Arquivo Detalhado | Status |
|---|---|---|---|---|
| **T20** | Fix Gemini CLI — versão `1.0.0`→`0.31.0` + platform `macos`→`darwin` | 1h | [T20-fix-gemini-cli-version.md](./T20-fix-gemini-cli-version.md) | ⬜ |
| **T19** | Fix Antigravity — tool cloaking + 21 decoy tools + versão fallback | 4h | [T19-fix-antigravity-tool-cloaking.md](./T19-fix-antigravity-tool-cloaking.md) | ⬜ |

### FASE 2 — Feature Alta (6h) 🔴

| # | Task | Est. | Arquivo Detalhado | Status |
|---|---|---|---|---|
| **T18** | Tailscale Funnel — módulo core + 6 APIs + DB + UI | 6h | [T18-tailscale-tunnel-integration.md](./T18-tailscale-tunnel-integration.md) | ⬜ |

### FASE 3 — Expansão (5h) 🟡

| # | Task | Est. | Arquivo Detalhado | Status |
|---|---|---|---|---|
| **T21** | Azure OpenAI — provider dedicado com deployment URLs | 3h | [T21-azure-openai-provider.md](./T21-azure-openai-provider.md) | ⬜ |
| **T23** | GLM-CN + Vertex Partner — 2 novos providers | 2h | [T23-glm-cn-vertex-partner.md](./T23-glm-cn-vertex-partner.md) | ⬜ |

### FASE 4 — Qualidade (6h) 🟡🟢

| # | Task | Est. | Arquivo Detalhado | Status |
|---|---|---|---|---|
| **T22** | Error Handling — centralizar regras de erro | 4h | [T22-config-driven-error-handling.md](./T22-config-driven-error-handling.md) | ⬜ |
| **T24** | Strip Lists — auto-remove conteúdo multimodal incompatível | 2h | [T24-model-content-strip-lists.md](./T24-model-content-strip-lists.md) | ⬜ |

### FASE 5 — Community Issues (12h) 🟡

| # | Task | Est. | Arquivo Detalhado | Status |
|---|---|---|---|---|
| **T25** | Claude Code: Block Extra Usage — toggle per-connection (#1396) | 3h | [T25-claude-code-block-extra-usage.md](./T25-claude-code-block-extra-usage.md) | ⬜ |
| **T26** | Dashboard: Running Queries em tempo real (#1422) | 3h | [T26-dashboard-running-queries.md](./T26-dashboard-running-queries.md) | ⬜ |
| **T27** | Auto-inject `stream_options.include_usage` (#1423) | 1h | [1423-auto-inject-stream-options.plan.md](./1423-auto-inject-stream-options.plan.md) | ✅ |
| **T28** | Vision Bridge: Automatic Vision Fallback (#1424) | 4h | [1424-vision-bridge.plan.md](./1424-vision-bridge.plan.md) | ✅ |
| **T29** | Hermes quick-configuration support (#1475) | 1h | [1475-hermes-quick-configuration.plan.md](./1475-hermes-quick-configuration.plan.md) | ✅ |

---

## Índice de Referências do Código Fonte

Mapa completo de todos os arquivos do repositório de referência utilizados:

### Configuração (`open-sse/config/`)

| Arquivo de Referência | Linhas-Chave | Usado em |
|---|---|---|
| `_references/9router/open-sse/config/appConstants.js` (197L) | L4-5: Gemini CLI version+API client | T20 |
| | L7-9: `geminiCLIUserAgent()` | T20 |
| | L21-60: IDE_TYPE, PLATFORM, PLUGIN_TYPE enums + CLIENT_METADATA | T19 |
| | L66: `AG_TOOL_SUFFIX = "_ide"` | T19 |
| | L69: `CLAUDE_TOOL_SUFFIX = "_ide"` | T19 |
| | L73-94: `CC_DEFAULT_TOOLS` (19 tools Claude Code) | T19 |
| | L98-119: `AG_DEFAULT_TOOLS` (20 tools Antigravity) | T19 |
| | L122-124: `ANTIGRAVITY_HEADERS` (User-Agent 1.107.0) | T19 |
| `_references/9router/open-sse/config/errorConfig.js` (83L) | L2-14: `ERROR_TYPES` | T22 |
| | L17-29: `DEFAULT_ERROR_MESSAGES` | T22 |
| | L32-36: `BACKOFF_CONFIG` | T22 |
| | L39: `TRANSIENT_COOLDOWN_MS` | T22 |
| | L56-73: `ERROR_RULES` | T22 |
| `_references/9router/open-sse/config/providers.js` (342L) | L61-66: gemini-cli config | T20 |
| | L103-112: antigravity config (baseUrls, clientId, clientSecret) | T19 |
| | L130-134: glm-cn config | T23 |
| | L319-324: vertex-partner config | T23 |
| `_references/9router/open-sse/config/providerModels.js` (477L) | L112-114: Kiro models com `strip: ["image", "audio"]` | T24 |
| | L248-254: glm-cn models | T23 |
| | L400-405: vertex-partner models | T23 |
| | L471-476: `getModelStrip()` helper | T24 |

### Executors (`open-sse/executors/`)

| Arquivo de Referência | Linhas-Chave | Usado em |
|---|---|---|
| `_references/9router/open-sse/executors/antigravity.js` (453L) | L23-32: `buildHeaders()` | T19 |
| | L34-75: `transformRequest()` — fix roles, strip thought | T19 |
| | L119-148: `parseRetryHeaders()` | T19 |
| | L152-164: `parseRetryFromErrorMessage()` | T19 |
| | L166-258: `execute()` — retry com fallback URLs + backoff | T19 |
| | L266-340: `cloakTools()` — rename + decoys | T19 |
| | L344-450: `AG_DECOY_TOOLS` — 21 stubs | T19 |
| `_references/9router/open-sse/executors/gemini-cli.js` (68L) | L10-13: `buildUrl()` | T20 |
| | L15-23: `buildHeaders()` — usa `geminiCLIUserAgent()` | T20 |
| | L25-32: `transformRequest()` — simples | T20 |
| | L34-64: `refreshCredentials()` | T20 |

### Tunnel (`src/lib/tunnel/`)

| Arquivo de Referência | Linhas-Chave | Usado em |
|---|---|---|
| `_references/9router/src/lib/tunnel/tailscale.js` (511L) | L24-32: `getTailscaleBin()` | T18 |
| | L34-36: `isTailscaleInstalled()` | T18 |
| | L43-59: `isTailscaleLoggedIn()` | T18 |
| | L61-71: `isTailscaleRunning()` | T18 |
| | L74-84: `getTailscaleFunnelUrl()` | T18 |
| | L93-106: `installTailscale()` orchestrator | T18 |
| | L114-187: `installTailscaleMac()` | T18 |
| | L189-226: `installTailscaleLinux()` | T18 |
| | L228-281: `installTailscaleWindows()` | T18 |
| | L284-325: `startDaemonWithPassword()` | T18 |
| | L336-409: `startLogin()` | T18 |
| | L412-486: `startFunnel()` | T18 |
| | L489-493: `stopFunnel()` | T18 |
| | L496-510: `stopDaemon()` | T18 |
| `_references/9router/src/lib/tunnel/state.js` (88L) | L16-34: load/save/clearState | T18 |
| | L58-76: tailscale PID management | T18 |
| | L81-87: `generateShortId()` | T18 |
| `_references/9router/src/lib/tunnel/tunnelManager.js` (211L) | L158-192: `enableTailscale()` | T18 |
| | L194-200: `disableTailscale()` | T18 |
| | L202-210: `getTailscaleStatus()` | T18 |

### API Routes (`src/app/api/tunnel/`)

| Arquivo de Referência | Linhas | Usado em |
|---|---|---|
| `_references/9router/src/app/api/tunnel/tailscale-check/route.js` | 43L | T18 |
| `_references/9router/src/app/api/tunnel/tailscale-install/route.js` | 68L | T18 |
| `_references/9router/src/app/api/tunnel/tailscale-login/route.js` | 15L | T18 |
| `_references/9router/src/app/api/tunnel/tailscale-start-daemon/route.js` | 22L | T18 |
| `_references/9router/src/app/api/tunnel/tailscale-enable/route.js` | 13L | T18 |
| `_references/9router/src/app/api/tunnel/tailscale-disable/route.js` | 13L | T18 |
| `_references/9router/src/app/api/tunnel/status/route.js` | 15L | T18 |

---

## Comandos de Verificação

```bash
# Após cada task:
npm run typecheck:core
npm run lint
node --import tsx/esm --test tests/unit/plan3-p0.test.ts

# Build completo:
npm run check

# Testes completos:
npm run test:all
```
