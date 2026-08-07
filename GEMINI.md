# GEMINI.md

> **Single source of truth:** all project rules for AI assistants live in
> [`AGENTS.md`](AGENTS.md). Read it in full before any change — it contains the 22 Hard Rules,
> quality gates, code conventions, file-placement / repo-root hygiene rules, the repository map
> and the local development access notes that used to live in this file.

Gemini-specific notes:

- Skills activate via the `activate_skill` tool (skill metadata is loaded at session start and
  the full content is activated on demand).
- There are no other Gemini-only rules today. Do not re-add project rules here — edit
  `AGENTS.md` instead, so every assistant sees the same instructions.
