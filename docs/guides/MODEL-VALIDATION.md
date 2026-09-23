---
title: "Validate and add a custom chat model"
version: 3.8.51
lastUpdated: 2026-09-22
---

# Validate and add a custom chat model

`omniroute models test-add` performs an opt-in validation against one explicitly selected
provider connection, then registers the custom model only if every proof passes. These
requests can incur provider charges. The command requires both `--allow-inference` and
`--yes`; ordinary manual model registration remains unverified and does not run inference.

```sh
omniroute models test-add example-model --provider openai --connection CONNECTION_ID --allow-inference --yes
```

Use an actual connection ID from your configured server. Local and remote CLI contexts use
the same management endpoint; the CLI never falls back to a local database when this request
fails. Provider credentials remain on the server. No shell, browser, filesystem tool, or other
real tool is executed as part of the synthetic tool-call proof.

## HTTP contract

`POST /api/provider-models/validate-and-add` always requires management authentication,
including when ordinary dashboard routes permit unauthenticated access. The existing
dashboard-session, scoped management-key, local CLI-token and remote access-token policies
apply. Responses, including authentication and validation errors, use `Cache-Control: no-store`.

The strict JSON body accepts:

| Field               | Required | Meaning                                                               |
| ------------------- | -------- | --------------------------------------------------------------------- |
| `provider`          | Yes      | Exact stored provider ID, up to 120 characters                        |
| `modelId`           | Yes      | Exact upstream model ID, up to 240 characters                         |
| `connectionId`      | Yes      | Exact stored connection ID, up to 160 characters                      |
| `allowInference`    | Yes      | Must be the boolean `true`                                            |
| `modelName`         | No       | Display name, up to 240 characters                                    |
| `max_input_tokens`  | No       | Positive safe integer; caller-supplied metadata, not a measured limit |
| `max_output_tokens` | No       | Positive safe integer; caller-supplied metadata, not a measured limit |
| `apiFormat`         | No       | `chat-completions` (default) or `responses`                           |

Identifiers cannot contain whitespace or control characters. Extra body properties, custom
URLs, arbitrary prompts, client-provided receipts and credentials are rejected. The body
limit is 16 KiB; body reading has a 10-second deadline.

## Proofs and persistence

The server generates unpredictable values and checks these three sequential requests:

1. Generation returns the requested nonce exactly.
2. A streamed response calls the synthetic echo function once with the exact nonce. Its
   stream must contain the expected terminal reason and end marker, without subsequent data.
3. A continuation returns the synthetic tool result exactly.

Each stage has a 20-second deadline, a 128-token requested output budget and a 64-KiB
response-read limit. The overall operation has a 90-second deadline. Existing provider
translation, rate limits and safety processing remain in the chat core. Providers may impose
their own token-budget semantics; these bounds are not a billing estimate.
Optional prompt compression, compaction and compression prewarming are disabled for these
synthetic proofs, so they cannot make auxiliary inference requests before the dispatch fence.

An in-process dispatch fence checks the native executor identity, exact model, connection and
credentials. An undispatched cache/bypass result, sibling-account fallback, model fallback,
proxy-executor wrapper, retry or credential refresh cannot produce a successful receipt.
The observer checks every physical HTTP send, including internal retry branches, and verifies
the final Bearer header and JSON model field before that send. Each proof permits one send.
Connection/provider eligibility is checked before dispatch. Provider-proxy rerouting modes,
active exclusive leases and unavailable selected connections are refused instead of silently
selecting another target. The semantics of normal `forcedConnectionId` routing are unchanged.

The server compares its internal connection/configuration snapshot before dispatch and again
inside the final SQLite transaction. Configuration or credential changes invalidate the
attempt. The transaction inserts a previously absent custom-model record and reads it back;
existing models are never overwritten. Other validation operations on the same connection
are rejected while one operation is active in that server process.

HTTP `201` returns `schemaVersion: 1`, `model`, `persistenceVerified: true` and `validation`.
The validation record includes a UUID `id`, `status: "passed"`, the exact `provider`,
`modelId`, `connectionId`, an ISO `validatedAt`, and three `stages` marked `passed`.
The same informational validation record is stored with the custom model. It is not a
client-redeemable authorization token: validation and registration are one operation.

Common failures are `400` for invalid input/consent, `401`/`403` for management authorization,
`408` for cancellation/deadline, `409` for conflict, unavailable connection or changed
configuration, `413` for oversized input, and `422` for incomplete proofs. Errors use the
sanitized OmniRoute error envelope; upstream response bodies and credentials are not returned.

## Initial supported dispatch scope

Strict validation currently supports the native Base/Default executor paths for `openai`
and canonical OpenAI-compatible chat/responses nodes, with a single Bearer credential and an
exact JSON `model` field. Redirects are refused before a second destination can receive the
request. Specialized executor subclasses and other provider IDs return
`VALIDATION_EXECUTOR_UNSUPPORTED` (`422`). Session pools, extra-key rotation, alternate auth
headers, provider proxies and credential refresh are refused. This restriction applies only
to Test & Add: normal chat retains its existing provider, refresh, retry and pool behavior.

Active runtime plugins also make strict validation unavailable (`VALIDATION_PLUGINS_UNSUPPORTED`).
The request does not skip an installed plugin policy: it fails before running that plugin.
A private async request guard prevents handlers activated during the proof, including delayed
response/stream work, from executing in the validation scope. Normal requests retain their
plugin behavior. Plugin configuration is included in the final transactional snapshot check.

## What this does not establish

The receipt describes one successful, bounded interoperability check at its timestamp. It
does not certify future availability, native tool implementation, image support, reasoning
quality, pricing, context-window capacity or all possible conversations. Those values are not
inferred or invented. Models requiring credential refresh, alternate executor routing, or
different canonical model IDs can fail the strict check even when ordinary fallback-enabled
chat works. Refresh/reconfigure explicitly and retry if appropriate.

Implementation tests use isolated temporary databases, the real chat core and native executors
with fake HTTP transport. They do not establish live upstream availability or authorize paid
smoke tests.
