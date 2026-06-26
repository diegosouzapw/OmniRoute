/**
 * Chaos Suite — entry point.
 *
 * Exports `runChaosSuite(opts)` and the scenario registry. The CLI
 * wrapper in `run.ts` calls `runChaosSuite` with the registry and the
 * flags parsed from process.argv.
 *
 * Usage:
 *   import { runChaosSuite } from "./00-index.ts";
 *   const report = await runChaosSuite({ only: "01-provider-500" });
 */
import * as s01 from "./scenarios/01-provider-500.ts";
import * as s02 from "./scenarios/02-provider-timeout.ts";
import * as s03 from "./scenarios/03-rate-limit-thundering-herd.ts";
import * as s04 from "./scenarios/04-db-connection-loss.ts";
import * as s05 from "./scenarios/05-websocket-flap.ts";
import * as s06 from "./scenarios/06-disk-full.ts";
import * as s07 from "./scenarios/07-otel-exporter-down.ts";
import * as s08 from "./scenarios/08-cascading-quota-exhaustion.ts";
import { runChaosSuite as _runChaosSuite, type ScenarioRegistration, type RunOptions } from "./runner.ts";
import type { ChaosReport } from "./report.ts";

/** All registered scenarios, in execution order. */
export const scenarios: ScenarioRegistration[] = [
  s01, s02, s03, s04, s05, s06, s07, s08,
];

export interface ChaosSuiteOptions extends RunOptions {
  /** if true, also write the Markdown report to disk (default false) */
  writeReport?: boolean;
  /** path to write the Markdown report (default: docs/chaos/last-run.md) */
  reportPath?: string;
}

/**
 * Run the full chaos suite and return a structured report.
 *
 * This is the public API. The CLI in `run.ts` wraps it with arg
 * parsing and exit-code logic; tests import it directly.
 */
export async function runChaosSuite(opts: ChaosSuiteOptions = {}): Promise<ChaosReport> {
  const report = await _runChaosSuite(scenarios, opts);
  if (opts.writeReport) {
    const { renderMarkdown } = await import("./report.ts");
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const target = opts.reportPath ?? path.resolve(process.cwd(), "docs/chaos/last-run.md");
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, renderMarkdown(report), "utf8");
  }
  return report;
}

export type { ChaosReport, ScenarioRegistration, RunOptions } from "./runner.ts";