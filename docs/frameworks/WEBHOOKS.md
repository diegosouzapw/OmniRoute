---
title: "Webhooks"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Webhooks

> **Source of truth:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute can fire HTTP webhooks on platform events. Use them to integrate with
Slack, PagerDuty, Datadog, internal alerting services, or any HTTP receiver.

The dispatcher signs each delivery with HMAC-SHA256, retries on transient
failures, tracks delivery health per webhook, and auto-disables endpoints that
keep failing.

## Supported Events

The `WebhookEvent` type (`src/lib/webhooks/eventDescriptions.ts`, consumed by `src/lib/webhookDispatcher.ts`) currently models exactly four events:

| Event               | Fires when                                         |
| ------------------- | -------------------------------------------------- |
| `request.completed` | A proxied request completes successfully           |
| `request.failed`    | A proxied request fails after all retries/fallback |
| `quota.exceeded`    | An API key crosses a budget/quota threshold        |
| `test.ping`         | Synthetic event used by the test endpoint          |

Subscriptions accept the literal `"*"` to receive every event. Unknown event
names in `events` are ignored at dispatch time.

> Note: the dispatcher API is wired, but production call sites for some of the
> non-`test.ping` events are still landing. Check `grep dispatchEvent` to see
> which paths currently invoke the dispatcher in your release.

## Architecture

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch is fire-and-forget for the caller: `Promise.allSettled` swallows
per-webhook errors so one bad receiver cannot block the others.

## HMAC Signing

When a webhook has a `secret`, OmniRoute signs the JSON body and sends:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Header names use the `X-Webhook-*` prefix (not `X-OmniRoute-*`). The signature
> value is `sha256=<hex>` — verify the full prefix.

If `createWebhook` is called without a secret, the DB module generates one
(`whsec_<48 hex>`) so all webhooks are signed by default.

### Verifying on the receiver

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Always verify against the **raw** request body, before any JSON parsing.

## Retry & Failure Policy

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 second timeout per attempt (`AbortController`).
- HTTP 2xx counts as success.
- HTTP 3xx/4xx counts as a non-retryable final status — recorded as delivered
  with `success = res.ok`.
- HTTP 5xx and network errors are retried with exponential backoff:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- After `maxRetries`, the delivery is recorded as failed.
- Each delivery updates `last_triggered_at`, `last_status`, and either resets
  or increments `failure_count`.
- The dispatcher calls `disableWebhooksWithHighFailures(10)` after each fan-out,
  so any webhook with `failure_count >= 10` is automatically disabled.

## Database

Table `webhooks` (migration `011_webhooks.sql`):

| Column              | Type    | Notes                                         |
| ------------------- | ------- | --------------------------------------------- |
| `id`                | TEXT PK | UUID                                          |
| `url`               | TEXT    | Destination URL                               |
| `events`            | TEXT    | JSON array; default `["*"]`                   |
| `secret`            | TEXT    | HMAC secret (auto-generated if not given)     |
| `enabled`           | INT     | 0/1; defaults to 1                            |
| `description`       | TEXT    | Optional human label                          |
| `created_at`        | TEXT    | `datetime('now')`                             |
| `last_triggered_at` | TEXT    | Updated on every delivery attempt             |
| `last_status`       | INT     | HTTP status of the last attempt (0 = network) |
| `failure_count`     | INT     | Resets to 0 on success, +1 on failure         |

Delivery history is persisted in the dedicated `webhook_deliveries` table
(migration `069_webhook_deliveries.sql`, written via
`src/lib/db/webhookDeliveries.ts::insertDelivery` on every attempt), in addition
to the aggregate counters on the `webhooks` row. Kind metadata (Slack / Discord /
Telegram / custom payload transformers) was added by `070_webhooks_kind_metadata.sql`.

## REST API

All endpoints require management auth (`requireManagementAuth`).

| Endpoint                        | Method | Description                              |
| ------------------------------- | ------ | ---------------------------------------- |
| `/api/webhooks`                 | GET    | List webhooks (secrets masked)           |
| `/api/webhooks`                 | POST   | Create webhook                           |
| `/api/webhooks/[id]`            | GET    | Webhook detail (full secret)             |
| `/api/webhooks/[id]`            | PUT    | Update fields                            |
| `/api/webhooks/[id]`            | DELETE | Remove                                   |
| `/api/webhooks/[id]/test`       | POST   | Fire a `test.ping` (no retries)          |
| `/api/webhooks/[id]/deliveries` | GET    | Recent delivery attempts for one webhook |
| `/api/webhooks/validate-url`    | POST   | Pre-flight URL validation (SSRF guard)   |

`GET /api/webhooks` masks the secret to `<first 10 chars>...` to avoid leaking
on listing pages. Use the `[id]` GET when you actually need the secret.

### Create webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

If `secret` is omitted, the server generates a `whsec_<hex>` secret and returns
it in the response.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returns `{ delivered, status, error }`. No retries are attempted — useful for
quickly validating that the receiver accepts the payload and signature.

## Dashboard

The dashboard page at `/dashboard/webhooks` (see
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) provides:

- Create/edit webhooks with an event picker
- Status indicator (active / inactive / errored) based on `enabled`,
  `failure_count`, and `last_status`
- One-click test delivery
- Manual enable/disable toggle

## Payload Examples

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Field shapes for non-`test.ping` events are defined by the call sites that emit
them; treat the `data` object as forward-compatible (add fields, don't depend on
absence).

## Best Practices

- **Verify the signature on every delivery** against the raw body — prevents
  spoofed POSTs from anyone who guesses your webhook URL.
- **Respond 2xx within ~5 seconds** — the dispatcher times out at 10 s. Slow
  receivers will eat retries and inflate `failure_count`.
- **Make handlers idempotent** — retries and at-least-once delivery semantics
  mean duplicates are possible.
- **Subscribe minimally** — list only events you actually consume; `"*"` will
  add cost on receivers you do not control.
- **Watch `failure_count`** — endpoints are auto-disabled at 10 consecutive
  failures; reset by calling `PUT /api/webhooks/[id]` with `enabled: true`
  after fixing the receiver.
- **Rotate secrets periodically** — `PUT` a new `secret`, deploy the new value
  to the receiver, and confirm via the test endpoint.

## See Also

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — full management API surface
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker / cooldown
  semantics behind provider failures surfaced via `request.failed`
- Source: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
