---
title: "Contribution Golden Path"
---

# Contribution Golden Path

Use this guide to choose the smallest reliable development loop for a pull request. It does not
replace the area-specific architecture and security documents linked below; it connects each common
change type to its contracts, focused checks, and CI coverage.

## The path every change follows

1. **Choose the base before editing.** Find the highest active `release/v*` branch and branch from
   its tip. Target that branch, not `main`. If a release freeze is active, do not target the frozen
   branch; use the next active cycle described in
   [Branching & Release Model](../ops/BRANCHING_MODEL.md).
2. **Name the contracts.** Identify every catalog, schema, generated artifact, public API, or user
   interface that the change affects. The table below gives the minimum starting set.
3. **Write or update focused tests.** Production changes in `src/`, `open-sse/`, `electron/`, or
   `bin/` require an automated test in the same PR. Run the smallest test files that prove the
   behavior, then the listed focused gates.
4. **Let CI run the broad matrix.** The complete unit shards, Vitest, coverage ratchet, and
   production build run on the PR. Run a broad suite locally only when a focused failure points to
   wider impact or when the change spans several subsystems.
5. **Reconcile before review.** Fetch the active base, inspect its new commits and your diff against
   it, then rebase or merge the base according to the contributor workflow. Resolve generated-file
   and catalog conflicts from their source, regenerate them, rerun the focused loop, and confirm the
   PR still targets the active release branch.
6. **Record evidence.** In the PR template, list the commands run, every test file added or changed,
   migrations or feature flags, and any CI-only validation still pending.

## Golden paths by change type

Commands below are minimum focused checks, not permission to skip a test that directly covers the
behavior you changed.

### Provider

**Contracts**

- Provider definition in `src/shared/constants/providers/` and its composition in
  `src/shared/constants/providers.ts`.
- Models and capabilities in `open-sse/config/providerRegistry.ts` or its extracted registry files.
- Executor/translator selection, OAuth or API-key configuration, dashboard assets, and generated
  provider reference when applicable.
- Public credentials must use `resolvePublicCred()`; error responses must use the shared sanitized
  error helpers. See [Public Credentials](../security/PUBLIC_CREDS.md) and
  [Error Sanitization](../security/ERROR_SANITIZATION.md).

**Focused loop**

```bash
npm run check:provider-consistency
npm run check:provider-assets
node --import tsx/esm --test tests/unit/provider-translate-path-golden.test.ts
node --import tsx/esm --test tests/unit/<provider-or-executor>.test.ts
npm run gen:provider-reference   # when the catalog changes; commit the generated diff
npm run lint
```

Also test every affected request family: chat, Responses, images, embeddings, audio, or video.
Review generated catalog and golden diffs as contract changes; do not accept them blindly.

### Routing

**Contracts**

- Public strategy values and UI metadata in `src/shared/constants/routingStrategies.ts`.
- Dispatch and ordering under `open-sse/services/combo.ts` and `open-sse/services/combo/`.
- Combo schemas, persistence, resilience state, model capabilities, and API/UI controls.
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) and resilience documentation when behavior changes.

**Focused loop**

```bash
node --import tsx/esm --test tests/unit/combo-<behavior>.test.ts
npm run test:combo:matrix        # strategy or dispatch changes
npm run check:known-symbols      # strategy registration changes
npm run lint
```

Use deterministic mocked-upstream tests locally. Live combo smokes require credentials and are
manual, not CI substitutes.

### UI / UX

**Contracts**

- Next.js route/page and shared component boundaries under `src/app/` and
  `src/shared/components/`.
- API response shapes, loading/empty/error states, keyboard and screen-reader behavior,
  responsive layout, theming, and locale expansion.
- English UI source strings in `src/i18n/messages/en.json`; do not hard-code new user-facing copy.

**Focused loop**

```bash
node --import tsx --test tests/unit/dashboard/<feature>.test.ts
npx vitest run --config vitest.config.ts tests/unit/ui/<component>.test.tsx
npm run check:dashboard-typecheck
npm run lint
```

Run the app for interaction or visual changes and check both narrow and wide viewports. CI runs the
production build and broader suites; visual behavior still needs a focused component, Playwright,
or documented manual check appropriate to the change.

### i18n

**Contracts**

- `src/i18n/messages/en.json` is the UI source; `config/i18n.json` is the locale source.
- CLI catalogs live separately under `bin/cli/locales/`.
- Preserve ICU placeholders and tags exactly. Do not translate product/provider/model names,
  protocol and header names, commands, code/JSON identifiers, URLs, environment variables, or
  protected terms such as `OmniRoute`, `OAuth`, `MCP`, and `A2A`. The current source list is
  `scripts/i18n/glossary/protected-terms.json`.

**Focused loop**

```bash
npm run i18n:sync-ui:dry
npm run i18n:check-ui-coverage
npm run i18n:check-value-drift
npm run i18n:check-glossary
npm run check:cli-i18n          # when CLI strings/catalogs change
npm run lint
```

This is guidance for the existing system, not an invitation to expand its tooling or key model.
Keep i18n patches surgical while the replacement system is being designed. Do not run translation
commands that call external services unless the task explicitly requires generated translations and
you have reviewed the resulting diff.

### CLI

**Contracts**

- Public commands and flags in `bin/cli/`, generated API commands, exit codes, stdout/stderr and
  JSON output shapes, config/environment behavior, and packaged files.
- CLI user-facing strings must use the CLI i18n layer and keep `en`/`pt-BR` catalogs aligned.
- Preserve Node as the supported runtime and the published binary contract.

**Focused loop**

```bash
node --import tsx/esm --test tests/unit/cli/<command>.test.ts
npm run check:cli-i18n
npm run build:cli             # generated/bundled CLI changes
npm run check:pack-policy     # package-surface changes
npm run lint
```

Use the exact command in a temporary data directory when behavior depends on parsing, files, or exit
status. CI performs the broader package artifact and ecosystem checks.

### Database

**Contracts**

- Domain modules under `src/lib/db/`; `src/lib/localDb.ts` remains a re-export layer only.
- Numbered, idempotent SQL migrations under `src/lib/db/migrations/`, transaction safety, upgrade
  behavior, indexes, and every caller affected by the schema.
- Routes and handlers never issue raw SQL directly.

**Focused loop**

```bash
npm run check:migration-numbering
npm run check:db-rules
node --import tsx/esm --test tests/unit/db/<domain>.test.ts
node --import tsx/esm --test tests/unit/db/migration-<number>.test.ts
npm run lint
```

Test both a fresh database and upgrade from the prior schema when adding a migration. Database tests
must close handles and call `resetDbInstance()` during cleanup. Run `npm run test:bun:db` only when
the best-effort Bun adapter path changes; Node remains authoritative.

### Build / deploy

**Contracts**

- Root and workspace manifests/lockfile, `scripts/build/`, Next.js standalone assembly, `dist/`
  package contents, Electron platform metadata, CI workflows, and deployment sentinels.
- Supported Node ranges and the allow-listed Bun use in `CLAUDE.md` must remain intact.
- Build artifacts stay untracked; dependency, license, workflow, and package policies apply.

**Focused loop**

```bash
node --import tsx/esm --test tests/unit/build/<behavior>.test.ts
npm run check:build-scope
npm run check:lockfile         # dependency or lockfile changes
npm run check:pack-policy      # published package surface changes
npm run lint
```

Use `npm run build` locally only when the change affects compilation, standalone assembly, assets,
or runtime bundling. Use `npm run build:release` only for release/deploy validation. CI's build is
the final cross-platform signal; platform-specific Electron changes need the matching focused build
or smoke evidence.

## Local loop versus CI

| Run locally for each patch                                                    | CI supplies the broad signal                                      |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Direct behavior tests and category gates above                                | Sharded full unit suite and serial tests                          |
| `npm run lint`                                                                | Vitest suites and coverage/quality ratchets                       |
| Typecheck or build only when the affected contract calls for it               | Production build, security, docs, dependency, and PR-policy gates |
| Manual interaction/live checks only when automation cannot prove the behavior | Cross-job integration and platform checks configured by workflow  |

A green focused loop is evidence about the changed contract, not proof that unrelated CI checks
will pass. Conversely, do not make every local edit wait for the full repository matrix.

## Reconciliation checklist

Before requesting review:

- Confirm the PR base is still the highest active `release/v*` branch.
- Fetch that base and review commits that landed since you branched.
- Review `git diff <active-base>...HEAD` for accidental or generated churn.
- Resolve catalog and generated-document conflicts by updating the source and regenerating output.
- Rerun every focused test/gate listed in the PR description after reconciliation.
- Never weaken assertions or drop required tests merely to match a moved base.

For release-freeze and retargeting rules, use
[Branching & Release Model](../ops/BRANCHING_MODEL.md). For the complete CI inventory, use
[Quality Gates Reference](../architecture/QUALITY_GATES.md).
