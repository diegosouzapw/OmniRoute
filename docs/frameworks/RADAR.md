---
title: "Radar Free-Model Catalog"
version: 3.8.50
lastUpdated: 2026-08-07
---

# Radar Free-Model Catalog

> **Source of truth:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Last updated:** 2026-08-07 — v3.8.50

Radar is an **optional add-on** that overlays a signed, freshly-curated free-model
catalog on top of the release baseline (`FREE_MODEL_BUDGETS` in
`open-sse/config/freeModelCatalog.data.ts`). It exists because the free-tier landscape moves
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

## Getting a supporter key

The activation screen (`/dashboard/radar`) links out to two flows for **obtaining** a
supporter key. The OSS repo itself never issues one, never runs payment code, and
**never states a price** — pricing is decided and displayed entirely on the
destination pages, not in this repo (spec decision D14).

- **"I'm a contributor"** — opens `RADAR_CONTRIBUTOR_CLAIM_URL` (default
  `https://radar.omniroute.online/auth/github`), a GitHub OAuth claim flow hosted on
  the private radar server. It verifies the visitor's GitHub account and grants a
  supporter key to anyone with 5+ merged pull requests or a top-100 contributor spot
  on the repo.
- **"Support the project"** — opens `RADAR_SUPPORTER_PLANS_URL` (default
  `https://radar.omniroute.online/planos`), the payment/plans page.

Both URLs are resolved server-side (`src/lib/radar/links.ts`, same env-override
pattern as `RADAR_FEED_URL`) and relayed to the dashboard through the existing
`GET /api/radar/settings` response (`contributorClaimUrl`, `supporterPlansUrl`) — the
client component never reads `process.env` itself.

| Var                             | Purpose                                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL`   | Overrides the contributor-claim URL (default `https://radar.omniroute.online/auth/github`).   |
| `RADAR_SUPPORTER_PLANS_URL`     | Overrides the supporter-plans URL (default `https://radar.omniroute.online/planos`).          |

Once a visitor has a key (`omr_` + 40 hex chars), it is set with `POST
/api/radar/settings` (`{ supporterKey }`) — the same endpoint documented under
[Data sync](#data-sync-is-a-separate-opt-in--the-privacy-promise) above.

**Known gap:** the dashboard activation screen does not yet have a dedicated
key-paste input — pasting a key today requires calling `POST /api/radar/settings`
directly (curl, a script, or a future UI). This release only adds the two claim/plans
buttons; the API already accepts and masks the key, but no `<input>` for it exists in
`src/app/(dashboard)/dashboard/radar/page.tsx` yet.

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

### Response size cap (10 MB)

`syncRadar()` enforces a **10 MB hard cap** on the feed response body — the signed
feed is a KB-scale JSON document, so anything past this points at a misconfigured or
hostile `RADAR_FEED_URL` (or an upstream serving garbage), not a legitimate catalog.
Enforcement is two-layered:

1. A `Content-Length` preflight check skips reading the body entirely when the
   header already declares a value over the cap.
2. A running-total check while reading the body enforces the cap even when
   `Content-Length` is absent or understates the real size — the header is never
   trusted on its own. Concatenating the accumulated chunks preserves the exact
   bytes needed for the Ed25519 signature check afterward.

Exceeding the cap returns `{ status: "too_large" }` and leaves the cache untouched,
following the same non-destructive pattern as every other sync failure
(`invalid_signature`, `invalid_schema`, `stale`).

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

### The served tier comes from a response header, not the signed body

The signed feed **body**'s `tier` field is always `"live"` — the feed service ships
**one signed artifact per version**, so the body cannot carry a per-request tier
without invalidating the Ed25519 signature (re-signing per request would defeat the
point of a pinned, cacheable, verifiable artifact). The tier actually served for a
given request is instead carried in the **`x-omniroute-feed-tier` response header**,
decided server-side from the request's `Authorization` key.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) is the single place
that resolves the tier a client should trust:

1. Parse `x-omniroute-feed-tier` with `RadarTierSchema` (Zod) — an absent header, or
   a value that isn't exactly `"community"` or `"live"`, is treated as **not
   present** (never trusted into the cache/UI as-is; this also covers older feed
   servers that predate the header).
2. Fall back to the signed body's `tier` field (always `"live"`) only when step 1
   yields nothing.
3. The resolved tier is what gets cached and returned as `{ status: "updated",
   version, tier }` — this is the value the dashboard shows, never the raw body
   field.

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

Five local routes back the UI, all under `src/app/api/radar/`:

| Route                   | Method | Purpose                                                                                          |
| ----------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`    | GET    | Returns the merged catalog (`getRadarCatalog()`) from the local cache.                            |
| `/api/radar/sync`       | POST   | Triggers `syncRadar()` server-side; returns the resulting status.                                 |
| `/api/radar/settings`   | GET    | Returns `{ optIn, hasSupporterKey, supporterKeyMasked }` — never the raw key.                     |
| `/api/radar/settings`   | POST   | Sets opt-in and/or the (encrypted) supporter key.                                                 |
| `/api/radar/referrals`  | GET    | Returns `{ fixed, campaigns, tier }` from the local cache — see [Referral links](#referral-links-free-credits) below. |

**Hard rule: these routes never proxy the feed service.** The browser only ever talks
to the local OmniRoute server; `syncRadar()` is the single module in the whole client
that touches the network for Radar (`src/lib/radar/sync.ts`), and it always runs
server-side, never client-side. This keeps the feed URL and any supporter key
out of client-facing network traffic entirely.

All five routes return `404` when `RADAR_ENABLED` is off (see
[Flag](#flag-radar_enabled-default-off) above), and route error responses through
`buildErrorBody()`/`sanitizeErrorMessage()` per the repo-wide error-sanitization rule
(`docs/security/ERROR_SANITIZATION.md`).

### Authentication

All five routes require authentication via `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — a dashboard session cookie or a management-scoped
API key, the same gate that protects the rest of `/api/settings/*`. The flag-off
`404` check always runs **before** the auth check, so an install with `RADAR_ENABLED`
off stays byte-identical (no auth prompt just to learn the surface doesn't exist);
once the flag is on, an unauthenticated request gets `401` before any DB read or
write. `GET /api/radar/settings` never returns the raw supporter key regardless of
auth state — only the masked form and a `hasSupporterKey` boolean.

---

## Referral links (free credits)

The server-published feed carries a `referrals` section (server-side D28 work, already
in production — this section documents the **client** consumption only):

```ts
referrals: {
  fixed: RadarReferral[],      // present in EVERY tier, including community
  campaigns: RadarReferral[],  // only populated on the live (supporter) tier;
                                // the community artifact always publishes []
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

The client never decides which tier it received or which referrals belong in which
tier — the server already publishes two artifacts (`live`/`community`) with
`campaigns` gated server-side, same principle as the [tiers](#tiers-community-and-live)
section above. `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) validates `referrals`
as a whole-object `.default({fixed:[],campaigns:[]})`, and `campaigns` defaults
independently inside it — so a feed cached before this section existed on the server
still parses cleanly, and `campaigns` alone can also be absent without failing
validation. Every `RadarReferral.url` must be `https://` — a `http://` url fails
schema validation.

### Accessor

`src/lib/radar/index.ts` exports two read-only accessors, both never throwing (same
defensive contract as `getRadarCatalog()` — flag off, no cache, or a corrupt/old cached
payload all resolve to the empty shape instead of an error):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`.
- `getDefaultReferralFor(provider)` → the `fixed` referral with `isDefault: true` for
  that provider, or `null`. Only looks at `fixed` — a campaign is never used as a
  provider's "default" link.

The actual "which referral is the default for a provider" rule lives in
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), a small pure function with **no
DB import** — it is safe to import into a `"use client"` component. `getRadarReferrals`/
`getDefaultReferralFor` (in `index.ts`) pull in `@/lib/db/radar` and therefore stay
server-only; the providers dashboard imports `referrals.ts` directly instead of
`index.ts` (see below) to avoid bundling `better-sqlite3` into the browser.

### `GET /api/radar/referrals`

Follows the exact same gate order as every other Radar route: `RADAR_ENABLED` off →
`404` (checked first, byte-identical inertia); unauthenticated → `401`; otherwise `200`
with `{ fixed, campaigns, tier }` — `tier` comes straight from the cache row and is
purely informative (drives the UI's soft upsell copy below), the route does no
gating of its own. Never proxies the feed server — same local-cache-only contract as
`/api/radar/catalog`.

### Dashboard UI — "Free credits" tab on `/dashboard/radar`

Reuses the existing Radar page (`src/app/(dashboard)/dashboard/radar/page.tsx`) as a
second tab instead of a new route — less routing/i18n surface for a feature that is a
variation on data the page already fetches. Once opted in, the tab bar offers
**Catalog** (existing table) and **Free credits**:

- Fixed links are grouped by provider, each showing `requiredAction` (when present)
  and a `target="_blank" rel="noopener noreferrer"` button to the referral URL.
- Campaigns show the same, plus `validUntil` when present.
- When `campaigns` is empty **and** the served tier is `community`, the UI shows a
  short upsell note ("limited-time campaigns are a supporter extra") — this **never**
  hides or gates the fixed links list, which stays fully populated for every tier. The
  upsell is soft messaging only, never a block.

### Referral link on the provider name (providers dashboard)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
already linked the provider name to `providerInfo.website` when present, with one
precedent for a monetized link: the Kimi (Moonshot AI) partner-link note
(`providers.kimiPartnerLinkNote` i18n key). D28 reuses that exact same discreet-note
pattern for Radar default referrals instead of introducing a new key.

Loose coupling, by design:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  is a **pure** function — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — with no dependency on `@/lib/radar` or `@/lib/db/*`. `providerPageUtils.ts` as a
  whole stays free of those imports (asserted by
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (a `"use client"` component) is the one place allowed
  to fetch Radar data — via `fetch("/api/radar/referrals")`, the same local-route
  pattern the Radar dashboard page itself uses — and it computes the default referral
  client-side with `findDefaultReferral()` from the DB-free `src/lib/radar/referrals.ts`.
- With `RADAR_ENABLED` off, the fetch 404s, `referralUrl` stays `null`, and
  `resolveProviderHeaderLink()` returns the static catalog `website` unchanged — the
  provider page is byte-identical to before this feature existed. Same outcome when
  there is no cache yet or no default referral for that specific provider.
- When a default referral does apply, `ProviderPageHeader` receives `isReferralLink`
  and shows the same discreet note/tooltip as the Kimi partner link (reusing the
  `providers.kimiPartnerLinkNote` key) — never a new, separate visual treatment.

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
  error-response pattern the five `/api/radar/*` routes follow.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` reference.
