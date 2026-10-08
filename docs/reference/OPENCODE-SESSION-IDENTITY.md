---
title: "OpenCode conversation identity"
version: 3.8.51
lastUpdated: 2026-09-21
---

# OpenCode conversation identity

OpenCode and OpenCode Go reuse explicit conversation IDs across turns. The
resolver checks `x-opencode-session`, existing affinity/session headers, native
CLI session/thread headers, request metadata, and then top-level session/thread
fields. Claude's JSON-encoded `metadata.user_id` is inspected for a session ID;
an opaque account/user ID alone is never treated as a conversation ID.

Values containing control characters, empty IDs and IDs longer than 256
characters are ignored. JSON metadata parsing is bounded. Before translation,
the executor header normalizer preserves this identity only for the OpenCode
providers; it does not inject OpenCode headers for other providers.

The existing canonical `ses_` encoding and conversation fingerprint fallback
remain unchanged. With no explicit ID, the first user message and other
existing fingerprint inputs continue to determine continuity. This is not a
new authorization boundary or proof of upstream content isolation.

The implementation lives in `open-sse/utils/opencodeSessionIdentity.ts`,
`open-sse/utils/opencodeHeaders.ts` and
`open-sse/handlers/chatCore/executorClientHeaders.ts`. Regression tests cover
native IDs, Claude metadata, precedence, invalid values and the existing
fingerprint behavior without paid upstream calls.
