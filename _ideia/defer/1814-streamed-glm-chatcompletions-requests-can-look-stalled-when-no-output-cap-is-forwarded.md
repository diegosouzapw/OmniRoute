---
issue: 1814
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 18
  labels: []
  state: open
  classified_at: 2026-05-01T10:53:07Z
---

# Feature: [Feature] Streamed GLM chat/completions requests can look stalled when no output cap is forwarded

> GitHub Issue: #1814 — opened by @apoapostolov on 2026-04-30T10:49:11Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

Hermes requests routed through OmniRoute to `glm/glm-5-turbo` can appear stalled for 30-85s before the first useful completion finishes.

Observed on 2026-04-30:
- `POST /v1/chat/completions`
- provider: `glm`
- requested model: `glm/glm-5-turbo`
- status: `200`
- duration: `84609 ms` on one call, with many others in the 25-45s range
- prompt tokens: `68906`
- completion tokens: `5449`
- stream: `true`
- tools: `25`
- `finish_reason: "tool_calls"`
- request body contained `messages`, `model`, `stream`, `stream_options`, `tools`, and `_omniroute`, but no `max_tokens` or `max_completion_tokens`

The gateway logs look healthy, so this does not appear to be a crash. The user-visible problem is that requests with very large prompts and no explicit output cap can look like the endpoint is hanging even though they eventually complete.

Possible improvements:
- add a configurable default output cap when the client omits one
- surface a warning/metric when streaming requests arrive with no cap and very large prompts
- add clearer observability around time-to-first-token vs total completion time

I can share the local call-log details if useful.

## 💬 Community Discussion

*No comments.*

### Participants

- @apoapostolov

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
