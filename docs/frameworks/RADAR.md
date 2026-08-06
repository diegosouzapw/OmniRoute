---
title: "Radar Free-Model Catalog"
version: 3.8.50
lastUpdated: 2026-08-05
---

# Radar Free-Model Catalog

> **Source of truth:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Last updated:** 2026-08-05 — v3.8.50

Radar is an **optional add-on** that overlays a signed, freshly-curated free-model
catalog on top of the release baseline (`FREE_MODEL_BUDGETS` in
`open-sse/config/freeModelCatalog.ts`). It exists because the free-tier landscape moves
faster than release cadence — providers add, shrink, or discontinue free quotas between
releases, and the baseline catalog can only be refreshed when a new version ships.

**Nothing that is free today stops being free.** Radar never removes or paywalls a
baseline entry; it only refreshes limits/status fields at read time and can layer in
newly-discovered free models between releases. The baseline catalog itself is never
mutated on disk — see [Read-time overlay merge rules](#read-time-overlay-merge-rules)
below.

---

## Flag: `RADAR_ENABLED` (default off)

Radar is gated end-to-end by the `RADAR_ENABLED` feature flag
(`src/shared/constants/featureFlagDefinitions.ts`, category `policies`,
`defaultValue: "false"`).

**When the flag is off, the surface does not exist:**

- `GET /api/radar/catalog`, `POST /api/radar/sync`, `POST /api/radar/settings` all
  return `404` before touching any Radar module.
- The dashboard screens (`/dashboard/radar`, `/dashboard/radar/setup`) render
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) returns the untouched baseline —
  same entry count, same values, every entry tagged `origin: "baseline"` — and never
  reads the feed cache.
- No network call is ever made; `syncRadar()` (`src/lib/radar/sync.ts`) returns
  `{ status: "disabled" }` at step 1 without touching `fetch`.

This is a strict superset gate: flipping the flag on unlocks the _screens_, nothing
more. It does not upload data, does not start a background sync, and does not change
routing or model selection — see the separate opt-in below.

---

## Data sync is a SEPARATE opt-in — the privacy promise

Turning `RADAR_ENABLED` on only unlocks the UI. Syncing the feed requires a second,
independent opt-in stored in `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migration `136_radar_cache_settings.sql`). `syncRadar()` checks the flag _and_ the
opt-in before making any network call:

```
Flag off      → { status: "disabled" }   — no network call
Opt-in false  → { status: "opt_out" }    — no network call
```

When both are on, the sync path is:

1. `GET <feed base URL>/v1/catalog/latest` with an optional `Authorization: Bearer
<supporter key>` header (see below).
2. Nothing about the request, the operator, or their traffic is uploaded — it is a
   plain, unauthenticated-by-default GET. OmniRoute never posts usage data, provider
   configuration, or model traffic to the feed service.
3. The response is verified, validated, and cached locally (see
   [Security model](#security-model)). Nothing else touches the network for Radar.

The **supporter key** is an optional Bearer token (`radar_settings.supporter_key`)
that lets the feed service decide which tier to serve (see
[Tiers](#tiers-community-and-live)). It is:

- Stored **encrypted at rest** with the same AES-256-GCM `encrypt()`/`decrypt()`
  helpers (`src/lib/db/encryption.ts`) used for provider credentials.
- Set via `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) and
  **never echoed back** — the response returns a masked form (`omr_****abcd`).
- Sent to the feed service as a Bearer token on the sync GET — nothing else about the
  key ever leaves the client.

---

## Security model

### Ed25519 signature over exact bytes

The feed payload is signed with Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifies the signature over the **exact response bytes**
received over the wire — the payload is never re-serialized before verification, so a
byte-for-byte re-encoding cannot silently invalidate or bypass the signature check.
Verification failure (`invalid_signature`) aborts the sync before the payload is ever
parsed or cached.

### Pinned public key + rotation

The verifying public key is pinned in `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), an array so a new key can be prepended ahead of a
rotation while old cached feeds signed with a previous key remain valid until
re-synced.

### Fork-friendly env overrides

Two env vars let forks and self-hosters point the client at their own feed instead of
the default OmniRoute service — see
[How to self-host a feed](#how-to-self-host-a-feed) below:

| Var                 | Purpose                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Overrides the feed base URL (default `https://radar.omniroute.online`).                                      |
| `RADAR_FEED_PUBKEY` | Overrides the pinned public key (base64-DER SPKI or PEM), replacing the built-in array with this single key. |

### Version floor

`syncRadar()` rejects a downloaded feed whose `version` is not strictly newer than the
currently cached version (`compareVersions()`, dotted `YYYY.MM.DD.n` comparison) —
`{ status: "stale" }`. This prevents a compromised or misconfigured feed endpoint from
rolling a client back to an older, differently-signed payload.

### Schema validation

The downloaded bytes are parsed and validated against `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, a Zod schema) **after** signature verification. A
schema mismatch returns `{ status: "invalid_schema" }` and the cache is left
untouched. The cached payload is defensively re-validated again on every read
(`getRadarCatalog()`) — a corrupted or hand-edited cache row falls back to the
baseline rather than being served.

---

## Tiers: `community` and `live`

The feed schema carries a `tier: "community" | "live"` field, decided **server-side**
by the feed service based on the request (presence and validity of the supporter key)
— the client never decides its own tier.

- **`community`** — the free catalog delayed by roughly 30 days behind the freshest
  data. This is what an unauthenticated or invalid-key request receives.
- **`live`** — the freshest catalog, served to requests carrying a valid supporter
  key.

**An invalid or expired supporter key degrades to `community` — it is never an
error.** The sync path only distinguishes signature/schema/version failures (all
recoverable, all non-fatal to the cached state) from a successful `{ status:
"updated", version, tier }`. There is no tier-specific error path a client needs to
handle.

---

## Read-time overlay merge rules

`applyFeed()` (`src/lib/radar/applyFeed.ts`) merges the cached feed **over** the
static baseline at **read time**, inside `getRadarCatalog()`. The baseline array
(`FREE_MODEL_BUDGETS`) is never mutated — a `MergedEntry[]` is computed fresh on every
call.

Four rules, in order of precedence:

1. **Feed never overwrites a local override.** Per-field: if the operator has
   customized a field on an entry (`localOverrides` map, keyed `provider:modelId`),
   the feed's value for that specific field is skipped — the operator's value wins.
2. **`enabled: false` disables the entry, with provenance.** A feed entry that turns
   an entry off sets `enabled: false` and `disabledBy: "radar"` on the merged result,
   so the UI can explain _why_ an entry went from available to disabled.
3. **A user-added entry not present in the feed survives untouched.** Entries that
   only exist in the baseline (or were added locally) and have no corresponding feed
   entry pass through unchanged.
4. **A tombstoned entry is never resurrected.** If the operator explicitly deleted an
   entry (`tombstones` set), the feed re-adding that `provider:modelId` in a later
   version does not bring it back.

### Provenance markers

Every merged entry carries an `origin` field the UI renders as a badge:

- `"baseline"` — untouched from the static release catalog.
- `"radar"` — one or more fields were refreshed by the feed.
- `"local"` — the operator has at least one local override on this entry (local
  overrides always win over the feed per rule 1, regardless of what the feed says).

---

## Local surfaces — never a feed proxy

Three local routes back the UI, all under `src/app/api/radar/`:

| Route                 | Method | Purpose                                                                |
| --------------------- | ------ | ---------------------------------------------------------------------- |
| `/api/radar/catalog`  | GET    | Returns the merged catalog (`getRadarCatalog()`) from the local cache. |
| `/api/radar/sync`     | POST   | Triggers `syncRadar()` server-side; returns the resulting status.      |
| `/api/radar/settings` | POST   | Sets opt-in and/or the (encrypted) supporter key.                      |

**Hard rule: these routes never proxy the feed service.** The browser only ever talks
to the local OmniRoute server; `syncRadar()` is the single module in the whole client
that touches the network for Radar (`src/lib/radar/sync.ts`), and it always runs
server-side, never client-side. This keeps the feed URL and any supporter key
out of client-facing network traffic entirely.

All three routes return `404` when `RADAR_ENABLED` is off (see
[Flag](#flag-radar_enabled-default-off) above), and route error responses through
`buildErrorBody()`/`sanitizeErrorMessage()` per the repo-wide error-sanitization rule
(`docs/security/ERROR_SANITIZATION.md`).

---

## How to self-host a feed

A fork or self-hoster that wants full control over the catalog can run their own feed
service without touching client code:

1. Serve a `GET /v1/catalog/latest` endpoint returning a JSON body that satisfies
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — top-level `feed:
"omniroute-radar"`, `schemaVersion: 1`, `version`, `tier`, `providers`, `models`,
   `quirks`, and `totals`.
2. Sign the exact response bytes with an Ed25519 key pair and return the base64
   signature in the `x-omniroute-feed-signature` response header.
3. Set `RADAR_FEED_URL` to the new base URL and `RADAR_FEED_PUBKEY` to the matching
   public key (base64-DER SPKI or PEM) — see the
   [env var reference](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Enable `RADAR_ENABLED` and opt in via `POST /api/radar/settings`
   (`{ optIn: true }`).

No other code changes are required — `verifyFeedBytes()` picks up the override
automatically (`getFeedPublicKeys()` in `src/lib/radar/pinnedKeys.ts`), and version
comparison, schema validation, and the merge rules apply identically to a self-hosted
feed.

---

## Related docs

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — the
  error-response pattern the three `/api/radar/*` routes follow.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` reference.
