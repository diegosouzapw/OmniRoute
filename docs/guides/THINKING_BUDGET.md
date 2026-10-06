---
title: "Thinking Budget"
version: 3.8.49
lastUpdated: 2026-08-12
---

# Thinking Budget

> **Dashboard:** Settings → **AI** → Thinking Budget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Source:** `open-sse/services/thinkingBudget.ts`

Thinking Budget controls whether OmniRoute **rewrites client thinking/reasoning parameters** on the way to providers. It does **not** turn compression, routing, or prompt cache on or off.

## Modes

| Mode                        | What OmniRoute does                                                                                              | When to use                                                                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (default) | Leaves client fields alone (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config`, etc.). | **Codex / Desktop / any client that should control effort + reasoning summaries.** Required for visible thinking panels when the client requests `reasoning.summary`. |
| **`auto`**                  | **Strips all** thinking/reasoning fields from the request body before upstream.                                  | Only when you deliberately want the **provider** to invent defaults and you do **not** need client-controlled thinking. **Not** “auto-show thinking”.                 |
| **`custom`**                | Overwrites every request with a fixed thinking token budget.                                                     | Hard cap on thinking tokens for all traffic.                                                                                                                          |
| **`adaptive`**              | Scales budget from a base effort using message count, tools, and prompt length.                                  | Soft token control without fully stripping client intent.                                                                                                             |

### What `auto` removes

When mode is `auto`, `stripThinkingConfig()` deletes (among others):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, and `output_config.effort` when present
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

If a client (e.g. Codex Desktop) sent `reasoning: { effort: "ultra", summary: "detailed" }`, **auto drops that object**. Upstream may still bill some reasoning tokens, but often returns **empty or encrypted-only** reasoning items — so the UI shows no useful thinking stream.

## What this is **not**

| Feature                                    | Relationship                                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Compression** (Caveman, RTK, stacked, …) | Separate pipeline. Works under every thinking-budget mode.                                                              |
| **Prompt / semantic cache**                | Separate. Unaffected by thinking-budget mode.                                                                           |
| **Combo routing / fallbacks**              | Separate. Unaffected.                                                                                                   |
| **API-key token limits / cost budgets**    | Separate. Unaffected.                                                                                                   |
| **Reasoning replay cache**                 | Multi-turn re-inject for strict providers (DeepSeek, Kimi, Qwen-thinking, …). Not the same as Desktop “show thinking”.  |
| **Decrypting `encrypted_content`**         | **Impossible.** OpenAI/Codex private reasoning blobs are opaque. OmniRoute never decrypts them (#7095 / #7176 / #7304). |

## Visible thinking (Codex / Responses clients)

For a client to show thinking text you need **all** of:

1. Thinking Budget mode = **`passthrough`** (or custom/adaptive that still leaves summary requests intact enough for the path you use).
2. Client asks for a summary, e.g. Codex `model_reasoning_summary = "detailed"` / `auto` (not `none`).
3. Upstream actually streams `response.reasoning_summary_text.*` (or a non-empty `reasoning.summary` on the item).

If you only get “encrypted private reasoning”, either:

- mode was **`auto`** (client request was stripped), or
- upstream returned `encrypted_content` without summary text (provider limitation; OmniRoute can only surface a placeholder, not plaintext).

## API examples

```bash
# Read
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Recommended for Codex / Desktop thinking visibility
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; optional `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Persistence / restart

Value is stored under settings key `thinkingBudget` and hydrated at process start (`hydrateThinkingBudgetConfig`). After changing via DB or some non-API paths, **restart the OmniRoute process** so the in-memory singleton matches disk.

## Operator checklist

- [ ] Codex / Desktop users: mode = **passthrough**
- [ ] Compression still enabled if you want token savings on **messages**, not by stripping thinking
- [ ] Do not expect `auto` to “show more thinking”
- [ ] Encrypted-only summaries are a **provider** behavior; passthrough cannot decrypt them

## Related docs

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — multi-turn `reasoning_content` cache
- [USER_GUIDE.md](./USER_GUIDE.md) — Settings dashboard tabs
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — settings endpoints
