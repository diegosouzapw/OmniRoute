---
title: "Feasibility — Telegram Mini App Integration"
version: 3.8.49
lastUpdated: 2026-08-08
---

# Telegram Mini App Integration — Feasibility Analysis

**Status: FEASIBLE with moderate effort (estimated 2–4 dev-days for a working slice)**

## 1. What "Telegram Mini App" means here

A Telegram Mini App is an iframe-hosted web app opened inside Telegram (via
inline buttons / bot menu buttons) that talks to a bot backend through the
[Telegram WebApp SDK](https://core.telegram.org/bots/webapps). For OmniRoute
the natural shape is:

- **Bot backend** (new): receives Telegram updates (webhook), validates the
  Mini App's `initData` signature, and proxies chat requests to OmniRoute's
  existing OpenAI-compatible `/v1/chat/completions` surface.
- **Mini App frontend** (new): a small chat UI served by OmniRoute (Next.js
  route or `public/` static bundle), using the Telegram WebApp JS SDK.

## 2. Current state of the codebase (verified against `main` @ 918fba5e3)

### Already present — outbound notifications only

| Piece                        | Location                                    | What it does                                                                                    |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Telegram webhook integration | `src/lib/webhooks/integrations/telegram.ts` | Builds `sendMessage` payloads for **outbound** gateway events (model, provider, latency, error) |
| Webhook dispatcher           | `src/lib/webhookDispatcher.ts`              | Routes by kind; decrypts `botToken` from DB metadata for telegram                               |
| Webhook kinds                | `src/lib/db/webhooks.ts`                    | `slack \| telegram \| discord \| custom`                                                        |
| Webhook CRUD + test          | `src/app/api/webhooks/*`                    | Create/update/test; telegram kind skips `url` (uses bot token + chat_id)                        |
| Bot token validation         | `telegram.ts:18`                            | `BOT_TOKEN_RE = /^\d+:[A-Za-z0-9_-]{35,}$/`                                                     |
| Encryption requirement       | `webhooks/route.ts:77`                      | Telegram webhooks require DB encryption enabled (bot tokens stored at rest)                     |

### Missing — what a Mini App needs that does not exist yet

| Gap                              | Detail                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inbound Bot API listener**     | No `setWebhook` registration, no `/bot<token>/getUpdates` polling, no update handling anywhere. Only the `sendMessage` direction exists.                                                    |
| **WebApp `initData` validation** | No HMAC-SHA256 check of `initData` against the bot token (`WebAppData` hash validation from the Bot API docs).                                                                              |
| **Telegram bot library**         | `package.json` has no `telegraf`/`grammy`/`telegram-bot-api` dependency. Would need to add one or hand-roll the (small) HMAC + fetch logic.                                                 |
| **Mini App hosting surface**     | `public/` exists (static assets) and Next.js routes exist; no `/miniapp` route or static bundle yet.                                                                                        |
| **Session → API key mapping**    | Mini App users need to authenticate to `/v1/chat/completions`. Two options: per-user generated OmniRoute API keys (via `src/lib/db/apiKeys`) or a bot-side proxy that injects a shared key. |

## 3. Constraints

### 3.1 Architectural

- **No existing inbound-bot layer.** The webhook system is strictly
  event→outbound. A Mini App needs a _new_ Bot API webhook endpoint
  (`POST /api/telegram/webhook/<botToken-prefix>` or a dedicated route) plus
  update dispatch. This is additive — no conflicts with the existing
  `webhooks/` subsystem, but the two must not share the `botToken` storage
  semantics blindly (webhooks store bot tokens for _outbound_; the Mini App
  needs the same token for _inbound_ signature checks — same token, new use).
- **Public HTTPS required.** Telegram only delivers updates to an HTTPS
  endpoint with a valid cert. Self-hosted OmniRoute behind Tailscale/ngrok
  needs a public tunnel or Cloudflare Tunnel for the webhook path
  (`TELEGRAM_WEBHOOK_URL`-style env). The dashboard can render the current
  public origin (`OMNIROUTE_PUBLIC_BASE_URL`) but no webhook registration
  helper exists.
- **Encryption gate.** `webhooks/route.ts:77` already refuses telegram
  kinds without DB encryption. The Mini App bot token has the same
  sensitivity (it _is_ the HMAC secret for initData validation) — same gate
  applies, which is a _good_ constraint (no plaintext tokens).

### 3.2 Telegram platform

- **initData is the only trust anchor.** Mini App auth = verify
  `hash` field of `initData` using HMAC-SHA256(key = SHA256(bot_token),
  data = sorted `key=value` pairs minus `hash`). Must be implemented
  server-side; never trust the client.
- **No inbound push to arbitrary users.** Telegram bots cannot initiate
  conversations. The Mini App works for users who _already_ have the bot —
  or you add a `/start` command handler + deep-link (`t.me/bot?startapp=`).
- **Rate limits.** Bot API ~30 msg/s per bot, 20 msg/min per chat group.
  Chat responses via `sendMessage`/`answerWebAppQuery` are fine at gateway
  scale, but streaming must be emulated (send progressive edits or chunked
  messages) — no native SSE into Telegram.
- **WebApp SDK quirks.** `Telegram.WebApp.ready()` must be called; theme
  params come from the SDK; the mini app is sandboxed iframe (no
  `window.open` to external, clipboard limited). For a chat UI this is fine.

### 3.3 Security / policy

- **Per-user key issuance is the clean model.** Rather than exposing the
  admin's own API keys, mint a scoped OmniRoute API key per Telegram user
  (`apiKeys` table + `isModelAllowedForKey` policy), or proxy with a single
  gateway key and map `user_id` → account. Recommendation: per-user keys so
  existing rate-limit / model-allowlist / policy code applies unchanged.
- **initData expiry.** `auth_date` in initData must be checked (Telegram
  recommends < 24h; short TTLs for chat flows).
- **Secret handling.** Bot token must stay in the encrypted DB / env —
  mirror the existing `isEncryptionEnabled()` gate.

## 4. Required next steps (implementation plan)

### Phase 0 — Spike (½–1 dev-day)

1. Add `grammy` or `telegraf` (or ~60 lines of hand-rolled HMAC + fetch).
2. Implement `src/lib/telegram/initData.ts` — `verifyInitData(initData, botToken)`.
3. Stand up a throwaway `POST /api/telegram/miniapp/webhook` route behind
   `TELEGRAM_WEBHOOK_SECRET`; register via `setWebhook` once, locally.

### Phase 1 — Minimal chat slice (1–2 dev-days)

1. **Webhook endpoint** `POST /api/telegram/bot/update` (or
   `/api/telegram/miniapp/update`): parse Update, verify initData, dispatch.
2. **Command handler**: `/start` → reply with deep link
   `https://t.me/<bot>?startapp=<userKey>`; `startapp` param carries a
   one-time token that maps to a generated OmniRoute API key.
3. **Chat proxy**: map `initData.user.id` → API key → call
   `handleChat` (same path as `/v1/chat/completions`) → reply via
   `sendMessage` (non-stream) or chunked edits (fake streaming).
4. **Mini App page**: `src/app/(dashboard)/miniapp/page.tsx` (or static
   bundle in `public/miniapp/`) — Telegram WebApp SDK init + minimal chat
   UI posting to the bot webhook.
5. **Config**: `TELEGRAM_BOT_TOKEN` env (or reuse webhook metadata),
   `OMNIROUTE_PUBLIC_BASE_URL` for webhook URL display; doc in
   `.env.example` + `ENVIRONMENT.md` (env-doc-sync check).

### Phase 2 — Production hardening (1 dev-day)

- Streaming emulation (message edits), error/backpressure mapping to Bot API
  limits, per-user key revocation (`/logout` command → revoke API key),
  usage/rate-limit surfacing (reuse `enforceApiKeyPolicy`), webhook
  registration helper in dashboard settings, i18n for the mini app UI.

## 5. Verdict

**Feasible.** The gateway already exposes the exact API a Mini App chat
needs (`/v1/chat/completions` with per-key policy), and the outbound
Telegram webhook shows the team already handles bot tokens safely
(encryption gate + token format validation). The genuinely new surface is
small: an inbound update webhook + initData HMAC verification + a thin
chat proxy + a static Mini App page. No changes to the core SSE/relay
pipeline are required.

**Primary risks:** (1) public HTTPS requirement for the webhook (tunnel
needed on self-hosted installs), (2) no native streaming to Telegram
(UX tradeoff), (3) initData trust must be strictly server-side.
