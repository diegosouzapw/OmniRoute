import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { execSync } from "node:child_process";

const RUNTIME_DIR = join(homedir(), ".omniroute", "runtime");
// systray2 is a maintained fork with prebuilt binaries — installed lazily at runtime,
// not in dependencies, to avoid npm install overhead for users who don't use --tray.
const SYSTRAY_VERSION = "systray2@1.4.5";

export async function loadSystray(): Promise<(new (...args: unknown[]) => unknown) | null> {
  if (process.platform === "win32") return null; // Windows uses tray.ps1 instead
  ensureRuntimeDir();
  if (!isInstalled()) {
    try {
      installSystray();
    } catch (err) {
      console.warn(`[omniroute] tray runtime install failed: ${(err as Error).message}`);
      return null;
    }
  }
  try {
    const modPath = join(RUNTIME_DIR, "node_modules", "systray2");
    const mod = await import(modPath);
    return (mod.default ?? mod.SysTray ?? mod) as (new (...args: unknown[]) => unknown) | null;
  } catch {
    return null;
  }
}

function ensureRuntimeDir(): void {
  if (!existsSync(RUNTIME_DIR)) mkdirSync(RUNTIME_DIR, { recursive: true });
  const pkg = join(RUNTIME_DIR, "package.json");
  if (!existsSync(pkg)) {
    writeFileSync(pkg, JSON.stringify({ name: "omniroute-runtime", private: true }), "utf-8");
  }
}

function isInstalled(): boolean {
  return existsSync(join(RUNTIME_DIR, "node_modules", "systray2", "package.json"));
}

function installSystray(): void {
  execSync(
    `npm install --prefix "${RUNTIME_DIR}" ${SYSTRAY_VERSION} --no-audit --no-fund --silent`,
    { stdio: ["ignore", "ignore", "pipe"], timeout: 120_000 }
  );
}
