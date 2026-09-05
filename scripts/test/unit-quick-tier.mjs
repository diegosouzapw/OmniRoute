import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { globSync } from "tinyglobby";

// Measured at concurrency 10 in #12589. This opt-in tier does not replace CI
// or coverage. Keep exclusions explicit; every newly registered group is included.
export const SLOW_DIRS = Object.freeze(["combo", "compression", "provider", "misc", "db", "issue"]);

export function buildQuickPlan(root) {
  const { scripts } = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const commands = scripts["test:unit"]?.split(" && ") || [];
  if (commands.length !== 3 || commands[2] !== "npm run test:unit:serial") {
    throw new Error("Unsupported canonical test:unit layout; update the quick-tier collector.");
  }
  commands[2] = scripts["test:unit:serial"];
  const names = ["main", "dashboard", "serial"];
  const seen = new Set();
  const excluded = [];
  const groups = commands.map((command, index) => {
    const globs = command?.match(/tests\/unit\/[^\s"']+/g) || [];
    if (globs.length === 0) {
      throw new Error(`No test globs in canonical test:unit ${names[index]} phase.`);
    }
    const files = globSync(globs, { cwd: root })
      .sort()
      .filter((file) => {
        if (seen.has(file)) throw new Error(`Test collected by multiple phases: ${file}`);
        seen.add(file);
        if (SLOW_DIRS.includes(file.split("/")[2])) {
          excluded.push(file);
          return false;
        }
        return true;
      });
    return { name: names[index], loader: index === 1 ? "tsx" : "tsx/esm", files };
  });
  return { groups, excluded: excluded.sort(), totalFiles: seen.size };
}

export function runQuickPlan(
  plan,
  { root, concurrency = 4, spawn = spawnSync, log = console.log }
) {
  let failed = false;
  for (const group of plan.groups) {
    if (group.files.length === 0) continue;
    const parallelism = group.name === "serial" ? 1 : concurrency;
    log(`[unit:quick] ${group.name}: ${group.files.length} files, concurrency ${parallelism}`);
    // Bound explicit file lists below Windows' command-line limit at repo scale.
    const batches = [[]];
    let bytes = 0;
    for (const file of group.files) {
      const size = Buffer.byteLength(file) + 3;
      if (bytes + size > 24000 && batches.at(-1).length > 0) {
        batches.push([]);
        bytes = 0;
      }
      batches.at(-1).push(file);
      bytes += size;
    }
    for (const [index, files] of batches.entries()) {
      const started = performance.now();
      log(`[unit:quick] ${group.name} batch ${index + 1}/${batches.length}: ${files.length} files`);
      const result = spawn(
        process.execPath,
        [
          "--max-old-space-size=8192",
          "--import",
          group.loader,
          "--import",
          "./open-sse/utils/setupPolyfill.ts",
          "--import",
          "./tests/_setup/isolateDataDir.ts",
          "--test",
          "--test-force-exit",
          "--test-isolation=process",
          `--test-concurrency=${parallelism}`,
          ...files,
        ],
        {
          cwd: root,
          env: { ...process.env, DISABLE_SQLITE_AUTO_BACKUP: "true" },
          stdio: "inherit",
        }
      );
      log(
        `[unit:quick] ${group.name} batch ${index + 1}/${batches.length}: ${((performance.now() - started) / 1000).toFixed(2)}s, exit ${result.status ?? result.signal ?? "error"}`
      );
      if (result.error) log(`[unit:quick] ${group.name} could not start: ${result.error.message}`);
      if (result.signal) {
        log(`[unit:quick] ${group.name} interrupted by ${result.signal}`);
        return 1;
      }
      failed ||= Boolean(result.error) || result.status !== 0;
    }
  }
  return failed ? 1 : 0;
}

function main() {
  const { values } = parseArgs({
    options: { list: { type: "boolean" }, concurrency: { type: "string", default: "4" } },
  });
  const concurrency = Number(values.concurrency);
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error("--concurrency must be a positive integer");
  }
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const plan = buildQuickPlan(root);
  if (values.list) {
    console.log(JSON.stringify(plan, null, 2));
    return;
  }
  console.log(
    `[unit:quick] ${plan.totalFiles - plan.excluded.length}/${plan.totalFiles} files; ${plan.excluded.length} remain in the full suite (excluded groups: ${SLOW_DIRS.join(", ")}).`
  );
  process.exitCode = runQuickPlan(plan, { root, concurrency });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
