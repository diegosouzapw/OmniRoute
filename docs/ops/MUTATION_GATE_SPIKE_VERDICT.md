---
title: "Mutation gate — Task 12 per-test spike verdict (GO) + Stryker CLI gotcha"
---

# Mutation gate works; Task 12 per-test attribution is GO

> **Supersedes** an earlier draft of this file that wrongly reported a "Stryker 9.6.1
> OptionsValidator regression". **There is no regression** — the mutation gate runs fine.
> The earlier failure was operator error (see the gotcha below). This note corrects the
> record and captures the real spike verdict.

## Task 12 spike verdict — GO (Plan A, `killedBy`)

Ran a scoped Stryker mutation on `open-sse/utils/error.ts` (2 covering test files) on the
v3.8.29 toolchain (Stryker 9.6.1 + ajv 8.18.0, `coverageAnalysis: perTest`, tap-runner):

- 422 mutants — **86 Killed**, 64 Survived, 272 NoCoverage.
- **All 86 killed mutants carry a populated `killedBy`** (86/86), and the report's
  `testFiles` section resolves each `killedBy` id to a covering test file.
- So **per-test (Plan A) attribution works**: Onda 2 radiography can read `killedBy`
  directly. Granularity is **per test FILE** (the tap-runner spawns one node process per
  test file) — exactly the unit the redundancy heuristic needs ("a test file that kills no
  mutant another file does not already kill").

The full config also instruments cleanly: `npx stryker run --dryRunOnly` reports
"Found 8 of 5632 file(s) to be mutated. Instrumented 8 source file(s) with 15488 mutant(s)"
— the 8-module nightly is healthy. This matches (and refreshes, on the current deps) the GO
recorded back in v3.8.27.

## ⚠️ Gotcha that caused the false alarm: `stryker -c` is `--concurrency`, NOT `--config-file`

`npx stryker run -c stryker.conf.json` sets `concurrency = "stryker.conf.json"` (a string),
which fails schema validation with a **mis-attributed** error:
`Config option "concurrency" must match pattern "^(100|[1-9]?[0-9])%$"`. Stryker still loads
the real config via auto-discovery, so the run _looks_ like the config is broken when it is
not. `jsPropertySyntax` (an ajv-6 option, a no-op under ajv 8) makes the validator's error
path unhelpful, but the data is the giveaway: `options.concurrency === "stryker.conf.json"`.

**Correct invocations:**

- Default config (`stryker.conf.json` in cwd): `npx stryker run` (no flag).
- Explicit config file: pass it as the **positional** arg — `npx stryker run my.conf.json`.
- `-c` / `--concurrency` takes a **number or percentage** (`-c 4`, `-c 50%`).

## Standing Onda-2 blocker (unchanged): budget, not tooling

The real blocker for a complete nightly remains **runtime budget** — the 8-module run is
15488 mutants and the god-files (`chatCore`, `combo`) dominate ~⅔; the conc=4 nightly timed
out at 180min (run `27705123780`). Levers: exclude god-files until the Onda-3 splits, seed
the incremental file, batch per night, or accept partial. The per-test spike does not change
that — it only confirms the attribution mechanism Onda 2 will rely on.
