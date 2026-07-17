# T34: Bifrost v1.2.30 → v1.5.21 Bump — Research & Prep Findings

**Author:** forge-2 (research, no code changes)
**Date:** 2026-06-20
**Repo:** `github.com/KooshaPari/argis-extensions` (this checkout is **module** `github.com/kooshapari/bifrost-extensions`)
**Working dir:** `/Users/kooshapari/CodeProjects/Phenotype/repos/argis-extensions`
**v11 context:** v11 branch `chore/orch-v11-016-tier0-2026-06-20` @ `7184fbb`. Local `main` HEAD = `e417124` (per `git rev-parse HEAD`). `origin/main` = `beca432`. T34 branch `chore/t34-bifrost-bump-2026-06-20` already exists at `a1751bd` (on top of T34 commit `6bbbc2d`) — T34 was attempted in a prior session and **not merged into `main`**.

---

## 1. Current Bifrost pin state (on local `main` @ `e417124`)

| Source                        | Value                                                                                                          |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `go.mod` `require`            | `github.com/maximhq/bifrost/core v1.2.30`                                                                      |
| `go.mod` `replace` (line 121) | `replace github.com/maximhq/bifrost/core => ./bifrost/core`                                                    |
| `bifrost/core/` (local fork)  | 49-line `core.go` re-exporting types from `./bifrost/core/schemas/schemas.go` (562-line shim)                  |
| `bifrost/core/go.mod`         | `module github.com/maximhq/bifrost/core` / `go 1.21` — module path matches the upstream path so it satisfies the require+replace pair with zero source modifications to the 9 plugins |
| `bifrost/core/schemas/`       | Single file `schemas.go` (562 lines) — only the types the 9 plugins currently touch are exported (no `EmbeddingData`, `Message`, `ChatMessage`, `ChatTool`, etc. are complete). |
| `go.sum`                      | **Zero** `maximhq/bifrost` entries (the replace points to a local module, so no checksum recorded)             |
| `go` directive                | `go 1.25.0`                                                                                                    |

The "v1.2.30 pin" is symbolic: `go.mod` *says* v1.2.30 but the resolved package is the local shim, **not** the upstream Maxim-published artifact. The 9 plugins have been written against the local shim's surface for the entirety of the visible git history.

---

## 2. Upstream v1.5.21 surface (verified from real source)

I performed a shallow clone of upstream at the tag `core/v1.5.21` to `/tmp/bifrost-research/bifrost/` (the tag namespace is `core/vX.Y.Z` — `git ls-remote --tags` confirms `refs/tags/core/v1.5.21 → 6a20d53927decc6a0c03c8e1af0eb2ee5724c8c1`). Key facts:

- **`go.mod`:** `module github.com/maximhq/bifrost/core` / `go 1.26.4` (forces a Go toolchain bump on the host module from `1.25.0` → `1.26.4`).
- **`schemas/` directory:** 70 files (`plugin.go`, `chatcompletions.go`, `embedding.go`, `textcompletions.go`, `bifrost.go`, `account.go`, `provider.go`, `mcp.go`, `bifrost_request/response.go`, …) vs the local shim's 1 file. Schemas split by request/response type, with typed `*Request → *Response → *LLMPluginShortCircuit → Plugin` interface for each category.
- **Plugin taxonomy** (`schemas/plugin.go:208-319`): the upstream replaced the single `Plugin` interface (from the v1.2.30 era) with **five typed, composable interfaces**:
  - `BasePlugin` (only `GetName()`, `Cleanup()`)
  - `HTTPTransportPlugin` (HTTP-transport-layer hooks: `HTTPTransportPreHook`, `HTTPTransportPostHook`, `HTTPTransportStreamChunkHook`)
  - `LLMPlugin` (`PreRequestHook` + `PreLLMHook` + `PostLLMHook`) ← the v1.2.30 `Plugin` interface is a **strict subset** of this
  - `MCPPlugin` (new in v1.5.x; the gateway fleet doesn't use MCP yet)
  - `ConfigMarshallerPlugin`, `ObservabilityPlugin`, etc. (irrelevant for argis-extensions)
- **`context` parameter** is now `*BifrostContext` (not `context.Context`); every hook receives a typed context carrying trace, virtual-key, routing-rule, business-unit, retry-count, and 100+ typed keys (`BifrostContextKey*`).
- **`BifrostError`** (`schemas/bifrost.go:1692-1701`): `Err` / `Message` → **`Error *ErrorField`** (nested); `ExtraFields BifrostErrorExtraFields` now mandatory; new fields `EventID`, `Type`, `IsBifrostError`, `AllowFallbacks *bool`, `StreamControl *StreamControl`.
- **`BifrostRequest`** (`schemas/bifrost.go:462-511`): 30+ typed sub-request pointers (`TextCompletionRequest`, `ChatRequest`, `EmbeddingRequest`, `RerankRequest`, `SpeechRequest`, `ResponsesRequest`, `PassthroughRequest`, …) — the **only** unified field is `RequestType RequestType` + per-sub-request `*Bifrost<X>Request` pointer. The v1.2.30 `Params map[string]interface{}` is **gone** from the envelope; params live on each sub-request's typed `Params` field (e.g. `ChatRequest.Params.Tools []ChatTool`).
- **`BifrostResponse`** (`schemas/bifrost.go:962-1009`): mirror of request — 30+ typed sub-response pointers. `Choices` is `[]BifrostResponseChoice` with `*BifrostLLMUsage` (was `Usage` struct, now a pointer and an "LLM" namespace prefix).
- **`TextCompletionInput`** (`schemas/textcompletions.go:77-80`): `{PromptStr *string, PromptArray []string}` — replaces the v1.2.30 flat `string Input` field.
- **`EmbeddingInput`** (`schemas/embedding.go:40-45`): `{Text *string, Texts []string, Embedding []int, Embeddings [][]int}` — replaces v1.2.30 flat `Input string` / `Texts []string` on the request.

---

## 3. Exact API surface delta (v1.2.30 local-shim surface → v1.5.21 upstream)

Compiled by cross-referencing the local `bifrost/core/schemas/schemas.go` (562 lines, the v1.2.30-era shim) and the upstream `core/v1.5.21` schemas. **Bolded lines are the breaking changes**; items already drifted in the shim but not upstream are noted as "shim-only" for context.

### 3.1 Interface shape

| v1.2.30 (shim, lines 287-297)                                      | v1.5.21 (upstream, `plugin.go:208-288`)                                                                | Severity |
| :------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------- | :------- |
| **single `Plugin` interface** with `GetName`, `Config`, `TransportInterceptor(ctx, *BifrostRequest) → (*BifrostRequest, *PluginShortCircuit, error)`, `PreHook(ctx, *BifrostRequest)`, `PostHook(ctx, *BifrostResponse)`, `Cleanup` | **`LLMPlugin` interface** with `PreRequestHook(*BifrostContext, *BifrostRequest)`, `PreLLMHook(*BifrostContext, *BifrostRequest) → (*BifrostRequest, *LLMPluginShortCircuit, error)`, `PostLLMHook(*BifrostContext, *BifrostResponse, *BifrostError) → (*BifrostResponse, *BifrostError, error)`, `Cleanup`. `BasePlugin` only has `GetName` + `Cleanup`. | **BREAKING** |
| `ctx context.Context` (or `*context.Context` in some plugins)       | `ctx *BifrostContext` (typed)                                                                          | **BREAKING** |
| `PluginShortCircuit{Response, Error}`                               | `LLMPluginShortCircuit{Response, Error}` (separate type; `MCPPluginShortCircuit` is sibling)          | **BREAKING** |
| 1 envelope: `BifrostRequest{CompletionRequest, ChatRequest, EmbeddingRequest, Params map}` | 30 envelopes: `*Bifrost<X>Request` + typed `RequestType` discriminator + `Fallbacks []Fallback` per sub-request | **BREAKING** |
| `PostHook(ctx, *BifrostResponse) → (*BifrostResponse, error)` (2 returns) | `PostLLMHook(ctx, *BifrostResponse, *BifrostError) → (*BifrostResponse, *BifrostError, error)` (4 returns) | **BREAKING** |
| `TransportInterceptor(ctx, *BifrostRequest)`                        | removed from `LLMPlugin`; replaced by `HTTPTransportPlugin{HTTPTransportPreHook, HTTPTransportPostHook, HTTPTransportStreamChunkHook}` | **BREAKING** |

### 3.2 Type renames & field shifts

| v1.2.30 (shim)                                              | v1.5.21 (upstream)                                                                                  | Severity |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :------- |
| `BifrostRequest.TextCompletionRequest()` (method)           | `BifrostRequest.TextCompletionRequest` (field, *pointer*)                                           | **BREAKING** |
| `BifrostRequest.Params map[string]interface{}`              | gone from envelope; per-sub-request `Params` typed field                                             | **BREAKING** |
| `CompletionRequest.Input string`                            | `BifrostTextCompletionRequest.Input *TextCompletionInput`                                          | **BREAKING** |
| `CompletionRequest.Messages []Message` / `Params.Tools []ChatTool` flat fields | `BifrostChatRequest.Input []ChatMessage` / `BifrostChatRequest.Params *ChatParameters` (nested struct) | **BREAKING** |
| `EmbeddingRequest{Provider, Model, Input, Texts, Params}` flat | `BifrostEmbeddingRequest{Provider, Model, Input *EmbeddingInput, Params *EmbeddingParameters, Fallbacks []Fallback}` | **BREAKING** |
| `EmbeddingParams.Dimensions int`                            | `EmbeddingParameters.Dimensions *int` (pointer)                                                     | **BREAKING** |
| `EmbeddingData.Embedding []float32`                         | `EmbeddingData.EmbeddingArray []float64`                                                            | **BREAKING** (type + width) |
| `Message{Role, Content string}` (flat)                      | `ChatMessage{Role, Content *ChatMessageContent}` (Content is now a typed struct, can be string OR content blocks) | **BREAKING** |
| `Message` and `ChatMessage` are **type aliases** of each other (shim line 91) | `ChatMessage` only (no `Message` type in upstream — 9 plugins reference `schemas.Message` 6 times) | **BREAKING** |
| `Usage{PromptTokens, CompletionTokens, TotalTokens}` flat   | `BifrostLLMUsage` (renamed) + pointer on responses (`*BifrostLLMUsage`)                             | **BREAKING** |
| `BifrostError{Message, Code, StatusCode, AllowFallbacks, RawError, Err *ErrorField}` flat | `BifrostError{EventID, Type, IsBifrostError, StatusCode, Error *ErrorField, AllowFallbacks *bool, StreamControl *StreamControl, ExtraFields BifrostErrorExtraFields}` nested | **BREAKING** |
| `BifrostResponse{CompletionResponse, EmbeddingResponse, ChatResponse, ExtraFields}` flat | `BifrostResponse{*Bifrost<X>Response}` 30 envelopes; `ExtraFields` lives on the sub-response         | **BREAKING** |
| `ChatResponse.Content string` (flat shortcut)               | removed; must walk `Choices[].Message.Content.ContentStr` (or `Choices[].Text`)                    | **BREAKING** |
| `ChatResponse.Usage Usage` (struct)                         | `BifrostChatResponse.Usage *BifrostLLMUsage` (pointer)                                              | **BREAKING** |
| `BifrostRequest.SetProvider(provider string)`               | `BifrostRequest.SetProvider(provider ModelProvider)` (already typed at call sites — no change)      | source-level |
| `Plugin.GetConfig() map[string]interface{}`                 | removed from `BasePlugin`; config is now host-supplied via `BifrostConfig`                         | **BREAKING** |
| `plugins/*/plugin.go` reference `req.Params["tools"]` (map) | must read `req.ChatRequest.Params.Tools` (typed slice)                                              | **BREAKING** |

### 3.3 Provider / constant renames (informational)

- `ProviderOpenAI/ProviderAnthropic/ProviderGemini/ProviderCustom` constants unchanged.
- `Gemini/OpenAI/Anthropic` aliases on `Provider` still exist; `Mistral/Bedrock/Cohere/Voyage` constants in the local shim (lines 397-400) are **shim-only** and not in upstream — clean removal is safe.
- `RequestType` enum becomes the discriminator on `BifrostRequest` (new in v1.5.x); not present in the shim.

---

## 4. Per-plugin compatibility assessment (9 plugins, current `main` @ `e417124`)

Severity legend: **GREEN** = trivially unaffected, **YELLOW** = code-migration needed, **RED** = blocked by interface redesign (must re-author).

| # | Plugin                   | Uses Bifrost types                                               | Severity | Specific migration notes (matched against T34 commit `6bbbc2d` + this analysis)                                                                                                                                                                                                                                                                                                                              |
| :- | :----------------------- | :--------------------------------------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **contentsafety**        | `Plugin`, `BifrostError`, `ChatResponse`, `Content`              | **YELLOW** | T34 already migrated `plugin.go` (29 lines, +20/-9): `BifrostError.Err → Error`, `ChatResponse.Content → Choices[].ChatNonStreamResponseChoice.Message.Content.ContentStr`, `import strings`. Re-running T34 from main re-applies the same diff. **No new blockers.**                                                                                                                                                                                                                                                                  |
| 2 | **contextfolding**       | `Message`, `ChatMessage`, `BifrostRequest`, `Plugin`             | **YELLOW** | T34 already migrated `folding.go` + `helpers.go` (+59/-27 and +20/-12). The 6 references to `schemas.Message` (in `folding.go`) collapse to `ChatMessage` per §3.2; the `toChatMessages`/`toMessages` shims in `folding.go:11-32` become no-ops (both in/out are `ChatMessage`).                                                                                                                                                                                                                                                                |
| 3 | **intelligentrouter**    | `BifrostRequest`, `ChatRequest`, `ChatTool`, `Plugin`            | **YELLOW** | T34 already migrated `decision.go` + `semantic.go` (+26/-13, +15/-10). Five distinct changes: `extractPrompt` (TextCompletionRequest method→field, Input string→`*TextCompletionInput`), `logDecisionOutcome` (Usage struct→`*BifrostLLMUsage`), `extractFeatures` (`req.Params["tools"/"tool_choice"]` map→`req.ChatRequest.Params.Tools/ToolChoice` typed), `applyDecision` (SetProvider already typed). Largest single-plugin diff.                                            |
| 4 | **learning**             | `Plugin`, `BifrostRequest`, `BifrostResponse`                    | **RED**    | Production code is compatible after T34-style signature swap (`TransportInterceptor`, `PreHook`, `PostHook` 3-arg form, `*BifrostContext`). **But** `learning_test.go` calls `PostHook(ctx, resp, nil)` (3-arg) where the production `learning.go` defines `PostHook(ctx, resp)` (2-arg). Per the T34 commit message: pre-existing test/prod signature mismatch is **out of T34 scope**. Must run T34.1 to migrate production to v1.5.21 3-arg `PostLLMHook`. |
| 5 | **promptadapter**        | — (does NOT import `bifrost/core/schemas`)                       | **GREEN**  | No `schemas` imports; uses its own `Message`/`Plugin` types. Has `ID()`/`Name()`/`Adapt()` methods — not the Bifrost Plugin interface. **No change needed.** Out of T34 scope by construction.                                                                                                                                                                                                                                                                                  |
| 6 | **researchintel**        | — (does NOT import `bifrost/core/schemas`)                       | **GREEN**  | No `schemas` imports; standalone HTTP client + `Name()`/`RunResearch()` API. **No change needed.** Out of T34 scope.                                                                                                                                                                                                                                                                                            |
| 7 | **smartfallback**        | `Plugin`, `BifrostRequest`, `BifrostResponse`, `ChatMessage`, `BifrostChatRequest`, `BifrostChatResponse`, `ChatMessageRoleUser`, `ChatMessageContent` | **YELLOW** (with `RED` test) | Production `fallback.go` + `strategies.go` + `task_rules.go` compile after T34 signature swap. **However** `fallback_test.go` references undefined symbols: `NewExponentialBackoff` (production has `NewExponentialBackoffStrategy`, name diverged), `NewBudgetStrategy` (does not exist anywhere in the codebase), `TaskTypeCodeGen` (not defined), `TaskRuleEngine.ClassifyTask` / `TaskRuleEngine.GetFallbacksForTask` (methods not on `TaskRuleEngine`). |
| 8 | **toolrouter**           | `Plugin`, `BifrostRequest`, `ChatTool`, `PluginShortCircuit`     | **YELLOW** | T34 already migrated `plugin.go` + `routing.go` (+8/-6, +22/-22). `PreHook` reads `req.Params["tools"]` (map) → `req.ChatRequest.Params.Tools` (typed slice); `filterTools` write-through migrates accordingly.                                                                                                                                                                                                                                                                  |
| 9 | **voyage**               | `EmbeddingRequest`, `EmbeddingResponse`, `Usage`, `BifrostError` | **YELLOW** | T34 already migrated `plugin.go` (+45/-17). All seven changes documented in the T34 commit message: `EmbeddingRequest→*BifrostEmbeddingRequest`, `req.Input.Texts/Text`, `Params.Dimensions int→*int`, `Data[i].Embedding []float32→EmbeddingStruct.EmbeddingArray []float64`, `BifrostError.Message/Err→BifrostError.Error.Message`.                                                                                                                                                            |

**Tally:** 7/9 plugins **YELLOW** (migration needed, but the T34 commit `6bbbc2d` already covers 6 of them — only `smartfallback` production needs new migration in addition to `learning`'s production migration), 2/9 **GREEN** (no Bifrost surface used), and 2 production-side migrations remain that are **not** in T34 commit (learning 3-arg PostHook, smartfallback production renames).

---

## 5. Risk assessment

### 5.1 Compile-time

| Risk                                                                  | Likelihood | Impact | Notes                                                                                                                                            |
| :-------------------------------------------------------------------- | :--------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| Go toolchain bump `1.25.0 → 1.26.4` blocks CI on older runners       | **HIGH**   | LOW    | `mise.toml` / `Dockerfile` / CI must be updated in lockstep. `go 1.25.0` is the host, so `GOTOOLCHAIN=auto` will fetch 1.26.4 on first build.   |
| Drop `replace` + delete `bifrost/core/` breaks the local build        | CERTAIN    | LOW    | The shim must be removed in the same commit as the require bump; otherwise `go build` fails on `bifrost/core/core.go` referencing nonexistent types. |
| Untyped `req.Params["tools"]` reads crash on `nil` map                | LOW        | MEDIUM | T34 commit already touches every site; risk is only on plugins we didn't audit. Grep coverage below.                                            |
| `ChatMessage.Content string → *ChatMessageContent` typed-nil deref   | MEDIUM     | HIGH   | `Content` becomes a pointer; reads that worked on `""` now nil-deref. T34 commit fixed all 35 references; re-verify after re-apply.              |
| `EmbeddingData.Embedding []float32 → EmbeddingStruct.EmbeddingArray []float64` | LOW | MEDIUM | Voyage plugin uses the array directly for cosine sim; float32→float64 conversion needs care in numerics. T34 commit fixed the type, but the conversion routine should be re-verified. |
| Smartfallback test references undefined symbols (`NewExponentialBackoff`, etc.) | CERTAIN | MEDIUM | T34 does not address these. Either rename the production helpers to match, or rewrite the test. Out of T34 scope per commit message.            |

### 5.2 Runtime

| Risk                                                                  | Likelihood | Impact | Notes                                                                                                                                            |
| :-------------------------------------------------------------------- | :--------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `BifrostContext` vs `context.Context` mismatch breaks trace propagation | LOW        | HIGH   | Plugins that captured `context.Context` for tracing/otel will lose trace IDs unless the new `BifrostContext` exposes the underlying `context.Context` (it does — `*BifrostContext` wraps via `context_native.go`). |
| `PostLLMHook` returning a `*BifrostError` instead of `error` changes plugin error semantics | MEDIUM | HIGH | Plugins that returned `error` for "we don't like this response" must now return `(*resp, *BifrostError{AllowFallbacks: ...}, nil)` — not just `nil, err`. |
| `AllowFallbacks *bool` semantics — `nil` defaults to `true` (resilience-on) | LOW | MEDIUM | Plugins that want to halt fallback must explicitly set `false`; existing plugins that returned `nil, err` accidentally may now allow fallbacks. |
| New `RoutingInfo` on `BifrostResponse.ExtraFields` overrides plugin mutations | LOW | LOW | Core calls `PopulateRoutingInfo` before AND after `RunPostLLMHooks`; any plugin attempt to mutate `RoutingInfo` is a no-op (per upstream doc at `bifrost.go:1146-1154`). Documented behavior, not a risk per se. |
| WASM plugin ABI differs (`plugin_native.go` vs `plugin_wasm.go`)      | N/A        | N/A    | argis-extensions plugins are in-process Go; no WASM. Not applicable.                                                                             |

### 5.3 Repo hygiene

| Risk                                                                  | Likelihood | Impact | Notes                                                                                                                                            |
| :-------------------------------------------------------------------- | :--------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| T34 branch (`chore/t34-bifrost-bump-2026-06-20` @ `a1751bd`) is not merged into `main` | CERTAIN | HIGH | T34 was committed but never merged. If we re-do T34 from main, we re-write the same 233-line diff (10 files). If we merge the T34 branch, we get it for free plus the `a1751bd fix(gitignore)` cleanup. |
| Other stale state: local `e417124` ≠ `origin/main` `beca432`; divergent by ≥7 commits | CERTAIN | MEDIUM | Any code-edit commit on this checkout will fail to fast-forward push. Coordinate with v11 closure before pushing.                              |
| Two untracked files (`_check`) on local main                          | LOW        | LOW    | Cosmetic; not Bifrost-related.                                                                                                                   |

---

## 6. Concrete T34 execution steps (proposed — **do not execute from this research session**)

**Pre-conditions (must hold before executing T34):**
1. v11 closure merged (`chore/orch-v11-016-tier0-2026-06-20` → `main`), or work on a fresh branch off `origin/main` @ `beca432` to avoid the `e417124` divergence.
2. Go toolchain installed: `go version` ≥ 1.26.4 (host = 1.25.0 → upgrade or rely on `GOTOOLCHAIN=auto`).
3. CI runners updated to `go 1.26.4` (GitHub Actions `actions/setup-go@v5` with `go-version: '1.26.4'`).

**Execution recipe (T34.0 — main bump):**
1. **Checkout fresh branch** off `origin/main`:
   `git fetch origin && git switch -c chore/t34-bifrost-bump-2026-06-20 origin/main` (or reuse the existing `chore/t34-bifrost-bump-2026-06-20` branch if rebased).
2. **Bump `go.mod`:** `github.com/maximhq/bifrost/core v1.2.30 → v1.5.21`; **remove** the `replace` directive; bump `go 1.25.0 → go 1.26.4`; remove the `bifrost/core/` shim directory; run `go mod tidy` (this will pull in the 6 new transitive deps and update `go.sum`).
3. **Apply the 7-plugin migration diff** from commit `6bbbc2d` (verbatim or cherry-pick) — this covers `contentsafety`, `contextfolding`, `intelligentrouter`, `toolrouter`, `voyage`, plus the test-side helpers for `smartfallback`. Expected: 233 lines / 10 files (matches T34 commit).
4. **Verify** with `go build ./... && go vet ./... && go test ./plugins/...` — expect GREEN on 7 plugins, RED on 2 (see T34.1).

**Execution recipe (T34.1 — production-side migration for learning + smartfallback):**
1. **`learning/learning.go`:** migrate `PostHook(ctx, *BifrostResponse) → (*BifrostResponse, error)` to `PostLLMHook(ctx, *BifrostContext, *BifrostResponse, *BifrostError) → (*BifrostResponse, *BifrostError, error)`; add `PreRequestHook` + `PreLLMHook` as no-ops or actual behavior; switch `TransportInterceptor` to nil (or `HTTPTransportPreHook` if the plugin needs transport-layer access). Update `learning_test.go` to match.
2. **`smartfallback/fallback.go` + `strategies.go` + `task_rules.go`:** rename `NewExponentialBackoffStrategy` → `NewExponentialBackoff` (or add a thin shim alias); add `NewBudgetStrategy(budget)` helper; add `TaskTypeCodeGen` constant; add `ClassifyTask` / `GetFallbacksForTask` methods on `TaskRuleEngine`. This is real new functionality, not a rename — needs design review.
3. **Update `contentsafety` Plugin signatures** (still needed if T34 commit didn't cover the interface swap — verify `contentsafety/plugin.go` lines 115, 125, 163 for `TransportInterceptor` / `PreHook` / `PostHook` against the new `LLMPlugin` interface).

**Execution recipe (T34.2 — verification):**
1. `go build ./...` → expect 9/9 plugins compile.
2. `go vet ./...` → expect 0 issues.
3. `go test ./plugins/...` → expect 9/9 plugin test files pass (or skip with rationale for `learning`/`smartfallback` if T34.1 isn't merged).
4. `task test:coverage` (per `Taskfile.yml`) → confirm no regression.
5. `go mod tidy` clean run; `go.sum` updated.
6. Push branch → open PR → CI green → self-merge per v11 closure norm (Track 8 self-merge is the fleet norm, see `findings/2026-06-18-track8-self-merge-postmortem.md`).
7. Bump `phenotype-registry` row for `KooshaPari/argis-extensions` with the new Bifrost core dependency (BumpDetected signal).

**Estimated wall-clock:** T34.0 ~45 min (mostly `go mod tidy` + cherry-pick); T34.1 ~90 min (real new functionality for smartfallback); T34.2 ~15 min. Total ~2.5 hours on a MacBook with `device: macbook` per ADR-023, or offload to `device: heavy-runner` if `go mod tidy` stalls.

---

## 7. Cross-references

- T34 commit: `6bbbc2d chore(deps)!: bump bifrost core to v1.5.21 (T34)` — 233 lines, 10 files.
- T34 branch: `chore/t34-bifrost-bump-2026-06-20` @ `a1751bd` (with `fix(gitignore)` on top).
- v11 closure: `chore/orch-v11-016-tier0-2026-06-20` @ `7184fbb`.
- v11 §8 ACCEPTED: Option B (Bifrost as library, Phenotype-owned decision layer).
- ADR-001 (NetScript DELETE; recommends `phenotype-go-sdk/pkg/lexer` as the Go-side lexer).
- ADR-023 (device-fit gate + substrate placement).
- ADR-024 (71-pillar audit framework; L1-L12 Architecture applies here — `L7 third-party integration drift` and `L12 dependency currency`).
- ADR-041 (71-pillar refresh cadence weekly Mon 09:00 PDT — re-run after T34 lands).

---

**End of T34 findings.**
