# Windsurf Login Fix — Design

**Date:** 2026-05-29
**Status:** Draft (awaiting approval)
**Owner:** OmniRoute team
**Related:** `src/lib/oauth/providers/windsurf.ts`, `src/lib/oauth/constants/oauth.ts`, `open-sse/executors/windsurf.ts`

---

## Problem

OAuth URL yang di-generate untuk Windsurf provider kembali **404** saat user buka di browser:

```
https://app.devin.ai/editor/signin?response_type=code&redirect_uri=...&code_challenge=...
```

Akibatnya user tidak bisa login ke Windsurf via OmniRoute. Provider effectively broken.

### Root cause

1. URL `app.devin.ai/editor/signin` di-extract dari binary Devin CLI lama dan di-hardcode di `src/lib/oauth/constants/oauth.ts:343`. Endpoint ini sudah dihapus pasca rebrand Cognition/Windsurf.
2. Reference document yang awalnya disediakan (`dwgx/WindsurfAPI/docs/analysis-v1.9.5.md`) tidak membahas login flow — hanya proxy/protobuf architecture.
3. Reverse-engineering ulang dari `language_server_linux_x64` (Go-stripped, 188 MB) terlalu mahal.
4. Repo `fendoushaonian/WindSurf-gRPC-API` sudah RE flow login Windsurf yang aktual: **Firebase OAuth + RegisterUser**, bukan PKCE ke `app.devin.ai`.

### Actual Windsurf login flow (per fendoushaonian/WindSurf-gRPC-API)

```
1. User auth dengan Google/GitHub/Microsoft OAuth atau email/password
2. POST identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=<FIREBASE_WEB_KEY>
   body: { postBody: "id_token=<oauth>&providerId=google.com",
           requestUri: "https://windsurf.com/login",
           returnSecureToken: true }
   → returns { idToken, refreshToken, email, localId }
3. POST register.windsurf.com/exa.seat_management_pb.SeatManagementService/RegisterUser
   body: { firebase_id_token: idToken }
   → returns { api_key: "sk-ws-..." }  ← ini WINDSURF_API_KEY untuk inference
4. Refresh: POST securetoken.googleapis.com/v1/token (grant_type=refresh_token)
```

Konstanta publik yang harus di-embed (extracted from Windsurf extension.js, public Firebase Web key — bukan secret):
- `FIREBASE_API_KEY = "<REDACTED-public-firebase-web-key>"`
- `GOOGLE_CLIENT_ID = "957777847521-egrk5uakal87pjkqctk89fe7b7qtd1dq.apps.googleusercontent.com"`
- `REGISTER_SERVER = "https://register.windsurf.com"`

---

## Solution Overview

Two-phase delivery:

| Phase | Goal | Path |
|---|---|---|
| **1. Hotfix** | Hentikan 404, restore minimum-viable login | Hapus PKCE flow, promote import-token sebagai primary path |
| **2. Automation** | Restore browser-based login experience | Port Firebase OAuth + RegisterUser flow dari `fendoushaonian/WindSurf-gRPC-API` |

Phase 1 ship dulu sebagai single PR untuk un-block user. Phase 2 ship di PR terpisah behind feature flag.

---

## Phase 1 — Hotfix (Option B: import-token only)

### Architecture

Hapus seluruh PKCE browser flow yang broken. Promosikan **import-token** sebagai satu-satunya path resmi:
- User klik "Connect Windsurf" → modal langsung tampil paste-token
- Tombol "Get token" buka tab baru ke `https://windsurf.com/show-auth-token` (URL ini masih hidup, return HTTP 200)
- User copy token, paste, OmniRoute test connection, simpan

### Files touched

| File | Change |
|---|---|
| `src/lib/oauth/providers/windsurf.ts` | Hapus `buildAuthUrl`, `flowType: "authorization_code_pkce"`, `callbackPath`, `callbackPort`. Sisakan `config` + `validateImportToken` helper. Set `flowType: "import_token"`. |
| `src/lib/oauth/constants/oauth.ts` | Comment out / hapus field obsolete: `authorizeUrl`, `codeChallengeMethod`, `callbackPort`, `callbackPath`, `apiServerUrl`, `exchangePath`. Tambah comment block: `// PKCE OAuth flow disabled 2026-05-29 — app.devin.ai/editor/signin returns 404 post-rebrand. Use import-token from showAuthTokenUrl. Phase 2 will restore Firebase OAuth.` Keep `inferenceUrl`, `showAuthTokenUrl`, `firebaseApiKey`, `ideName`. |
| `src/lib/oauth/providers/index.ts` | Drop `"windsurf"` & `"devin-cli"` dari `PKCE_CALLBACK_PROVIDERS`. Keep di `IMPORT_TOKEN_PROVIDERS`. |
| `src/app/api/oauth/[provider]/[action]/route.ts` | Saat `provider === "windsurf"` atau `"devin-cli"` masuk ke `start-callback-server` / `authorize` action: return HTTP 410 `Gone` dengan body `{ error: "PKCE OAuth disabled for windsurf — use import-token via /api/oauth/<provider>/import-token" }`. Routing ke `import-token` action tidak berubah. |
| `src/shared/components/OAuthModal.tsx` | Saat provider `"windsurf"` / `"devin-cli"`: hide tombol "Sign in with browser" + "Use device code". Show single panel: paste-token textarea + tombol "Get your token" (`window.open(showAuthTokenUrl)`). |
| Docs i18n keys | Update `docs.windsurf.steps` di 39 bahasa: hapus mention "click Sign In", ganti dengan "open windsurf.com/show-auth-token, copy your API token, paste it here". |
| `tests/unit/windsurf-devin-executors.test.ts` | Tambah test `generateAuthData("windsurf")` returns error / throws — PKCE explicitly disabled. Tambah test untuk import-token happy path + invalid-token rejection. |
| (No DB migration needed) | Connection schema tidak berubah. Existing connections tetap jalan. |

### Behavior change

| Before | After |
|---|---|
| User klik "Sign in" → browser → 404 | User klik "Connect Windsurf" → modal paste-token → "Get token" button buka windsurf.com/show-auth-token tab → user paste → connection saved |
| `generateAuthData("windsurf")` returns auth URL | `generateAuthData("windsurf")` throws `OAuthFlowDisabledError` |
| `/api/oauth/windsurf/start-callback-server` 200 | `/api/oauth/windsurf/start-callback-server` 410 Gone |

### Validation plan

- Unit: `tests/unit/windsurf-devin-executors.test.ts` covers PKCE-disabled path + import-token happy path
- Integration: 1 manual smoke — paste valid token from `windsurf.com/show-auth-token`, send 1 chat request via `swe-1`, expect 200
- Regression: existing connections (api_key already saved) MUST continue to work — no schema migration, no re-auth required
- Coverage gate: stays ≥75/75/75/70 (Phase 1 mostly removes code, doesn't add untested logic)

### Risk & rollback

- **Risk**: low. Cuma hapus dead path + UI copy update.
- **Rollback**: revert single commit. Existing connections tidak terpengaruh karena schema tidak berubah.

### Success criteria Phase 1

- [ ] `npm run test:unit` pass (semua test windsurf-devin-executors)
- [ ] `npm run test:coverage` ≥ 75/75/75/70
- [ ] `npm run typecheck:core` clean
- [ ] Manual: paste valid token → connection saved → 1 chat request lewat swe-1 berhasil
- [ ] Manual: GET `/api/oauth/windsurf/start-callback-server` → 410 Gone
- [ ] UI: WindsurfModal tidak menampilkan tombol "Sign in with browser" lagi

---

## Phase 2 — Firebase OAuth integration (port `fendoushaonian/WindSurf-gRPC-API`)

### Goal

Restore browser-based login automation. User klik tombol Google/GitHub/Microsoft/email → OmniRoute auto-dapat `sk-ws-...` API key + Firebase refresh token. Schedule auto-refresh sebelum token expire.

### Reference implementation

- Repo: `https://github.com/fendoushaonian/WindSurf-gRPC-API`
- Files studied: `windsurf_api/auth.py`, `windsurf_api/services/seat_management.py` (RegisterUser), `windsurf_api/client.py`
- Approach: port logic-nya ke TypeScript, follow OmniRoute conventions (Zod schemas, `buildErrorBody`, `resolvePublicCred`, AES-256-GCM at-rest)

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│ User flow                                                           │
└─────────────────────────────────────────────────────────────────────┘

[Google/GitHub/MS]                                       [Email/password]
       │                                                         │
       │ User klik tombol di WindsurfLoginModal                  │
       ▼                                                         ▼
┌──────────────────────────────┐                  ┌──────────────────────┐
│ POST /api/oauth/windsurf/    │                  │ POST /api/oauth/     │
│   firebase                   │                  │   windsurf/firebase  │
│ body: { method: "google",    │                  │ body: { method:      │
│         credential: <id_tok> │                  │   "email_login",     │
│       }                      │                  │   credential: {...}} │
└────────────┬─────────────────┘                  └─────────┬────────────┘
             │                                              │
             ▼                                              ▼
   ┌─────────────────────────────────────────────────────────────────┐
   │ open-sse/services/windsurfFirebase.ts                          │
   │ - signInWithIdp(provider, oauth_token)  → Firebase id_token    │
   │ - signInWithPassword(email, password)   → Firebase id_token    │
   │ - signUp(email, password)               → Firebase id_token    │
   │ - refreshIdToken(refresh_token)         → new id_token         │
   └────────────────────────┬────────────────────────────────────────┘
                            │ Firebase id_token
                            ▼
   ┌─────────────────────────────────────────────────────────────────┐
   │ open-sse/services/windsurfRegister.ts                          │
   │ POST register.windsurf.com/.../RegisterUser                    │
   │ body: { firebase_id_token }                                    │
   │ → { api_key: "sk-ws-...", user_id }                            │
   └────────────────────────┬────────────────────────────────────────┘
                            │
                            ▼
   ┌─────────────────────────────────────────────────────────────────┐
   │ Persist:                                                       │
   │   accessToken          = api_key (encrypted)                   │
   │   firebaseRefreshToken = refresh_token (encrypted)             │
   │   firebaseExpiresAt    = now + 3600s                           │
   │ Schedule refresh worker (50min interval)                       │
   └─────────────────────────────────────────────────────────────────┘
```

### Files baru

| File | Purpose | Lines |
|---|---|---|
| `src/lib/oauth/providers/windsurfFirebase.ts` | New OAuth provider entry. `flowType: "firebase_oauth"`. Methods: `loginGoogle`, `loginGithub`, `loginMicrosoft`, `loginEmail`, `signUpEmail`. | ~150 |
| `open-sse/services/windsurfFirebase.ts` | Firebase Identity Toolkit wrapper. `signInWithIdp`, `signInWithPassword`, `signUp`, `refreshIdToken`. Uses `resolvePublicCred()` for Firebase Web key. | ~200 |
| `open-sse/services/windsurfRegister.ts` | `register.windsurf.com` Connect-JSON client. `RegisterUser(firebase_id_token) → api_key`. Errors via `buildErrorBody()`. | ~100 |
| `src/app/api/oauth/windsurf/firebase/route.ts` | `POST /api/oauth/windsurf/firebase` — body `{ method, credential }`. Calls Firebase + RegisterUser, creates connection. Rate-limited 5/5min/IP. | ~150 |
| `src/lib/oauth/utils/windsurfRefresh.ts` | Background refresh worker. When token < 10min from expiry, refresh via securetoken endpoint. Re-register if api_key needs renewal. | ~120 |
| `src/shared/components/WindsurfLoginModal.tsx` | UI: 4 tombol (Google/GitHub/Microsoft/Email). Email mode shows email+password+isSignup form. | ~200 |
| `tests/unit/windsurfFirebase.test.ts` | Mock Firebase Identity Toolkit + register.windsurf.com responses. Cover all 5 methods + refresh flow + error sanitization assertion. | ~300 |
| `tests/unit/windsurfRegister.test.ts` | Mock RegisterUser endpoint. Test happy path + 401 + malformed response. | ~150 |
| `docs/frameworks/WINDSURF-LOGIN.md` | Document Firebase OAuth flow + diagram. | ~200 |

### Files updated

| File | Change |
|---|---|
| `src/lib/oauth/constants/oauth.ts` | Add `WINDSURF_FIREBASE_CONFIG` block: `firebaseApiKey` via `resolvePublicCred("windsurf_fb", "WINDSURF_FIREBASE_API_KEY")`, `googleClientId` via `resolvePublicCred("windsurf_google", "WINDSURF_GOOGLE_CLIENT_ID")`, `registerUrl: "https://register.windsurf.com"`, `firebaseAuthUrl`, `firebaseTokenUrl`, OAuth redirect uri `https://windsurf.com/login`. |
| `open-sse/utils/publicCreds.ts` | Add embedded defaults: `windsurf_fb: "<REDACTED-public-firebase-web-key>"`, `windsurf_google: "957777847521-egrk5uakal87pjkqctk89fe7b7qtd1dq.apps.googleusercontent.com"`. Both are public Web keys/client_ids — non-sensitive but must follow rule #11 pattern. |
| `src/lib/oauth/providers/index.ts` | Register `"windsurf-firebase"` provider entry. |
| `src/lib/db/migrations/<NNN>_windsurf_firebase.sql` | Add columns to `connections`: `firebase_refresh_token TEXT NULL` (encrypted), `firebase_expires_at INTEGER NULL`. Idempotent (`IF NOT EXISTS` pattern). |
| `src/lib/db/connections.ts` | Update CRUD to handle new optional columns. Encrypt/decrypt via existing `connectionEncryption` helpers. |
| `src/shared/constants/providers.ts` | Mark windsurf supports both `import_token` AND `firebase_oauth`. |
| `docs/security/PUBLIC_CREDS.md` | Add windsurf entries (Firebase Web key, Google client_id) ke registered list. |
| `docs/reference/PROVIDER_REFERENCE.md` | Regenerate via `npm run gen:provider-reference`. |

### Security

- **Rule #11** (public creds): Firebase Web key + Google client_id WAJIB via `resolvePublicCred()`. Test asserts shape:
  ```ts
  expect(creds.windsurf_fb).toMatch(/^AIza[A-Za-z0-9_-]{35}$/)
  expect(creds.windsurf_google).toMatch(/^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/)
  ```
- **Rule #12** (error sanitization): Semua response error (Firebase + RegisterUser) WAJIB lewat `buildErrorBody()`. Firebase error sering leak `email` / `localId` di message — strip explicitly. Test asserts:
  ```ts
  expect(body.error.message).not.toContain(testEmail)
  expect(body.error.message).not.toMatch(/at\s+\//)  // no stack
  ```
- **Refresh token at rest**: encrypt pakai `connectionEncryption` helper (AES-256-GCM, existing pattern). Never log refresh_token.
- **Rate limit**: `/api/oauth/windsurf/firebase` rate-limited 5 attempt / 5min / IP via existing `src/lib/rateLimit/` middleware. Abuse Firebase tidak gratis.
- **Feature flag**: `OMNIROUTE_WINDSURF_FIREBASE_AUTH=1` (default OFF). Beta testing, then default ON setelah stable.
- **Dual flow**: import-token (Phase 1) tetap available. Kalau Firebase API key di-rotate Windsurf, user fall back ke import-token via UI banner.

### Behavior change

- WindsurfLoginModal punya 5 path: Google/GitHub/Microsoft/Email/import-token.
- Connection schema gain optional `firebase_refresh_token`, `firebase_expires_at`. Old connections (token-only, dari Phase 1) tetap jalan tanpa migrasi.
- Auto-refresh: api_key Windsurf TTL ±1 jam (mengikuti Firebase ID token). Worker re-register tiap 50 menit.
- New env vars: `WINDSURF_FIREBASE_API_KEY` (override), `WINDSURF_GOOGLE_CLIENT_ID` (override), `OMNIROUTE_WINDSURF_FIREBASE_AUTH` (feature flag).

### Validation plan

- **Unit**: 100% Firebase + RegisterUser path coverage. Mock both endpoints, assert payload shape, error sanitization, refresh logic.
- **Integration**: 1 E2E test gated by `RUN_WINDSURF_INT=1` — uses real test account. Spawn server, hit `/api/oauth/windsurf/firebase`, assert connection saved + chat request lewat.
- **Manual smoke**: 4 login methods (Google/GitHub/MS/Email) end-to-end di staging. Verify auto-refresh trigger setelah 50min.
- **Coverage gate**: ≥75/75/75/70.

### Risk & rollback

- **Risk: medium**. Firebase Web key bisa dirotate Windsurf — kalau itu terjadi, semua user broken. Mitigation:
  - Env override `WINDSURF_FIREBASE_API_KEY` (bisa di-update tanpa redeploy)
  - Monitoring `auth/invalid-api-key` error → auto-banner di UI: "Browser login broken, please use import-token (Phase 1 fallback)"
  - Phase 1 import-token tetap aktif — user tidak total stuck
- **Rollback**: feature flag `OMNIROUTE_WINDSURF_FIREBASE_AUTH=0`. Migration tidak di-revert (kolom optional, NULL-safe). Phase 1 path tetap jalan.

### Success criteria Phase 2

- [ ] All 5 login methods work end-to-end (Google/GitHub/MS/Email login/Email signup)
- [ ] Auto-refresh terjadi sebelum 1-hour expiry, no user-visible disruption
- [ ] Error messages tidak leak email / localId / stack
- [ ] CodeQL + Secret-Scanning pass (Firebase key terdeteksi false positive — dismiss with reference ke `docs/security/PUBLIC_CREDS.md`)
- [ ] Coverage gate pass ≥75/75/75/70
- [ ] Feature flag default OFF di first PR; default ON setelah 2 minggu beta tanpa critical issue

---

## Migration path

| Step | When | What |
|---|---|---|
| 1 | T+0 | Phase 1 PR merged → released → users un-blocked via import-token |
| 2 | T+1d to T+1w | Phase 2 PR opened, behind `OMNIROUTE_WINDSURF_FIREBASE_AUTH=1` flag |
| 3 | T+1w to T+3w | Beta testing dengan opt-in users |
| 4 | T+3w | Flag default ON, import-token tetap available sebagai fallback |
| 5 | T+3m | Evaluate: kalau Firebase OAuth stable + 0 critical issue, deprecate import-token UI option (keep API endpoint untuk backward compat) |

---

## Out of scope

- Migration tool untuk auto-upgrade existing import-token connections ke Firebase OAuth (user can manually re-connect kalau mau auto-refresh)
- SAML / Enterprise SSO (not in `fendoushaonian/WindSurf-gRPC-API` reference)
- Devin CLI specific flow (currently shares config dengan windsurf — Phase 1 hotfix covers both, Phase 2 evaluate apakah Devin CLI butuh path terpisah)

---

## Open questions

None blocking. Implementation can proceed.
