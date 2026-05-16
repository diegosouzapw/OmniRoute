import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { homedir } from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { t } from "../i18n.mjs";

const execFileAsync = promisify(execFile);

async function getCurrentVersion() {
  try {
    const { readFileSync } = await import("node:fs");
    const pkg = JSON.parse(readFileSync(path.join(process.cwd(), "package.json"), "utf-8"));
    return pkg.version;
  } catch {
    return null;
  }
}

async function getLatestVersion() {
  try {
    const { stdout } = await execFileAsync("npm", ["view", "omniroute", "version"], {
      timeout: 15000,
    });
    return stdout.trim();
  } catch {
    return null;
  }
}

function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
  }
  return 0;
}

async function createBackup() {
  const binPath = path.join(process.cwd(), "bin");
  const backupDir = path.join(homedir(), ".omniroute", "backups", `omniroute-${Date.now()}`);

  try {
    const { mkdirSync, copyFileSync, existsSync } = await import("node:fs");
    if (!existsSync(binPath)) return null;

    mkdirSync(backupDir, { recursive: true });
    const files = ["omniroute.mjs", "cli", "nodeRuntimeSupport.mjs", "mcp-server.mjs"];
    for (const f of files) {
      const src = path.join(binPath, f);
      if (existsSync(src)) {
        copyFileSync(src, path.join(backupDir, f));
      }
    }
    return backupDir;
  } catch {
    return null;
  }
}

export function registerUpdate(program) {
  program
    .command("update")
    .description(t("update.checking"))
    .option("--check", "Check for available update — exit 0 if up-to-date, exit 1 if outdated")
    .option("--apply", "Install latest version automatically (npm install -g)")
    .option("--changelog", "Show changelog for the latest release")
    .option("--dry-run", "Show what would be updated without applying")
    .option("--no-backup", "Skip backup creation")
    .option("--yes", "Skip confirmation prompt")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runUpdateCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runUpdateCommand(opts = {}) {
  const checkOnly = opts.check ?? false;
  const applyNow = opts.apply ?? false;
  const showChangelog = opts.changelog ?? false;
  const dryRun = opts.dryRun ?? false;
  const skipBackup = !(opts.backup ?? true);
  const skipConfirm = opts.yes ?? applyNow;

  const current = await getCurrentVersion();
  const latest = await getLatestVersion();

  if (!current) {
    printError("Could not determine current version");
    return 1;
  }

  if (!latest) {
    printError("Could not check latest version. Is npm available?");
    return 1;
  }

  if (showChangelog) {
    try {
      const { stdout } = await execFileAsync("npm", ["view", "omniroute", "changelog"], {
        timeout: 10000,
      });
      if (stdout.trim()) {
        console.log(stdout.trim());
      } else {
        console.log(`Changelog: https://github.com/your-org/omniroute/releases/tag/v${latest}`);
      }
    } catch {
      console.log(`Changelog: https://github.com/your-org/omniroute/releases/tag/v${latest}`);
    }
    return 0;
  }

  printHeading("OmniRoute Update");
  console.log(`  Current version: ${current}`);
  console.log(`  Latest version:  ${latest}`);

  const cmp = compareVersions(current, latest);
  if (cmp >= 0) {
    printSuccess("You are running the latest version!");
    return 0;
  }

  console.log(`\n  Update available: ${current} → ${latest}`);

  if (checkOnly) {
    console.log("\n  Run `omniroute update --apply` to install automatically.");
    return 1; // exit 1 = outdated (useful for scripts)
  }

  if (dryRun) {
    console.log("\n  [DRY RUN] Would run: npm install -g omniroute@latest");
    if (!skipBackup) console.log("  [DRY RUN] Would create backup in ~/.omniroute/backups/");
    return 0;
  }

  if (!skipBackup) {
    printInfo("Creating backup...");
    const backupPath = await createBackup();
    if (backupPath) {
      printSuccess(`Backup created: ${backupPath}`);
    } else {
      printError("Failed to create backup. Aborting update.");
      return 1;
    }
  }

  if (!skipConfirm) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(`Proceed with update to ${latest}? [y/N] `, resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      printInfo("Update aborted.");
      return 0;
    }
  }

  printInfo("Updating OmniRoute...");
  try {
    const { execSync } = await import("child_process");
    execSync("npm install -g omniroute@latest", { stdio: "inherit" });
    printSuccess(`Updated to version ${latest}`);
    printInfo("Run `omniroute --version` to verify.");
    return 0;
  } catch (err) {
    printError(`Update failed: ${err.message}`);
    printInfo("Restore from backup:");
    const backupDir = path.join(homedir(), ".omniroute", "backups");
    printInfo(`  ls ${backupDir}`);
    return 1;
  }
}
