---
title: "Performance Baseline (LTS rail)"
---

# Performance Baseline (LTS rail)

`npm run perf:lts-baseline` (`scripts/perf/lts-baseline.mjs`) records one reproducible
performance snapshot of the current tree: heap behaviour, routing hot-path cost, release
build time and HTTP time-to-first-byte. It was added on the 3.9.0 LTS rail (3.8.56) so the
LTS cut has a baseline to compare against instead of impressions.

It does not replace the existing probes. It runs them in a fixed order, isolates them, and
writes a single JSON document (plus an optional Markdown table) that two runs can be diffed
against.

## The one rule: compare only runs from the same host

Every number in the report depends on the machine and on what else that machine was doing.
A shared dev box with dozens of worktrees and other sessions inflates timings by 2-3x
compared with an idle host, and the inflation is not stable from run to run.

- Compare a report only with reports whose `host` block matches (`cpuCount`, `totalMemMB`,
  `nodeVersion`) **and** whose `loadAvg` was similar.
- The Markdown output prints a `host busy` warning when the 1-minute load is above 25% of the
  CPU count. A report carrying that warning is **preliminary** and must not be used as a
  regression threshold.
- The report deliberately omits the hostname. Record which box you used in the PR or note
  that publishes the numbers.

## How to run

```bash
# Shared dev box — build is never run here (default), TTFB only if dist/ already exists
npm run perf:lts-baseline -- --runs 20 --out baseline.json --md > baseline.md

# Idle dedicated host — measures the release build and then TTFB on the fresh bundle
npm run perf:lts-baseline -- --with-build --runs 50 --out baseline.json --md > baseline.md

# Against a server that is already running (boot time is not measured)
npm run perf:lts-baseline -- --url http://127.0.0.1:20128 --runs 50 --out baseline.json
```

| Flag                     | Meaning                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `--skip-build`           | Default. Do not run `npm run build:release`. Required on a shared dev box.                                            |
| `--with-build`           | Run `build:release` first and record its wall time. Use only on an idle host. Mutually exclusive with `--skip-build`. |
| `--runs <n>`             | Timed requests per TTFB endpoint, after 3 discarded warmup requests (default 20).                                     |
| `--url <base>`           | Bench an already-running server instead of booting one.                                                               |
| `--out <path>`           | Write the JSON report to that path.                                                                                   |
| `--md`                   | Print the Markdown table to stdout. Progress logs always go to stderr.                                                |
| `--data-dir <path>`      | Parent directory for the isolated per-measurement `DATA_DIR`s (default: a fresh temp dir, removed at the end).        |
| `--heap-timeout-min <n>` | Abort `test:heap` after n minutes and mark it `skipped` (default 15).                                                 |

A failed or skipped measurement is data, not a crash: the script always writes the report and
exits 0. Only a bad flag exits non-zero (2). The script spawns `npm` without a shell, so it
targets Linux and macOS.

### Isolation guarantees

- Every child process gets its own `DATA_DIR` under `--data-dir`. The inherited `DATA_DIR`
  (and therefore `~/.omniroute`) is never used, so the run cannot open or migrate an
  operator database.
- Children get fake `JWT_SECRET` / `API_KEY_SECRET` / `INITIAL_PASSWORD`,
  `DISABLE_SQLITE_AUTO_BACKUP=true`, `REQUIRE_API_KEY=false`, and no inherited
  `OMNIROUTE_API_KEY`.
- Commands are spawned with argument arrays (no shell interpolation) in their own process
  group. A timed-out command and the booted server are always killed, including on error.

## What each number means

The JSON shape is `{ generatedAt, host, gitSha, options, measurements }`. Each measurement is
`{ status: "ok" | "skipped" | "failed", durationMs, summary, raw? }`.

| Measurement     | Source                                                | What it tells you                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buildSeconds`  | `npm run build:release`                               | Wall time of the full release build (Next standalone + CLI bundle). Only with `--with-build`.                                                                                                                                         |
| `heapGrowth`    | `npm run test:heap`                                   | `raw.growthMB`: V8 heap growth after 500 SSE streams through `createSSEStream`, measured after GC. A leak shows up as growth that scales with stream count. The test itself fails at 20 MB.                                           |
| `heapBody`      | `npm run bench:heap-body -- --json`                   | `raw.perRequestMiB`: heap retained per request for the #7847 incident body shape (`raw.wireMiB` on the wire); `raw.amplification` is retained ÷ wire size.                                                                            |
| `routingEvents` | `npm run bench:routing-events`                        | `raw.scenarios[].usPerOp`: microseconds per routing decision, without and with the routing-event sinks. Relative cost matters more than the absolute value.                                                                           |
| `serverBoot`    | `omniroute serve` over `dist/`                        | Time from spawn to the first `200` from `/api/health/ping` (cold start). `skipped` with `--url` or without a built bundle.                                                                                                            |
| `ttft`          | `/api/health`, `/v1/models`, `/api/monitoring/health` | Per endpoint, time until the response headers arrive (time to first byte), sequential requests on a keep-alive connection: `raw.medianMs`, `raw.p95Ms` (nearest rank), `raw.minMs`, `raw.maxMs`. Non-2xx marks the endpoint `failed`. |

`ttft` needs a server. When no `--url` is given and `dist/server.js` does not exist, every
`ttft` entry is `skipped` with the reason: `omniroute serve` cannot boot an unbuilt tree.
When the bundle exists, the script boots it with `NODE_ENV=production` on an ephemeral port.

## Procedure on an idle host (VPS or the .113 runner box)

The baseline that counts for the LTS cut must come from an idle, dedicated host — see
[`RUNNER_BOX.md`](RUNNER_BOX.md) for the .113 pool and its scheduling limits.

1. Make sure no CI job or other build is running on the box (`uptime` load well below the
   CPU count; the report records `loadAvg` either way).
2. Check out the exact commit to measure and install with the lockfile: `npm ci`.
3. Run with the build:

   ```bash
   npm run perf:lts-baseline -- --with-build --runs 50 \
     --data-dir /var/tmp/omniroute-perf --out perf-<version>.json --md > perf-<version>.md
   ```

4. Run it a second time without `--with-build` (the bundle now exists) and check that the TTFB
   medians of the two runs agree within a few percent. If they do not, the host was not idle.
5. Publish both files with the host name and the date. Future comparisons use the same box
   and the same `--runs`.

## Related

- [`QUALITY_GATES.md`](../architecture/QUALITY_GATES.md): the `nightly-resilience`
  workflow runs the heap-growth gate on a schedule.
- `bin/cold-start-bench.sh`: a budget check (listen ≤ 800 ms, warm TTFB ≤ 200 ms) for a single
  boot, as opposed to this recorded baseline.
