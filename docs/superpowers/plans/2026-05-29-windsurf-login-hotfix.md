# Windsurf Login Hotfix (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hapus PKCE OAuth flow yang rusak (`app.devin.ai/editor/signin` → 404) untuk provider `windsurf` & `devin-cli`, jadikan import-token sebagai satu-satunya path login.

**Architecture:** Single-branch hotfix di `fix/windsurf-login-2026-05-29`. Modifikasi 5 file source + 1 file test, tidak ada migrasi DB, tidak ada credential baru. Existing connections (api_key tersimpan) tetap jalan tanpa perubahan.

**Tech Stack:** TypeScript 5.9, Next.js 16 App Router, Node.js test runner (`node --import tsx/esm --test`), Zod validation, React 19.

**Spec:** `docs/superpowers/specs/2026-05-29-windsurf-login-fix-design.md` (Phase 1 section).

---

## File Structure

| File | Type | Responsibility |
|---|---|---|
| `src/lib/oauth/providers/windsurf.ts` | Modify | Drop PKCE handlers (`buildAuthUrl`, `flowType: "authorization_code_pkce"`). Set `flowType: "import_token"`. Keep `mapTokens` + token validation. |
| `src/lib/oauth/constants/oauth.ts` | Modify | Comment out PKCE-only fields. Keep `inferenceUrl`, `showAuthTokenUrl`, `firebaseApiKey`, `ideName`. |
| `src/lib/oauth/providers/index.ts` | No change | Re-export already correct (`windsurf` + alias `devin-cli`). |
| `src/app/api/oauth/[provider]/[action]/route.ts` | Modify | Remove `windsurf` & `devin-cli` from `PKCE_CALLBACK_PROVIDERS`. Return HTTP 410 Gone for `authorize` & `start-callback-server` actions. |
| `src/shared/components/OAuthModal.tsx` | Modify | Hide PKCE buttons for windsurf/devin-cli, show paste-token panel + "Get token" link. |
| `tests/unit/windsurf-devin-executors.test.ts` | Modify | Add tests asserting PKCE disabled + import-token still works. |

**Out of scope (Phase 2):** Firebase OAuth, RegisterUser, refresh worker, `WindsurfLoginModal.tsx`, DB migration. See spec Phase 2 section.

---

## Pre-flight

- [ ] **Step 0.1: Verify branch + identity**

Run:
```bash
git branch --show-current
git config user.email
```
Expected: branch is `fix/windsurf-login-2026-05-29`, email is set (any value, just non-empty).

- [ ] **Step 0.2: Verify spec is committed**

Run:
```bash
git log --oneline -3
```
Expected: top commit is `docs(oauth): add Windsurf login fix design ...`.

---

## Task 1: Test — PKCE auth URL generation throws / returns disabled

**Files:**
- Test: `tests/unit/windsurf-devin-executors.test.ts` (modify — add test cases at end of describe block)

- [ ] **Step 1.1: Read existing test structure**

Run:
```bash
head -30 tests/unit/windsurf-devin-executors.test.ts
```
Note the existing imports + describe blocks. Match style.

- [ ] **Step 1.2: Add failing test for PKCE-disabled auth URL**

Append to `tests/unit/windsurf-devin-executors.test.ts` (inside the existing top-level `describe` or as a new describe at the end):

```typescript
import { test } from "node:test";
import assert from "node:assert/strict";
import { generateAuthData, getProvider } from "@/lib/oauth/providers";

test("windsurf provider: flowType is import_token (PKCE disabled post-rebrand)", () => {
  const provider = getProvider("windsurf");
  assert.equal(provider.flowType, "import_token");
});

test("devin-cli provider: flowType is import_token (shares windsurf config)", () => {
  const provider = getProvider("devin-cli");
  assert.equal(provider.flowType, "import_token");
});

test("windsurf provider: generateAuthData returns no authUrl (PKCE flow disabled)", () => {
  const data = generateAuthData("windsurf", "http://localhost:0/auth/callback");
  assert.equal(data.authUrl, undefined);
  assert.equal(data.supported, false);
  assert.match(data.error ?? "", /import-token|disabled|app\.devin\.ai/i);
});

test("devin-cli provider: generateAuthData returns no authUrl", () => {
  const data = generateAuthData("devin-cli", "http://localhost:0/auth/callback");
  assert.equal(data.authUrl, undefined);
  assert.equal(data.supported, false);
});
```

If file already imports `test` and `assert`, do not duplicate; reuse.

- [ ] **Step 1.3: Run test — confirm failure**

Run:
```bash
node --import tsx/esm --test tests/unit/windsurf-devin-executors.test.ts 2>&1 | tail -30
```
Expected: 4 new tests FAIL — `flowType` is `"authorization_code_pkce"` not `"import_token"`, and `generateAuthData` still returns a real URL.

---

## Task 2: Implementation — switch windsurf provider to import_token flow

**Files:**
- Modify: `src/lib/oauth/providers/windsurf.ts` (full file rewrite — small file)

- [ ] **Step 2.1: Read full current file**

Run:
```bash
wc -l src/lib/oauth/providers/windsurf.ts
```
Confirm file size before rewriting. Should be < 200 lines.

- [ ] **Step 2.2: Replace file content**

Write `src/lib/oauth/providers/windsurf.ts`:

```typescript
import { WINDSURF_CONFIG } from "../constants/oauth";

/**
 * Windsurf / Devin CLI OAuth Provider — import-token only (Phase 1 hotfix, 2026-05-29).
 *
 * The previous PKCE Authorization Code flow targeting `https://app.devin.ai/editor/signin`
 * stopped working post-rebrand: that endpoint now returns 404. Until Phase 2 ports the
 * Firebase OAuth + RegisterUser flow (see docs/superpowers/specs/2026-05-29-windsurf-login-fix-design.md),
 * the only supported login path is import-token:
 *
 *   1. User opens https://windsurf.com/show-auth-token in a browser
 *   2. Copies the displayed Windsurf API key (`sk-ws-...` style)
 *   3. Pastes it into OmniRoute via /api/oauth/windsurf/import-token
 *
 * The pasted token is stored as `accessToken` and used directly by `WindsurfExecutor`
 * (open-sse/executors/windsurf.ts) as the `Authorization: Bearer ...` header against
 * the inference server (`server.self-serve.windsurf.com`).
 */
export const windsurf = {
  config: WINDSURF_CONFIG,
  flowType: "import_token" as const,

  /**
   * Validate a pasted Windsurf API key. Accepts the `sk-ws-...` format issued by
   * windsurf.com/show-auth-token and the legacy raw-token format. Empty or
   * whitespace-only tokens are rejected.
   */
  validateImportToken(token: string): { valid: boolean; reason?: string } {
    const trimmed = (token ?? "").trim();
    if (!trimmed) {
      return { valid: false, reason: "Token is empty" };
    }
    if (trimmed.length < 16) {
      return { valid: false, reason: "Token is too short" };
    }
    return { valid: true };
  },

  /**
   * Map a pasted import token onto the connection record. The token IS the
   * Windsurf API key; there is no exchange step.
   */
  mapTokens(token: string) {
    return {
      accessToken: token,
      refreshToken: null,
      expiresAt: null,
    };
  },
};
```

- [ ] **Step 2.3: Re-run Task 1 tests**

Run:
```bash
node --import tsx/esm --test tests/unit/windsurf-devin-executors.test.ts 2>&1 | tail -30
```
Expected: 4 new tests now FAIL only on `generateAuthData` — `flowType` tests should PASS. `generateAuthData` still depends on the route handler / provider dispatcher, which Task 3 wires.

If `flowType` tests still fail with `flowType: "authorization_code_pkce"`, re-check that `windsurf.ts` was overwritten.

---

## Task 3: Make `generateAuthData` return disabled stub for windsurf/devin-cli

**Files:**
- Modify: `src/lib/oauth/providers/index.ts` (add helper export — small)
- OR: Modify the dispatcher inside `src/lib/oauth/providers/` that owns `generateAuthData` (find it)

- [ ] **Step 3.1: Locate `generateAuthData` definition**

Run:
```bash
grep -rn "export function generateAuthData\|export const generateAuthData" src/lib/oauth/
```
Expected: one hit. Note the file path — call it `<DISPATCHER>`.

- [ ] **Step 3.2: Read the dispatcher**

Read `<DISPATCHER>`. Identify the branch where `provider.flowType === "authorization_code_pkce"` builds the auth URL via `provider.buildAuthUrl(...)`.

- [ ] **Step 3.3: Add early-return for `import_token` flowType**

In `<DISPATCHER>`, modify `generateAuthData` so that when `provider.flowType === "import_token"` it returns:

```typescript
if (provider.flowType === "import_token") {
  return {
    authUrl: undefined,
    codeVerifier: undefined,
    state: undefined,
    supported: false,
    error:
      provider === windsurf || providerKey === "windsurf" || providerKey === "devin-cli"
        ? "Browser login disabled — paste token from https://windsurf.com/show-auth-token instead. Phase 2 will restore Firebase OAuth."
        : "This provider only supports import-token flow.",
  };
}
```

Match the `<DISPATCHER>`'s actual function signature — if it receives `providerKey: string` and `redirectUri: string`, use those names. The exact field set returned must match what `OAuthModal.tsx` and the `/authorize` route already consume (see Step 1.2 expected fields). Keep `supported: false` and a non-empty `error` string; both are checked by the test.

- [ ] **Step 3.4: Run all Task 1 tests — must pass now**

Run:
```bash
node --import tsx/esm --test tests/unit/windsurf-devin-executors.test.ts 2>&1 | tail -30
```
Expected: all 4 new tests PASS.

- [ ] **Step 3.5: Commit progress**

Run:
```bash
git add src/lib/oauth/providers/windsurf.ts src/lib/oauth/providers/index.ts tests/unit/windsurf-devin-executors.test.ts
# Plus the dispatcher file from Step 3.1 if different
git status --short
git commit -m "fix(oauth): switch windsurf provider to import_token flow

The PKCE auth URL targeting app.devin.ai/editor/signin returns 404
post-rebrand. Until Phase 2 ports Firebase OAuth + RegisterUser, the
only supported path is import-token via windsurf.com/show-auth-token.

- windsurf.ts: drop buildAuthUrl, set flowType=import_token
- generateAuthData returns supported:false + helpful error for windsurf/devin-cli
- tests: assert flowType + disabled stub"
```

---

## Task 4: Test — `start-callback-server` returns 410 Gone for windsurf/devin-cli

**Files:**
- Test: `tests/unit/windsurf-devin-executors.test.ts` (extend)

- [ ] **Step 4.1: Add failing test**

Append to `tests/unit/windsurf-devin-executors.test.ts`:

```typescript
import { GET as oauthGet } from "@/app/api/oauth/[provider]/[action]/route";

test("OAuth route: windsurf/start-callback-server returns 410 Gone", async () => {
  const url = "http://localhost:20128/api/oauth/windsurf/start-callback-server";
  const request = new Request(url, { method: "GET" });
  const response = await oauthGet(request, {
    params: Promise.resolve({ provider: "windsurf", action: "start-callback-server" }),
  } as never);
  assert.equal(response.status, 410);
  const body = await response.json();
  assert.match(body.error, /import-token|disabled|410/i);
});

test("OAuth route: devin-cli/authorize returns 410 Gone", async () => {
  const url = "http://localhost:20128/api/oauth/devin-cli/authorize";
  const request = new Request(url, { method: "GET" });
  const response = await oauthGet(request, {
    params: Promise.resolve({ provider: "devin-cli", action: "authorize" }),
  } as never);
  assert.equal(response.status, 410);
});
```

- [ ] **Step 4.2: Run — confirm failure**

Run:
```bash
node --import tsx/esm --test tests/unit/windsurf-devin-executors.test.ts 2>&1 | tail -30
```
Expected: 2 new tests FAIL — current handler probably returns 400 or 200.

---

## Task 5: Implementation — return 410 Gone for disabled PKCE actions

**Files:**
- Modify: `src/app/api/oauth/[provider]/[action]/route.ts:75-160` (`GET` handler)

- [ ] **Step 5.1: Read existing handler shape**

Run:
```bash
sed -n '40,50p;75,165p' src/app/api/oauth/[provider]/[action]/route.ts
```
Confirm `PKCE_CALLBACK_PROVIDERS` set definition + the `if (action === "authorize")` branch.

- [ ] **Step 5.2: Remove `windsurf` and `devin-cli` from `PKCE_CALLBACK_PROVIDERS`**

In `src/app/api/oauth/[provider]/[action]/route.ts`, find:

```typescript
const PKCE_CALLBACK_PROVIDERS = new Set(["codex", "windsurf", "devin-cli"]);
```

Replace with:

```typescript
// windsurf & devin-cli removed 2026-05-29 — PKCE endpoint app.devin.ai/editor/signin
// returns 404 post-rebrand. Phase 2 will reintroduce browser login via Firebase OAuth.
const PKCE_CALLBACK_PROVIDERS = new Set(["codex"]);

// Providers whose PKCE flow has been retired but whose import-token path is still
// active. The route returns 410 Gone for `authorize` / `start-callback-server`
// and points users at /import-token.
const RETIRED_PKCE_PROVIDERS = new Set(["windsurf", "devin-cli"]);
```

- [ ] **Step 5.3: Add 410 short-circuit at top of `GET` handler body**

Inside `GET`, immediately after `const { provider, action } = await params;` (and before `if (action === "authorize")`), insert:

```typescript
if (
  RETIRED_PKCE_PROVIDERS.has(provider) &&
  (action === "authorize" || action === "start-callback-server" || action === "poll-callback")
) {
  return NextResponse.json(
    {
      error:
        "Browser OAuth disabled for this provider — use import-token via /api/oauth/" +
        provider +
        "/import-token. See https://windsurf.com/show-auth-token to obtain a token.",
    },
    { status: 410 }
  );
}
```

- [ ] **Step 5.4: Run tests — must pass**

Run:
```bash
node --import tsx/esm --test tests/unit/windsurf-devin-executors.test.ts 2>&1 | tail -30
```
Expected: all 6 new tests PASS.

- [ ] **Step 5.5: Run full unit suite — no regressions**

Run:
```bash
npm run test:unit 2>&1 | tail -30
```
Expected: green. If a Codex-specific test now fails because `PKCE_CALLBACK_PROVIDERS.has("windsurf")` was assumed, fix that test (Codex behaviour didn't change; the assertion did).

- [ ] **Step 5.6: Commit**

Run:
```bash
git add src/app/api/oauth/[provider]/[action]/route.ts tests/unit/windsurf-devin-executors.test.ts
git commit -m "fix(oauth): return 410 Gone for retired windsurf/devin-cli PKCE actions

start-callback-server, authorize, and poll-callback now return 410
with a pointer to /import-token. Codex PKCE flow unchanged."
```

---

## Task 6: Clean up `WINDSURF_CONFIG` — annotate PKCE fields as retired

**Files:**
- Modify: `src/lib/oauth/constants/oauth.ts:328-365`

- [ ] **Step 6.1: Read full block**

Run:
```bash
sed -n '328,375p' src/lib/oauth/constants/oauth.ts
```

- [ ] **Step 6.2: Update header comment block**

Replace the comment block above `export const WINDSURF_CONFIG = {` with:

```typescript
// Windsurf / Devin CLI Configuration
//
// 2026-05-29 (Phase 1 hotfix):
//   The browser PKCE flow targeting https://app.devin.ai/editor/signin returned
//   404 post-rebrand. PKCE-only fields (`authorizeUrl`, `codeChallengeMethod`,
//   `callbackPort`, `callbackPath`, `apiServerUrl`, `exchangePath`) are kept
//   below for archival reference but are NO LONGER consumed by any code path —
//   the provider exports flowType="import_token" only.
//
//   Phase 2 will reintroduce browser login via Firebase OAuth + RegisterUser.
//   Spec: docs/superpowers/specs/2026-05-29-windsurf-login-fix-design.md.
//
// Active fields:
//   - inferenceUrl       → used by WindsurfExecutor (open-sse/executors/windsurf.ts)
//   - showAuthTokenUrl   → linked from OAuthModal "Get token" button
//   - firebaseApiKey     → reserved for Phase 2
//   - ideName            → sent in extension headers
```

Inline-annotate the retired fields (`authorizeUrl`, `codeChallengeMethod`, `callbackPort`, `callbackPath`, `apiServerUrl`, `exchangePath`) with `// retired 2026-05-29` comments. Do **not** delete them — that would break any downstream import; just mark them.

- [ ] **Step 6.3: Verify typecheck still passes**

Run:
```bash
npm run typecheck:core 2>&1 | tail -10
```
Expected: no errors.

- [ ] **Step 6.4: Commit**

Run:
```bash
git add src/lib/oauth/constants/oauth.ts
git commit -m "refactor(oauth): annotate retired PKCE fields in WINDSURF_CONFIG

No behaviour change — comment-only update documenting that authorizeUrl,
codeChallengeMethod, callbackPort, callbackPath, apiServerUrl, and
exchangePath are no longer consumed."
```

---

## Task 7: UI — `OAuthModal.tsx` skips PKCE buttons for windsurf/devin-cli

**Files:**
- Modify: `src/shared/components/OAuthModal.tsx`

- [ ] **Step 7.1: Read modal**

Run:
```bash
grep -n "windsurf\|devin-cli\|flowType\|authorize\|start-callback\|import-token\|showAuthTokenUrl" src/shared/components/OAuthModal.tsx | head -40
```

Identify the rendering branch that picks PKCE vs import-token UI based on `provider.flowType` or provider key.

- [ ] **Step 7.2: Add windsurf/devin-cli explicit branch**

In the modal render, find where it switches on flow type. Add — at the top of the render-decision logic — a check:

```typescript
// Phase 1 hotfix: PKCE flow for windsurf/devin-cli is retired (app.devin.ai 404).
// Force import-token panel + "Get your token" link to windsurf.com/show-auth-token.
const isWindsurfFamily = providerKey === "windsurf" || providerKey === "devin-cli";

if (isWindsurfFamily) {
  return (
    <ImportTokenPanel
      providerKey={providerKey}
      tokenUrl="https://windsurf.com/show-auth-token"
      tokenUrlLabel="Get your Windsurf API token"
      placeholder="Paste your Windsurf API token (sk-ws-... or legacy)"
      onSubmit={onImportTokenSubmit}
      onCancel={onCancel}
    />
  );
}
```

If `ImportTokenPanel` doesn't exist as a separate component, render the equivalent inline using the same JSX structure already used for other `IMPORT_TOKEN_PROVIDERS` (claude alternate-flow, e.g.). The key UX requirements:
1. No "Sign in with browser" button visible
2. Single textarea/input for token paste
3. A button labeled "Get your Windsurf API token" that calls `window.open("https://windsurf.com/show-auth-token", "_blank", "noopener,noreferrer")`
4. Submit button validates non-empty + calls existing `/api/oauth/windsurf/import-token` POST

- [ ] **Step 7.3: Manual smoke (developer-side)**

Run:
```bash
npm run dev &
sleep 8
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:20128/api/oauth/windsurf/start-callback-server
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:20128/api/oauth/devin-cli/authorize
kill %1
```
Expected: both `410`.

- [ ] **Step 7.4: Lint + typecheck**

Run:
```bash
npm run lint 2>&1 | tail -5
npm run typecheck:core 2>&1 | tail -5
```
Expected: 0 errors. Pre-existing warnings OK.

- [ ] **Step 7.5: Commit**

Run:
```bash
git add src/shared/components/OAuthModal.tsx
git commit -m "fix(dashboard): force import-token panel for windsurf/devin-cli

PKCE 'Sign in with browser' button is hidden for these providers.
Single 'Get your Windsurf API token' link opens windsurf.com/show-auth-token,
user pastes the returned token into the form."
```

---

## Task 8: i18n — update Windsurf login guide steps

**Files:**
- Modify: i18n keys for windsurf onboarding guide (39 languages)

- [ ] **Step 8.1: Locate i18n keys**

Run:
```bash
grep -rln "windsurf" src/locales/ public/locales/ docs/i18n/ 2>/dev/null | head -10
grep -rln "show-auth-token\|app.devin.ai\|editor/signin" . --include="*.json" --include="*.ts" 2>/dev/null | grep -v node_modules | grep -v ".next" | head -10
```
Note the i18n root directory — call it `<I18N_DIR>`.

- [ ] **Step 8.2: Find the Windsurf step key**

Run:
```bash
grep -rln "docs.windsurf.steps\|windsurfGuideSteps\|windsurf_steps\|Sign in to Windsurf" <I18N_DIR>
```
Identify the canonical key (e.g. `docs.windsurf.steps` or `onboarding.windsurf.steps`).

- [ ] **Step 8.3: Update English (`en.json` or equivalent) first**

Replace any string mentioning "Sign in", "browser login", or `app.devin.ai` with the import-token equivalent. Target string (rewrite per file's existing key shape):

```
1. Open https://windsurf.com/show-auth-token in your browser
2. Sign in to your Windsurf account if prompted
3. Copy the API token displayed on the page
4. Paste it into the OmniRoute Windsurf connection form
```

- [ ] **Step 8.4: Sync the other 38 languages**

If the repo has a sync script, run it:

```bash
npm run docs:i18n-sync 2>&1 | tail -10
# or
npm run check:docs-all 2>&1 | tail -20
```

If no script: replace the same key in every locale file with the English text wrapped in a `// TODO translate` marker, OR leave language-specific versions untouched if they already don't mention `app.devin.ai`. The CI gate (`check-docs-sync` in pre-commit) will tell you which files are out of sync.

- [ ] **Step 8.5: Run docs gate**

Run:
```bash
npm run check:docs-all 2>&1 | tail -20
```
Expected: PASS or only pre-existing warnings.

- [ ] **Step 8.6: Commit**

Run:
```bash
git add <I18N_DIR>
git commit -m "docs(i18n): update Windsurf onboarding to import-token flow

Replace 'Sign in via browser' steps with the windsurf.com/show-auth-token
copy-paste flow across all locales."
```

---

## Task 9: Full verification

- [ ] **Step 9.1: Full unit suite**

Run:
```bash
npm run test:unit 2>&1 | tail -20
```
Expected: green.

- [ ] **Step 9.2: Coverage gate**

Run:
```bash
npm run test:coverage 2>&1 | tail -20
```
Expected: 75/75/75/70 thresholds met.

- [ ] **Step 9.3: Lint + typecheck**

Run:
```bash
npm run lint 2>&1 | tail -5
npm run typecheck:core 2>&1 | tail -5
npm run typecheck:noimplicit:core 2>&1 | tail -5
```
Expected: 0 errors.

- [ ] **Step 9.4: Combined check**

Run:
```bash
npm run check 2>&1 | tail -10
```
Expected: green.

- [ ] **Step 9.5: Manual smoke — local server**

Run:
```bash
npm run dev &
sleep 10
# 1. Disabled PKCE actions return 410
curl -s -o /dev/null -w "GET /windsurf/authorize: %{http_code}\n" \
  http://localhost:20128/api/oauth/windsurf/authorize
curl -s -o /dev/null -w "GET /windsurf/start-callback-server: %{http_code}\n" \
  http://localhost:20128/api/oauth/windsurf/start-callback-server
curl -s -o /dev/null -w "GET /devin-cli/authorize: %{http_code}\n" \
  http://localhost:20128/api/oauth/devin-cli/authorize
# 2. Codex still works (regression check)
curl -s -o /dev/null -w "GET /codex/authorize: %{http_code}\n" \
  http://localhost:20128/api/oauth/codex/authorize
kill %1
```
Expected: windsurf/devin-cli all `410`. Codex `200` (or whatever it returned before — must be unchanged).

- [ ] **Step 9.6: Manual smoke — paste valid token**

Manual steps in browser at `http://localhost:20128/dashboard/providers`:
1. Click "Connect" on Windsurf provider
2. Verify modal does NOT show "Sign in with browser"
3. Verify "Get your Windsurf API token" link is present
4. Click link → opens new tab to `windsurf.com/show-auth-token` (or warns if not logged in)
5. Paste a valid token, submit
6. Connection saves, status shows "Active"
7. Open chat playground, send 1 request to `swe-1`, verify a response is returned

If you do not have a valid Windsurf token, document this in the PR as "blocked on tester with credentials" and note that automated tests cover the negative path.

---

## Task 10: Push branch + open PR

- [ ] **Step 10.1: Verify clean tree**

Run:
```bash
git status --short
```
Expected: empty (everything committed).

- [ ] **Step 10.2: Push branch**

Run:
```bash
git push -u origin fix/windsurf-login-2026-05-29
```

- [ ] **Step 10.3: Open PR**

Run:
```bash
gh pr create \
  --title "fix(oauth): hotfix Windsurf login — drop dead PKCE flow, promote import-token" \
  --body "$(cat <<'EOF'
## Summary

The Windsurf provider's PKCE OAuth URL (`https://app.devin.ai/editor/signin`) returns
404 post-Cognition rebrand, leaving users unable to log in. This PR retires the dead
flow and makes import-token (from `https://windsurf.com/show-auth-token`) the only
supported login path. Phase 2 (Firebase OAuth + RegisterUser, ported from
`fendoushaonian/WindSurf-gRPC-API`) will follow in a separate PR.

Spec: \`docs/superpowers/specs/2026-05-29-windsurf-login-fix-design.md\`.

## Changes

- \`src/lib/oauth/providers/windsurf.ts\` — drop \`buildAuthUrl\`, set \`flowType: "import_token"\`
- \`src/app/api/oauth/[provider]/[action]/route.ts\` — return 410 Gone for retired actions (\`authorize\`, \`start-callback-server\`, \`poll-callback\`) on \`windsurf\` & \`devin-cli\`. Codex unchanged.
- \`src/lib/oauth/constants/oauth.ts\` — annotate retired PKCE fields, no behaviour change
- \`src/shared/components/OAuthModal.tsx\` — hide "Sign in with browser" button for windsurf/devin-cli, show import-token panel + \`windsurf.com/show-auth-token\` link
- i18n — update onboarding steps in all locales
- Tests — new assertions covering disabled flowType, 410 responses, import-token still functional

No DB migration. Existing connections (\`accessToken\` already saved) continue working.

## Test plan

- [x] \`npm run test:unit\` — green
- [x] \`npm run test:coverage\` — 75/75/75/70 met
- [x] \`npm run lint\` + \`typecheck:core\` — 0 errors
- [x] \`curl GET /api/oauth/windsurf/authorize\` → 410
- [x] \`curl GET /api/oauth/devin-cli/start-callback-server\` → 410
- [x] \`curl GET /api/oauth/codex/authorize\` → unchanged
- [ ] Manual: paste valid token, send 1 chat request to \`swe-1\` (blocked on tester with credentials)

## Rollback

Revert this single PR. No schema changes; existing tokens unaffected.
EOF
)" \
  --base main \
  --head fix/windsurf-login-2026-05-29
```

- [ ] **Step 10.4: Confirm CI starts**

Run:
```bash
gh pr checks 2>&1 | tail -10
```
Expected: workflows queued. If failing, address in follow-up commits on the same branch.

---

## Self-Review Notes

- **Spec coverage**: All Phase 1 items in `docs/superpowers/specs/2026-05-29-windsurf-login-fix-design.md` mapped to tasks 1-8. Phase 2 explicitly out of scope.
- **Type consistency**: `flowType: "import_token"` used consistently. `RETIRED_PKCE_PROVIDERS` & `PKCE_CALLBACK_PROVIDERS` kept distinct.
- **Placeholder scan**: Task 8 has one `<I18N_DIR>` placeholder that the engineer resolves via Step 8.1 grep — necessary because i18n location varies. Task 3 has `<DISPATCHER>` — resolved via Step 3.1 grep.
- **Frequent commits**: 6 commits across the implementation (Tasks 3, 5, 6, 7, 8 each commit; Task 1+2 share commit at Step 3.5).
- **TDD**: Tasks 1, 4 write tests first; Tasks 2, 5 make them pass.
