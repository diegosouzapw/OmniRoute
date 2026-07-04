<!-- gen:agent-index v1 -->
# open-sse/ executors -- Agent Navigation Index

> **Auto-generated** by `scripts/build/gen-agent-index.mjs` from `open-sse/executors/index.ts`. Do not edit by hand -- regen with `npm run gen:agent-index`. Drift is gated by `npm run check:agent-index`.

**Surface:** 53 executor classes covering 59 primary provider ids and 39 aliases, 1081.6 KB of source in `open-sse/executors/*.ts` (excludes `base.ts`, `default.ts`, `index.ts`).

**Bifrost migration (Wk 2 of `docs/architecture/cluster-decisions.md`):** The Wk-2 providers (openai, anthropic, claude, gemini, ollama) are bypassed via the sidecar (`ghcr.io/maximhq/bifrost`) and are **not** first-class executors here. No `T1` tag appears below; the rollout will reduce traffic on this directory as Wk-2 lands, but no executor file is removed in this window.

## How to read this index

Each row is **one executor class** (one `.ts` file). The `Primary ids` column shows the provider ids `index.ts` instantiates this class for. The `Aliases` column lists short forms (`cu` for `cursor`, etc.) that route to the same executor. The `Recent` column counts `git log --follow` commits -- high numbers signal "active churn, expect breaking changes"; low numbers are "stable, can be learned once."

If your task touches a *specific* provider, read only `open-sse/executors/<file>.ts` and `open-sse/config/providerRegistry.ts`. **Do not read every row below** unless you are auditing the whole executor surface.

## Executor surface (sorted by file size)

| Executor class | File | Size | Primary ids | Aliases | Recent commits | Last touch | T |
| --- | --- | ---: | --- | --- | ---: | --- | --- |
| `ChatGptWebExecutor` | `open-sse/executors/chatgpt-web.ts` | 115.9 KB | chatgpt-web | cgpt-web | 14 | 2026-07-03 |  |
| `AntigravityExecutor` | `open-sse/executors/antigravity.ts` | 69.2 KB | antigravity, agy | - | 25 | 2026-07-03 |  |
| `GrokWebExecutor` | `open-sse/executors/grok-web.ts` | 64.7 KB | grok-web | - | 10 | 2026-07-03 |  |
| `CursorExecutor` | `open-sse/executors/cursor.ts` | 58.7 KB | cursor | cu | 12 | 2026-07-03 |  |
| `CodexExecutor` | `open-sse/executors/codex.ts` | 57.7 KB | codex | - | 21 | 2026-07-03 |  |
| `DuckDuckGoWebExecutor` | `open-sse/executors/duckduckgo-web.ts` | 38.8 KB | duckduckgo-web | ddgw | 13 | 2026-07-03 |  |
| `MuseSparkWebExecutor` | `open-sse/executors/muse-spark-web.ts` | 37.8 KB | muse-spark-web | ms-web | 11 | 2026-07-03 |  |
| `KiroExecutor` | `open-sse/executors/kiro.ts` | 34.5 KB | kiro, amazon-q | - | 13 | 2026-07-03 |  |
| `PerplexityWebExecutor` | `open-sse/executors/perplexity-web.ts` | 33.9 KB | perplexity-web | pplx-web | 13 | 2026-07-03 |  |
| `InnerAiExecutor` | `open-sse/executors/inner-ai.ts` | 27.5 KB | inner-ai | in-ai | 9 | 2026-06-29 |  |
| `WindsurfExecutor` | `open-sse/executors/windsurf.ts` | 27.2 KB | windsurf | ws | 6 | 2026-06-05 |  |
| `CopilotWebExecutor` | `open-sse/executors/copilot-web.ts` | 26.0 KB | copilot-web | copilot | 7 | 2026-06-29 |  |
| `HuggingChatExecutor` | `open-sse/executors/huggingchat.ts` | 24.8 KB | huggingchat | hc | 10 | 2026-07-03 |  |
| `CommandCodeExecutor` | `open-sse/executors/commandCode.ts` | 23.6 KB | command-code | cmd | 14 | 2026-07-02 |  |
| `BlackboxWebExecutor` | `open-sse/executors/blackbox-web.ts` | 22.5 KB | blackbox-web | bb-web | 8 | 2026-06-29 |  |
| `BedrockExecutor` | `open-sse/executors/bedrock.ts` | 22.0 KB | bedrock | - | 7 | 2026-06-17 |  |
| `T3ChatWebExecutor` | `open-sse/executors/t3-chat-web.ts` | 20.3 KB | t3-web | t3chat | 10 | 2026-07-02 |  |
| `GitlabExecutor` | `open-sse/executors/gitlab.ts` | 19.5 KB | gitlab, gitlab-duo | - | 8 | 2026-07-03 |  |
| `MimocodeExecutor` | `open-sse/executors/mimocode.ts` | 19.2 KB | mimocode | mcode | 5 | 2026-06-30 |  |
| `CliproxyapiExecutor` | `open-sse/executors/cliproxyapi.ts` | 18.1 KB | cliproxyapi | cpa | 9 | 2026-07-03 |  |
| `AdaptaWebExecutor` | `open-sse/executors/adapta-web.ts` | 17.8 KB | adapta-web | adp-web | 9 | 2026-06-29 |  |
| `DevinCliExecutor` | `open-sse/executors/devin-cli.ts` | 17.4 KB | devin-cli | devin | 6 | 2026-06-05 |  |
| `TraeExecutor` | `open-sse/executors/trae.ts` | 17.4 KB | trae | - | 6 | 2026-06-29 |  |
| `GlmExecutor` | `open-sse/executors/glm.ts` | 16.5 KB | glm, glm-cn, glmt | - | 8 | 2026-06-19 |  |
| `KimiWebExecutor` | `open-sse/executors/kimi-web.ts` | 16.5 KB | kimi-web | - | 10 | 2026-07-03 |  |
| `QwenWebExecutor` | `open-sse/executors/qwen-web.ts` | 16.4 KB | qwen-web | qw | 13 | 2026-07-03 |  |
| `LMArenaExecutor` | `open-sse/executors/lmarena.ts` | 15.9 KB | lmarena | lma | 4 | 2026-06-29 |  |
| `GithubExecutor` | `open-sse/executors/github.ts` | 15.7 KB | github | - | 11 | 2026-07-02 |  |
| `GeminiBusinessExecutor` | `open-sse/executors/gemini-business.ts` | 15.2 KB | gemini-business | gembiz | 2 | 2026-06-29 |  |
| `NlpCloudExecutor` | `open-sse/executors/nlpcloud.ts` | 14.4 KB | nlpcloud | - | 6 | 2026-06-05 |  |
| `ChipotleExecutor` | `open-sse/executors/chipotle.ts` | 12.7 KB | chipotle | pepper | 4 | 2026-06-29 |  |
| `GeminiWebExecutor` | `open-sse/executors/gemini-web.ts` | 12.2 KB | gemini-web | gweb | 8 | 2026-06-29 |  |
| `VeoAIFreeWebExecutor` | `open-sse/executors/veoaifree-web.ts` | 12.0 KB | veoaifree-web | veo-free | 8 | 2026-06-29 |  |
| `QoderExecutor` | `open-sse/executors/qoder.ts` | 11.7 KB | qoder | - | 11 | 2026-07-03 |  |
| `OpencodeExecutor` | `open-sse/executors/opencode.ts` | 10.5 KB | opencode-zen, opencode-go | opencode | 12 | 2026-07-02 |  |
| `TheOldLlmExecutor` | `open-sse/executors/theoldllm.ts` | 10.2 KB | theoldllm | tllm | 6 | 2026-07-03 |  |
| `ZenmuxFreeExecutor` | `open-sse/executors/zenmux-free.ts` | 9.7 KB | zenmux-free | zmf | 1 | 2026-06-27 |  |
| `CopilotM365WebExecutor` | `open-sse/executors/copilot-m365-web.ts` | 9.4 KB | copilot-m365-web | - | 1 | 2026-06-29 |  |
| `VertexExecutor` | `open-sse/executors/vertex.ts` | 7.5 KB | vertex, vertex-partner | - | 8 | 2026-06-16 |  |
| `NineRouterExecutor` | `open-sse/executors/ninerouter.ts` | 7.4 KB | 9router | nr | 6 | 2026-06-05 |  |
| `GrokCliExecutor` | `open-sse/executors/grok-cli.ts` | 7.4 KB | grok-cli | gc | 2 | 2026-06-29 |  |
| `VeniceWebExecutor` | `open-sse/executors/venice-web.ts` | 5.2 KB | venice-web | ven | 7 | 2026-06-29 |  |
| `V0VercelWebExecutor` | `open-sse/executors/v0-vercel-web.ts` | 5.1 KB | v0-vercel-web | v0 | 7 | 2026-06-29 |  |
| `DoubaoWebExecutor` | `open-sse/executors/doubao-web.ts` | 5.1 KB | doubao-web | db | 7 | 2026-06-29 |  |
| `PoeWebExecutor` | `open-sse/executors/poe-web.ts` | 4.9 KB | poe-web | poe | 7 | 2026-06-29 |  |
| `DeepSeekWebWithAutoRefreshExecutor` | `open-sse/executors/deepseek-web-with-auto-refresh.ts` | 4.6 KB | deepseek-web | ds-web | 8 | 2026-07-03 |  |
| `KimiExecutor` | `open-sse/executors/kimi.ts` | 4.5 KB |  | kimi-coding-apikey, kimi-coding | 3 | 2026-06-05 |  |
| `PollinationsExecutor` | `open-sse/executors/pollinations.ts` | 3.8 KB | pollinations | pol | 9 | 2026-06-25 |  |
| `ClaudeWebWithAutoRefresh` | `open-sse/executors/claude-web-with-auto-refresh.ts` | 3.7 KB | claude-web | cw-web | 6 | 2026-06-05 |  |
| `CloudflareAIExecutor` | `open-sse/executors/cloudflare-ai.ts` | 3.2 KB | cloudflare-ai | cf | 6 | 2026-06-05 |  |
| `CodeBuddyCnExecutor` | `open-sse/executors/codebuddy-cn.ts` | 2.1 KB | codebuddy-cn | cbcn | 2 | 2026-06-27 |  |
| `PuterExecutor` | `open-sse/executors/puter.ts` | 2.0 KB | puter | pu | 6 | 2026-06-05 |  |
| `AzureOpenAIExecutor` | `open-sse/executors/azure-openai.ts` | 1.6 KB | azure-openai | - | 7 | 2026-06-27 |  |

**T column (reserved for future migration waves):** `T1` = first-class executor that the sidecar will retire. The current Wk-2 rollout (openai, anthropic, claude, gemini, ollama) is bypass-only -- they have no first-class executor here, so they carry no tag in this table. `T1` will become live for any executor whose primary id lands in `BIFROST_PROVIDER_IDS` (see `scripts/build/gen-agent-index.mjs`).

## Non-executor helpers in `open-sse/executors/`

The directory also carries non-executor helpers that exist to support executors but are not providers themselves. **Do not enumerate them as providers**; they are out of scope for this index.

- `base.ts` -- `BaseExecutor` abstract class; every executor extends this. Read once if you are implementing a new provider.
- `default.ts` -- `DefaultExecutor`; the catch-all that `getExecutor()` returns for unknown provider ids (with caching). Skip when auditing specific providers.
- `<executor>Errors.ts` / `<executor>Identity.ts` / `<executor>Media.ts` -- extraction utilities split out of large executors. No registry entry by design.
- `*-fetch.ts` (firecrawl / jina / tavily) -- upstream fetch adapters; toolchain layer, not providers.

## Conventions for new executors

1. Drop a single file `open-sse/executors/<kebab-id>.ts` exporting a class extending `BaseExecutor`.
2. Add `import { <Class>Executor } from "./<kebab-id>.ts";` to `open-sse/executors/index.ts` imports (lines 1-55).
3. Register it in the `executors = { ... }` map at `open-sse/executors/index.ts:56+`. Use the kebab-id as the primary key; add aliases inline as `// Alias for <id>`.
4. If the provider is canonical, also register it in `src/shared/constants/providers.ts` (gated by `check-provider-consistency`).
5. Run `npm run gen:agent-index` to refresh this file; CI fails if you forget.
