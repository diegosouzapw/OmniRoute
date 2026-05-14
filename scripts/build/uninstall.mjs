import fs from "fs";
import os from "os";
import path from "path";
import { execSync } from "child_process";

const args = process.argv.slice(2);
const fullUninstall = args.includes("--full");
const uninstallAlreadyInProgress =
  process.env.OMNIROUTE_SKIP_UNINSTALL_HOOK === "1" ||
  process.env.npm_lifecycle_event === "uninstall";

console.log("🛑 OmniRoute Uninstaller");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// 1. Stop PM2 process if it exists
try {
  console.log("Stopping and removing background PM2 processes...");
  execSync("pm2 delete omniroute 2>/dev/null", { stdio: "ignore" });
} catch {
  // It's perfectly fine if pm2 is not installed or the process doesn't exist.
}

// 2. Local AppData / Config Folder cleanup (Only on Full Uninstall)
const dataDir = process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");

if (fullUninstall) {
  console.log(`🧹 Full Uninstall selected. Erasing database and files at: ${dataDir}`);
  try {
    if (fs.existsSync(dataDir)) {
      fs.rmSync(dataDir, { recursive: true, force: true });
      console.log("✅ Data directory removed.");
    } else {
      console.log("ℹ️ Data directory did not exist. Skipping.");
    }
  } catch (error) {
    console.warn("⚠️ Failed to remove data directory:", error.message);
  }
} else {
  console.log(`💾 Keeping data files at: ${dataDir} intact.`);
}

// 3. NPM uninstall
if (uninstallAlreadyInProgress) {
  console.log("ℹ️ npm uninstall is already in progress. Skipping nested uninstall command.");
} else {
  console.log("🗑️ Removing npm package...");
  try {
    execSync("npm uninstall -g omniroute", {
      stdio: "inherit",
      env: {
        ...process.env,
        OMNIROUTE_SKIP_UNINSTALL_HOOK: "1",
      },
    });
    console.log("\n✅ OmniRoute has been successfully uninstalled from your system.");
    if (!fullUninstall) {
      console.log(`ℹ️ Your configurations and databases were preserved in ${dataDir}.`);
    }
  } catch (error) {
    console.warn(
      "⚠️ Failed to remove npm package. You might need to run this command with 'sudo'."
    );
  }
}
