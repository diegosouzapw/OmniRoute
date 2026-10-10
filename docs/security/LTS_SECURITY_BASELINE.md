---
title: "LTS Security Baseline"
---

# LTS Security Baseline (v3.9.x preparation)

> **Measured:** 2026-10-10 on `release/v3.8.52` @ `cc84e9426a` (rail release 3.8.57, security + compliance).
> **Audience:** maintainers preparing the 3.9.0 LTS cut, and anyone auditing what the LTS line ships with.
> **Rule:** every number below was measured with the command next to it. Re-measure before quoting —
> scanner state moves daily.

The LTS support window itself is described in [`SECURITY.md`](../../SECURITY.md) →
"LTS support window (v3.9.x)".

## 1. Automated proofs (run on every PR)

| Hard Rule                                          | Proof                                                                                                           | What it asserts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #15 / #17 — spawn-capable routes are loopback-only | `npm run check:route-guard-membership` (CI gate) + `tests/unit/route-guard-local-only-sweep.test.ts`            | Every `route.ts` under `/api/mcp/`, `/api/cli-tools/runtime/`, `/api/services/` and the dashboard embed proxy (`/dashboard/providers/services/<name>/embed/**`) is `isLocalOnlyPath()` for every write method; the only read exemptions inside those roots are `/api/mcp/audit` and `/api/mcp/audit/stats`; every one is classified `MANAGEMENT` (the class whose policy runs the loopback gate); the manage-scope carve-out stays `/api/mcp/` only; any file under `src/app/api` that spawns directly belongs to a LOCAL_ONLY route. |
| #11 — no public upstream credential literal        | `npm run check:public-creds` (CI gate, key-based) + `tests/unit/public-creds-no-literals.test.ts` (value-based) | No Google OAuth client id, `GOCSPX-` secret, `AIza` key, GitHub OAuth app id or non-empty `client_secret` literal in `src/lib/oauth/`, `open-sse/` or `src/shared/constants/` outside a `resolvePublicCred()` call; `open-sse/utils/publicCreds.ts` keeps its embedded defaults as masked byte arrays.                                                                                                                                                                                                                                |

The two tests complement the gates instead of duplicating them: both were validated by mutation
(a helper module with `fork()` next to a route, and a bare `const` client id in
`src/shared/constants/`) that turns the test red while the corresponding gate stays green.

## 2. Dependency audit

| Scope                     | Command                       | critical | high | moderate | low |
| ------------------------- | ----------------------------- | -------: | ---: | -------: | --: |
| Production (`--omit=dev`) | `npm audit --omit=dev --json` |        0 |    3 |        0 |   0 |
| Full tree (dev included)  | `npm audit --json`            |        0 |   22 |        1 |   0 |

The three production highs are one advisory, `GHSA-vfj7-8cjw-p6xm` (braces, stack-exhaustion DoS
through deeply nested patterns), reached through `http-proxy-middleware` → `micromatch` → `braces`.
`npm audit` proposes a semver-major downgrade of `http-proxy-middleware`, which is not a fix. The
matching Dependabot alert is dismissed as `tolerable_risk`.

## 3. GitHub security alerts

| Source                 | Command                                                                              | Open | Fixed | Dismissed                                                                |
| ---------------------- | ------------------------------------------------------------------------------------ | ---: | ----: | ------------------------------------------------------------------------ |
| Code scanning (CodeQL) | `gh api "repos/diegosouzapw/OmniRoute/code-scanning/alerts?state=open" --paginate`   |    0 |    67 | 241 (false positive 120 · won't fix 72 · used in tests 49)               |
| Dependabot             | `gh api "repos/diegosouzapw/OmniRoute/dependabot/alerts?state=open" --paginate`      |    0 |   286 | 5 (all `tolerable_risk`: braces, sprintf-js, node-forge, extract-zip ×2) |
| Secret scanning        | `gh api "repos/diegosouzapw/OmniRoute/secret-scanning/alerts?state=open" --paginate` |    0 |     — | —                                                                        |

Nothing was closed or dismissed while producing this baseline (Hard Rule #14).

## 4. Security workflows

State from `gh run list --workflow <file> --limit 3 --json conclusion,createdAt` on 2026-10-10.

| Workflow                   | Trigger                                   | Latest state                                                                                                                                                                                                                                                              | Blocking?                |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `codeql.yml`               | `workflow_dispatch` only                  | Last run 2026-09-02 failed: advanced CodeQL cannot upload while GitHub **default setup** is on. Code scanning is fed by the default setup instead (configured; `actions`, `c-cpp`, `javascript-typescript`, `python`; weekly + PRs; tip analysis 2026-10-10).             | n/a                      |
| `semgrep.yml`              | PRs to `main` / `release/**`, push `main` | Success on the release tip PR (`cc84e9426a`): 205 findings (203 warning, 2 error). 193 are `github-actions-mutable-action-tag`; the 2 errors are `react-insecure-request` in `docker/devin-bridge/run-contract.mjs`. SARIF is an artifact, not uploaded to code scanning. | No (advisory)            |
| `scorecard.yml`            | push, weekly, branch-protection changes   | Success (2026-10-10). OpenSSF score **6.5**; zero/low checks: Token-Permissions 0, Signed-Releases 0, CII-Best-Practices 0, Vulnerabilities 1, Pinned-Dependencies 2, Branch-Protection 3.                                                                                | No                       |
| `dast-smoke.yml`           | PRs to `main`, `workflow_dispatch`        | Success on the release PR (2026-10-10 06:41 UTC); the run just before it was cancelled.                                                                                                                                                                                   | No (`continue-on-error`) |
| `nightly-llm-security.yml` | nightly schedule, `workflow_dispatch`     | **Failed on every scheduled run from 2026-10-03 to 2026-10-09.** In the 2026-10-09 run both jobs failed before any probe ran (promptfoo at "Build CLI bundle", garak at "Start OmniRoute"), so neither produced a verdict.                                                | No                       |

The Scorecard score comes from `https://api.securityscorecards.dev/projects/github.com/diegosouzapw/OmniRoute`.

## 5. npm publish provenance

| Check                                                           | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Main package publish path (`.github/workflows/npm-publish.yml`) | Build + `check:pack-artifact` (BUILD_SHA provenance guard, #10427) + `check:pack-boot` on the build runner; the upload happens in the separate `stage-npm` job on `ubuntu-latest` (npm rejects `--provenance` from self-hosted runners) with `id-token: write`, pinned npm `11.15.0`, and `npm publish "$TARBALL" --provenance --access public --tag "$TAG" --ignore-scripts`.                                                                                                                                                               |
| Default mode                                                    | `publish_mode=auto` = Trusted Publishing (OIDC): no npm auth token is exported in that step. `staged` and `direct` remain token-based fallbacks.                                                                                                                                                                                                                                                                                                                                                                                             |
| Registry evidence (`npm view omniroute@<v> --json`)             | 3.8.49, 3.8.50 and 3.8.51 were published by `GitHub Actions` (OIDC trusted publisher) and carry an SLSA v1 provenance attestation.                                                                                                                                                                                                                                                                                                                                                                                                           |
| Gaps before the LTS rehearsal                                   | (1) `workflow_call` still declares the npm token secret as required even though the default path does not use it. (2) `publish-opencode-plugin` / `publish-opencode-plugin-v2` publish with the long-lived npm token + `--provenance`, not Trusted Publishing — each needs its own npm Trusted Publisher entry before the token can be retired. (3) The npmjs.com Trusted Publisher binding (repository + workflow file) can only be confirmed by the package owner. (4) GitHub Release assets are not signed (Scorecard Signed-Releases 0). |
| Local package dry-run                                           | `npm pack --dry-run --json --ignore-scripts` without a build: 4,165 entries, 9.4 MB packed / 35.9 MB unpacked. `check:pack-artifact` needs a built `dist/` and was not run for this baseline.                                                                                                                                                                                                                                                                                                                                                |

The publish rehearsal against the real registry is a maintainer action; nothing was published
while producing this baseline.

## 6. How to refresh this baseline

```bash
npm audit --omit=dev --json
gh api "repos/diegosouzapw/OmniRoute/code-scanning/alerts?state=open" --paginate
gh api "repos/diegosouzapw/OmniRoute/dependabot/alerts?state=open" --paginate
for w in codeql.yml semgrep.yml scorecard.yml dast-smoke.yml nightly-llm-security.yml; do
  gh run list --workflow "$w" --limit 3 --json conclusion,createdAt
done
node --import tsx/esm --import ./tests/_setup/isolateDataDir.ts --test \
  tests/unit/route-guard-local-only-sweep.test.ts tests/unit/public-creds-no-literals.test.ts
npm run check:route-guard-membership && npm run check:public-creds
```
