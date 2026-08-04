---
title: "Antigravity (Google One AI) — Onboarding with OmniRoute"
version: 3.8.50
lastUpdated: 2026-07-31
---

# OmniRoute Antigravity (Google One AI) Onboarding Guide

> **What you get**: Access to Gemini 3.1 Pro, Gemini 3.5 Flash, Claude Sonnet 4.6, and other models through your Google One AI Pro subscription — routed through OmniRoute as a unified gateway.

**Official references**:

- [Google Antigravity](https://antigravity.google) — product homepage
- [Antigravity Plans & Pricing](https://antigravity.google/pricing) — subscription tiers
- [Antigravity Docs: Plans](https://antigravity.google/docs/plans) — baseline quota details
- [Google One AI Plans](https://one.google.com/about/google-ai-plans/) — Google One subscription comparison
- [Antigravity CLI Blog](https://antigravity.google/blog/introducing-google-antigravity-cli) — CLI announcement

---

## 1. Antigravity vs Antigravity CLI (agy)

Both providers share the **same Google backend** — identical OAuth client, token refresh, endpoints, and Google accounts. The difference is what models you see.

> See [Antigravity CLI announcement](https://antigravity.google/blog/introducing-google-antigravity-cli) for Google's official comparison.

| Aspect               | `antigravity` (IDE)                       | `agy` (CLI)                                         |
| -------------------- | ----------------------------------------- | --------------------------------------------------- |
| **Google product**   | Antigravity 2.0 / Antigravity IDE         | Antigravity CLI                                     |
| **Backend**          | Same Google Cloud Code API                | Same Google Cloud Code API                          |
| **OAuth / Token**    | Same client, same refresh                 | Same client, same refresh                           |
| **Model catalog**    | Static curated list (OmniRoute hardcoded) | Live-probed from Google via `:fetchAvailableModels` |
| **Claude models**    | Sonnet 4.6, Opus 4.6 (4 variants each)    | Sonnet 4.6, Opus 4.6 (4 variants each)              |
| **Gemini naming**    | Clean labels (Low/Medium/High)            | Upstream IDs (extra-low/low/agent)                  |
| **Extra models**     | `gpt-oss-120b-medium`                     | May include additional models from Google           |
| **Default use case** | IDE integration (VS Code, JetBrains)      | CLI / API access                                    |
| **Quota**            | Shared with agy (same Google account)     | Shared with antigravity (same Google account)       |

**Available models (verified via experiment, 2026-07-29)**:

- Gemini: 3.6 Flash, 3.5 Flash, 3.1 Pro, 3 Flash, 2.5 Flash (various thinking levels)
- Claude: Sonnet 4.6, Opus 4.6 (each with default/low/medium/high variants)
- Other: GPT-OSS 120B Medium
- **Claude Sonnet 5 is NOT available** — only 4.6 variants are supported

**Why the model catalog differs**: Google's CLI is "optimized for speed and low overhead" and "co-optimized with Gemini models" (per Google's official blog). The Web/IDE product is "optimized for comprehensiveness." The CLI uses `:fetchAvailableModels` to dynamically discover models, while the IDE uses a static curated list.

**In practice**: Use `agy/` prefix for Gemini models (e.g. `agy/gemini-3.5-flash-high`). Use `antigravity/` for the static curated list. Both hit the same Google backend, but expose different model naming. The quota is shared — using either provider counts against the same Google account's limits.

---

## 2. Google One AI Pro: Quota System

> See [Antigravity Docs: Plans](https://antigravity.google/docs/plans) for official quota details and [Changes to Antigravity Plans](https://antigravity.google/blog/changes-to-antigravity-plans) for the latest pricing updates.

Google Antigravity uses a **dual-layer quota** based on "Work Done" (computational weight), not message count.

### The Two Layers

| Layer              | What it is                    | Refresh cycle                                                      |
| ------------------ | ----------------------------- | ------------------------------------------------------------------ |
| **5-hour sprint**  | Immediate pool of "work done" | Resets 5 hours after first request in a session                    |
| **7-day baseline** | Weekly hard cap               | Overrides 5-hour refresh if hit; locks out until next 7-day period |

**How "Work Done" is calculated**: Agent-heavy tasks (e.g. "Refactor this entire repository") drain quota much faster than simple tasks (e.g. "Fix this function"). There is no real-time dashboard showing consumption.

### Plan Tiers

| Plan         | Price      | Quota                              | Weekly limit                  |
| ------------ | ---------- | ---------------------------------- | ----------------------------- |
| Free         | $0         | Meaningful quota, refreshed weekly | Yes                           |
| AI Pro       | $19.99/mo  | High quota, 5-hour rolling refresh | Yes (overrides 5-hour if hit) |
| AI Ultra 5x  | $99.99/mo  | 5x Pro quota                       | No weekly limit               |
| AI Ultra 20x | $199.99/mo | 20x Pro quota                      | No weekly limit               |

### Gemini vs Non-Gemini Models

- **Gemini models** (Flash + Pro): Share a single rate limit, drawn down by API pricing. If Flash is 8x cheaper than Pro, you get 8x more Flash tokens.
- **Non-Gemini models** (Claude, GPT-OSS): Have **separate** rate limits. May remain available even when Gemini is locked out.

### AI Credits (Overage)

> See [Google One AI credits](https://support.google.com/googleone/answer/14534406) for how credits work.

When baseline quota is exhausted:

- **Never**: Wait for quota to refresh; shows "Baseline model quota reached"
- **Always**: Auto-use AI credits; switches back to baseline when it refreshes

Credits are purchased separately and deducted at standard API pricing.

### Key Details

- Quota is **account-level shared** — the same Google account in Antigravity IDE, CLI, and OmniRoute shares one quota pool
- Each Google account has its own independent quota — multiple accounts = multiple quota pools
- AI Pro users have reported **7-day lockouts** instead of 5-hour resets when weekly baseline is hit (Google confirmed this is by design for high demand)

**When your account is exhausted**: OmniRoute automatically retries with the next available account in the combo route. No manual intervention needed.

---

## 3. How to Get a projectId

Every antigravity/agy connection needs a Google Cloud Code `projectId`. Without it, the `/v1internal:models` endpoint returns 404.

### Method A: Automatic (Recommended)

OmniRoute handles this automatically. When you add a new Google account via Dashboard OAuth:

1. OmniRoute refreshes the token
2. Calls `loadCodeAssist` to discover the projectId
3. If no project exists, calls `onboardUser` to create one
4. Retries `loadCodeAssist` to get the newly created projectId
5. Saves it to the database

**This works for most accounts** — no manual steps needed.

### Method B: Manual via agy CLI

If automatic discovery fails (see Section 5 for when this happens):

```bash
# Install agy CLI (if not already)
npm install -g @anthropic-ai/agy

# Login with your Google account
agy login

# Select the account that needs onboarding
# This triggers Cloud Code registration and assigns a projectId
```

After `agy login` succeeds, refresh the token in OmniRoute Dashboard. The projectId will be discovered automatically.

### How to verify

Check the database:

```bash
# Inside OmniRoute container
node -e "const db=require('better-sqlite3')('/app/data/storage.sqlite'); \
  console.log(JSON.stringify(db.prepare(\
    'SELECT email,project_id FROM provider_connections WHERE provider=\"agy\"'\
  ).all(), null, 2))"
```

Or check the logs:

```
podman logs omniroute 2>&1 | grep "projectId discovered"
```

---

## 4. OAuth Redirect URI

### The Problem

Google OAuth requires a valid redirect URI. OmniRoute's default uses `http://127.0.0.1:20128/callback` (loopback). This works for local builds but **fails for remote deployments** (e.g., a server accessed via LAN IP).

Google rejects redirect URIs that:

- Use IP addresses (must be a domain ending in `.com`, `.org`, etc.)
- Don't match the registered redirect URIs in the OAuth client config

### The Solution

**Option A: Use the built-in OAuth flow (default)**

- Works when you access OmniRoute from `localhost` or `127.0.0.1`
- No configuration needed

**Option B: Custom OAuth credentials**

- Set `ANTIGRAVITY_OAUTH_CLIENT_TYPE=web` in your environment
- Provide your own Google OAuth credentials:
  ```
  GOOGLE_OAUTH_CLIENT_ID=your-client-id
  GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
  ```
- Register `https://your-domain.com/callback` as an authorized redirect URI in Google Cloud Console

**Option C: Use agy CLI for initial login**

- Run `agy login` on the machine that will access OmniRoute
- The OAuth flow completes locally, tokens are stored
- Import the connection into OmniRoute via Dashboard

### Limitations

- Custom OAuth credentials require a domain name (Google does not accept IP addresses as redirect URIs)
- If you don't have a domain, use Option A or C instead

---

## 5. Troubleshooting: When Automatic Setup Fails

OmniRoute handles projectId discovery and onboarding automatically for most accounts. When it fails, the root cause is usually one of these:

### Account region is blocked

**Symptom**: `agy login` returns "Eligibility check failed: Your current account is not eligible for Antigravity, because it is not currently available in your location."

**Root cause**: Google accounts have a backend "Country Association" field set at registration time. The agy CLI and Cloud Code API check this field strictly — unlike web Gemini which only checks your current IP.

> To check or change your account's associated region, visit [Google Country Association Form](https://policies.google.com/country-association-form).

**Why web Gemini works but agy doesn't**:

- Web Gemini / Google One: checks current IP only (proxy passes)
- agy CLI / Cloud Code API: reads backend Country Association field (proxy doesn't help)

**Fix**:

1. Visit [Google Country Association Form](https://policies.google.com/country-association-form) while on a US IP
2. Submit region change request (select "I live in a different country")
3. Wait 1-24 hours for Google to process + email notification
4. Then `agy login` should succeed

### Account has no Cloud Code project

**Symptom**: Logs show `loadCodeAssist returned no project id` and `onboardUser failed (400)`.

**Root cause**: The account has never been registered with Google Cloud Code, and the automatic onboarding failed.

**Fix**: Run `agy login` manually to trigger Cloud Code registration, then refresh the token in OmniRoute Dashboard.

### Token expired or revoked

**Symptom**: 401 errors in logs, or "Token has expired" messages.

**Fix**: Refresh the token in Dashboard → Providers → agy → Click refresh icon. If the refresh token itself is revoked, you'll need to re-authenticate via OAuth.

---

## Decision Flowchart

```
Account not working?
│
├─ Does it have a projectId in the database?
│  ├─ YES → Problem is elsewhere (token expired, rate limit, etc.)
│  └─ NO ↓
│
├─ Is the account's Country Association set to a restricted region?
│  ├─ YES → Change region at Google Country Association Form
│  │         (https://policies.google.com/country-association-form)
│  │         Wait 1-24 hours, then retry
│  └─ NO ↓
│
├─ Does the account have Google One AI Pro subscription?
│  ├─ NO → Subscribe first at one.google.com
│  └─ YES ↓
│
├─ Try automatic discovery (refresh token in Dashboard)
│  ├─ Works → Done
│  └─ Still fails ↓
│
└─ Manual: Run `agy login` on the machine
   ├─ Works → Refresh token in Dashboard, projectId discovered
   └─ Fails → Check error message, likely region or subscription issue
```

---

## Quick Reference

| Task                  | Command / URL                                                                           |
| --------------------- | --------------------------------------------------------------------------------------- |
| Change account region | [Google Country Association Form](https://policies.google.com/country-association-form) |
| agy CLI login         | `agy login`                                                                             |
| Check projectId in DB | `SELECT email,project_id FROM provider_connections WHERE provider='agy'`                |
| Check logs            | `podman logs omniroute 2>&1 \| grep projectId`                                          |
| Refresh token         | Dashboard → Providers → agy → Click refresh icon                                        |

---

_Last updated: 2026-07-31. Based on OmniRoute v3.8.50._
