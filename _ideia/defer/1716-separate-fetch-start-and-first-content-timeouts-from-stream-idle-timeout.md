---
issue: 1716
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 20
  labels: []
  state: open
  classified_at: 2026-05-01T10:53:12Z
---

# Feature: [Feature] Separate fetch-start and first-content timeouts from stream idle timeout

> GitHub Issue: #1716 — opened by @matteoantoci on 2026-04-28T09:51:04Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Enhancement: Shorter timeouts for zombie stream detection

### Current behavior

All timeout-sensitive phases share `FETCH_TIMEOUT_MS` / `STREAM_IDLE_TIMEOUT_MS` (default 10 minutes). Additionally, there is **no request-level deadline** — if a request gets stuck in a pre-fetch phase (rate limiter queue, account semaphore, translation, etc.), it hangs indefinitely with no timeout to recover.

Observed failure modes:
- Upstream never returns HTTP headers → 10 min hang
- Upstream returns HTTP 200 but never sends SSE data → 10 min hang before `ensureStreamReadiness` catches it
- Upstream sends initial content then stalls mid-stream → 10 min hang before idle timeout
- Request stuck in rate limiter queue or account fallback → **indefinite hang** (no timeout covers this phase)

### Proposed behavior

Split timeouts into distinct phases, plus add a request-level hard deadline for pre-streaming phases:

| Phase | Proposed default | Current | Env override |
|-------|-----------------|---------|-------------|
| **Request deadline** (pre-streaming phases) | 600s | none | `FETCH_TIMEOUT_MS` |
| Fetch headers (time to HTTP response) | 60s | 600s | `FETCH_HEADERS_TIMEOUT_MS` |
| First content (time to first useful SSE event) | 60s | 600s | `STREAM_FIRST_CONTENT_TIMEOUT_MS` |
| Stream idle (mid-stream pauses) | 120s | 600s | `STREAM_IDLE_TIMEOUT_MS` |

**Request deadline** covers the entire pre-streaming lifecycle (rate limiter wait, account fallback, translation, fetch setup, `ensureStreamReadiness`). Once the stream is confirmed active (useful content received), the deadline is cancelled — active streams are governed only by the idle timeout, which resets on every chunk. This means reasoning models that think for 10+ minutes are NOT cut, as long as they send tokens.

### Implementation

1. Add `STREAM_FIRST_CONTENT_TIMEOUT_MS` (default 60s) to `runtimeTimeouts.ts`
2. Change `FETCH_HEADERS_TIMEOUT_MS` default from `fetchTimeoutMs` to 60s
3. Lower `DEFAULT_STREAM_IDLE_TIMEOUT_MS` from 600s to 120s
4. Use `STREAM_FIRST_CONTENT_TIMEOUT_MS` in `ensureStreamReadiness()` call (currently uses `STREAM_IDLE_TIMEOUT_MS`)
5. Use `FETCH_HEADERS_TIMEOUT_MS` in `BaseExecutor.execute()` fetch-start timeout (currently uses `getTimeoutMs()`)
6. Add `requestTimeoutMs` option to `createStreamController()` — starts a hard deadline timer when the request begins
7. Cancel the deadline timer once `ensureStreamReadiness` passes (stream confirmed active)
8. The deadline uses `FETCH_TIMEOUT_MS` as the default, configurable via env var

### Impact

- Zombie streams detected in ~60s instead of ~10min
- Mid-stream stalls detected in ~2min instead of ~10min
- **Pre-fetch hangs (rate limiter, account fallback) now covered** — 600s hard deadline prevents indefinite hangs
- Combo fallback triggers much faster
- No change to actively streaming behavior — deadline is cancelled once stream starts, and idle timer resets on every chunk
- All timeouts are env-overridable for operators who need different values

### Context

Observed with mimo-v2.5-pro via opencode-go in three separate incidents:
1. Provider returned HTTP 200 but never sent SSE data → 15+ min hang
2. Provider sent initial SSE content then stalled completely → 13+ min hang
3. Request stuck after account fallback (429 on first account, second account's request never reached fetch) → 24+ min hang with zero log output after fallback

## 💬 Community Discussion

*No comments.*

### Participants

- @matteoantoci

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.

### What it solves

- TBD

### How it should work (high level)

1. TBD
2. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
