# Feature: Add compaction-aware context continuity and token-budgeted retrieval

> GitHub Issue: #1487 — opened by @apoapostolov on 2026-04-21T16:28:28Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Summary

OmniRoute already has routing, context handoff, and memory primitives, but it would benefit from first-class compaction-aware behavior inspired by token compactor projects like Token Optimizer and jCodeMunch.

## Proposed features

### 1. Pre-compact checkpoint and post-compact restore

Before a session compacts, snapshot the essential state needed to continue work:

- current task or epic
- key decisions already made
- active files or symbols under investigation
- unresolved blockers
- important tool outputs

After compaction or reconnect, restore that state automatically instead of relying on the model to reconstruct it from scratch.

### 2. Large tool-result archive with automatic rehydration

For large tool outputs, replace the full payload in-context with a short preview plus a retrieval hint, then let the model or client fetch the archived result on demand.

This avoids repeatedly paying to reread large outputs and keeps the active context smaller.

### 3. Token-budgeted ranked context bundles

Expose a retrieval mode that returns a ranked, token-budgeted bundle instead of dumping everything.

Useful inputs for ranking:

- semantic relevance
- recency
- blast radius
- current task alignment
- prior retrieval usage

### 4. Compaction-aware routing

Use context pressure as a routing signal.

Examples:

- degraded / near-compaction sessions route to stronger models
- clean, low-risk turns route to cheaper models
- large evidence-heavy turns use a context-optimized path

### 5. Session continuity breadcrumbs

After compaction, leave a compact breadcrumb that points the model back to the last active task or decision trail.

## Why this matters

OmniRoute already has the right building blocks:

- `contextRelay`
- `contextHandoff`
- `contextManager`
- `sessionManager`
- `workflowFSM`
- `backgroundTaskDetector`

The missing piece is a compaction-aware lifecycle that preserves useful state and avoids re-reading or re-sending large context blocks.

## Suggested implementation direction

A practical first pass could be:

1. add a compact checkpoint store for session state
2. add archived tool-result retrieval with short in-context hints
3. add a token-budgeted context bundle endpoint or MCP tool
4. feed compaction pressure into routing decisions

## Reference patterns

- Token Optimizer: pre-compact checkpoints, tool-result archive, session continuity
- jCodeMunch: token-budgeted ranked context bundles, fuzzy retrieval, session-aware routing
- compaction-to-memory bridge patterns: PreCompact capture and post-compact restore

## 💬 Community Discussion

No community discussion yet.

## 🎯 Refined Feature Description

### What it solves

- Large context windows are expensive and context degradation happens during long sessions.
- When an IDE or client compacts a long chat history, vital task context is often lost, requiring the model to "re-learn" what it was doing.
- Sending massive tool outputs repeatedly wastes tokens and reduces output quality.

### How it should work (high level)

1. **Compaction Checkpoints:** Add hooks to snapshot the current task state (`contextManager`, `memory` integration).
2. **Tool Archive:** Introduce a mechanism where large tool responses are stored on the server (SQLite), and the client only receives a stub: `[Large Output Truncated: Use get_archived_result(id) to read]`.
3. **Token-Budgeted Retrieval:** Enhance `contextHandoff` or memory retrieval to accept a `max_tokens` budget, using BM25 or embedding similarity to return only the most relevant chunks up to the limit.
4. **Context Pressure Routing:** Add a new router variable `contextPressure` (ratio of current tokens to model max context limit). Adjust the combo/strategy engine to consider this pressure (e.g., if pressure > 0.8, favor models with 128k+ context like Claude 3.5 Sonnet over 8k models).

### Affected areas

- `open-sse/services/contextManager.ts`
- `open-sse/services/combo.ts` (routing logic)
- `src/lib/memory/` (retrieval and summarization)
- `src/lib/db/core.ts` or new `tool_archives.ts` for tool results

## 📎 Attachments & References

- Token Optimizer
- jCodeMunch

## 🔗 Related Ideas

- N/A
