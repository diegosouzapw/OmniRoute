- **chore(lifecycle):** `check:model-lifecycle` now also diffs `DEFAULT_DEGRADATION_MAP`
  (the background-task redirect table) against the vendor lifecycle snapshot, refusing a
  retired id as source or target, with a table-driven unit test beside it. Three rows
  whose source the vendor had retired — `claude-sonnet-4-20250514`, `gemini-3-pro-preview`
  and `gpt-5.1-codex` (whose target `gpt-5.1-codex-mini` is retired too) — were dead code,
  since `checkLifecycle` answers 410 before the redirect runs; they are dropped
  (#12535 — thanks @pacocartones)
