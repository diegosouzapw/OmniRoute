---
title: "Providers — ChatGPT Web (session credentials via Cookie Editor)"
version: 3.8.50
lastUpdated: 2026-08-08
---

# Providers — ChatGPT Web (Plus/Pro session credentials)

`chatgpt-web` (alias `cgpt-web`, display name **ChatGPT Web (Plus/Pro)**) sends OpenAI-format chat requests through an authenticated `chatgpt.com` browser session. It authenticates with the `__Secure-next-auth.session-token` cookie — **no API key required**.

> **New to Web Cookie providers?**
>
> Read **`docs/getting-started/WEB-COOKIE-GUIDE.md`** for the general setup process, limitations, and troubleshooting before following this provider-specific guide.

---

## 1. What credential does OmniRoute need?

Defined in `src/shared/constants/providers/web-cookie.ts` + `src/shared/providers/webSessionCredentials.ts`:

| Field                      | Value                                                                         |
| -------------------------- | ----------------------------------------------------------------------------- |
| Provider id                | `chatgpt-web`                                                                 |
| Credential name            | `__Secure-next-auth.session-token`                                            |
| Accepts full Cookie header | ✅ yes                                                                        |
| Accepted storage keys      | `cookie`, `sessionToken`, `session-token`, `__Secure-next-auth.session-token` |

Two paste formats both work:

- **Bare value** — just the token contents: `eyJhbGciOi...`
- **Full Cookie header** — `__Secure-next-auth.session-token=eyJhbGciOi...; cf_clearance=...` (preferred — carries rotation/anti-bot cookies the executor needs)

---

## 2. Get the cookie fast with Cookie Editor

> **Why Cookie Editor instead of DevTools?** The repo's general guide insists you copy from a **live network request**, not cookie storage. Cookie Editor gives you both in one click: it can read the _live_ cookies for the domain (including `HttpOnly` ones DevTools hides) and export them as a ready-made Cookie header — no manual request-hunting, no stale-storage pitfalls.

### 2.1 Install and pin

1. Install **[Cookie-Editor](https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm)** (Moustachauve) in Chrome/Edge, or the Firefox equivalent.
2. Pin it to the toolbar (right-click icon → Pin).

### 2.2 Update the extension's option settings (one-time)

Click the Cookie Editor icon → the **⚙️ Options** tab, then set:

| Option                              | Set to              | Why                                                                                     |
| ----------------------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| **Export format**                   | `Cookie header`     | Produces a paste-ready `name=value; name=value` string — exactly what OmniRoute accepts |
| **Show / include HttpOnly cookies** | ON                  | `__Secure-next-auth.session-token` is HttpOnly; hidden by default in some skins         |
| **Show expired cookies**            | OFF                 | Keeps the list clean — expired tokens are useless                                       |
| **Domain filter behavior**          | Active tab's domain | Auto-scopes to `chatgpt.com` when you open the popup there                              |

### 2.3 Copy the credential

1. Go to **https://chatgpt.com** and make sure you're **signed in with the Plus/Pro account** you want OmniRoute to use.
2. Open a conversation and send at least one message (forces the session token to be live/refreshed).
3. Click the **Cookie Editor** icon → the popup shows only `chatgpt.com` cookies.
4. Find `__Secure-next-auth.session-token`. If it's split into chunks (`__Secure-next-auth.session-token.0`, `.1`, …), select **all** of them — OmniRoute's `nextAuthCookie.ts` merges rotated chunk families.
5. Click **Export → Copy** (the icon in the header). With `Export format = Cookie header` this copies the full header in one click.

> **If the token is missing:** you're signed out, or the account has no active Plus/Pro subscription (chatgpt-web is a `subscriptionRisk: true` provider — free accounts won't authenticate).

---

## 3. Verify the required data (before pasting)

The repo's `WEB-COOKIE-GUIDE.md` mandates a live-request check. Do it once per session:

1. With chatgpt.com open, press **F12** → **Network** tab.
2. Refresh the page, then send a chat message.
3. Click the conversation request (e.g. `/backend-api/conversation` or the SSE stream) → **Headers** → **Request Headers** → **Cookie**.
4. Confirm it contains `__Secure-next-auth.session-token=...` — **not** just `cf_clearance` or `__cf_bm`.

The value you copied in step 2.3 must match what the live request sends. If they differ, re-copy from Cookie Editor.

---

## 4. Add / update the credential in OmniRoute

### Dashboard (typical user path)

1. Open the OmniRoute dashboard → **Providers** → **Add Provider**.
2. Search **ChatGPT Web (Plus/Pro)** (id `chatgpt-web`).
3. Paste the copied cookie header into the credential field.
4. Click **Test Connection**.
5. Save.

> **Validation caveat:** per `WEB-COOKIE-GUIDE.md`, Test Connection only checks the format — it doesn't guarantee upstream auth (tracked as Issue #7857). If requests later 401, re-copy from a fresh live session (sessions rotate; the executor auto-merges `Set-Cookie` rotations, but expired tokens need a manual refresh).

### Bulk / session pools (many accounts)

For multiple ChatGPT sessions, use the bulk web-session import or session-pool endpoints:

- `POST /api/providers/bulk-web-session` — import many cookie credentials at once
- `GET /api/session-pools` + `/api/session-pools/[provider]` — pool rotation across accounts

Each credential blob must carry the `__Secure-next-auth.session-token` value under one of the accepted storage keys (`cookie`, `sessionToken`, `session-token`, or the cookie's exact name).

### Renewing when the session expires

Web sessions expire on sign-out or server-side rotation. Re-run steps 2.3 + 4 whenever requests start failing with 401/403. There is no refresh token — the cookie **is** the credential.

---

## 5. Contributing: update docs / constants and open a PR

If you changed the credential contract (new storage key, new cookie name, changed hint) or are filling the docs gap, contribute it:

1. Update `src/shared/providers/webSessionCredentials.ts` (credential name / placeholder / storage keys) or `src/shared/constants/providers/web-cookie.ts` (`authHint`).
2. Update this guide (`docs/providers/CHATGPT_WEB.md`) and the provider table in `docs/getting-started/WEB-COOKIE-GUIDE.md` (currently shows `_(verify)_` for ChatGPT Web).
3. Update `.env.example` + `docs/reference/ENVIRONMENT.md` if you touched env vars, then run:
   ```bash
   node scripts/check/check-env-doc-sync.mjs   # must pass
   ```
4. Run the provider/unit tests:
   ```bash
   npm run test:unit
   # targeted: tests/unit/chatgpt-web.test.ts (stealth path)
   ```
5. Commit with a Conventional Commit message (no `Co-Authored-By`), push to your fork, and open the PR against `main` (or `release/v3.8.49` per CONTRIBUTING.md):
   ```bash
   git checkout -b docs/chatgpt-web-cookie-guide
   git add docs/providers/CHATGPT_WEB.md docs/getting-started/WEB-COOKIE-GUIDE.md
   git commit -m "docs(providers): add ChatGPT Web cookie credential guide"
   git push -u origin docs/chatgpt-web-cookie-guide
   gh pr create --base main --head docs/chatgpt-web-cookie-guide --title "docs(providers): ChatGPT Web session credential guide"
   ```

> ⚠️ **Never commit a real cookie value.** All examples above are placeholders. If a test fixture needs a token, use a fake `eyJhbGciOi...` string.

---

## Troubleshooting

| Symptom                          | Likely cause                                 | Fix                                                       |
| -------------------------------- | -------------------------------------------- | --------------------------------------------------------- |
| Cookie not in Cookie Editor      | Signed out / not HttpOnly-visible            | Sign in; enable HttpOnly display in options               |
| Token missing from live request  | Free account, or request isn't authenticated | Use a Plus/Pro account; send a chat message first         |
| 401 after Test Connection passed | Expired/rotated session (Issue #7857)        | Re-copy from a fresh live request                         |
| Chunked token fails              | Only one chunk pasted                        | Select all `__Secure-next-auth.session-token.*` chunks    |
| 403 from a different machine     | Cloudflare-pinned session                    | Copy + use from the same browser profile/IP as the cookie |
