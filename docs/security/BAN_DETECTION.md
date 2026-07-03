---
title: Account-Ban / Banned-Keyword Detection
---

# Account-Ban / Banned-Keyword Detection

OmniRoute scans upstream error responses for signals that indicate a provider
**account is permanently dead** (suspended / deactivated / ToS-banned) and, when
matched, moves that connection into a **terminal `banned` state** so it is no
longer selected for requests. This is what the **Security → Banned Keywords**
settings card configures ("Additional keywords that trigger permanent account
ban detection. Built-in keywords always apply.").

This page documents the built-in list, the detection flow, its scope, how to add
custom keywords safely, and how to recover a flagged connection. The terminal
state itself is part of the resilience model — see
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminal states").

**Source of truth:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Built-in keywords

These 8 substrings always apply (case-insensitive), regardless of any custom list:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> This list evolves as providers change their ban wording. The authoritative
> copy is `ACCOUNT_DEACTIVATED_SIGNALS` in `open-sse/services/accountFallback.ts`;
> treat the block above as a snapshot.

Two adjacent, **separate** signal tables live in the same file and are *not* part
of banned-keyword detection:

- `CREDITS_EXHAUSTED_SIGNALS` — billing/quota depleted (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **non-terminal**; a token refresh can recover.

Note: common transient phrases like **`rate limit`** / `429` are handled by the
rate-limit / connection-cooldown path and are **not** ban signals.

## Detection flow

```
upstream error response
  → body stringified + lowercased
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [substring match]
  → match?
      → connection testStatus = "banned"      (permanent — 1-year cooldown, never auto-recovers)
      → if setting `autoDisableBannedAccounts` is on → also isActive = false
      → connection is skipped during account selection (combo QUOTA_BLOCKING statuses)
```

- The match is a **case-insensitive substring** search on the response **body**
  (`isAccountDeactivated`, `accountFallback.ts`).
- The permanent `banned` terminalization fires on a banned-signal body at **any
  HTTP status** (via `markAccountUnavailable` → `checkFallbackError`). The
  narrower **`deactivated`** label (`isActive=false` when the connection has no
  spare API keys) is written by the inline `chatCore.ts` path on **HTTP 401 / 403**
  (classified via `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Note the
  `markAccountUnavailable()` path writes a *different* terminal status —
  **`expired`** — for the same `ACCOUNT_DEACTIVATED` signal (via
  `resolveTerminalConnectionStatus`), so the same ban can surface as either
  `deactivated` or `expired` depending on which path handled the response. (The
  older code comment says "when a 401 body contains these strings" — that
  understates the current behavior.)
- A `banned` connection is excluded from selection everywhere terminal statuses
  are filtered (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Scope — which providers are scanned

**All providers.** The check runs in the generic error-handling pipeline that
every failed upstream request flows through — it is **not** gated to
OAuth/subscription scrapers. The resulting terminal state is per **connection**,
not per provider.

That said, the built-in *strings* are oriented toward subscription/OAuth
providers with real ban risk (ChatGPT Web, Claude Web, Codex, Muse Spark,
Antigravity). An API-key provider will only trip the detector if its error body
literally contains one of the substrings.

## Custom banned keywords

Add or remove keywords in **Security → Banned Keywords** (persisted as the global
`customBannedSignals` setting via `PATCH /api/settings`). They are **added to**
the built-in list — never a replacement — and hot-reload on save (and at startup)
via `setCustomBannedSignals()`. Each keyword is capped at 200 characters; there is
no array-length limit.

**⚠ False-positive risk — choose specific phrases.** Detection is a raw substring
match on the whole response body, and a match is **permanent** (1-year cooldown,
manual recovery). A broad keyword can ban a perfectly healthy connection:

- **Bad:** `quota`, `limit`, `error`, `denied` — appear in many transient errors.
- **Good:** full ban sentences, e.g. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Prefer the longest unambiguous phrase the provider returns on a real ban. When in
doubt, watch the connection's `lastError` first, then add the exact wording.

## Recovering a flagged connection

Terminal `banned` / `deactivated` states **never auto-recover** (they are excluded
from the proactive-recovery tick — only `unavailable` cooldowns recover on their
own). An operator must clear them explicitly:

1. **Re-test the connection** — the dashboard **Test** action
   (`POST /api/providers/{id}/test`); a successful probe resets `testStatus` to
   `active` and clears the error fields.
2. **Re-authenticate / edit credentials** — for OAuth providers, re-run the login
   / refresh flow; provider create/import routes set `isActive = true`.
3. **Re-enable the connection** — if `autoDisableBannedAccounts` set
   `isActive = false`, toggle it back on after fixing the account.

There is no separate "clear ban flag" button — recovery is re-test, re-auth, or
re-enable, matching the general terminal-state rule in
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Source files

| Concern | File |
| --- | --- |
| Signal tables + match | `open-sse/services/accountFallback.ts` |
| Terminalization / persistence | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Inline classification | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts` |
| Terminal-state recovery exclusion | `src/lib/quota/connectionRecovery.ts` |
| Custom-keyword runtime load | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`) |
| Settings UI | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx` |
