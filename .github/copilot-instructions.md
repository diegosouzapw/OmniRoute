# OmniRoute PR and Coverage Instructions

- Treat `npm run test:coverage` as a required gate for PR work.
- The repository minimum is `60%` for statements, lines, functions, and branches.
- If a PR changes production code in `src/`, `open-sse/`, `electron/`, or `bin/`, it must include automated tests in the same PR.
- When reviewing or updating a PR, if the report shows missing tests or coverage below `60%`, do not stop after reporting the problem. Add or update tests in the PR first, rerun the coverage gate, and only then ask for confirmation.
- Prefer the smallest test layer that proves the behavior:
  - unit tests first
  - integration tests when multiple modules or DB state are involved
  - e2e only when the behavior is truly UI or workflow-dependent
- For bug issues, try to encode the reproduction as an automated test before or alongside the fix.
- In the final PR report, include:
  - the commands you ran
  - the changed test files
  - the final coverage result

## Doc Accuracy Gate

The `check-fabricated-docs` script catches fabricated claims in docs (nonexistent API paths, env vars, file references, hook names). It runs in CI as part of `docs-sync-strict`.

**When writing or updating docs:**
1. Run `node scripts/check/check-fabricated-docs.mjs --strict` locally before pushing
2. Every API path (`/api/...`) must have a matching `route.ts` file under `src/app/api/`
3. Every env var (`UPPER_SNAKE`) must have a `process.env.X` or `env.X` read in the codebase
4. Every file reference (`src/...`, `open-sse/...`, `bin/...`, `scripts/...`, `tests/...`, `electron/...`) must point to an existing file
5. Every hook name (`onInstall`, `onActivate`, etc.) must be in `KNOWN_HOOKS` in `check-fabricated-docs.mjs`
6. If a claim is intentionally aspirational (documenting a planned feature), add it to the appropriate allowlist in `scripts/check/check-fabricated-docs.mjs`