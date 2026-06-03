# OmniRoute CLI — Internal Conventions

> Status: normative. Source: `_tasks/features-v3.8.0/cli/fase-0-preparacao/0.3-definir-convencoes.md`.
> This file is the authoritative reference for every new or migrated CLI command.
> If reality diverges from this document, fix the code first; only edit this file
> after the discrepancy has been justified in a PR.

## 1. Subcommand style

**Standard**: `git`-style nested verbs.

```
omniroute keys add openai sk-xxx
omniroute combo switch fastest
omniroute memory search "react hooks"
```

**Not allowed**:

```
omniroute --add-key openai sk-xxx     # ❌ flag-as-verb
omniroute add-key openai sk-xxx       # ❌ hyphen at the top level
```

## 2. Flags

- Only `--long` and `-s` shorts (one-letter shorts reserved for very common
  flags: `-h`, `-v`, `-o`, `-q`, `--no-open`).
- Format: `--api-key sk-xxx` (space). `=` accepted for parity but doc uses space.
- Naming: kebab-case (`--api-key`, `--non-interactive`, `--max-tokens`).
- Booleans: `--no-foo` (negative) and `--foo` (positive). Default `false` unless
  documented.
- Multi-value: repeat the flag (`--header X-A=1 --header X-B=2`).

## 3. Output (`--output`)

| Value   | Use case                                     |
| ------- | -------------------------------------------- |
| `table` | default human-readable                       |
| `json`  | single JSON object, pretty-printed           |
| `jsonl` | streamed objects, one per line (logs, lists) |
| `csv`   | spreadsheet ingestion                        |

Related flags:

- `--quiet` / `-q` — suppress headers/spinners (pipe-friendly).
- `--no-color` — force ANSI off (auto-detected if `!stdout.isTTY`).

Helper: `emit(rows, opts)` from `bin/cli/output.mjs` handles all four formats.

## 4. Exit codes

| Code  | Meaning                           |
| ----- | --------------------------------- |
| `0`   | success                           |
| `1`   | generic error (uncaught, runtime) |
| `2`   | invalid argument / misuse         |
| `3`   | server offline (when required)    |
| `4`   | auth / permission (401/403)       |
| `5`   | rate limit / quota (429)          |
| `124` | timeout                           |

Helper: `exitWith(code, message?)` from `bin/cli/exit.mjs` (added under
`output.mjs` if needed) — always uses these constants. **Never** raw
`process.exit(N)` in command code.

## 5. HTTP errors + retry/backoff

All API calls go through `apiFetch(path, opts)` (`bin/cli/api.mjs`), which:

- Reads base URL from `OMNIROUTE_BASE_URL` env or `~/.omniroute/config.json`
  (active profile).
- Injects `Authorization: Bearer ${OMNIROUTE_API_KEY}` when available.
- Injects `x-omniroute-cli-token` when applicable (see task 8.12).
- Applies a per-attempt timeout (`--timeout 30000`, default 30s).
- Maps status → exit code (401→4, 429→5, 5xx→1, etc.).
- Never exposes `err.stack` (CLAUDE.md hard rule #12).
- Applies exponential backoff with jitter on retryable statuses.

### Retry defaults

```js
export const RETRY_DEFAULTS = {
  maxAttempts: 3, // 1 initial + 2 retries
  baseMs: 500,
  maxMs: 8000, // jitter can slightly exceed
  jitter: true, // ±25%
  retryableStatuses: [408, 425, 429, 502, 503, 504],
  retryableErrorCodes: [
    "ECONNRESET",
    "ECONNREFUSED",
    "ETIMEDOUT",
    "ENOTFOUND",
    "EAI_AGAIN",
    "EPIPE",
  ],
};
```

### Global flags wired

- `--retry` (default on) / `--no-retry`
- `--retry-max <n>` (default 3) — total attempts
- `--timeout <ms>` (default 30000) — per attempt
- `--retry-on <csv>` — extra retryable statuses (e.g. `--retry-on 500`)

### Method semantics

- Mutations (`POST`/`PUT`/`DELETE`) retry **only** on idempotent-ish statuses
  (`502`/`503`/`504`/`408`/network), never `409`/`422`. This avoids duplicate
  side-effects.
- `GET` retries all `RETRY_DEFAULTS.retryableStatuses`.
- SSE / streaming does **not** auto-retry (operator decides).
- Optional `--idempotency-key <uuid>` for extra-safe mutations.

### Status → exit code map

| Status          | Exit | Retry?                         |
| --------------- | ---- | ------------------------------ |
| 200–299         | 0    | n/a                            |
| 400             | 2    | no                             |
| 401             | 4    | no                             |
| 403             | 4    | no                             |
| 404             | 2    | no                             |
| 408             | 124  | **yes**                        |
| 409             | 1    | no (mutations)                 |
| 422             | 2    | no                             |
| 425             | 1    | **yes**                        |
| 429             | 5    | **yes** (respects Retry-After) |
| 500             | 1    | configurable (default no)      |
| 502 / 503 / 504 | 1    | **yes**                        |
| Network errors  | 1    | **yes**                        |
| Timeout         | 124  | **yes**                        |

## 6. Internationalization

- Every user-facing string goes through `t("module.key", vars)`.
- Catalogs live in `bin/cli/locales/{locale}.json` (nested objects).
  42 files ship out-of-the-box: `en`, `pt-BR`, and 40 additional locales.
  11 locales are scaffold-only (empty `{}`); all keys fall back to `en` automatically.
- Detection order: `--lang` flag → `OMNIROUTE_LANG` env → `LC_ALL` → `LC_MESSAGES` → `LANG` → `en`.
- Locale persisted via `config lang set <code>` — saves `OMNIROUTE_LANG` to `~/.omniroute/.env`.
- Missing keys return the key itself (no crash).
- PRs that add new strings **must** update `en.json` and `pt-BR.json`.
  Other locale files are best-effort; missing keys silently fall back to `en`.
- `normalize()` in `i18n.mjs` validates locale codes via `/^[a-zA-Z0-9-]+$/` to
  prevent path traversal — never pass raw filesystem paths.
- Canonical locale list: `config/i18n.json` — source of truth used by both CLI and
  dashboard i18n pipelines.

### Adding a new locale file

1. Add entry to `config/i18n.json` with `code`, `english`, `native`, `flag`.
2. Run `node bin/cli/scripts/generate-locales.mjs` — creates `bin/cli/locales/{code}.json`.
3. Fill in translations (or leave as `{}` for en-fallback scaffold).
4. The pre-commit hook `check-cli-i18n` will verify all `t()` keys exist in `en.json`.

## 7. Logs / output channels

- `stdout` — useful output (parseable when `--output json|jsonl|csv`).
- `stderr` — progress, warnings, errors, spinners.
- `--verbose` / `-V` — extra detail on stderr.
- `--debug` — stack traces, request bodies (dev-mode only; redacts secrets).

## 8. Server-first / DB-fallback

Single helper:

```js
import { withRuntime } from "./runtime.mjs";

await withRuntime(async ({ kind, api, db }) => {
  if (kind === "http")
    return api("/api/combos", { retry: false, timeout: 5000, acceptNotOk: true });
  return db.combos.getCombos();
});
```

- `kind: "http"` when server is up (preferred). `api` is `apiFetch` bound to
  the current profile/base-URL.
- `kind: "db"` when server is offline. `db` exposes typed module exports:
  - `db.combos` → `src/lib/db/combos.ts` (getCombos, getComboByName, createCombo,
    deleteComboByName, setActiveCombo, …)
  - `db.recovery` → `src/lib/db/recovery.ts` (countEncryptedCredentials,
    resetEncryptedColumns)
- Mutations that require server **must** error with exit code `3` when the
  server is down, never silently fall back.
- **Never** write raw SQL in commands — always go through `src/lib/db/` modules.
  The Semgrep rule at `.semgrep/rules/cli-no-sqlite.yaml` enforces this at commit time.

## 9. Audit of destructive actions

Commands that mutate state (delete, reset, `--force`) **must**:

- Ask for interactive confirmation (skipped with `--yes`).
- POST to `/api/compliance/audit-log` when the server is up.
- Support `--dry-run` (preview without effect).

## 10. Secrets

- **Never** log secrets. Mask as `sk-***-xxx` via `maskSecret()` from
  `bin/cli/output.mjs`.
- **Never** accept a secret via positional without warning. Prefer:
  - env (`OMNIROUTE_*_API_KEY`)
  - stdin (`--api-key-stdin`)
  - interactive `askSecret()` (echo off — already implemented in `io.mjs`)
- Secrets must not appear in `--verbose` / `--debug` output.

## 11. Testing baseline

- Every new command ships with at least one smoke test (happy path + one
  error path).
- Use `tests/unit/cli-*.test.ts` naming. Prefer `node:test` for CLI suites
  (no extra deps).
- Coverage target: ≥60% for `bin/cli/commands/`, ≥75% for `bin/cli/` overall
  after Fase 8.

## 12. References

- CLAUDE.md hard rules — especially #11 (publicCreds), #12 (error
  sanitization), #13 (shell injection).
- `docs/security/ERROR_SANITIZATION.md` — the only acceptable error shapes.
- `tests/unit/cli-tools-i18n.test.ts` — current i18n infrastructure (pre-`t()`).
- Commander.js docs — Options & subcommand patterns.
