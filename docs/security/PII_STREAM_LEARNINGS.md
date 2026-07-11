# PII & Stream Sanitization Learnings

Hard-won lessons from the PII redaction / streaming sanitization work. Moved here from
`CLAUDE.md`; content unchanged. See also `docs/security/GUARDRAILS.md`.

## 1. Regex Security (ReDoS)

All regex patterns matching variable-length strings (e.g. IPv6 address, credit cards) must use strictly bounded, non-overlapping sequences (e.g., limit occurrences with bounded ranges `{1,7}`) to prevent catastrophic backtracking when processing untrusted inputs.

## 2. SSE Snapshot Handling

When parsing streaming LLM responses (e.g. Responses API), check if a chunk represents a final snapshot (`done` or `completed` events). Snapshot text must be sanitized directly as a standalone string (bypassing rolling delta buffers) to prevent text duplication at the end of the stream.

## 3. Database Handles in Tests

Ensure that any unit tests that trigger database migrations or establish SQLite connections call `resetDbInstance()` and properly clean up/close all DB handles in a `test.after(...)` hook. Failure to release database connection handles will cause Node's native test runner to hang indefinitely.
