---
title: "Playground Studio"
version: 3.8.7
lastUpdated: 2026-05-30
---

# Playground Studio

> **Feature:** Playground Studio — unified AI testing workspace for `/dashboard/playground`.
> **Plans:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Released in v3.8.6

---

## Overview

Playground Studio transforms `/dashboard/playground` from a simple Monaco-based editor into
a full-featured testing workspace. It replaces the legacy `page.tsx` with a `PlaygroundStudio`
shell that renders four tabs and a shared config pane.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Compare] [{} API] [🔧 Build]     142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {active tab content}                    │ ─ Config                  │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ System    [textarea]      │
│                                          │ Temp      ▕▕▔▔ 0.7        │
│                                          │ Presets [▾ load][save]    │
│                                          │ [✨ Improve prompt]        │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Tabs

### Chat Tab

Evolves `ChatPlayground.tsx` into a multi-turn streaming workbench:

- Full markdown rendering via `MarkdownMessage.tsx` (code blocks, tables, lists, links).
- System prompt sourced from the shared Config pane.
- Token/cost per message (prompt + completion tokens).
- Regenerate last response.
- Sends to `POST /v1/chat/completions` with SSE streaming.

### Compare Tab

The key differentiator for a proxy: run 1 prompt across up to **4 models in parallel**.

- Up to 4 columns, each independently streaming from `/v1/chat/completions`.
- `+ Add model` button (Cmd+K shortcut) to add columns.
- `Run all ▶` triggers all streams simultaneously via `Promise.all` + per-column `AbortController`.
- Global **Cancel all** aborts every in-flight stream.
- Per-column `ProviderMetrics` shows TTFT, TPS, tokens, and estimated cost in real time.
- Metrics labelled **"client-side estimate"** (D12) — measured from first SSE chunk.

### API Tab

Preserves 100% of the original Monaco editor for power users (D14):

- 10 endpoints: chat completions, completions, embeddings, images, audio, speech, transcriptions, moderations, rerank, search.
- Multimodal file upload.
- SSE streaming with real-time output.
- Wrapped as `ApiTab.tsx` (lazy-loaded, `ssr: false`).

### Build Tab

Tools/function calling and structured output UI:

- `ToolsBuilder.tsx` — add/edit/remove `tools[]` with JSON schema editor per tool.
  Validates parameters via `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — toggle JSON mode + JSON schema editor.
  Validates response against schema via `StructuredOutputSchema` (Zod).
- Sends request to `/v1/chat/completions` with `tools[]` and/or `response_format`.

---

## Config Pane (Shared)

`StudioConfigPane.tsx` — always visible, collapsible.

| Field | Component | Notes |
|-------|-----------|-------|
| Endpoint | `<select>` | 10 options matching `PlaygroundEndpoint` |
| Model | `<input>` | free text, e.g. `openai/gpt-4o` |
| System prompt | `<textarea>` | fed into all tabs |
| Parameters | `ParamSliders` | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop |
| Presets | `PresetPicker` | load/save named config snapshots (persisted in DB) |
| Improve prompt | `ImprovePromptButton` | opens quota-warning modal, calls `/api/playground/improve-prompt` |

State is lifted to `PlaygroundStudio.tsx` and passed down to all tabs. Switching tabs
preserves config state.

---

## Top Bar

`StudioTopBar.tsx`:

- Tab switcher (role="tablist").
- `TokenCostCounter` — live token (↑/↓) and estimated cost display.
- Export code button (`</>`) — opens `ExportCodeModal`.

---

## Export Code Modal

`ExportCodeModal.tsx` uses `codeExport.ts` to generate curl / Python / TypeScript snippets
from the current `PlaygroundState`. API key placeholder is always `$OMNIROUTE_API_KEY` (D11).

---

## Prompt Improver

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modal warns "will consume quota".
2. On confirm, sends `{ system, prompt, model, tone }` to the route.
3. Route calls `/v1/chat/completions` internally with `promptImprover.META_SYSTEM_PROMPT`.
4. Returns `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. UI patches the Config pane system prompt and the Chat tab user prompt.

---

## Presets

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Stored in `playground_presets` SQLite table (migration `076_playground_presets.sql`).
- Each preset stores: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` list, `POST` create, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Stream Metrics

`useStreamMetrics.ts` + `streamMetrics.ts` (pure function):

- `start()` — records request start time.
- `onFirstChunk()` — records TTFT.
- `onChunk(n)` — accumulates completion token count.
- `finish(usage?)` — computes final metrics: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Pricing from static table in `src/lib/playground/types.ts` (labelled "estimated" — D13).

---

## Backend Routes

| Method | Path | Handler |
|--------|------|---------|
| `POST` | `/api/playground/improve-prompt` | Zod-validates `ImprovePromptRequestSchema`; calls `/v1/chat/completions` with meta-prompt |
| `GET` | `/api/playground/presets` | Returns `{ presets: PlaygroundPresetListItem[] }` |
| `POST` | `/api/playground/presets` | Creates preset; validates `PlaygroundPresetCreateSchema` |
| `GET` | `/api/playground/presets/:id` | Returns one preset or 404 |
| `PUT` | `/api/playground/presets/:id` | Partial update |
| `DELETE` | `/api/playground/presets/:id` | 204 |

Auth: optional (`REQUIRE_API_KEY`). Errors via `buildErrorBody()` (Hard Rule #12).

---

## Key Files

| Path | Purpose |
|------|---------|
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx` | Shell component, tab orchestrator |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx` | Tabs + counter + export button |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Shared config panel |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx` | Chat workbench |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx` | Multi-model compare |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx` | Monaco editor (preserved) |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx` | Tools + structured output |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx` | Code export modal |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx` | Single compare column |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx` | TTFT/TPS display |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts` | Client-side metric hook |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts` | Presets CRUD hook |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts` | Improve-prompt hook |
| `src/lib/playground/codeExport.ts` | curl/Python/TS generator (shared with Search Tools) |
| `src/lib/playground/promptImprover.ts` | Meta-prompt builder |
| `src/lib/playground/streamMetrics.ts` | Pure metrics computation |
| `src/lib/db/playgroundPresets.ts` | DB module (CRUD) |
| `src/app/api/playground/improve-prompt/route.ts` | Improve-prompt REST route |
| `src/app/api/playground/presets/route.ts` | Presets list + create |
| `src/app/api/playground/presets/[id]/route.ts` | Presets get/update/delete |
| `src/lib/db/migrations/076_playground_presets.sql` | DB migration |

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Monaco editor not rendering in API tab | SSR loaded Monaco | Verify `ApiTab` uses `dynamic(..., { ssr: false })` |
| Compare streams fire sequentially | Wrong `Promise.all` usage | All stream starts must be dispatched in one `Promise.all` call |
| Metrics show `null` TTFT | First chunk handler not wired | Check `useStreamMetrics.onFirstChunk()` is called in the SSE reader loop |
| Preset not persisting | DB migration not run | Run `npm run db:migrate` or restart the server (migration auto-runs on startup) |
| Improve prompt returns 502 | Model not set in Config | User must enter a model name in the Config pane before improving |
| Export code shows `MISSING_API_KEY` | Placeholder not inserted | `codeExport.ts` always uses `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"` |

---

## References

- Master plan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Feature plan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Code export: `src/lib/playground/codeExport.ts`
- Prompt improver: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
