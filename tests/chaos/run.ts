#!/usr/bin/env node
/**
 * CLI entry point for the chaos suite.
 *
 * Usage:
 *   node --import tsx tests/chaos/run.ts                     # run all
 *   node --import tsx tests/chaos/run.ts --only 01-provider-500
 *   node --import tsx tests/chaos/run.ts --skip 05-websocket-flap
 *   node --import tsx tests/chaos/run.ts --write-report
 *   node --import tsx tests/chaos/run.ts --json
 *
 * Exit codes:
 *   0 — all scenarios passed, all invariants held
 *   1 — at least one scenario failed OR an invariant was violated
 */
import { runChaosSuite } from "./00-index.ts";
import { renderMarkdown, renderOneLine } from "./report.ts";

function parseArgs(argv: string[]): { only?: string; skip: string[]; writeReport: boolean; json: boolean } {
  const out: { only?: string; skip: string[]; writeReport: boolean; json: boolean } = {
    skip: [],
    writeReport: false,
    json: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--only" && argv[i + 1]) {
      out.only = argv[++i];
    } else if (a === "--skip" && argv[i + 1]) {
      out.skip.push(argv[++i]);
    } else if (a === "--write-report") {
      out.writeReport = true;
    } else if (a === "--json") {
      out.json = true;
    }
  }
  return out;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const report = await runChaosSuite({
    only: args.only,
    skip: args.skip,
    writeReport: args.writeReport,
  });

  if (args.json) {
    // Strip the verbose `events` arrays from each scenario to keep stdout
    // reasonable; the full report is still on disk when --write-report.
    const slim = {
      ...report,
      scenarios: report.scenarios.map((s) => ({ ...s, events: s.events.slice(0, 5) })),
    };
    process.stdout.write(JSON.stringify(slim, null, 2) + "\n");
  } else {
    process.stdout.write(renderMarkdown(report) + "\n");
    process.stdout.write(renderOneLine(report) + "\n");
  }

  process.exit(report.success ? 0 : 1);
}

main().catch((e) => {
  process.stderr.write(`[chaos] runner crashed: ${(e as Error).stack ?? String(e)}\n`);
  process.exit(2);
});