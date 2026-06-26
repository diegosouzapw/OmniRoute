# Chaos Test Suite (PR-013)

Hermetic, zero-dependency chaos engineering tests for OmniRoute's
resilience primitives. Each scenario simulates a real-world failure
mode, injects the failure in-process, and asserts both that the SUT
recovers correctly **and** that the suite itself leaves no leaked
state behind.

## Quickstart

```sh
# Run every scenario. Exit code 0 = green, 1 = violation.
npm run chaos:test

# Run a single scenario.
node --import tsx tests/chaos/run.ts --only 01-provider-500

# Skip the long ones while iterating.
node --import tsx tests/chaos/run.ts --skip 03-rate-limit-thundering-herd

# Dump the Markdown report to docs/chaos/last-run.md for review.
npm run chaos:test -- --write-report

# Emit JSON instead of Markdown.
node --import tsx tests/chaos/run.ts --json
```

## Layout

| File                                  | What it does                                               |
| ------------------------------------- | ---------------------------------------------------------- |
| `00-index.ts`                         | Public API: `runChaosSuite(opts)`                          |
| `injectors.ts`                        | `ChaosInjector` primitive + `delay`/`fail`/`drop`/`throttle` |
| `invariants.ts`                       | Default + scenario-specific invariants                     |
| `report.ts`                           | `ChaosReport` shape + Markdown renderer                    |
| `runner.ts`                           | Per-scenario orchestration + cleanup                       |
| `run.ts`                              | CLI entry: parse args, write report, exit code             |
| `scenarios/01-provider-500.ts`        | 500 → breaker trips → fallback engages → alerts fire       |
| `scenarios/02-provider-timeout.ts`    | 30s slow upstream → client timeout → retry kicks in        |
| `scenarios/03-rate-limit-thundering-herd.ts` | 200 concurrent reqs → throttle holds, queue fills     |
| `scenarios/04-db-connection-loss.ts`  | sqlite closed mid-request → retry w/ backoff → typed error |
| `scenarios/05-websocket-flap.ts`      | ws dropped mid-stream → reconnect → no zombie reader       |
| `scenarios/06-disk-full.ts`           | ENOSPC on data dir → graceful fail → state preserved       |
| `scenarios/07-otel-exporter-down.ts`  | OTLP unreachable → buffer → no request blocks → reconnect  |
| `scenarios/08-cascading-quota-exhaustion.ts` | 5 tenants exhausted → fair share → no starvation  |

## Constraints honored

- **Zero new npm deps.** No chaos libraries — the suite uses native
  `node:test`-style orchestration, monkey-patched `globalThis.fetch`,
  in-memory stubs for sqlite/otel, and token-bucket throttling from
  the standard library.
- **Hermetic.** No scenario reaches out to the network, filesystem, or
  DB beyond the small temp dirs and local ports it creates itself.
- **Runnable in isolation.** Every scenario is exported as a module;
  pass `--only <id>` to the CLI to run just that scenario.
- **trace_id on every error.** Every scenario funnels its errors
  through `ctx.captureError(err)`, which stamps a `trace_id`. The
  invariant `all-errors-have-trace-id` is checked at the end.
- **Invariants after cleanup.** The runner restores every injector in
  LIFO order BEFORE running the invariant checks, so a leak shows up
  loudly instead of being masked by a still-installed injector.

See `../docs/chaos/01-overview.md` for the long form.