---
title: "Mutation gate — Stryker 9.6.1 OptionsValidator regression (npx stryker run fails at config validation)"
---

# Mutation gate is currently non-functional (Stryker 9.6.1 + ajv 8.18.0)

> **Discovered:** 2026-06-17 (v3.8.29 cycle), re-running a scoped Stryker probe.
> `npx stryker run` now fails at **config validation**, before any sandbox/mutant work.
>
> **This is a NEW toolchain regression, not a re-opening of the spike.** The Onda-1
> Task 12 per-test (`killedBy`) attribution question was already settled **GO** in
> v3.8.27, and the nightly mutation run executed as recently as the **v3.8.28** cycle
> (it reached the run phase and timed out on **budget** — the standing Onda-2 blocker,
> tracked separately and addressed by the god-file splits in Onda 3). Something in the
> shared `node_modules` changed since that last nightly so that the validator now
> rejects the (valid) config — stopping the nightly from even starting.

## Symptom

`npx stryker run` (and therefore `npm run test:mutation` and the
`.github/workflows/nightly-mutation.yml` job) fails immediately with:

```
ERROR OptionsValidator Config option "concurrency" must match pattern "^(100|[1-9]?[0-9])%$"
ERROR Stryker Please correct this configuration error and try again.
  at OptionsValidator.schemaValidate (.../@stryker-mutator/core/dist/src/config/options-validator.js:161)
```

Reproduced with the **unmodified** `stryker.conf.json` (`npx stryker run -c stryker.conf.json --dryRunOnly`)
and with a copy that **removes** `concurrency` entirely — the error persists either way.

## Why it is a false positive (the project config is valid)

- `stryker.conf.json` sets `"concurrency": 4`. The Stryker JSON schema
  (`node_modules/@stryker-mutator/api/dist/schema/stryker-core.json`) defines
  `concurrency` as `oneOf: [ {type:number, minimum:1}, {type:string, pattern:"^(100|[1-9]?[0-9])%$"} ]`
  with **`examples: [4, "50%", "100%"]`** — so a number `4` is explicitly valid.
- Validating the config (and a bare `{concurrency: 4}`) against that schema with a
  **standalone ajv 8.18.0** — the exact version Stryker depends on (`~8.18.0`, no nested
  copy, no `overrides`) — and even with Stryker's **exact** ajv options
  (`useDefaults, allErrors, jsPropertySyntax, verbose, logger:false, strict:false`)
  returns **valid**, no concurrency error.
- A percentage string (`"30%"`, which _does_ match the pattern) is **also** rejected,
  and the error appears even when `concurrency` is omitted. So the message is
  **mis-attributed**: Stryker's compiled `validateFn` fails on the merged full-options
  object and reports it against `concurrency`.

## Likely root cause

The interaction is inside Stryker 9.6.1's `OptionsValidator`, not the project config.
`jsPropertySyntax: true` (line 18 of `options-validator.js`) is an **ajv 6** option that
was **removed in ajv 7+**; under ajv 8.18.0 it is a no-op, and the error-path translation
in `describeErrors` can mislabel the genuinely-failing field as `concurrency`. The true
offending value is somewhere in the default-filled options object — not surfaced because
`describeErrors` collapses the ajv `oneOf` errors to a single line.

## Impact

- The mutation gate is **nightly + advisory** (not PR-blocking), so this **reds no PR**.
- But the nightly now **fails before it starts** — strictly worse than the prior state,
  where it reached the run phase and only timed out on budget. It produces **zero scores**:
  1. **P0 #1** — promoting `mutationScore` to a ratchet — has no fresh nightly values.
  2. **Onda 2** (radiography + mutation-proved pruning) needs ≥1 complete run; this
     config-validation regression must be cleared first, then the **budget** blocker
     (god-files dominating ~⅔ of the 15k mutants) still remains, per the Onda-3 splits.

## Recommended fix (focused follow-up — NOT in this PR)

Out of scope for the oasdiff base-ref drift fix this PR carries, and it needs a
dependency change + reinstall that must happen on a **non-shared** `node_modules`
(the dev worktrees here symlink a shared `node_modules`; never `npm install` into it).

1. Reproduce on a clean install: `npm ci` in an isolated checkout, then
   `npx stryker run -c stryker.conf.json --dryRunOnly`.
2. Surface the real failing field: temporarily log `validateFn.errors` (verbose) in
   `options-validator.js`, or compile the schema with a plain ajv 8.18.0 and validate the
   **full default options** object (not just the partial config) to see which field+value fails.
3. Most probable remedies, in order of preference:
   - Pin `@stryker-mutator/core` + `@stryker-mutator/tap-runner` to the last version whose
     `OptionsValidator` validates cleanly against ajv 8.18.0 (bisect 9.6.1 ← down).
   - Or add a tested `overrides` for the ajv version Stryker's validator actually expects.
4. Verify by getting `npx stryker run --dryRunOnly` to exit 0 again (the conf comment claims
   this passed on 2026-06-15/17 — confirm what changed in `node_modules` since), **then** run
   the Task 12 spike to record the real `killedBy` verdict.
