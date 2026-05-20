---
issue: 1718
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 20
  labels: []
  state: open
  classified_at: 2026-05-01T10:54:56Z
---

# Feature: [Feature] expose upstream error details in client-facing error responses

> GitHub Issue: #1718 — opened by @matteoantoci on 2026-04-28T10:04:16Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Enhancement: Propagate upstream error details to the client

### Problem

When an upstream provider returns an error, the client receives a generic message like:

```
[400]: Error from provider: Provider returned error
```

The actual upstream error body is captured internally but never included in the response. This makes it difficult to debug issues — the real error (e.g., `context_length_exceeded`, `invalid_tool_call`, etc.) is hidden behind the generic wrapper.

### Proposed behavior

Add an optional `upstream_details` field to error response bodies alongside the existing `error.message`/`type`/`code` structure. The existing error structure stays unchanged (OpenAI-compatible).

Example response:

```json
{
  "error": {
    "message": "[400]: Error from provider: Provider returned error",
    "type": "invalid_request_error",
    "code": "bad_request"
  },
  "upstream_details": {
    "error": { "message": "context_length_exceeded", "type": "invalid_request_error" }
  }
}
```

### Where this helps

- Clients using providers that wrap errors in generic messages (e.g., opencode-go)
- Debugging 400s from upstream providers where the real error is in the response body
- Understanding why a specific request failed without checking server-side logs

### Implementation notes

The upstream error body is already parsed and available in the error handling path. The change involves:
1. Adding an optional parameter to error builder functions (`buildErrorBody`, `errorResponse`, `writeStreamError`, `createErrorResult`)
2. Passing the parsed upstream body through at the relevant error sites

## 💬 Community Discussion

*No comments.*

### Participants

- @matteoantoci

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Refined and scoped for implementation.

### What it solves

- Debugging upstream errors is difficult because they are hidden behind generic '[400] Error from provider' wrappers.

### How it should work (high level)

1. Modify `buildErrorBody` to accept `upstream_details`.
2. In `BaseExecutor` or specific handlers, parse the raw upstream response on failure.
3. Propagate the parsed body to the client response inside `upstream_details`.

### Affected areas

- open-sse/executors/base.ts, open-sse/utils/errors.ts, src/app/api/v1/chat/completions/route.ts

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
