---
title: "Compression Engines"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Compression Engines

OmniRoute compression is built around engine contracts. A mode can run one engine directly
(`caveman` or `rtk`) or a deterministic stacked pipeline that executes multiple engines in order.

## Modes

| Mode         | Engine path                        | Intended input                               |
| ------------ | ---------------------------------- | -------------------------------------------- |
| `off`        | none                               | Exact prompt preservation                    |
| `lite`       | Caveman lite helpers               | Low-risk always-on cleanup                   |
| `standard`   | Caveman                            | Natural-language prompt condensation         |
| `aggressive` | Caveman + history/tool summarizers | Long chat sessions                           |
| `ultra`      | Caveman + pruning helpers          | Context-limit recovery                       |
| `rtk`        | RTK                                | Terminal, shell, build, test, and git output |
| `stacked`    | Pipeline, default `rtk -> caveman` | Mixed tool logs and prose, max savings       |

## Engine Registry

The registry lives in `open-sse/services/compression/engines/registry.ts`. Engines expose a shared
contract:

- `id`: stable engine id such as `caveman` or `rtk`
- `apply(text, config)`: legacy execution path used by stacked pipelines
- `compress(input, config)`: primary execution path returning text + stats
- `getConfigSchema()`: returns the JSON-Schema-like shape of valid config
- `validateConfig(config)`: returns `{ valid, errors[] }`

Registration uses `registerCompressionEngine(engine)` (or `registerEngine` for advanced cases),
which calls `assertValidEngine()` and `validateConfig(defaultConfig)` before accepting.
Use `unregisterCompressionEngine(id)` to remove an engine at runtime.

`strategySelector.ts` registers the built-in engines before compression runs. This lets preview,
runtime compression, stacked mode, tests, and future engines use the same execution path.

### MCP description compression (related)

A separate registry compresses MCP tool description metadata at registry-level — see
`open-sse/mcp-server/descriptionCompressor.ts` and [MCP-SERVER.md](../frameworks/MCP-SERVER.md). It reuses
Caveman rules but operates on tool metadata, not request payloads.

### Additional built-in engines

Beyond Caveman, RTK, and LLMLingua-2, the registry ships several specialized lossless /
structural engines (used by stacked pipelines, the playground, and tests):

| Engine        | Id              | What it does                                                                                                                                                               |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): replaces large contiguous text blocks with content-addressed references, so repeated/large blocks are sent once and referenced thereafter. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): lossless tabular compaction of homogeneous JSON-array payloads into a columnar `[N rows]` form.                                                    |
| ionizer       | `ionizer`       | Head/middle/tail row sampling for very large homogeneous blocks, storing the elided middle as a CCR content-addressed reference.                                           |
| session-dedup | `session-dedup` | Content-addressed cross-turn deduplication (TokenMizer-inspired): elides text already seen in earlier turns of the same session.                                           |

## Caveman

Caveman mode focuses on semantic condensation of normal prose:

- preserves code blocks, URLs, JSON, paths, and structured data
- removes filler, hedging, repeated context, and verbose connective phrasing
- supports language-aware file rule packs in `open-sse/services/compression/rules/`
- remains available through the legacy `standard`, `aggressive`, and `ultra` modes

The dashboard surface is `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream reports `~75%` fewer output tokens, `65%` average output savings in benchmarks
with a `22-87%` range, and a `~46%` input-compression tool. OmniRoute uses the Caveman input-side
number when documenting stacked prompt/context savings; Caveman output mode remains a separate
response-behavior feature.

## RTK

RTK mode focuses on command and tool output:

- detects output classes such as `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go tests, TypeScript/Vite/Webpack builds, ESLint, npm audit/installs, Docker logs,
  shell `find`/`grep`, stack traces, and generic logs
- applies 49 JSON filters from `open-sse/services/compression/engines/rtk/filters/`
- supports the RTK-style declarative pipeline: ANSI stripping, replace, match-output short-circuit,
  strip/keep lines, per-line truncation, head/tail/max-line truncation, and on-empty fallback
- supports trust-gated project filters in `.rtk/filters.json` and global filters in
  `DATA_DIR/rtk/filters.json`
- strips ANSI sequences, progress noise, repeated lines, and unhelpful boilerplate
- preserves actionable failures, warnings, summaries, changed files, and tail context
- can optionally retain redacted raw output for recovery/debugging through authenticated management
  routes

The dashboard surface is `Dashboard -> Context & Cache -> RTK`.

Operational details for custom filters, trust, verify, and raw-output recovery live in
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK upstream reports `60-90%` savings for command-output compression. Its README example shows a
30-minute Claude Code session going from `~118,000` tokens to `~23,900`, or `79.7%` saved.

## LLMLingua-2 (Semantic Pruning)

LLMLingua-2 mode performs **semantic token pruning** on prose using a small ONNX token
classifier, complementing the rule-based Caveman and RTK engines:

- compresses prose in non-system messages only; fenced code blocks and other preserved
  constructs are never altered
- runs the `@atjsh/llmlingua-2` backend (ONNX via `@huggingface/transformers`) in a
  worker thread, so model inference never blocks the request event loop
- is **stackable** (`stackPriority` 35): in a stacked pipeline it runs after the
  structural engines (CCR, session-dedup, headroom, Caveman) but before `ultra`, since
  semantic pruning is most effective on already-structurally-compressed text — e.g.
  `rtk -> caveman -> llmlingua`
- **fail-opens on any error** (missing optional deps, worker spawn, model load, inference,
  or timeout) → the original text is returned unchanged, never an error

Engine location: `open-sse/services/compression/engines/llmlingua/`. The dashboard surface
is `Dashboard -> Context & Cache -> LLMLingua`.

### Models

The default model is **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
fast). A higher-accuracy **BERT-base** model (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) is available via the engine config `model` field. `@huggingface/transformers`
downloads the selected model lazily from the HuggingFace Hub into
`${DATA_DIR}/models/llmlingua` on the first call (`modelStore.ts`); a `modelPath` config
override points it at a local copy instead (offline / air-gapped installs).

### Optional dependencies & on-demand install

The prunable LLMLingua runtime peer stack is **optional**. Three packages are declared as
`optionalDependencies` in `package.json` and kept **external** by the production build
(`scripts/build/prepublish.ts` does not bundle them):

| Package              | Version (pin) | Notes                                          |
| -------------------- | ------------- | ---------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.3`       | Entry package; declares the others as peers    |
| `@tensorflow/tfjs`   | `4.22.0`      | Heaviest dep — dominates the ~800 MB footprint |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                      |

`@huggingface/transformers` is pinned at `3.5.2` as an **optional** dependency (shared with
the local embeddings path and also traced into the standalone bundle). Keeping it optional prevents
`onnxruntime-node` CUDA provider postinstall failures on CUDA 11 hosts from aborting the whole
OmniRoute install; when the optional stack is absent, LLMLingua still fail-opens. Only the three
packages above are prunable SLM peers. A standard `npm install` (dev) installs the optional stack
automatically unless optional dependencies are omitted.

**Why on-demand:** the npm-published package, the standalone bundle, and the Docker image
ship **without** these deps to stay slim. When they are absent, the worker's dependency
gate (a `@atjsh/llmlingua-2` resolve probe in `worker.ts`) fails and the engine
**fail-opens silently** — selecting LLMLingua becomes a no-op (text returned unchanged, no
error logged). To activate it in a pruned environment, install the optional stack:

```bash
# pin to the versions declared in package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.3 @tensorflow/tfjs@4.22.0 js-tiktoken
```

Roughly **~800 MB** total: the TensorFlow.js + transformers runtimes dominate; the
TinyBERT model adds ~57 MB downloaded at first use (not via npm).

Per environment:

- **Dev / `npm install`** — installed automatically unless you passed `--omit=optional`
  (or `--no-optional`). No action needed.
- **Global npm (`npm i -g omniroute`) / standalone** — run the install command above inside
  the installed package directory, or reinstall without omitting optional deps.
- **Docker** — add the install command in a derived image layer; the published image
  ships slim by design.
- **VPS (PM2)** — install into the app's `node_modules`, then restart the process so the
  worker re-probes the gate.

**Verify it is active:** with LLMLingua selected, real prose actually shrinks (the engine
stops fail-opening), and the first request triggers the model download into
`${DATA_DIR}/models/llmlingua`. The gate intentionally probes only `@atjsh/llmlingua-2` —
the other peers are ESM-only and `require.resolve` throws on them even when present — so
the worker still fail-opens if any peer is genuinely missing at `import()` time.

## Stacked Pipelines

Stacked mode runs pipeline steps in order. The default is:

```txt
rtk -> caveman
```

Use this for coding-agent sessions where a prompt combines command output with human or assistant
prose. RTK reduces noisy tool logs first, then Caveman compresses remaining natural language.

Pipeline steps are configured with `stackedPipeline` in compression settings or through compression
combos.

When both engines reduce the same eligible payload, savings compound:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP Accessibility Tree Filter

The MCP accessibility-tree smart filter is a post-execution compression layer that runs on MCP
**tool results**, not on prompts or context. It targets the verbose accessibility-tree and browser
snapshot payloads returned by tools like Playwright, computer-use, and browser-automation MCP
servers.

### What it does

1. **Noise stripping** — removes empty generic/text entries (`- generic:`, `- text: ""`)
2. **Sibling collapse** — when ≥ `collapseThreshold` (default 30) consecutive lines are structural
   repeats, collapses them into the first `collapseKeepHead` (default 10) lines + a count summary +
   the last `collapseKeepTail` (default 5) lines
3. **Ref preservation** — `[ref=eXX]` anchors required by Playwright/computer-use are never touched
4. **Hard truncation** — if the text after collapse still exceeds `maxTextChars` (default 50,000),
   truncates with a navigation hint so the agent can continue working

### Engine location

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() entry point
  collapseRepeated.ts ← sibling-collapse algorithm
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configuration

Controlled by `compression.mcpAccessibility` in global settings (migration 056). Default config:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

The filter is only applied to tool-result payloads whose `type` is `"text"` and whose length
exceeds `minLengthToProcess`. It does not affect prompt compression or request payloads.

### Expected savings

60–80% on browser snapshot tool results, depending on page complexity. The collapse algorithm
is O(n) in line count and adds negligible latency.

### This filter vs the compression engines above

| Aspect      | Caveman / RTK / Stacked   | MCP accessibility filter               |
| ----------- | ------------------------- | -------------------------------------- |
| Target      | Request prompts / context | MCP tool results                       |
| Trigger     | Compression mode setting  | `compression.mcpAccessibility.enabled` |
| Scope       | All SSE messages          | Tool results only                      |
| Ref anchors | N/A                       | Preserved unconditionally              |

---

## Compression Combos

Compression combos are named compression profiles that can be assigned to routing combos:

- `compression_combos`: stores mode, pipeline, RTK config, language config, and default marker
- `compression_combo_assignments`: maps a compression combo to a routing combo
- runtime integration resolves an assigned compression combo before generic combo overrides
- analytics include `compression_combo_id` and `engine`

Dashboard surface: `Dashboard -> Context & Cache -> Compression Combos`.

## API Surface

| Route                                  | Purpose                                                          |
| -------------------------------------- | ---------------------------------------------------------------- |
| `/api/settings/compression`            | Global compression settings (includes `mcpAccessibility` config) |
| `/api/compression/preview`             | Preview any compression mode                                     |
| `/api/compression/language-packs`      | List available Caveman language packs                            |
| `/api/context/caveman/config`          | Caveman settings alias                                           |
| `/api/context/rtk/config`              | RTK defaults and settings                                        |
| `/api/context/rtk/filters`             | RTK filter catalog                                               |
| `/api/context/rtk/test`                | RTK preview/test endpoint                                        |
| `/api/context/rtk/raw-output/[id]`     | Authenticated redacted raw-output recovery                       |
| `/api/context/combos`                  | Compression combo CRUD                                           |
| `/api/context/combos/[id]/assignments` | Routing-combo assignment CRUD                                    |
| `/api/context/analytics`               | Compression analytics alias                                      |

Management routes require management authentication or API-key policy checks.

## MCP Tools

Compression exposes five MCP tools:

| Tool                                | Scope               | Purpose                          |
| ----------------------------------- | ------------------- | -------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Settings, analytics, cache stats |
| `omniroute_compression_configure`   | `write:compression` | Update global settings           |
| `omniroute_set_compression_engine`  | `write:compression` | Set mode and optional pipeline   |
| `omniroute_list_compression_combos` | `read:compression`  | List compression combos          |
| `omniroute_compression_combo_stats` | `read:compression`  | Read combo/engine analytics      |

## Known limitations

- **LLMLingua-2 (SLM) requires co-located optional deps.** The worker only runs in a
  production build when `@atjsh/llmlingua-2` + peers are co-located into
  `dist/node_modules` (see `scripts/build/colocateOptionals.mjs`, #4286). Without them the
  engine fail-opens (returns the original text). Worker resolution no longer depends on
  `import.meta.url` (it dies in the standalone bundle) — it anchors on the runtime
  cwd / `argv[1]`.
- **Caveman language packs `de` / `fr` / `ja` are partial.** They ship `context` +
  `filler` + `structural` rules but no `dedup` / `ultra` packs, so `ultra` intensity is
  no stronger than `full` for those languages (they use only their own rules — there is no
  silent fall-back to the English `dedup`/`ultra` rules, which would mangle foreign text).
  `en` / `es` / `id` / `pt-BR` are complete. Contributions of `dedup.json` + `ultra.json`
  for the partial packs are welcome.
- **Stacked telemetry only lists engines that compressed.** A stacked-pipeline step whose
  engine ran but produced 0 % savings returns `stats:null` and so does not appear in
  `engineBreakdown` — indistinguishable from a step that was skipped. Distinguishing
  "ran, 0 %" from "skipped" would require a breakdown-model change and is deferred.

## Validation

The focused gates for this area are:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
