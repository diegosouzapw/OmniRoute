---
title: "CLI model catalog and manual metadata"
version: "3.8.51"
lastUpdated: "2026-09-21"
---

# CLI model catalog and manual metadata

`omniroute models` reads the selected server's public model catalog first, including
its custom and synchronized entries. `--output json` and `--output jsonl` return all
matching rows, without a table truncation message. Interactive tables show at most
50 rows. JSON preserves public context limits, modalities, capabilities, model source
when supplied by the server, and API-format metadata; credentials and compatibility
headers are not output. A legacy `/api/models` fallback is used only when the public
endpoint returns HTTP 404, 405 or 501, never after an authentication failure.
`omniroute completion refresh` uses that same catalog. A failed model-catalog request
returns a nonzero exit code and preserves the previous completion cache. Bash, Zsh
and Fish completion scripts advertise the manual model subcommands.

## Manual model lifecycle

These operations use the existing authenticated `/api/provider-models` management
API. They honor the same global `--context` and `--base-url` selection as other CLI
commands. Use the canonical provider ID and the provider's model ID separately; a
model ID containing slashes is valid. Use a configured management context rather
than putting credentials into command arguments.

```bash
omniroute models openai --output json
omniroute models manual openai
omniroute models add openai my-model --name "My model" --context-window 32768 --dry-run
omniroute models add openai my-model --name "My model" --context-window 32768
omniroute models edit openai my-model --context-window 65536
omniroute models edit openai my-model --clear-context-window
omniroute models remove openai my-model --dry-run
omniroute models remove openai my-model --yes
```

Examples describe syntax; replace provider/model IDs with entries belonging to your
server. The add operation does not create a provider connection.

- `add` refuses an existing custom entry. Optional `--max-output-tokens` sets the
  output limit at creation; `--api-format` sets the model's API format and its
  matching endpoint metadata, such as `embeddings` rather than `chat`.
- `edit` requires an existing manual entry. Its context limit uses the backend's
  independent manual context override; clearing it removes that override, not the
  original input limit or synchronized metadata.
- `remove` requires `--yes`, except with `--dry-run`. It requests `resetOverride=true`,
  preserving a synchronized entry with the same ID. Bulk deletion is not exposed.
- `--dry-run` performs the authenticated preflight read but no write or inference.
- Every actual mutation reads the manual catalog back. `persistenceVerified: true`
  means the requested metadata was observed after the write; it does not mean the
  model can generate text or call tools. `inferenceValidation` is always `not-run`.
- A readback failure returns a nonzero exit code. The write may already have taken
  effect; inspect the server before retrying. Concurrent writers are not serialized
  by this CLI, and the existing API does not provide a compare-and-swap transaction.

## Test & Add: not implemented

Manual entries are unverified. There is no `--validate` flag and these commands do
not issue inference requests or execute tools. A future opt-in validation flow must
separate inference credentials from management authentication and establish which
exact provider connection produced all three proofs: generation, a nonce-bound
synthetic tool call, and continuation after a synthetic tool result. No real tool
execution is needed for those proofs.

The existing `x-omniroute-connection` pin alone is insufficient as a proof receipt:
credential selection can intentionally release a pin for cooldown, quota or
excluded-account cases, and session affinity participates in selection. See
`src/sse/services/auth.ts` and the `forcedConnectionId` handling in
`src/sse/handlers/chat.ts`. Before implementing Test & Add, decide a strict-pin or
verifiable connection-receipt contract. Tests must then prove no persistence after
any failed, truncated, timed-out or wrong-connection response. This is a separate
backend contract decision, not a promise made by manual CRUD.
