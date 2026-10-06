---
title: "Cursor Provider in Docker Environments"
version: 3.8.50
lastUpdated: 2026-08-17
---

# Cursor Provider in Docker Environments

When OmniRoute runs inside Docker, the legacy **Import from Cursor IDE** /
`cursor-agent` flows fail because the container cannot see the host Cursor
install. Use **Login with Cursor** (deep-control PKCE) instead.

## Why IDE / CLI Import Fails in Docker

1. **Filesystem isolation** — Auto-import looks for Linux paths such as
   `~/.config/Cursor/User/globalStorage/state.vscdb` _inside_ the container.
   On Docker Desktop for macOS the host IDE DB is not mounted by default, and
   the container OS is Linux even when the host is Darwin.
2. **No `cursor-agent` binary** — Official OmniRoute images do not ship
   `cursor-agent`. Available Models previously shelled out to
   `cursor-agent --list-models` and fell back to a static catalog.
3. **Wrong binary** — Do **not** bind-mount a macOS `cursor-agent` into a Linux
   container. It will not execute.

## Recommended: Login with Cursor

1. Open **Dashboard → Providers → Cursor**.
2. Choose the **Login with Cursor** tab.
3. Click **Login with Cursor** — OmniRoute opens
   `https://cursor.com/loginDeepControl?…` in your **host** browser.
4. Approve the login in the browser, then return to the dashboard. OmniRoute
   polls `api2.cursor.sh/auth/poll` until tokens arrive.
5. OmniRoute stores **access + refresh** tokens and refreshes them via
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

This path does not require Cursor IDE or `cursor-agent` inside the container.

## Model discovery

With a logged-in connection, **Available Models / Auto-Sync** prefers Cursor’s
HTTP `AiService/AvailableModels` catalog using the connection bearer token.
If that fails, OmniRoute still tries host `cursor-agent` (when present), then
the static registry seed.

OmniRoute always exposes **`auto`** in the catalog (display “Auto”), plus
OpenCodex-style router modes **`auto-cost`**, **`auto-balance`**, and
**`auto-intelligence`**. On the wire these map to Cursor’s `default` model
(with an `optimization` ModelParameter for the three variants). Prefer
`cu/auto` when premium models are out of usage — Auto often still has budget.

### Live catalog is exclusive when synced

After a successful Cursor model sync (`cursor-agent --list-models` → persisted
synced catalog, or the bearer-authenticated `AvailableModels` fetch above), the
**dashboard**, **`/v1/models`**, and **Test All** list:

1. Models returned by the live sync
2. Injected auto-router ids: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operator **custom** models (Import / manual) — never pruned by sync

The large static registry under
`open-sse/config/providers/registry/cursor/` is **offline fallback only**. When
synced is empty (or discovery fails), listing falls back to that registry.

Effort-suffixed ids (for example `claude-4.6-sonnet-high`) may still be
**requested** at runtime: `resolveRequestedModel` strips the suffix into a wire
`ModelParameter`. Exclusive listing intentionally hides those static variants
from Test All so probes match what Cursor actually returns as available.

### Helpers

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — dashboard merge
- `ensureCursorAutoCatalogEntry` — auto* inject on discovery + listing
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` static loop

## Provider Limits (quota)

**Usage → Provider Limits** for Cursor uses Bearer APIs on `api2.cursor.sh`
(`GetCurrentPeriodUsage` → usage summary → auth/usage) after PKCE or token
import. The legacy cookie/`cursor.com` dashboard path remains a last fallback
for older IDE-imported sessions.

Windows typically include **Total**, **Auto + Composer**, and **API**. If
limits look empty, re-run **Login with Cursor** or re-import tokens (IDE import
alone is no longer required).

## Empty turns / out of usage

When Cursor accepts a Run but returns no assistant text (common when premium
usage is exhausted), OmniRoute surfaces an actionable **429** (quota cues) or
**502** with guidance — not a bare “Provider returned empty content”. Streaming
failures such as `not_found: AI Model Not Found` (usage window exhausted) are
classified as **Cursor rate limit / usage exceeded** and keep that message
through the SSE pipeline (the shared empty-stream guard does not overwrite an
already-emitted error). Check Provider Limits, try model **`auto`**, or raise
Cursor plan limits.

## Client version (headless)

Without a local `cursor-agent` install, OmniRoute resolves
`x-cursor-client-version` via env `CURSOR_AGENT_CLI_VERSION`, then a disk-cached
scrape of the Cursor installer script, then a pinned build id. Override with
`CURSOR_AGENT_CLI_VERSION` when needed.

## Fallback: Manual Token Import

If you cannot complete browser login:

1. On the host, extract tokens from Cursor’s `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Open **Import token** in the Cursor auth modal.
3. Paste **Access Token** and, when available, **Refresh Token** (required for
   automatic refresh). Machine ID is optional.

Access-token-only imports still work but will expire without a refresh token —
re-import when chat returns authentication errors.

## Related

- Zed Docker guidance: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor login reference (external):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
